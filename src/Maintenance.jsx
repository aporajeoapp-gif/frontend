import React from 'react';
 
const Maintenance = () => {
  return (
    <div style={{
      background: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2.5rem 1.5rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <style>{`
        @keyframes float-l {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-7px); }
        }
        @keyframes float-r {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(7px); }
        }
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.2; }
        }
        .plug-l {
          animation: float-l 2.8s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .plug-r {
          animation: float-r 2.8s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .ring {
          animation: pulse-ring 2.8s ease-in-out infinite;
        }
      `}</style>
 
      {/* Brand */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        marginBottom: '2rem', alignSelf: 'flex-start',
        maxWidth: '520px', width: '100%',
        marginLeft: 'auto', marginRight: 'auto',
      }}>
        <div style={{
          width: '34px', height: '34px', background: '#1a6fbf',
          borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: '17px', lineHeight: 1 }}>A</span>
        </div>
        <span style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', letterSpacing: '-0.02em' }}>
          Aporajeo
        </span>
      </div>
 
      {/* Card */}
      <div style={{
        width: '100%', maxWidth: '520px', background: '#fff',
        borderRadius: '20px', border: '1.5px solid #e2eaf5', overflow: 'hidden',
      }}>
 
        {/* Heading */}
        <div style={{ padding: '2.5rem 2rem 0', textAlign: 'center' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1e3a5f', margin: '0 0 0.5rem', lineHeight: 1.3 }}>
            This site is under<br />maintenance
          </h1>
          <p style={{ fontSize: '14px', color: '#5b7a99', margin: '0 0 1.5rem' }}>
            We're preparing to serve you better.
          </p>
        </div>
 
        {/* SVG Illustration */}
        <svg width="100%" viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="260" cy="100" r="90" fill="#ddeaf7" opacity="0.55" />
 
          <line x1="0" y1="100" x2="138" y2="100" stroke="#5b8db8" strokeWidth="2.5" />
          <line x1="382" y1="100" x2="520" y2="100" stroke="#5b8db8" strokeWidth="2.5" />
 
          {/* Left plug */}
          <g className="plug-l">
            <rect x="105" y="68" width="80" height="64" rx="10" fill="#b8d6f0" stroke="#5b8db8" strokeWidth="2" />
            <rect x="133" y="56" width="10" height="14" rx="3" fill="#5b8db8" />
            <rect x="147" y="56" width="10" height="14" rx="3" fill="#5b8db8" />
            <rect x="183" y="82" width="16" height="10" rx="5" fill="#5b8db8" />
            <rect x="183" y="98" width="16" height="10" rx="5" fill="#5b8db8" />
            <rect x="113" y="80" width="62" height="32" rx="6" fill="#ddeaf7" stroke="#5b8db8" strokeWidth="1.5" />
            <circle cx="144" cy="96" r="8" fill="#5b8db8" opacity=".35" />
            <circle cx="144" cy="96" r="4" fill="#5b8db8" />
          </g>
 
          {/* Gap */}
          <line x1="235" y1="96" x2="255" y2="96" stroke="#9ab8d0" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="265" y1="100" x2="285" y2="100" stroke="#9ab8d0" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx="260" cy="100" r="7" fill="#ddeaf7" stroke="#5b8db8" strokeWidth="1.5" className="ring" />
 
          {/* Right plug */}
          <g className="plug-r">
            <rect x="335" y="68" width="80" height="64" rx="10" fill="#b8d6f0" stroke="#5b8db8" strokeWidth="2" />
            <rect x="321" y="82" width="16" height="10" rx="5" fill="#5b8db8" />
            <rect x="321" y="98" width="16" height="10" rx="5" fill="#5b8db8" />
            <rect x="345" y="80" width="62" height="32" rx="6" fill="#ddeaf7" stroke="#5b8db8" strokeWidth="1.5" />
            <circle cx="376" cy="96" r="8" fill="#5b8db8" opacity=".35" />
            <circle cx="376" cy="96" r="4" fill="#5b8db8" />
            <rect x="357" y="56" width="10" height="14" rx="3" fill="#5b8db8" />
            <rect x="371" y="56" width="10" height="14" rx="3" fill="#5b8db8" />
          </g>
        </svg>
 
        {/* Info section */}
        <div style={{ padding: '1.5rem 2rem 2rem', borderTop: '1px solid #e8f0f8' }}>
 
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.5rem' }}>
            {[
              { label: 'Status', value: 'Offline for updates', dot: true },
              { label: 'ETA', value: '~2 hours remaining' },
              { label: 'Support', value: 'aporajeo.app@gmail.com', blue: true },
              { label: 'Website', value: 'www.aporajeo.com', blue: true },
            ].map(({ label, value, dot, blue }) => (
              <div key={label} style={{ background: '#f4f8fd', borderRadius: '12px', padding: '14px 16px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: '#7fa3c0', margin: '0 0 4px' }}>
                  {label}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {dot && (
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#f59e0b', display: 'block', flexShrink: 0 }} />
                  )}
                  <p style={{ fontSize: '13px', fontWeight: 600, color: blue ? '#1a6fbf' : '#1e3a5f', margin: 0 }}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
 
          {/* Progress bar */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#7fa3c0', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                Update progress
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#1a6fbf' }}>65%</span>
            </div>
            <div style={{ height: '5px', background: '#ddeaf7', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '65%', background: '#1a6fbf', borderRadius: '999px' }} />
            </div>
          </div>
 
          <p style={{ fontSize: '12px', color: '#9ab8d0', textAlign: 'center', margin: 0, letterSpacing: '.05em', textTransform: 'uppercase' }}>
            © 2026 Aporajeo Platform Services
          </p>
        </div>
      </div>
    </div>
  );
};
 
export default Maintenance;
 
