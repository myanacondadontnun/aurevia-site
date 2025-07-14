"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, HeadphonesIcon, ChevronDown, Crown, Zap, Target } from "lucide-react";

interface PlanTier {
  id: string;
  name: string;
  price: number;
  conversionLift: number;
  upsellLift: number;
  ticketsResolved: number;
  icon: any;
  features: string[];
}

interface ROIResults {
  plan: PlanTier;
  revenue: number;
  averageOrderValue: number;
  orders: number;
  convGain: number;
  cartGain: number;
  upsellGain: number;
  totalSalesGain: number;
  tickets: number;
  ticketsResolvedCount: number;
  supportSaved: number;
  grossBenefit: number;
  netROI: number;
  roiMultiple: number;
  breakEvenRevenue: number;
  breakEvenDays: number;
}

export default function ROICalculator() {
  // Form inputs
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>("");
  const [aov, setAov] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("auto");
  const [monthlyTickets, setMonthlyTickets] = useState<string>("");

  // Advanced settings
  const [cartRecoveryLift, setCartRecoveryLift] = useState<number>(4);
  const [costPerTicket, setCostPerTicket] = useState<number>(2.5);

  // Results
  const [results, setResults] = useState<ROIResults[]>([]);
  const [recommendedPlan, setRecommendedPlan] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);

  // Plan tiers with specific metrics
  const planTiers: PlanTier[] = [
    { 
      id: "starter", 
      name: "Starter", 
      price: 79,
      conversionLift: 6,
      upsellLift: 4,
      ticketsResolved: 30,
      icon: Target,
      features: ["Basic AI Chat", "Cart Recovery", "Simple Analytics"]
    },
    { 
      id: "pro", 
      name: "Pro", 
      price: 199,
      conversionLift: 10,
      upsellLift: 6,
      ticketsResolved: 40,
      icon: Zap,
      features: ["Advanced AI", "Multi-language", "In-chat Upsells", "Priority Support"]
    },
    { 
      id: "enterprise", 
      name: "Enterprise", 
      price: 499,
      conversionLift: 14,
      upsellLift: 8,
      ticketsResolved: 55,
      icon: Crown,
      features: ["Premium AI", "Personalized Flows", "Advanced Analytics", "Dedicated Support"]
    }
  ];

  // Industry median AOV
  const INDUSTRY_MEDIAN_AOV = 60;

  // Auto-recommend plan based on order volume
  const getRecommendedPlan = (orders: number): string => {
    if (orders < 1000) return 'starter';
    if (orders < 5000) return 'pro';
    return 'enterprise';
  };

  // Calculate break-even metrics
  const getBreakEvenMetrics = (planPrice: number, totalSalesGain: number) => {
    const breakEvenRevenue = planPrice;
    const breakEvenDays = Math.ceil((planPrice / totalSalesGain) * 30);
    return { breakEvenRevenue, breakEvenDays };
  };

  // Calculate ROI for a specific plan
  const calculatePlanROI = (plan: PlanTier, revenue: number, averageOrderValue: number, orders: number, tickets: number): ROIResults => {
    // Revenue upside calculations using tier-specific metrics
    const convGain = revenue * (plan.conversionLift / 100);
    const cartGain = revenue * 0.01 * (cartRecoveryLift / 100);
    const upsellGain = revenue * (plan.upsellLift / 100);
    const totalSalesGain = convGain + cartGain + upsellGain;

    // Support savings calculations
    const ticketsResolvedCount = tickets * (plan.ticketsResolved / 100);
    const supportSaved = ticketsResolvedCount * costPerTicket;

    // ROI calculations
    const grossBenefit = totalSalesGain + supportSaved;
    const netROI = grossBenefit - plan.price;
    const roiMultiple = grossBenefit / plan.price;

    // Break-even metrics
    const { breakEvenRevenue, breakEvenDays } = getBreakEvenMetrics(plan.price, totalSalesGain);

    return {
      plan,
      revenue,
      averageOrderValue,
      orders,
      convGain,
      cartGain,
      upsellGain,
      totalSalesGain,
      tickets,
      ticketsResolvedCount,
      supportSaved,
      grossBenefit,
      netROI,
      roiMultiple,
      breakEvenRevenue,
      breakEvenDays
    };
  };

  const calculateROI = () => {
    if (!monthlyRevenue || isNaN(parseFloat(monthlyRevenue))) {
      return;
    }

    const revenue = parseFloat(monthlyRevenue);
    const averageOrderValue = aov ? parseFloat(aov) : INDUSTRY_MEDIAN_AOV;
    const orders = revenue / averageOrderValue;
    const tickets = monthlyTickets ? parseFloat(monthlyTickets) : orders * (revenue > 50000 ? 0.56 : 0.88);

    // Auto-recommend plan based on order volume
    const recommended = getRecommendedPlan(orders);
    setRecommendedPlan(recommended);

    // Calculate ROI for all plans
    const allResults = planTiers.map(plan => calculatePlanROI(plan, revenue, averageOrderValue, orders, tickets));
    
    setResults(allResults);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen text-white font-inter" style={{backgroundColor: '#080808'}}>
      <section id="roi-calculator" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{backgroundColor: '#080808'}}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors mb-4">
              ROI Calculator
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Calculate Your{" "}
              <span className="bg-gradient-to-r from-[#10b981] to-[#34d399] bg-clip-text text-transparent">
                Revenue Impact
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              See exactly how much Aurevia could add to your bottom line with our ROI calculator
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Form */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calculator className="w-5 h-5 text-primary" />
                  Store Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Monthly Revenue */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Monthly Store Revenue *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">£</span>
                    <input
                      type="number"
                      value={monthlyRevenue}
                      onChange={(e) => setMonthlyRevenue(e.target.value)}
                      placeholder="25,000"
                      className="w-full pl-8 pr-4 py-3 rounded-lg bg-background/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Average Order Value */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Average Order Value (AOV)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">£</span>
                    <input
                      type="number"
                      value={aov}
                      onChange={(e) => setAov(e.target.value)}
                      placeholder="60 (optional)"
                      className="w-full pl-8 pr-4 py-3 rounded-lg bg-background/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Leave blank to use industry median (£{INDUSTRY_MEDIAN_AOV})
                  </p>
                </div>

                {/* Plan Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Plan Selection
                  </label>
                  <div className="relative">
                    <select
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="auto">Auto-recommend based on store size</option>
                      {planTiers.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {plan.name} · £{plan.price}/mo
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Monthly Support Tickets */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Monthly Support Tickets
                  </label>
                  <input
                    type="number"
                    value={monthlyTickets}
                    onChange={(e) => setMonthlyTickets(e.target.value)}
                    placeholder="≈ 120 tickets"
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    Optional - we'll estimate based on order volume
                  </p>
                </div>

                <Button
                  onClick={calculateROI}
                  className="w-full cta-button text-white font-medium py-3 text-lg"
                  disabled={!monthlyRevenue}
                >
                  Calculate ROI
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Your ROI Projection
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!showResults ? (
                  <div className="text-center py-12">
                    <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">
                      Enter your store details to see your ROI projection
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Recommendation Badge */}
                    {recommendedPlan && (
                      <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-primary">Recommended Plan</h3>
                        </div>
                        <p className="text-sm text-gray-300">
                          Based on your store size, we recommend the <strong>{planTiers.find(p => p.id === recommendedPlan)?.name}</strong> plan. 
                          {results.find(r => r.plan.id === recommendedPlan)?.breakEvenDays && (
                            <span> It pays for itself in {results.find(r => r.plan.id === recommendedPlan)?.breakEvenDays} days.</span>
                          )}
                        </p>
                      </div>
                    )}

                    {/* Plan Comparison */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-center">Plan Comparison</h3>
                      <div className="grid gap-4">
                        {results.map((result) => {
                          const Icon = result.plan.icon;
                          const isRecommended = result.plan.id === recommendedPlan;
                          const isHighestROI = result.roiMultiple === Math.max(...results.map(r => r.roiMultiple));
                          
                          return (
                            <div
                              key={result.plan.id}
                              className={`p-4 rounded-lg border transition-all ${
                                isRecommended 
                                  ? 'border-primary/50 bg-primary/5' 
                                  : 'border-border/50 bg-background/20'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <Icon className="w-5 h-5 text-primary" />
                                  <h4 className="font-semibold">{result.plan.name}</h4>
                                  <span className="text-sm text-gray-400">£{result.plan.price}/mo</span>
                                  {isRecommended && (
                                    <Badge className="bg-primary/20 text-primary border-primary/30">
                                      Recommended
                                    </Badge>
                                  )}
                                  {isHighestROI && (
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                      Highest ROI
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-bold text-primary">
                                    {result.roiMultiple.toFixed(1)}x
                                  </div>
                                  <div className="text-xs text-gray-400">ROI Multiple</div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <div className="font-semibold bg-gradient-to-r from-[#10b981] to-[#34d399] bg-clip-text text-transparent">
                                    £{result.totalSalesGain.toLocaleString()}
                                  </div>
                                  <div className="text-gray-400">Extra Revenue</div>
                                </div>
                                <div>
                                  <div className="font-semibold bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">
                                    £{result.supportSaved.toLocaleString()}
                                  </div>
                                  <div className="text-gray-400">Support Savings</div>
                                </div>
                                <div>
                                  <div className="font-semibold text-primary">
                                    £{result.netROI.toLocaleString()}
                                  </div>
                                  <div className="text-gray-400">Net ROI</div>
                                </div>
                              </div>
                              
                              <div className="mt-3 pt-3 border-t border-border/30">
                                <div className="flex justify-between items-center text-xs text-gray-400">
                                  <span>Break-even at £{result.breakEvenRevenue}/mo extra sales</span>
                                  <span>Payback in {result.breakEvenDays} days</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Guard Rails */}
                    {selectedPlan !== "auto" && selectedPlan !== recommendedPlan && (
                      <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <p className="text-sm text-orange-300">
                          <strong>{planTiers.find(p => p.id === selectedPlan)?.name}</strong> might be {
                            planTiers.findIndex(p => p.id === selectedPlan) > planTiers.findIndex(p => p.id === recommendedPlan) 
                              ? 'overkill' 
                              : 'insufficient'
                          } for stores at your size, but here's what you'd need to justify it.
                        </p>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="text-center pt-4">
                      {results.length > 0 && (
                        <p className="text-gray-300 mb-4">
                          Aurevia could add ≈ £{results.find(r => r.plan.id === recommendedPlan)?.totalSalesGain.toLocaleString()} / month in new sales and save ≈ £{results.find(r => r.plan.id === recommendedPlan)?.supportSaved.toLocaleString()} in support costs → net ROI ≈ £{results.find(r => r.plan.id === recommendedPlan)?.netROI.toLocaleString()} ({results.find(r => r.plan.id === recommendedPlan)?.roiMultiple.toFixed(1)}× pay-back).
                        </p>
                      )}
                      <Button
                        onClick={() => document.getElementById('beta')?.scrollIntoView({ behavior: 'smooth' })}
                        className="cta-button text-white font-medium px-8 py-3"
                      >
                        Get Free Access Now
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 