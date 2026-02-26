'use client';

import type { BiodataFormData } from './templates';
import { defaultPreviewData } from './templates';

/* ─── helper ─── */
function v(data: BiodataFormData, key: keyof BiodataFormData): string {
  return data[key] || defaultPreviewData[key];
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Decorative SVG components shared across templates
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function OrnamentalDivider({ color = '#D4AF37', width = 180 }: { color?: string; width?: number }) {
  return (
    <svg width={width} height="16" viewBox={`0 0 ${width} 16`} fill="none" style={{ display: 'block', margin: '0 auto' }}>
      <line x1="0" y1="8" x2={width * 0.35} y2="8" stroke={color} strokeWidth="1" />
      <circle cx={width * 0.4} cy="8" r="2.5" fill={color} />
      <path d={`M${width * 0.44},8 L${width * 0.5},3 L${width * 0.56},8 L${width * 0.5},13 Z`} fill={color} />
      <circle cx={width * 0.6} cy="8" r="2.5" fill={color} />
      <line x1={width * 0.65} y1="8" x2={width} y2="8" stroke={color} strokeWidth="1" />
    </svg>
  );
}

function SectionDivider({ color }: { color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 0' }}>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${color})` }} />
      <div style={{ width: '5px', height: '5px', background: color, transform: 'rotate(45deg)' }} />
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${color})` }} />
    </div>
  );
}

function InfoRow({ label, value, labelColor, valueColor }: { label: string; value: string; labelColor: string; valueColor: string }) {
  return (
    <div style={{ display: 'flex', padding: '3px 0', borderBottom: '1px dotted #e5e5e5' }}>
      <span style={{ width: '40%', fontSize: '10px', fontWeight: 600, color: labelColor }}>{label}</span>
      <span style={{ width: '5%', fontSize: '10px', color: '#999' }}>:</span>
      <span style={{ width: '55%', fontSize: '10px', color: valueColor }}>{value}</span>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 1 — Royal Maroon (Traditional)
   Deep maroon + gold, ornamental borders, "ॐ" symbol, classic Indian biodata
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function RoyalMaroonTemplate({ data }: { data: BiodataFormData }) {
  const maroon = '#7B1F3A';
  const gold = '#D4AF37';
  const cream = '#FFF8F0';
  const darkText = '#3D1A1A';

  return (
    <div style={{
      width: '100%', height: '100%', background: cream, fontFamily: 'Inter, serif',
      display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
    }}>
      {/* Ornamental double border */}
      <div style={{
        position: 'absolute', inset: '6px',
        border: `2px solid ${gold}`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: '10px',
        border: `1px solid ${gold}`,
        pointerEvents: 'none',
      }} />

      {/* Corner decorations */}
      {[
        { top: '14px', left: '14px' },
        { top: '14px', right: '14px' },
        { bottom: '14px', left: '14px' },
        { bottom: '14px', right: '14px' },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', ...pos,
          width: '24px', height: '24px',
          borderTop: i < 2 ? `3px solid ${gold}` : 'none',
          borderBottom: i >= 2 ? `3px solid ${gold}` : 'none',
          borderLeft: i % 2 === 0 ? `3px solid ${gold}` : 'none',
          borderRight: i % 2 !== 0 ? `3px solid ${gold}` : 'none',
          pointerEvents: 'none',
        }} />
      ))}

      {/* Content area */}
      <div style={{ padding: '22px 28px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '6px' }}>
          <OrnamentalDivider color={gold} width={200} />
          <div style={{ fontSize: '18px', color: gold, margin: '4px 0 2px', letterSpacing: '2px' }}>ॐ</div>
          <div style={{ fontSize: '9px', color: maroon, fontWeight: 600, letterSpacing: '1px', marginBottom: '4px' }}>
            ॥ श्री गणेशाय नमः ॥
          </div>
          <div style={{
            fontSize: '16px', fontWeight: 800, color: maroon, letterSpacing: '4px', textTransform: 'uppercase',
          }}>
            BIODATA
          </div>
          <OrnamentalDivider color={gold} width={160} />
        </div>

        {/* Name section */}
        <div style={{
          textAlign: 'center', padding: '8px 16px', margin: '4px 0 8px',
          background: `linear-gradient(135deg, ${maroon}12, ${maroon}08)`,
          borderRadius: '6px', border: `1px solid ${gold}40`,
        }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: maroon, letterSpacing: '1px' }}>
            {v(data, 'name')}
          </div>
          <div style={{ fontSize: '10px', color: gold, fontWeight: 600, marginTop: '2px' }}>
            {v(data, 'profession')}
          </div>
        </div>

        {/* Body sections */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>

          {/* Personal Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '6px', height: '6px', background: gold, transform: 'rotate(45deg)' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: maroon, textTransform: 'uppercase', letterSpacing: '2px' }}>
                Personal Details
              </span>
              <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${gold}, transparent)` }} />
            </div>
            <div style={{ padding: '0 4px' }}>
              <InfoRow label="Date of Birth" value={v(data, 'dob')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Gender" value={v(data, 'gender')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Religion" value={v(data, 'religion')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Caste" value={v(data, 'caste')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Height" value={v(data, 'height')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Complexion" value={v(data, 'complexion')} labelColor={maroon} valueColor={darkText} />
            </div>
          </div>

          {/* Education */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '6px', height: '6px', background: gold, transform: 'rotate(45deg)' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: maroon, textTransform: 'uppercase', letterSpacing: '2px' }}>
                Education &amp; Career
              </span>
              <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${gold}, transparent)` }} />
            </div>
            <div style={{ padding: '0 4px' }}>
              <InfoRow label="Education" value={v(data, 'education')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Profession" value={v(data, 'profession')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Annual Income" value={v(data, 'income')} labelColor={maroon} valueColor={darkText} />
            </div>
          </div>

          {/* Family */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '6px', height: '6px', background: gold, transform: 'rotate(45deg)' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: maroon, textTransform: 'uppercase', letterSpacing: '2px' }}>
                Family Details
              </span>
              <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${gold}, transparent)` }} />
            </div>
            <div style={{ padding: '0 4px' }}>
              <InfoRow label="Father's Name" value={v(data, 'fatherName')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Mother's Name" value={v(data, 'motherName')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Siblings" value={v(data, 'siblings')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Address" value={v(data, 'address')} labelColor={maroon} valueColor={darkText} />
            </div>
          </div>

          {/* About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '6px', height: '6px', background: gold, transform: 'rotate(45deg)' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: maroon, textTransform: 'uppercase', letterSpacing: '2px' }}>
                About Me
              </span>
              <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${gold}, transparent)` }} />
            </div>
            <p style={{ fontSize: '9.5px', color: darkText, lineHeight: '1.5', padding: '0 4px', margin: 0 }}>
              {v(data, 'about')}
            </p>
          </div>

          {/* Partner Expectations */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '6px', height: '6px', background: gold, transform: 'rotate(45deg)' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: maroon, textTransform: 'uppercase', letterSpacing: '2px' }}>
                Partner Expectations
              </span>
              <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${gold}, transparent)` }} />
            </div>
            <p style={{ fontSize: '9.5px', color: darkText, lineHeight: '1.5', padding: '0 4px', margin: 0 }}>
              {v(data, 'partnerExpectations')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '8px', paddingTop: '6px' }}>
          <SectionDivider color={gold} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '4px' }}>
            {data.email && (
              <span style={{ fontSize: '8px', color: maroon }}>✉ {data.email}</span>
            )}
            {data.phone && (
              <span style={{ fontSize: '8px', color: maroon }}>✆ {data.phone}</span>
            )}
          </div>
          <OrnamentalDivider color={gold} width={120} />
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 2 — Blush Rose (Modern)
   Soft pink gradients, clean cards, left-accent sections, contemporary feel
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function BlushRoseTemplate({ data }: { data: BiodataFormData }) {
  const rose = '#DB2777';
  const roseLight = '#FDF2F8';
  const roseMid = '#FBCFE8';
  const dark = '#1F2937';

  const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{
      background: '#fff', borderRadius: '8px', padding: '8px 12px', marginBottom: '6px',
      borderLeft: `3px solid ${rose}`, boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }}>
      <div style={{ fontSize: '9px', fontWeight: 700, color: rose, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>
        {title}
      </div>
      {children}
    </div>
  );

  const Field = ({ label, value }: { label: string; value: string }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2.5px 0' }}>
      <span style={{ fontSize: '9.5px', color: '#6B7280', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: '9.5px', color: dark, fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{value}</span>
    </div>
  );

  return (
    <div style={{
      width: '100%', height: '100%', background: roseLight, fontFamily: 'Inter, sans-serif',
      display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: roseMid, opacity: 0.4 }} />
      <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: roseMid, opacity: 0.3 }} />

      {/* Header with gradient */}
      <div style={{
        background: `linear-gradient(135deg, ${rose}, #9333EA)`,
        padding: '20px 24px 16px', textAlign: 'center', position: 'relative',
      }}>
        {/* Subtle pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.1,
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }} />

        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.9)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
              Marriage Biodata
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '1px', marginBottom: '2px' }}>
            {v(data, 'name')}
          </div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
            {v(data, 'profession')}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 16px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>

        <SectionCard title="Personal Information">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <Field label="Date of Birth" value={v(data, 'dob')} />
            <Field label="Gender" value={v(data, 'gender')} />
            <Field label="Religion" value={v(data, 'religion')} />
            <Field label="Caste" value={v(data, 'caste')} />
            <Field label="Height" value={v(data, 'height')} />
            <Field label="Complexion" value={v(data, 'complexion')} />
          </div>
        </SectionCard>

        <SectionCard title="Education &amp; Career">
          <Field label="Education" value={v(data, 'education')} />
          <Field label="Profession" value={v(data, 'profession')} />
          <Field label="Annual Income" value={v(data, 'income')} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <Field label="Email" value={v(data, 'email')} />
            <Field label="Phone" value={v(data, 'phone')} />
          </div>
        </SectionCard>

        <SectionCard title="Family Details">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <Field label="Father" value={v(data, 'fatherName')} />
            <Field label="Mother" value={v(data, 'motherName')} />
          </div>
          <Field label="Siblings" value={v(data, 'siblings')} />
          <Field label="Address" value={v(data, 'address')} />
        </SectionCard>

        <SectionCard title="About Me">
          <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.55', margin: 0 }}>
            {v(data, 'about')}
          </p>
        </SectionCard>

        <SectionCard title="Partner Expectations">
          <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.55', margin: 0 }}>
            {v(data, 'partnerExpectations')}
          </p>
        </SectionCard>
      </div>

      {/* Footer */}
      <div style={{
        background: `linear-gradient(135deg, ${rose}, #9333EA)`,
        padding: '8px 24px', textAlign: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          {data.email && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.9)' }}>✉ {data.email}</span>}
          {data.phone && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.9)' }}>✆ {data.phone}</span>}
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 3 — Royal Navy (Premium)
   Deep navy + gold, regal header/footer, gold-bordered sections
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function RoyalNavyTemplate({ data }: { data: BiodataFormData }) {
  const navy = '#1E3A5F';
  const gold = '#C89B3C';
  const lightBg = '#F8F9FC';
  const dark = '#1A1A2E';

  const GoldInfoRow = ({ label, value }: { label: string; value: string }) => (
    <div style={{ display: 'flex', padding: '3px 0', borderBottom: '1px solid #E5E7EB' }}>
      <span style={{ width: '40%', fontSize: '9.5px', fontWeight: 600, color: navy }}>{label}</span>
      <span style={{ width: '5%', fontSize: '9.5px', color: gold }}>|</span>
      <span style={{ width: '55%', fontSize: '9.5px', color: dark }}>{value}</span>
    </div>
  );

  return (
    <div style={{
      width: '100%', height: '100%', background: '#FFFFFF', fontFamily: 'Inter, sans-serif',
      display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
    }}>

      {/* Navy header */}
      <div style={{
        background: `linear-gradient(135deg, ${navy}, #0F2744)`,
        padding: '16px 24px 14px', textAlign: 'center', position: 'relative',
      }}>
        {/* Decorative top gold line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />

        {/* Mandala-inspired decoration */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: '0 auto 4px', display: 'block' }}>
          <circle cx="24" cy="24" r="22" stroke={gold} strokeWidth="1" opacity="0.4" />
          <circle cx="24" cy="24" r="16" stroke={gold} strokeWidth="0.75" opacity="0.6" />
          <circle cx="24" cy="24" r="10" stroke={gold} strokeWidth="0.5" opacity="0.8" />
          <circle cx="24" cy="24" r="5" fill={gold} opacity="0.3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="24" y1="2" x2="24" y2="8"
              stroke={gold} strokeWidth="0.75" opacity="0.5"
              transform={`rotate(${angle} 24 24)`}
            />
          ))}
        </svg>

        <div style={{ fontSize: '8px', color: gold, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>
          ✦ Marriage Biodata ✦
        </div>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '1px', marginBottom: '2px' }}>
          {v(data, 'name')}
        </div>
        <div style={{ fontSize: '10px', color: gold, fontWeight: 500 }}>
          {v(data, 'profession')}
        </div>

        {/* Decorative bottom gold line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '10px 18px', display: 'flex', flexDirection: 'column', gap: '6px', background: lightBg }}>

        {/* Personal Info */}
        <div style={{
          background: '#fff', borderRadius: '6px', padding: '8px 12px',
          borderTop: `2px solid ${gold}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: navy, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '2px', background: gold }} />
            Personal Information
            <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <GoldInfoRow label="Date of Birth" value={v(data, 'dob')} />
            <GoldInfoRow label="Gender" value={v(data, 'gender')} />
            <GoldInfoRow label="Religion" value={v(data, 'religion')} />
            <GoldInfoRow label="Caste" value={v(data, 'caste')} />
            <GoldInfoRow label="Height" value={v(data, 'height')} />
            <GoldInfoRow label="Complexion" value={v(data, 'complexion')} />
          </div>
        </div>

        {/* Education */}
        <div style={{
          background: '#fff', borderRadius: '6px', padding: '8px 12px',
          borderTop: `2px solid ${gold}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: navy, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '2px', background: gold }} />
            Education &amp; Career
            <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          </div>
          <GoldInfoRow label="Education" value={v(data, 'education')} />
          <GoldInfoRow label="Profession" value={v(data, 'profession')} />
          <GoldInfoRow label="Annual Income" value={v(data, 'income')} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <GoldInfoRow label="Email" value={v(data, 'email')} />
            <GoldInfoRow label="Phone" value={v(data, 'phone')} />
          </div>
        </div>

        {/* Family */}
        <div style={{
          background: '#fff', borderRadius: '6px', padding: '8px 12px',
          borderTop: `2px solid ${gold}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: navy, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '2px', background: gold }} />
            Family Details
            <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <GoldInfoRow label="Father" value={v(data, 'fatherName')} />
            <GoldInfoRow label="Mother" value={v(data, 'motherName')} />
          </div>
          <GoldInfoRow label="Siblings" value={v(data, 'siblings')} />
          <GoldInfoRow label="Address" value={v(data, 'address')} />
        </div>

        {/* About + Expectations */}
        <div style={{
          background: '#fff', borderRadius: '6px', padding: '8px 12px',
          borderTop: `2px solid ${gold}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          <div style={{ marginBottom: '6px' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, color: navy, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '2px', background: gold }} />
              About Me
            </div>
            <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.5', margin: 0, paddingLeft: '22px' }}>
              {v(data, 'about')}
            </p>
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: navy, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '2px', background: gold }} />
              Partner Expectations
            </div>
            <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.5', margin: 0, paddingLeft: '22px' }}>
              {v(data, 'partnerExpectations')}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: `linear-gradient(135deg, ${navy}, #0F2744)`,
        padding: '8px 24px', textAlign: 'center', position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {data.email && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.85)' }}>✉ {data.email}</span>}
          {data.phone && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.85)' }}>✆ {data.phone}</span>}
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PUBLIC API
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Full-size template renderer — used inside the previewRef for PDF capture */
export function BiodataTemplate({ templateId, data }: { templateId: number; data: BiodataFormData }) {
  switch (templateId) {
    case 1: return <RoyalMaroonTemplate data={data} />;
    case 2: return <BlushRoseTemplate data={data} />;
    case 3: return <RoyalNavyTemplate data={data} />;
    default: return <BlushRoseTemplate data={data} />;
  }
}

/** Scaled-down preview for template selection pages (home, /templates, /create picker).
 *  Renders a 400×533 template scaled to fit the parent container using CSS container queries. */
export function TemplatePreview({ templateId, className }: { templateId: number; className?: string }) {
  return (
    <div
      className={className}
      style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', containerType: 'inline-size' }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '400px', height: '533px',
        transform: 'scale(calc(100cqw / 400))',
        transformOrigin: 'top left',
      }}>
        <BiodataTemplate templateId={templateId} data={defaultPreviewData} />
      </div>
    </div>
  );
}
