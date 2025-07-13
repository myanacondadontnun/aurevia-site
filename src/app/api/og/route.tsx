import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
            fontSize: 32,
            fontWeight: 600,
            color: 'white',
            padding: '40px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Gradient overlay similar to hero */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(ellipse at center, rgba(2, 77, 63, 0.3) 0%, rgba(0, 0, 0, 0.8) 70%)',
            }}
          />
          
          {/* New Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50px',
              padding: '8px 16px',
              fontSize: '18px',
              marginBottom: '30px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #000000 0%, #7f5af0 100%)',
                padding: '4px 12px',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: 'bold',
                marginRight: '8px',
              }}
            >
              New
            </span>
            <span style={{ fontSize: '16px', color: 'white' }}>
              Personal AI Agent for your support
            </span>
          </div>

          {/* Main Headline */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'normal',
              lineHeight: '1.1',
              marginBottom: '24px',
              maxWidth: '1000px',
            }}
          >
            Shopify AI Sales Chatbot 24/7{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Revenue on Autopilot
            </span>
          </div>

          {/* Subheadline */}
          <div
            style={{
              fontSize: '28px',
              fontWeight: 300,
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '800px',
              lineHeight: '1.4',
              marginBottom: '40px',
            }}
          >
            Answer questions, recommend products and recover carts in real time.
            No scripts, no coding, fully trained on your brand.
          </div>

          {/* CTA Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '24px',
              fontWeight: 500,
              color: 'white',
              boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
            }}
          >
            Apply for Beta Access!
            <span style={{ marginLeft: '8px' }}>→</span>
          </div>

          {/* Aurevia.io branding */}
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              right: '40px',
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontWeight: 500,
            }}
          >
            Aurevia.io
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 