import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'El Impostor - Juego de Fiesta Gratis'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f8e8ef 0%, #fdf2f8 50%, #f0e7ff 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '60px',
            fontSize: '60px',
            opacity: 0.3,
          }}
        >
          ✦
        </div>
        <div
          style={{
            position: 'absolute',
            top: '80px',
            right: '100px',
            fontSize: '40px',
            opacity: 0.25,
          }}
        >
          ★
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '100px',
            left: '120px',
            fontSize: '50px',
            opacity: 0.2,
          }}
        >
          ✦
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
            fontSize: '45px',
            opacity: 0.3,
          }}
        >
          ★
        </div>

        {/* Main content card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 80px',
            borderRadius: '40px',
            border: '6px solid #1a1625',
            backgroundColor: 'white',
            boxShadow: '12px 12px 0 0 #db2777',
            transform: 'rotate(-1deg)',
          }}
        >
          {/* Emoji icon */}
          <div
            style={{
              fontSize: '100px',
              marginBottom: '20px',
            }}
          >
            🎭
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#db2777',
              textAlign: 'center',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            El Impostor
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '36px',
              color: '#64748b',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            ¡El mejor juego de fiesta!
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
              fontSize: '24px',
              color: '#475569',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>👥</span>
              <span>3-20 jugadores</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎉</span>
              <span>100% Gratis</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🌐</span>
              <span>Sin descargas</span>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            fontSize: '20px',
            color: '#94a3b8',
          }}
        >
          impostor.pablocarvalho.dev
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

