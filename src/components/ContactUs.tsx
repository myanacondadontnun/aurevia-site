"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { trackContactFormSubmit, trackEvent } from "@/lib/analytics";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Create URL-encoded form data
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);

      console.log('Submitting form data:', Object.fromEntries(formDataToSend));

      const response = await fetch('https://script.google.com/macros/s/AKfycby2Um5z2N6m9X1WzbNACYogzZf60qtXeoMYaZEg0zIKwCyZQ6CL_53HUcAibwzx92fKlw/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend.toString()
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const result = await response.text();
        console.log('Response text:', result);
        
        if (result === "Success" || response.status === 200) {
          // Track successful form submission
          trackContactFormSubmit(true);
          trackEvent('contact_form_success', {
            form_name: 'contact_us',
            company: formData.company || 'not_provided',
            subject: formData.subject || 'general_inquiry'
          });
          
          setIsSubmitted(true);
          
          // Reset form after 3 seconds
          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: "", email: "", company: "", subject: "", message: "" });
          }, 3000);
        } else {
          throw new Error(`Unexpected response: ${result}`);
        }
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Track failed form submission
      trackContactFormSubmit(false);
      trackEvent('contact_form_error', {
        form_name: 'contact_us',
        error_message: error instanceof Error ? error.message : 'Unknown error'
      });
      
      setSubmitError(`Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again or contact us directly.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-l from-primary/5 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
            Get in Touch
          </Badge>
          {/* Desktop Header */}
          <h2 className="hidden md:block text-4xl md:text-5xl mb-6 text-white">
            <span className="font-normal">Ready to put</span> <span className="green-highlight font-bold">intelligent selling</span> <span className="font-normal">on autopilot?</span>
          </h2>
          
          {/* Mobile Header */}
          <h2 className="md:hidden text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">
            <span className="green-highlight">Automate sales</span> the smart way?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's discuss how Aurevia can revolutionize your business with AI-powered customer engagement.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Let's Start a Conversation</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                We're here to help you take your customer engagement to the next level. 
                Reach out to us through any of the channels below or fill out the form.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 group">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Email Us</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">general@aurevia.io</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 group">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Call Us</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">(+44)7733207396</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 group">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Visit Us</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">CF24 1PE,Cardiff, UK</p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="p-4 sm:p-6 rounded-lg border border-primary/20 bg-primary/5 backdrop-blur-sm">
              <h4 className="font-semibold text-primary mb-2 text-sm sm:text-base">Quick Response Guarantee</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                We typically respond to all inquiries within 24 hours during business days.
              </p>
            </div>
          </div>

          {/* Contact Form Card with Gradient */}
          <Card className="relative overflow-hidden border-0 shadow-2xl">
            {/* Dark black to dark lush green gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-emerald-900 opacity-95"></div>
            
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <CardHeader className="text-center pb-6 sm:pb-8 px-4 sm:px-6">
                <CardTitle className="text-xl sm:text-2xl text-white mb-2">
                  Send Us a Message
                </CardTitle>
                <CardDescription className="text-gray-300 text-sm sm:text-base">
                  Fill out the form below and we'll get back to you shortly.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-300">Thank you for reaching out. We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitError && (
                      <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <p className="text-red-300 text-sm">{submitError}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 resize-none"
                        placeholder="Tell us about your project and how we can help..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
} 