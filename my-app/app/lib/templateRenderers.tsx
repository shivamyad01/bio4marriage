'use client';

import type { BiodataFormData, Template } from './templates';
import { defaultPreviewData, getPreviewDataForReligion, getTemplateById } from './templates';

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

/* ─── Reusable section heading ─── */
function SectionHeading({ title, color, accentColor }: { title: string; color: string; accentColor: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
      <div style={{ width: '6px', height: '6px', background: accentColor, transform: 'rotate(45deg)' }} />
      <span style={{ fontSize: '10px', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '2px' }}>{title}</span>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${accentColor}, transparent)` }} />
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 1 — Royal Maroon (Hindu · Traditional)
   Deep maroon + gold, ornamental borders, "ॐ" symbol
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function RoyalMaroonTemplate({ data }: { data: BiodataFormData }) {
  const maroon = '#7B1F3A';
  const gold = '#D4AF37';
  const cream = '#FFF8F0';
  const darkText = '#3D1A1A';

  return (
    <div style={{ width: '100%', height: '100%', background: cream, fontFamily: 'Inter, serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Ornamental double border */}
      <div style={{ position: 'absolute', inset: '6px', border: `2px solid ${gold}`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '10px', border: `1px solid ${gold}`, pointerEvents: 'none' }} />

      {/* Corner decorations */}
      {[
        { top: '14px', left: '14px' },
        { top: '14px', right: '14px' },
        { bottom: '14px', left: '14px' },
        { bottom: '14px', right: '14px' },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', ...pos, width: '24px', height: '24px',
          borderTop: i < 2 ? `3px solid ${gold}` : 'none',
          borderBottom: i >= 2 ? `3px solid ${gold}` : 'none',
          borderLeft: i % 2 === 0 ? `3px solid ${gold}` : 'none',
          borderRight: i % 2 !== 0 ? `3px solid ${gold}` : 'none',
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ padding: '22px 28px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '6px' }}>
          <OrnamentalDivider color={gold} width={200} />
          <div style={{ fontSize: '18px', color: gold, margin: '4px 0 2px', letterSpacing: '2px' }}>ॐ</div>
          <div style={{ fontSize: '9px', color: maroon, fontWeight: 600, letterSpacing: '1px', marginBottom: '4px' }}>॥ श्री गणेशाय नमः ॥</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: maroon, letterSpacing: '4px', textTransform: 'uppercase' }}>BIODATA</div>
          <OrnamentalDivider color={gold} width={160} />
        </div>

        {/* Name */}
        <div style={{ textAlign: 'center', padding: '8px 16px', margin: '4px 0 8px', background: `linear-gradient(135deg, ${maroon}12, ${maroon}08)`, borderRadius: '6px', border: `1px solid ${gold}40` }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: maroon, letterSpacing: '1px' }}>{v(data, 'name')}</div>
          <div style={{ fontSize: '10px', color: gold, fontWeight: 600, marginTop: '2px' }}>{v(data, 'profession')}</div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div>
            <SectionHeading title="Personal Details" color={maroon} accentColor={gold} />
            <div style={{ padding: '0 4px' }}>
              <InfoRow label="Date of Birth" value={v(data, 'dob')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Gender" value={v(data, 'gender')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Religion" value={v(data, 'religion')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Caste" value={v(data, 'caste')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Height" value={v(data, 'height')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Complexion" value={v(data, 'complexion')} labelColor={maroon} valueColor={darkText} />
            </div>
          </div>

          <div>
            <SectionHeading title="Education & Career" color={maroon} accentColor={gold} />
            <div style={{ padding: '0 4px' }}>
              <InfoRow label="Education" value={v(data, 'education')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Profession" value={v(data, 'profession')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Annual Income" value={v(data, 'income')} labelColor={maroon} valueColor={darkText} />
            </div>
          </div>

          <div>
            <SectionHeading title="Family Details" color={maroon} accentColor={gold} />
            <div style={{ padding: '0 4px' }}>
              <InfoRow label="Father's Name" value={v(data, 'fatherName')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Mother's Name" value={v(data, 'motherName')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Siblings" value={v(data, 'siblings')} labelColor={maroon} valueColor={darkText} />
              <InfoRow label="Address" value={v(data, 'address')} labelColor={maroon} valueColor={darkText} />
            </div>
          </div>

          <div>
            <SectionHeading title="About Me" color={maroon} accentColor={gold} />
            <p style={{ fontSize: '9.5px', color: darkText, lineHeight: '1.5', padding: '0 4px', margin: 0 }}>{v(data, 'about')}</p>
          </div>

          <div>
            <SectionHeading title="Partner Expectations" color={maroon} accentColor={gold} />
            <p style={{ fontSize: '9.5px', color: darkText, lineHeight: '1.5', padding: '0 4px', margin: 0 }}>{v(data, 'partnerExpectations')}</p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '8px', paddingTop: '6px' }}>
          <SectionDivider color={gold} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '4px' }}>
            {data.email && <span style={{ fontSize: '8px', color: maroon }}>✉ {data.email}</span>}
            {data.phone && <span style={{ fontSize: '8px', color: maroon }}>✆ {data.phone}</span>}
          </div>
          <OrnamentalDivider color={gold} width={120} />
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 2 — Blush Rose (Hindu · Modern)
   Soft pink gradients, clean cards, left-accent sections
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function BlushRoseTemplate({ data }: { data: BiodataFormData }) {
  const rose = '#DB2777';
  const roseLight = '#FDF2F8';
  const roseMid = '#FBCFE8';
  const dark = '#1F2937';

  const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ background: '#fff', borderRadius: '8px', padding: '8px 12px', marginBottom: '6px', borderLeft: `3px solid ${rose}`, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: '9px', fontWeight: 700, color: rose, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>{title}</div>
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
    <div style={{ width: '100%', height: '100%', background: roseLight, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: roseMid, opacity: 0.4 }} />
      <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: roseMid, opacity: 0.3 }} />

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${rose}, #9333EA)`, padding: '20px 24px 16px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.9)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Marriage Biodata</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '1px', marginBottom: '2px' }}>{v(data, 'name')}</div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{v(data, 'profession')}</div>
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
          <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.55', margin: 0 }}>{v(data, 'about')}</p>
        </SectionCard>

        <SectionCard title="Partner Expectations">
          <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.55', margin: 0 }}>{v(data, 'partnerExpectations')}</p>
        </SectionCard>
      </div>

      {/* Footer */}
      <div style={{ background: `linear-gradient(135deg, ${rose}, #9333EA)`, padding: '8px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          {data.email && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.9)' }}>✉ {data.email}</span>}
          {data.phone && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.9)' }}>✆ {data.phone}</span>}
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 3 — Royal Navy (Hindu · Premium)
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
    <div style={{ width: '100%', height: '100%', background: '#FFFFFF', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${navy}, #0F2744)`, padding: '16px 24px 14px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: '0 auto 4px', display: 'block' }}>
          <circle cx="24" cy="24" r="22" stroke={gold} strokeWidth="1" opacity="0.4" />
          <circle cx="24" cy="24" r="16" stroke={gold} strokeWidth="0.75" opacity="0.6" />
          <circle cx="24" cy="24" r="10" stroke={gold} strokeWidth="0.5" opacity="0.8" />
          <circle cx="24" cy="24" r="5" fill={gold} opacity="0.3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line key={angle} x1="24" y1="2" x2="24" y2="8" stroke={gold} strokeWidth="0.75" opacity="0.5" transform={`rotate(${angle} 24 24)`} />
          ))}
        </svg>
        <div style={{ fontSize: '8px', color: gold, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>✦ Marriage Biodata ✦</div>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '1px', marginBottom: '2px' }}>{v(data, 'name')}</div>
        <div style={{ fontSize: '10px', color: gold, fontWeight: 500 }}>{v(data, 'profession')}</div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '10px 18px', display: 'flex', flexDirection: 'column', gap: '6px', background: lightBg }}>
        <div style={{ background: '#fff', borderRadius: '6px', padding: '8px 12px', borderTop: `2px solid ${gold}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: navy, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '2px', background: gold }} />Personal Information<div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
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

        <div style={{ background: '#fff', borderRadius: '6px', padding: '8px 12px', borderTop: `2px solid ${gold}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: navy, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '2px', background: gold }} />Education &amp; Career<div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          </div>
          <GoldInfoRow label="Education" value={v(data, 'education')} />
          <GoldInfoRow label="Profession" value={v(data, 'profession')} />
          <GoldInfoRow label="Annual Income" value={v(data, 'income')} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <GoldInfoRow label="Email" value={v(data, 'email')} />
            <GoldInfoRow label="Phone" value={v(data, 'phone')} />
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '6px', padding: '8px 12px', borderTop: `2px solid ${gold}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: navy, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '2px', background: gold }} />Family Details<div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <GoldInfoRow label="Father" value={v(data, 'fatherName')} />
            <GoldInfoRow label="Mother" value={v(data, 'motherName')} />
          </div>
          <GoldInfoRow label="Siblings" value={v(data, 'siblings')} />
          <GoldInfoRow label="Address" value={v(data, 'address')} />
        </div>

        <div style={{ background: '#fff', borderRadius: '6px', padding: '8px 12px', borderTop: `2px solid ${gold}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ marginBottom: '6px' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, color: navy, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '2px', background: gold }} />About Me
            </div>
            <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.5', margin: 0, paddingLeft: '22px' }}>{v(data, 'about')}</p>
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: navy, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '2px', background: gold }} />Partner Expectations
            </div>
            <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.5', margin: 0, paddingLeft: '22px' }}>{v(data, 'partnerExpectations')}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: `linear-gradient(135deg, ${navy}, #0F2744)`, padding: '8px 24px', textAlign: 'center', position: 'relative' }}>
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
   TEMPLATE 4 — Emerald Crescent (Muslim · Traditional)
   Emerald green + gold, crescent moon motif, بِسْمِ ٱللَّٰهِ header
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function EmeraldCrescentTemplate({ data }: { data: BiodataFormData }) {
  const emerald = '#065F46';
  const gold = '#D4AF37';
  const bg = '#ECFDF5';
  const darkText = '#1A3A2A';

  return (
    <div style={{ width: '100%', height: '100%', background: bg, fontFamily: 'Inter, serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Double border */}
      <div style={{ position: 'absolute', inset: '6px', border: `2px solid ${emerald}`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '10px', border: `1px solid ${gold}`, pointerEvents: 'none' }} />

      {/* Corner decorations */}
      {[
        { top: '14px', left: '14px' },
        { top: '14px', right: '14px' },
        { bottom: '14px', left: '14px' },
        { bottom: '14px', right: '14px' },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', ...pos, width: '24px', height: '24px',
          borderTop: i < 2 ? `3px solid ${gold}` : 'none',
          borderBottom: i >= 2 ? `3px solid ${gold}` : 'none',
          borderLeft: i % 2 === 0 ? `3px solid ${gold}` : 'none',
          borderRight: i % 2 !== 0 ? `3px solid ${gold}` : 'none',
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ padding: '22px 28px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '6px' }}>
          <OrnamentalDivider color={gold} width={200} />
          {/* Crescent and star */}
          <div style={{ fontSize: '20px', color: emerald, margin: '4px 0 2px' }}>☪</div>
          <div style={{ fontSize: '11px', color: emerald, fontWeight: 600, letterSpacing: '1px', marginBottom: '2px', direction: 'rtl' }}>
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: emerald, letterSpacing: '4px', textTransform: 'uppercase' }}>
            BIODATA
          </div>
          <OrnamentalDivider color={gold} width={160} />
        </div>

        {/* Name */}
        <div style={{ textAlign: 'center', padding: '8px 16px', margin: '4px 0 8px', background: `linear-gradient(135deg, ${emerald}12, ${emerald}08)`, borderRadius: '6px', border: `1px solid ${gold}40` }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: emerald, letterSpacing: '1px' }}>{v(data, 'name')}</div>
          <div style={{ fontSize: '10px', color: gold, fontWeight: 600, marginTop: '2px' }}>{v(data, 'profession')}</div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div>
            <SectionHeading title="Personal Details" color={emerald} accentColor={gold} />
            <div style={{ padding: '0 4px' }}>
              <InfoRow label="Date of Birth" value={v(data, 'dob')} labelColor={emerald} valueColor={darkText} />
              <InfoRow label="Gender" value={v(data, 'gender')} labelColor={emerald} valueColor={darkText} />
              <InfoRow label="Religion" value={v(data, 'religion')} labelColor={emerald} valueColor={darkText} />
              <InfoRow label="Caste / Community" value={v(data, 'caste')} labelColor={emerald} valueColor={darkText} />
              <InfoRow label="Height" value={v(data, 'height')} labelColor={emerald} valueColor={darkText} />
              <InfoRow label="Complexion" value={v(data, 'complexion')} labelColor={emerald} valueColor={darkText} />
            </div>
          </div>

          <div>
            <SectionHeading title="Education & Career" color={emerald} accentColor={gold} />
            <div style={{ padding: '0 4px' }}>
              <InfoRow label="Education" value={v(data, 'education')} labelColor={emerald} valueColor={darkText} />
              <InfoRow label="Profession" value={v(data, 'profession')} labelColor={emerald} valueColor={darkText} />
              <InfoRow label="Annual Income" value={v(data, 'income')} labelColor={emerald} valueColor={darkText} />
            </div>
          </div>

          <div>
            <SectionHeading title="Family Details" color={emerald} accentColor={gold} />
            <div style={{ padding: '0 4px' }}>
              <InfoRow label="Father's Name" value={v(data, 'fatherName')} labelColor={emerald} valueColor={darkText} />
              <InfoRow label="Mother's Name" value={v(data, 'motherName')} labelColor={emerald} valueColor={darkText} />
              <InfoRow label="Siblings" value={v(data, 'siblings')} labelColor={emerald} valueColor={darkText} />
              <InfoRow label="Address" value={v(data, 'address')} labelColor={emerald} valueColor={darkText} />
            </div>
          </div>

          <div>
            <SectionHeading title="About Me" color={emerald} accentColor={gold} />
            <p style={{ fontSize: '9.5px', color: darkText, lineHeight: '1.5', padding: '0 4px', margin: 0 }}>{v(data, 'about')}</p>
          </div>

          <div>
            <SectionHeading title="Partner Expectations" color={emerald} accentColor={gold} />
            <p style={{ fontSize: '9.5px', color: darkText, lineHeight: '1.5', padding: '0 4px', margin: 0 }}>{v(data, 'partnerExpectations')}</p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '8px', paddingTop: '6px' }}>
          <SectionDivider color={gold} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '4px' }}>
            {data.email && <span style={{ fontSize: '8px', color: emerald }}>✉ {data.email}</span>}
            {data.phone && <span style={{ fontSize: '8px', color: emerald }}>✆ {data.phone}</span>}
          </div>
          <OrnamentalDivider color={gold} width={120} />
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 5 — Royal Mughal (Muslim · Premium)
   Deep blue + gold, geometric star header, premium card sections
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function RoyalMughalTemplate({ data }: { data: BiodataFormData }) {
  const blue = '#1E3A6F';
  const gold = '#C5A03F';
  const lightBg = '#F0F4FF';
  const dark = '#1A1A2E';

  const GoldInfoRow = ({ label, value }: { label: string; value: string }) => (
    <div style={{ display: 'flex', padding: '3px 0', borderBottom: '1px solid #E5E7EB' }}>
      <span style={{ width: '40%', fontSize: '9.5px', fontWeight: 600, color: blue }}>{label}</span>
      <span style={{ width: '5%', fontSize: '9.5px', color: gold }}>|</span>
      <span style={{ width: '55%', fontSize: '9.5px', color: dark }}>{value}</span>
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100%', background: '#FFFFFF', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${blue}, #0F1F44)`, padding: '16px 24px 14px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        {/* Geometric star pattern */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: '0 auto 4px', display: 'block' }}>
          <circle cx="24" cy="24" r="22" stroke={gold} strokeWidth="1" opacity="0.4" />
          <polygon points="24,4 28,18 42,18 30,26 34,40 24,32 14,40 18,26 6,18 20,18" fill="none" stroke={gold} strokeWidth="0.75" opacity="0.6" />
          <circle cx="24" cy="24" r="8" fill="none" stroke={gold} strokeWidth="0.5" opacity="0.8" />
          <text x="24" y="28" textAnchor="middle" fill={gold} fontSize="10" opacity="0.9">☪</text>
        </svg>
        <div style={{ fontSize: '10px', color: gold, letterSpacing: '2px', marginBottom: '4px', fontWeight: 600, direction: 'rtl' }}>ما شاء الله</div>
        <div style={{ fontSize: '8px', color: gold, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>✦ Nikkah Biodata ✦</div>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '1px', marginBottom: '2px' }}>{v(data, 'name')}</div>
        <div style={{ fontSize: '10px', color: gold, fontWeight: 500 }}>{v(data, 'profession')}</div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '10px 18px', display: 'flex', flexDirection: 'column', gap: '6px', background: lightBg }}>
        <div style={{ background: '#fff', borderRadius: '6px', padding: '8px 12px', borderTop: `2px solid ${gold}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '2px', background: gold }} />Personal Information<div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <GoldInfoRow label="Date of Birth" value={v(data, 'dob')} />
            <GoldInfoRow label="Gender" value={v(data, 'gender')} />
            <GoldInfoRow label="Religion" value={v(data, 'religion')} />
            <GoldInfoRow label="Community" value={v(data, 'caste')} />
            <GoldInfoRow label="Height" value={v(data, 'height')} />
            <GoldInfoRow label="Complexion" value={v(data, 'complexion')} />
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '6px', padding: '8px 12px', borderTop: `2px solid ${gold}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '2px', background: gold }} />Education &amp; Career<div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          </div>
          <GoldInfoRow label="Education" value={v(data, 'education')} />
          <GoldInfoRow label="Profession" value={v(data, 'profession')} />
          <GoldInfoRow label="Annual Income" value={v(data, 'income')} />
        </div>

        <div style={{ background: '#fff', borderRadius: '6px', padding: '8px 12px', borderTop: `2px solid ${gold}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '2px', background: gold }} />Family Details<div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <GoldInfoRow label="Father" value={v(data, 'fatherName')} />
            <GoldInfoRow label="Mother" value={v(data, 'motherName')} />
          </div>
          <GoldInfoRow label="Siblings" value={v(data, 'siblings')} />
          <GoldInfoRow label="Address" value={v(data, 'address')} />
        </div>

        <div style={{ background: '#fff', borderRadius: '6px', padding: '8px 12px', borderTop: `2px solid ${gold}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ marginBottom: '6px' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '2px', background: gold }} />About Me
            </div>
            <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.5', margin: 0, paddingLeft: '22px' }}>{v(data, 'about')}</p>
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '2px', background: gold }} />Partner Expectations
            </div>
            <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.5', margin: 0, paddingLeft: '22px' }}>{v(data, 'partnerExpectations')}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: `linear-gradient(135deg, ${blue}, #0F1F44)`, padding: '8px 24px', textAlign: 'center', position: 'relative' }}>
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
   TEMPLATE 6 — Ivory Nikkah (Muslim · Modern)
   Green gradient header, ivory background, card-based layout
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function IvoryNikkahTemplate({ data }: { data: BiodataFormData }) {
  const green = '#047857';
  const ivory = '#FFFBF0';
  const dark = '#1F2937';

  const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ background: '#fff', borderRadius: '8px', padding: '8px 12px', marginBottom: '6px', borderLeft: `3px solid ${green}`, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: '9px', fontWeight: 700, color: green, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>{title}</div>
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
    <div style={{ width: '100%', height: '100%', background: ivory, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: '#D1FAE5', opacity: 0.4 }} />
      <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: '#D1FAE5', opacity: 0.3 }} />

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${green}, #065F46)`, padding: '20px 24px 16px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: `radial-gradient(circle at 30% 40%, white 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.95)', marginBottom: '4px' }}>☪</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.9)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>Nikkah Biodata</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '1px', marginBottom: '2px' }}>{v(data, 'name')}</div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{v(data, 'profession')}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 16px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <SectionCard title="Personal Information">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <Field label="Date of Birth" value={v(data, 'dob')} />
            <Field label="Gender" value={v(data, 'gender')} />
            <Field label="Religion" value={v(data, 'religion')} />
            <Field label="Community" value={v(data, 'caste')} />
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
          <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.55', margin: 0 }}>{v(data, 'about')}</p>
        </SectionCard>

        <SectionCard title="Partner Expectations">
          <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.55', margin: 0 }}>{v(data, 'partnerExpectations')}</p>
        </SectionCard>
      </div>

      {/* Footer */}
      <div style={{ background: `linear-gradient(135deg, ${green}, #065F46)`, padding: '8px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          {data.email && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.9)' }}>✉ {data.email}</span>}
          {data.phone && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.9)' }}>✆ {data.phone}</span>}
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 7 — Holy Grace (Christian · Traditional)
   Royal blue + gold, cross motif, "By God's Grace" header
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HolyGraceTemplate({ data }: { data: BiodataFormData }) {
  const blue = '#1E40AF';
  const gold = '#D4AF37';
  const bg = '#EFF6FF';
  const darkText = '#1E293B';

  return (
    <div style={{ width: '100%', height: '100%', background: bg, fontFamily: 'Inter, serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Double border */}
      <div style={{ position: 'absolute', inset: '6px', border: `2px solid ${blue}`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '10px', border: `1px solid ${gold}`, pointerEvents: 'none' }} />

      {/* Corner decorations */}
      {[
        { top: '14px', left: '14px' },
        { top: '14px', right: '14px' },
        { bottom: '14px', left: '14px' },
        { bottom: '14px', right: '14px' },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', ...pos, width: '24px', height: '24px',
          borderTop: i < 2 ? `3px solid ${gold}` : 'none',
          borderBottom: i >= 2 ? `3px solid ${gold}` : 'none',
          borderLeft: i % 2 === 0 ? `3px solid ${gold}` : 'none',
          borderRight: i % 2 !== 0 ? `3px solid ${gold}` : 'none',
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ padding: '22px 28px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '6px' }}>
          <OrnamentalDivider color={gold} width={200} />
          <div style={{ fontSize: '22px', color: blue, margin: '4px 0 2px' }}>✝</div>
          <div style={{ fontSize: '9px', color: blue, fontWeight: 600, letterSpacing: '1px', marginBottom: '4px' }}>
            ✦ By God&apos;s Grace ✦
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: blue, letterSpacing: '4px', textTransform: 'uppercase' }}>
            MARRIAGE BIODATA
          </div>
          <OrnamentalDivider color={gold} width={160} />
        </div>

        {/* Name */}
        <div style={{ textAlign: 'center', padding: '8px 16px', margin: '4px 0 8px', background: `linear-gradient(135deg, ${blue}12, ${blue}08)`, borderRadius: '6px', border: `1px solid ${gold}40` }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: blue, letterSpacing: '1px' }}>{v(data, 'name')}</div>
          <div style={{ fontSize: '10px', color: gold, fontWeight: 600, marginTop: '2px' }}>{v(data, 'profession')}</div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div>
            <SectionHeading title="Personal Details" color={blue} accentColor={gold} />
            <div style={{ padding: '0 4px' }}>
              <InfoRow label="Date of Birth" value={v(data, 'dob')} labelColor={blue} valueColor={darkText} />
              <InfoRow label="Gender" value={v(data, 'gender')} labelColor={blue} valueColor={darkText} />
              <InfoRow label="Religion" value={v(data, 'religion')} labelColor={blue} valueColor={darkText} />
              <InfoRow label="Denomination" value={v(data, 'caste')} labelColor={blue} valueColor={darkText} />
              <InfoRow label="Height" value={v(data, 'height')} labelColor={blue} valueColor={darkText} />
              <InfoRow label="Complexion" value={v(data, 'complexion')} labelColor={blue} valueColor={darkText} />
            </div>
          </div>

          <div>
            <SectionHeading title="Education & Career" color={blue} accentColor={gold} />
            <div style={{ padding: '0 4px' }}>
              <InfoRow label="Education" value={v(data, 'education')} labelColor={blue} valueColor={darkText} />
              <InfoRow label="Profession" value={v(data, 'profession')} labelColor={blue} valueColor={darkText} />
              <InfoRow label="Annual Income" value={v(data, 'income')} labelColor={blue} valueColor={darkText} />
            </div>
          </div>

          <div>
            <SectionHeading title="Family Details" color={blue} accentColor={gold} />
            <div style={{ padding: '0 4px' }}>
              <InfoRow label="Father's Name" value={v(data, 'fatherName')} labelColor={blue} valueColor={darkText} />
              <InfoRow label="Mother's Name" value={v(data, 'motherName')} labelColor={blue} valueColor={darkText} />
              <InfoRow label="Siblings" value={v(data, 'siblings')} labelColor={blue} valueColor={darkText} />
              <InfoRow label="Address" value={v(data, 'address')} labelColor={blue} valueColor={darkText} />
            </div>
          </div>

          <div>
            <SectionHeading title="About Me" color={blue} accentColor={gold} />
            <p style={{ fontSize: '9.5px', color: darkText, lineHeight: '1.5', padding: '0 4px', margin: 0 }}>{v(data, 'about')}</p>
          </div>

          <div>
            <SectionHeading title="Partner Expectations" color={blue} accentColor={gold} />
            <p style={{ fontSize: '9.5px', color: darkText, lineHeight: '1.5', padding: '0 4px', margin: 0 }}>{v(data, 'partnerExpectations')}</p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '8px', paddingTop: '6px' }}>
          <SectionDivider color={gold} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '4px' }}>
            {data.email && <span style={{ fontSize: '8px', color: blue }}>✉ {data.email}</span>}
            {data.phone && <span style={{ fontSize: '8px', color: blue }}>✆ {data.phone}</span>}
          </div>
          <OrnamentalDivider color={gold} width={120} />
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 8 — Chapel Rose (Christian · Modern)
   Soft rose + white, cross accent, card-based modern layout
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ChapelRoseTemplate({ data }: { data: BiodataFormData }) {
  const rose = '#9F1239';
  const bg = '#FFF1F2';
  const dark = '#1F2937';

  const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ background: '#fff', borderRadius: '8px', padding: '8px 12px', marginBottom: '6px', borderLeft: `3px solid ${rose}`, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: '9px', fontWeight: 700, color: rose, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>{title}</div>
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
    <div style={{ width: '100%', height: '100%', background: bg, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: '#FECDD3', opacity: 0.4 }} />
      <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: '#FECDD3', opacity: 0.3 }} />

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${rose}, #7C3AED)`, padding: '20px 24px 16px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.95)', marginBottom: '2px' }}>✝</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.9)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>Marriage Biodata</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '1px', marginBottom: '2px' }}>{v(data, 'name')}</div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{v(data, 'profession')}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 16px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <SectionCard title="Personal Information">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <Field label="Date of Birth" value={v(data, 'dob')} />
            <Field label="Gender" value={v(data, 'gender')} />
            <Field label="Religion" value={v(data, 'religion')} />
            <Field label="Denomination" value={v(data, 'caste')} />
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
          <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.55', margin: 0 }}>{v(data, 'about')}</p>
        </SectionCard>

        <SectionCard title="Partner Expectations">
          <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.55', margin: 0 }}>{v(data, 'partnerExpectations')}</p>
        </SectionCard>
      </div>

      {/* Footer */}
      <div style={{ background: `linear-gradient(135deg, ${rose}, #7C3AED)`, padding: '8px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          {data.email && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.9)' }}>✉ {data.email}</span>}
          {data.phone && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.9)' }}>✆ {data.phone}</span>}
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 9 — Blessed Cross (Christian · Premium)
   Deep purple + gold, ornate cross, premium card layout
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function BlessedCrossTemplate({ data }: { data: BiodataFormData }) {
  const purple = '#5B21B6';
  const gold = '#D4AF37';
  const lightBg = '#F5F3FF';
  const dark = '#1A1A2E';

  const GoldInfoRow = ({ label, value }: { label: string; value: string }) => (
    <div style={{ display: 'flex', padding: '3px 0', borderBottom: '1px solid #E5E7EB' }}>
      <span style={{ width: '40%', fontSize: '9.5px', fontWeight: 600, color: purple }}>{label}</span>
      <span style={{ width: '5%', fontSize: '9.5px', color: gold }}>|</span>
      <span style={{ width: '55%', fontSize: '9.5px', color: dark }}>{value}</span>
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100%', background: '#FFFFFF', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${purple}, #3B0764)`, padding: '16px 24px 14px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        {/* Cross decoration */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: '0 auto 4px', display: 'block' }}>
          <circle cx="24" cy="24" r="22" stroke={gold} strokeWidth="1" opacity="0.4" />
          <line x1="24" y1="8" x2="24" y2="40" stroke={gold} strokeWidth="2" opacity="0.6" />
          <line x1="14" y1="18" x2="34" y2="18" stroke={gold} strokeWidth="2" opacity="0.6" />
          <circle cx="24" cy="24" r="6" fill="none" stroke={gold} strokeWidth="0.75" opacity="0.5" />
        </svg>
        <div style={{ fontSize: '8px', color: gold, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>✦ God Bless This Union ✦</div>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '1px', marginBottom: '2px' }}>{v(data, 'name')}</div>
        <div style={{ fontSize: '10px', color: gold, fontWeight: 500 }}>{v(data, 'profession')}</div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '10px 18px', display: 'flex', flexDirection: 'column', gap: '6px', background: lightBg }}>
        <div style={{ background: '#fff', borderRadius: '6px', padding: '8px 12px', borderTop: `2px solid ${gold}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: purple, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '2px', background: gold }} />Personal Information<div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <GoldInfoRow label="Date of Birth" value={v(data, 'dob')} />
            <GoldInfoRow label="Gender" value={v(data, 'gender')} />
            <GoldInfoRow label="Religion" value={v(data, 'religion')} />
            <GoldInfoRow label="Denomination" value={v(data, 'caste')} />
            <GoldInfoRow label="Height" value={v(data, 'height')} />
            <GoldInfoRow label="Complexion" value={v(data, 'complexion')} />
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '6px', padding: '8px 12px', borderTop: `2px solid ${gold}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: purple, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '2px', background: gold }} />Education &amp; Career<div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          </div>
          <GoldInfoRow label="Education" value={v(data, 'education')} />
          <GoldInfoRow label="Profession" value={v(data, 'profession')} />
          <GoldInfoRow label="Annual Income" value={v(data, 'income')} />
        </div>

        <div style={{ background: '#fff', borderRadius: '6px', padding: '8px 12px', borderTop: `2px solid ${gold}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: purple, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '2px', background: gold }} />Family Details<div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <GoldInfoRow label="Father" value={v(data, 'fatherName')} />
            <GoldInfoRow label="Mother" value={v(data, 'motherName')} />
          </div>
          <GoldInfoRow label="Siblings" value={v(data, 'siblings')} />
          <GoldInfoRow label="Address" value={v(data, 'address')} />
        </div>

        <div style={{ background: '#fff', borderRadius: '6px', padding: '8px 12px', borderTop: `2px solid ${gold}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ marginBottom: '6px' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, color: purple, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '2px', background: gold }} />About Me
            </div>
            <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.5', margin: 0, paddingLeft: '22px' }}>{v(data, 'about')}</p>
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: purple, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '2px', background: gold }} />Partner Expectations
            </div>
            <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.5', margin: 0, paddingLeft: '22px' }}>{v(data, 'partnerExpectations')}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: `linear-gradient(135deg, ${purple}, #3B0764)`, padding: '8px 24px', textAlign: 'center', position: 'relative' }}>
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
   TEMPLATE 10 — Khalsa Gold (Sikh · Traditional)
   Navy + gold, Ik Onkar symbol, ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ header
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function KhalsaGoldTemplate({ data }: { data: BiodataFormData }) {
  const navy = '#1E3A5F';
  const gold = '#D4A017';
  const bg = '#FFF8E1';
  const darkText = '#1A2A3A';

  return (
    <div style={{ width: '100%', height: '100%', background: bg, fontFamily: 'Inter, serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Double border */}
      <div style={{ position: 'absolute', inset: '6px', border: `2px solid ${navy}`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '10px', border: `1px solid ${gold}`, pointerEvents: 'none' }} />

      {/* Corner decorations */}
      {[
        { top: '14px', left: '14px' },
        { top: '14px', right: '14px' },
        { bottom: '14px', left: '14px' },
        { bottom: '14px', right: '14px' },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', ...pos, width: '24px', height: '24px',
          borderTop: i < 2 ? `3px solid ${gold}` : 'none',
          borderBottom: i >= 2 ? `3px solid ${gold}` : 'none',
          borderLeft: i % 2 === 0 ? `3px solid ${gold}` : 'none',
          borderRight: i % 2 !== 0 ? `3px solid ${gold}` : 'none',
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ padding: '22px 28px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '6px' }}>
          <OrnamentalDivider color={gold} width={200} />
          <div style={{ fontSize: '22px', color: gold, margin: '4px 0 2px', fontWeight: 700 }}>ੴ</div>
          <div style={{ fontSize: '9px', color: navy, fontWeight: 600, letterSpacing: '1px', marginBottom: '4px' }}>
            ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: navy, letterSpacing: '4px', textTransform: 'uppercase' }}>
            BIODATA
          </div>
          <OrnamentalDivider color={gold} width={160} />
        </div>

        {/* Name */}
        <div style={{ textAlign: 'center', padding: '8px 16px', margin: '4px 0 8px', background: `linear-gradient(135deg, ${navy}12, ${navy}08)`, borderRadius: '6px', border: `1px solid ${gold}40` }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: navy, letterSpacing: '1px' }}>{v(data, 'name')}</div>
          <div style={{ fontSize: '10px', color: gold, fontWeight: 600, marginTop: '2px' }}>{v(data, 'profession')}</div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div>
            <SectionHeading title="Personal Details" color={navy} accentColor={gold} />
            <div style={{ padding: '0 4px' }}>
              <InfoRow label="Date of Birth" value={v(data, 'dob')} labelColor={navy} valueColor={darkText} />
              <InfoRow label="Gender" value={v(data, 'gender')} labelColor={navy} valueColor={darkText} />
              <InfoRow label="Religion" value={v(data, 'religion')} labelColor={navy} valueColor={darkText} />
              <InfoRow label="Caste" value={v(data, 'caste')} labelColor={navy} valueColor={darkText} />
              <InfoRow label="Height" value={v(data, 'height')} labelColor={navy} valueColor={darkText} />
              <InfoRow label="Complexion" value={v(data, 'complexion')} labelColor={navy} valueColor={darkText} />
            </div>
          </div>

          <div>
            <SectionHeading title="Education & Career" color={navy} accentColor={gold} />
            <div style={{ padding: '0 4px' }}>
              <InfoRow label="Education" value={v(data, 'education')} labelColor={navy} valueColor={darkText} />
              <InfoRow label="Profession" value={v(data, 'profession')} labelColor={navy} valueColor={darkText} />
              <InfoRow label="Annual Income" value={v(data, 'income')} labelColor={navy} valueColor={darkText} />
            </div>
          </div>

          <div>
            <SectionHeading title="Family Details" color={navy} accentColor={gold} />
            <div style={{ padding: '0 4px' }}>
              <InfoRow label="Father's Name" value={v(data, 'fatherName')} labelColor={navy} valueColor={darkText} />
              <InfoRow label="Mother's Name" value={v(data, 'motherName')} labelColor={navy} valueColor={darkText} />
              <InfoRow label="Siblings" value={v(data, 'siblings')} labelColor={navy} valueColor={darkText} />
              <InfoRow label="Address" value={v(data, 'address')} labelColor={navy} valueColor={darkText} />
            </div>
          </div>

          <div>
            <SectionHeading title="About Me" color={navy} accentColor={gold} />
            <p style={{ fontSize: '9.5px', color: darkText, lineHeight: '1.5', padding: '0 4px', margin: 0 }}>{v(data, 'about')}</p>
          </div>

          <div>
            <SectionHeading title="Partner Expectations" color={navy} accentColor={gold} />
            <p style={{ fontSize: '9.5px', color: darkText, lineHeight: '1.5', padding: '0 4px', margin: 0 }}>{v(data, 'partnerExpectations')}</p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '8px', paddingTop: '6px' }}>
          <SectionDivider color={gold} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '4px' }}>
            {data.email && <span style={{ fontSize: '8px', color: navy }}>✉ {data.email}</span>}
            {data.phone && <span style={{ fontSize: '8px', color: navy }}>✆ {data.phone}</span>}
          </div>
          <OrnamentalDivider color={gold} width={120} />
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 11 — Royal Punjab (Sikh · Premium)
   Royal blue + saffron, Waheguru header, premium card sections
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function RoyalPunjabTemplate({ data }: { data: BiodataFormData }) {
  const blue = '#1E3A8A';
  const saffron = '#F59E0B';
  const lightBg = '#EFF6FF';
  const dark = '#1A1A2E';

  const SaffronInfoRow = ({ label, value }: { label: string; value: string }) => (
    <div style={{ display: 'flex', padding: '3px 0', borderBottom: '1px solid #E5E7EB' }}>
      <span style={{ width: '40%', fontSize: '9.5px', fontWeight: 600, color: blue }}>{label}</span>
      <span style={{ width: '5%', fontSize: '9.5px', color: saffron }}>|</span>
      <span style={{ width: '55%', fontSize: '9.5px', color: dark }}>{value}</span>
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100%', background: '#FFFFFF', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${blue}, #1E1B4B)`, padding: '16px 24px 14px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${saffron}, transparent)` }} />
        {/* Khanda-inspired decoration */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: '0 auto 4px', display: 'block' }}>
          <circle cx="24" cy="24" r="22" stroke={saffron} strokeWidth="1" opacity="0.4" />
          <circle cx="24" cy="24" r="16" stroke={saffron} strokeWidth="0.75" opacity="0.5" />
          <line x1="24" y1="6" x2="24" y2="42" stroke={saffron} strokeWidth="1.5" opacity="0.7" />
          <line x1="12" y1="20" x2="36" y2="20" stroke={saffron} strokeWidth="1" opacity="0.5" />
          <circle cx="24" cy="24" r="5" fill={saffron} opacity="0.3" />
        </svg>
        <div style={{ fontSize: '10px', color: saffron, letterSpacing: '2px', marginBottom: '2px', fontWeight: 600 }}>ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ</div>
        <div style={{ fontSize: '8px', color: saffron, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>✦ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਿਹ ✦</div>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '1px', marginBottom: '2px' }}>{v(data, 'name')}</div>
        <div style={{ fontSize: '10px', color: saffron, fontWeight: 500 }}>{v(data, 'profession')}</div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${saffron}, transparent)` }} />
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '10px 18px', display: 'flex', flexDirection: 'column', gap: '6px', background: lightBg }}>
        <div style={{ background: '#fff', borderRadius: '6px', padding: '8px 12px', borderTop: `2px solid ${saffron}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '2px', background: saffron }} />Personal Information<div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <SaffronInfoRow label="Date of Birth" value={v(data, 'dob')} />
            <SaffronInfoRow label="Gender" value={v(data, 'gender')} />
            <SaffronInfoRow label="Religion" value={v(data, 'religion')} />
            <SaffronInfoRow label="Caste" value={v(data, 'caste')} />
            <SaffronInfoRow label="Height" value={v(data, 'height')} />
            <SaffronInfoRow label="Complexion" value={v(data, 'complexion')} />
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '6px', padding: '8px 12px', borderTop: `2px solid ${saffron}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '2px', background: saffron }} />Education &amp; Career<div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          </div>
          <SaffronInfoRow label="Education" value={v(data, 'education')} />
          <SaffronInfoRow label="Profession" value={v(data, 'profession')} />
          <SaffronInfoRow label="Annual Income" value={v(data, 'income')} />
        </div>

        <div style={{ background: '#fff', borderRadius: '6px', padding: '8px 12px', borderTop: `2px solid ${saffron}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '2px', background: saffron }} />Family Details<div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <SaffronInfoRow label="Father" value={v(data, 'fatherName')} />
            <SaffronInfoRow label="Mother" value={v(data, 'motherName')} />
          </div>
          <SaffronInfoRow label="Siblings" value={v(data, 'siblings')} />
          <SaffronInfoRow label="Address" value={v(data, 'address')} />
        </div>

        <div style={{ background: '#fff', borderRadius: '6px', padding: '8px 12px', borderTop: `2px solid ${saffron}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ marginBottom: '6px' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '2px', background: saffron }} />About Me
            </div>
            <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.5', margin: 0, paddingLeft: '22px' }}>{v(data, 'about')}</p>
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '2px', background: saffron }} />Partner Expectations
            </div>
            <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.5', margin: 0, paddingLeft: '22px' }}>{v(data, 'partnerExpectations')}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: `linear-gradient(135deg, ${blue}, #1E1B4B)`, padding: '8px 24px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${saffron}, transparent)` }} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {data.email && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.85)' }}>✉ {data.email}</span>}
          {data.phone && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.85)' }}>✆ {data.phone}</span>}
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 12 — Anand Sahib (Sikh · Modern)
   Saffron gradient header, clean card layout, Gurbani-inspired
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function AnandSahibTemplate({ data }: { data: BiodataFormData }) {
  const saffron = '#B45309';
  const bg = '#FFFBEB';
  const dark = '#1F2937';

  const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ background: '#fff', borderRadius: '8px', padding: '8px 12px', marginBottom: '6px', borderLeft: `3px solid ${saffron}`, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: '9px', fontWeight: 700, color: saffron, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>{title}</div>
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
    <div style={{ width: '100%', height: '100%', background: bg, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: '#FDE68A', opacity: 0.4 }} />
      <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: '#FDE68A', opacity: 0.3 }} />

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${saffron}, #92400E)`, padding: '20px 24px 16px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: `radial-gradient(circle at 30% 40%, white 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '20px', color: 'rgba(255,255,255,0.95)', marginBottom: '2px', fontWeight: 700 }}>ੴ</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.9)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>Anand Karaj Biodata</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '1px', marginBottom: '2px' }}>{v(data, 'name')}</div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{v(data, 'profession')}</div>
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
          <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.55', margin: 0 }}>{v(data, 'about')}</p>
        </SectionCard>

        <SectionCard title="Partner Expectations">
          <p style={{ fontSize: '9px', color: '#4B5563', lineHeight: '1.55', margin: 0 }}>{v(data, 'partnerExpectations')}</p>
        </SectionCard>
      </div>

      {/* Footer */}
      <div style={{ background: `linear-gradient(135deg, ${saffron}, #92400E)`, padding: '8px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          {data.email && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.9)' }}>✉ {data.email}</span>}
          {data.phone && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.9)' }}>✆ {data.phone}</span>}
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 13 — Bodhi Serenity (Buddhist · Traditional)
   Saffron & brown, Dharma wheel, "Buddham Saranam Gacchami"
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function BodhiSerenityTemplate({ data }: { data: BiodataFormData }) {
  const brown = '#92400E';
  const saffronGold = '#D97706';
  const cream = '#FFFBEB';
  const darkText = '#451A03';

  return (
    <div style={{ width: '100%', height: '100%', background: cream, fontFamily: 'Inter, serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: '6px', border: `2px solid ${saffronGold}`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '10px', border: `1px solid ${saffronGold}`, pointerEvents: 'none' }} />
      <div style={{ padding: '22px 28px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '6px' }}>
          <OrnamentalDivider color={saffronGold} width={200} />
          <div style={{ fontSize: '18px', color: saffronGold, margin: '4px 0 2px', letterSpacing: '2px' }}>☸</div>
          <div style={{ fontSize: '9px', color: brown, fontWeight: 600, letterSpacing: '1px', marginBottom: '4px' }}>बुद्धं शरणं गच्छामि</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: brown, letterSpacing: '4px', textTransform: 'uppercase' }}>BIO DATA</div>
          <OrnamentalDivider color={saffronGold} width={160} />
        </div>
        <div style={{ textAlign: 'center', padding: '8px 16px', margin: '4px 0 8px', background: `linear-gradient(135deg, ${brown}12, ${brown}08)`, borderRadius: '6px', border: `1px solid ${saffronGold}40` }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: brown, letterSpacing: '1px' }}>{v(data, 'name')}</div>
          <div style={{ fontSize: '10px', color: saffronGold, fontWeight: 600, marginTop: '2px' }}>{v(data, 'profession')}</div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div><SectionHeading title="Personal Details" color={brown} accentColor={saffronGold} /><div style={{ padding: '0 4px' }}><InfoRow label="Date of Birth" value={v(data,'dob')} labelColor={brown} valueColor={darkText} /><InfoRow label="Gender" value={v(data,'gender')} labelColor={brown} valueColor={darkText} /><InfoRow label="Religion" value={v(data,'religion')} labelColor={brown} valueColor={darkText} /><InfoRow label="Caste" value={v(data,'caste')} labelColor={brown} valueColor={darkText} /><InfoRow label="Height" value={v(data,'height')} labelColor={brown} valueColor={darkText} /><InfoRow label="Complexion" value={v(data,'complexion')} labelColor={brown} valueColor={darkText} /></div></div>
          <div><SectionHeading title="Education & Career" color={brown} accentColor={saffronGold} /><div style={{ padding: '0 4px' }}><InfoRow label="Education" value={v(data,'education')} labelColor={brown} valueColor={darkText} /><InfoRow label="Profession" value={v(data,'profession')} labelColor={brown} valueColor={darkText} /><InfoRow label="Annual Income" value={v(data,'income')} labelColor={brown} valueColor={darkText} /></div></div>
          <div><SectionHeading title="Family Details" color={brown} accentColor={saffronGold} /><div style={{ padding: '0 4px' }}><InfoRow label="Father's Name" value={v(data,'fatherName')} labelColor={brown} valueColor={darkText} /><InfoRow label="Mother's Name" value={v(data,'motherName')} labelColor={brown} valueColor={darkText} /><InfoRow label="Siblings" value={v(data,'siblings')} labelColor={brown} valueColor={darkText} /><InfoRow label="Address" value={v(data,'address')} labelColor={brown} valueColor={darkText} /></div></div>
          <div><SectionHeading title="About Me" color={brown} accentColor={saffronGold} /><p style={{ fontSize: '9.5px', color: darkText, lineHeight:'1.5', padding:'0 4px', margin:0 }}>{v(data,'about')}</p></div>
          <div><SectionHeading title="Partner Expectations" color={brown} accentColor={saffronGold} /><p style={{ fontSize: '9.5px', color: darkText, lineHeight:'1.5', padding:'0 4px', margin:0 }}>{v(data,'partnerExpectations')}</p></div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '8px', paddingTop: '6px' }}>
          <SectionDivider color={saffronGold} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '4px' }}>
            {data.email && <span style={{ fontSize: '8px', color: brown }}>✉ {data.email}</span>}
            {data.phone && <span style={{ fontSize: '8px', color: brown }}>✆ {data.phone}</span>}
          </div>
          <OrnamentalDivider color={saffronGold} width={120} />
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 14 — Lotus Path (Buddhist · Modern)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function LotusPathTemplate({ data }: { data: BiodataFormData }) {
  const blue = '#0369A1';
  const amber = '#F59E0B';
  const bg = '#F0F9FF';
  const dark = '#1F2937';
  const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ background: '#fff', borderRadius: '8px', padding: '8px 12px', marginBottom: '6px', borderLeft: `3px solid ${blue}`, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: '9px', fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>{title}</div>
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
    <div style={{ width: '100%', height: '100%', background: bg, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ background: `linear-gradient(135deg, ${blue}, #1E40AF)`, padding: '20px 24px 16px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '6px' }}>
            <span style={{ fontSize: '14px' }}>☸</span>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.9)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Marriage Biodata</span>
            <span style={{ fontSize: '14px' }}>🪷</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '1px', marginBottom: '2px' }}>{v(data, 'name')}</div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{v(data, 'profession')}</div>
        </div>
      </div>
      <div style={{ padding: '10px 16px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <SectionCard title="Personal Information">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}><Field label="Date of Birth" value={v(data,'dob')} /><Field label="Gender" value={v(data,'gender')} /><Field label="Religion" value={v(data,'religion')} /><Field label="Caste" value={v(data,'caste')} /><Field label="Height" value={v(data,'height')} /><Field label="Complexion" value={v(data,'complexion')} /></div>
        </SectionCard>
        <SectionCard title="Education &amp; Career"><Field label="Education" value={v(data,'education')} /><Field label="Profession" value={v(data,'profession')} /><Field label="Annual Income" value={v(data,'income')} /></SectionCard>
        <SectionCard title="Family Details"><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}><Field label="Father" value={v(data,'fatherName')} /><Field label="Mother" value={v(data,'motherName')} /></div><Field label="Siblings" value={v(data,'siblings')} /><Field label="Address" value={v(data,'address')} /></SectionCard>
        <SectionCard title="About Me"><p style={{ fontSize: '9px', color: '#4B5563', lineHeight:'1.55', margin:0 }}>{v(data,'about')}</p></SectionCard>
        <SectionCard title="Partner Expectations"><p style={{ fontSize: '9px', color: '#4B5563', lineHeight:'1.55', margin:0 }}>{v(data,'partnerExpectations')}</p></SectionCard>
      </div>
      <div style={{ background: `linear-gradient(135deg, ${blue}, #1E40AF)`, padding: '8px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          {data.email && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.9)' }}>✉ {data.email}</span>}
          {data.phone && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.9)' }}>✆ {data.phone}</span>}
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 15 — Golden Stupa (Buddhist · Premium)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function GoldenStupaTemplate({ data }: { data: BiodataFormData }) {
  const indigo = '#312E81';
  const gold = '#D4AF37';
  const bg = '#EEF2FF';
  const darkText = '#1E1B4B';
  return (
    <div style={{ width: '100%', height: '100%', background: bg, fontFamily: 'Inter, serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: '6px', border: `2px solid ${gold}`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '10px', border: `1px solid ${gold}80`, pointerEvents: 'none' }} />
      <div style={{ padding: '22px 28px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '6px' }}>
          <OrnamentalDivider color={gold} width={200} />
          <div style={{ fontSize: '18px', color: gold, margin: '4px 0 2px' }}>☸</div>
          <div style={{ fontSize: '9px', color: indigo, fontWeight: 600, letterSpacing: '1px', marginBottom: '4px' }}>नमो बुद्धाय</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: indigo, letterSpacing: '4px', textTransform: 'uppercase' }}>BIO DATA</div>
          <OrnamentalDivider color={gold} width={160} />
        </div>
        <div style={{ textAlign: 'center', padding: '8px 16px', margin: '4px 0 8px', background: `${indigo}10`, borderRadius: '6px', border: `1px solid ${gold}40` }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: indigo }}>{v(data,'name')}</div>
          <div style={{ fontSize: '10px', color: gold, fontWeight: 600, marginTop: '2px' }}>{v(data,'profession')}</div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div><SectionHeading title="Personal Details" color={indigo} accentColor={gold} /><div style={{ padding: '0 4px' }}><InfoRow label="Date of Birth" value={v(data,'dob')} labelColor={indigo} valueColor={darkText} /><InfoRow label="Gender" value={v(data,'gender')} labelColor={indigo} valueColor={darkText} /><InfoRow label="Religion" value={v(data,'religion')} labelColor={indigo} valueColor={darkText} /><InfoRow label="Caste" value={v(data,'caste')} labelColor={indigo} valueColor={darkText} /><InfoRow label="Height" value={v(data,'height')} labelColor={indigo} valueColor={darkText} /><InfoRow label="Complexion" value={v(data,'complexion')} labelColor={indigo} valueColor={darkText} /></div></div>
          <div><SectionHeading title="Education & Career" color={indigo} accentColor={gold} /><div style={{ padding: '0 4px' }}><InfoRow label="Education" value={v(data,'education')} labelColor={indigo} valueColor={darkText} /><InfoRow label="Profession" value={v(data,'profession')} labelColor={indigo} valueColor={darkText} /><InfoRow label="Annual Income" value={v(data,'income')} labelColor={indigo} valueColor={darkText} /></div></div>
          <div><SectionHeading title="Family Details" color={indigo} accentColor={gold} /><div style={{ padding: '0 4px' }}><InfoRow label="Father's Name" value={v(data,'fatherName')} labelColor={indigo} valueColor={darkText} /><InfoRow label="Mother's Name" value={v(data,'motherName')} labelColor={indigo} valueColor={darkText} /><InfoRow label="Siblings" value={v(data,'siblings')} labelColor={indigo} valueColor={darkText} /><InfoRow label="Address" value={v(data,'address')} labelColor={indigo} valueColor={darkText} /></div></div>
          <div><SectionHeading title="About Me" color={indigo} accentColor={gold} /><p style={{ fontSize: '9.5px', color: darkText, lineHeight:'1.5', padding:'0 4px', margin:0 }}>{v(data,'about')}</p></div>
          <div><SectionHeading title="Partner Expectations" color={indigo} accentColor={gold} /><p style={{ fontSize: '9.5px', color: darkText, lineHeight:'1.5', padding:'0 4px', margin:0 }}>{v(data,'partnerExpectations')}</p></div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '8px', paddingTop: '6px' }}><SectionDivider color={gold} /><div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '4px' }}>{data.email && <span style={{ fontSize: '8px', color: indigo }}>✉ {data.email}</span>}{data.phone && <span style={{ fontSize: '8px', color: indigo }}>✆ {data.phone}</span>}</div><OrnamentalDivider color={gold} width={120} /></div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 16 — Ahimsa Gold (Jain · Traditional)
   Maroon & gold, "jai Jinendra", Jain Prateek Chinha
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function AhimsaGoldTemplate({ data }: { data: BiodataFormData }) {
  const maroon = '#7C2D12';
  const gold = '#D4AF37';
  const cream = '#FFF7ED';
  const darkText = '#431407';
  return (
    <div style={{ width: '100%', height: '100%', background: cream, fontFamily: 'Inter, serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: '6px', border: `2px solid ${gold}`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '10px', border: `1px solid ${gold}`, pointerEvents: 'none' }} />
      <div style={{ padding: '22px 28px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '6px' }}>
          <OrnamentalDivider color={gold} width={200} />
          <div style={{ fontSize: '18px', color: gold, margin: '4px 0 2px' }}>卐</div>
          <div style={{ fontSize: '9px', color: maroon, fontWeight: 600, letterSpacing: '1px', marginBottom: '4px' }}>॥ जय जिनेन्द्र ॥</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: maroon, letterSpacing: '4px', textTransform: 'uppercase' }}>BIO DATA</div>
          <OrnamentalDivider color={gold} width={160} />
        </div>
        <div style={{ textAlign: 'center', padding: '8px 16px', margin: '4px 0 8px', background: `${maroon}10`, borderRadius: '6px', border: `1px solid ${gold}40` }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: maroon }}>{v(data,'name')}</div>
          <div style={{ fontSize: '10px', color: gold, fontWeight: 600, marginTop: '2px' }}>{v(data,'profession')}</div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div><SectionHeading title="Personal Details" color={maroon} accentColor={gold} /><div style={{ padding: '0 4px' }}><InfoRow label="Date of Birth" value={v(data,'dob')} labelColor={maroon} valueColor={darkText} /><InfoRow label="Gender" value={v(data,'gender')} labelColor={maroon} valueColor={darkText} /><InfoRow label="Religion" value={v(data,'religion')} labelColor={maroon} valueColor={darkText} /><InfoRow label="Caste" value={v(data,'caste')} labelColor={maroon} valueColor={darkText} /><InfoRow label="Height" value={v(data,'height')} labelColor={maroon} valueColor={darkText} /><InfoRow label="Complexion" value={v(data,'complexion')} labelColor={maroon} valueColor={darkText} /></div></div>
          <div><SectionHeading title="Education & Career" color={maroon} accentColor={gold} /><div style={{ padding: '0 4px' }}><InfoRow label="Education" value={v(data,'education')} labelColor={maroon} valueColor={darkText} /><InfoRow label="Profession" value={v(data,'profession')} labelColor={maroon} valueColor={darkText} /><InfoRow label="Annual Income" value={v(data,'income')} labelColor={maroon} valueColor={darkText} /></div></div>
          <div><SectionHeading title="Family Details" color={maroon} accentColor={gold} /><div style={{ padding: '0 4px' }}><InfoRow label="Father's Name" value={v(data,'fatherName')} labelColor={maroon} valueColor={darkText} /><InfoRow label="Mother's Name" value={v(data,'motherName')} labelColor={maroon} valueColor={darkText} /><InfoRow label="Siblings" value={v(data,'siblings')} labelColor={maroon} valueColor={darkText} /><InfoRow label="Address" value={v(data,'address')} labelColor={maroon} valueColor={darkText} /></div></div>
          <div><SectionHeading title="About Me" color={maroon} accentColor={gold} /><p style={{ fontSize: '9.5px', color: darkText, lineHeight:'1.5', padding:'0 4px', margin:0 }}>{v(data,'about')}</p></div>
          <div><SectionHeading title="Partner Expectations" color={maroon} accentColor={gold} /><p style={{ fontSize: '9.5px', color: darkText, lineHeight:'1.5', padding:'0 4px', margin:0 }}>{v(data,'partnerExpectations')}</p></div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '8px', paddingTop: '6px' }}><SectionDivider color={gold} /><div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '4px' }}>{data.email && <span style={{ fontSize: '8px', color: maroon }}>✉ {data.email}</span>}{data.phone && <span style={{ fontSize: '8px', color: maroon }}>✆ {data.phone}</span>}</div><OrnamentalDivider color={gold} width={120} /></div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 17 — Navkar Modern (Jain · Modern)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function NavkarModernTemplate({ data }: { data: BiodataFormData }) {
  const teal = '#0D9488';
  const dark = '#1F2937';
  const bg = '#F0FDFA';
  const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ background: '#fff', borderRadius: '8px', padding: '8px 12px', marginBottom: '6px', borderLeft: `3px solid ${teal}`, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: '9px', fontWeight: 700, color: teal, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>{title}</div>
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
    <div style={{ width: '100%', height: '100%', background: bg, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ background: `linear-gradient(135deg, ${teal}, #065F46)`, padding: '20px 24px 16px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>卐</span>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.9)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Marriage Biodata</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>卐</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '1px', marginBottom: '2px' }}>{v(data,'name')}</div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{v(data,'profession')}</div>
        </div>
      </div>
      <div style={{ padding: '10px 16px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <SectionCard title="Personal Information"><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}><Field label="Date of Birth" value={v(data,'dob')} /><Field label="Gender" value={v(data,'gender')} /><Field label="Religion" value={v(data,'religion')} /><Field label="Caste" value={v(data,'caste')} /><Field label="Height" value={v(data,'height')} /><Field label="Complexion" value={v(data,'complexion')} /></div></SectionCard>
        <SectionCard title="Education &amp; Career"><Field label="Education" value={v(data,'education')} /><Field label="Profession" value={v(data,'profession')} /><Field label="Annual Income" value={v(data,'income')} /></SectionCard>
        <SectionCard title="Family Details"><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}><Field label="Father" value={v(data,'fatherName')} /><Field label="Mother" value={v(data,'motherName')} /></div><Field label="Siblings" value={v(data,'siblings')} /><Field label="Address" value={v(data,'address')} /></SectionCard>
        <SectionCard title="About Me"><p style={{ fontSize: '9px', color: '#4B5563', lineHeight:'1.55', margin:0 }}>{v(data,'about')}</p></SectionCard>
        <SectionCard title="Partner Expectations"><p style={{ fontSize: '9px', color: '#4B5563', lineHeight:'1.55', margin:0 }}>{v(data,'partnerExpectations')}</p></SectionCard>
      </div>
      <div style={{ background: `linear-gradient(135deg, ${teal}, #065F46)`, padding: '8px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          {data.email && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.9)' }}>✉ {data.email}</span>}
          {data.phone && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.9)' }}>✆ {data.phone}</span>}
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TEMPLATE 18 — Tirthankara Royal (Jain · Premium)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function TirthankaraRoyalTemplate({ data }: { data: BiodataFormData }) {
  const navy = '#1E3A8A';
  const gold = '#D4AF37';
  const bg = '#EFF6FF';
  const darkText = '#1E3A5F';
  return (
    <div style={{ width: '100%', height: '100%', background: bg, fontFamily: 'Inter, serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: '6px', border: `2px solid ${gold}`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '10px', border: `1px solid ${gold}80`, pointerEvents: 'none' }} />
      <div style={{ padding: '22px 28px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '6px' }}>
          <OrnamentalDivider color={gold} width={200} />
          <div style={{ fontSize: '18px', color: gold, margin: '4px 0 2px' }}>卐</div>
          <div style={{ fontSize: '9px', color: navy, fontWeight: 600, letterSpacing: '1px', marginBottom: '4px' }}>॥ णमो अरिहंताणं ॥</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: navy, letterSpacing: '4px', textTransform: 'uppercase' }}>BIO DATA</div>
          <OrnamentalDivider color={gold} width={160} />
        </div>
        <div style={{ textAlign: 'center', padding: '8px 16px', margin: '4px 0 8px', background: `${navy}10`, borderRadius: '6px', border: `1px solid ${gold}40` }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: navy }}>{v(data,'name')}</div>
          <div style={{ fontSize: '10px', color: gold, fontWeight: 600, marginTop: '2px' }}>{v(data,'profession')}</div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div><SectionHeading title="Personal Details" color={navy} accentColor={gold} /><div style={{ padding: '0 4px' }}><InfoRow label="Date of Birth" value={v(data,'dob')} labelColor={navy} valueColor={darkText} /><InfoRow label="Gender" value={v(data,'gender')} labelColor={navy} valueColor={darkText} /><InfoRow label="Religion" value={v(data,'religion')} labelColor={navy} valueColor={darkText} /><InfoRow label="Caste" value={v(data,'caste')} labelColor={navy} valueColor={darkText} /><InfoRow label="Height" value={v(data,'height')} labelColor={navy} valueColor={darkText} /><InfoRow label="Complexion" value={v(data,'complexion')} labelColor={navy} valueColor={darkText} /></div></div>
          <div><SectionHeading title="Education & Career" color={navy} accentColor={gold} /><div style={{ padding: '0 4px' }}><InfoRow label="Education" value={v(data,'education')} labelColor={navy} valueColor={darkText} /><InfoRow label="Profession" value={v(data,'profession')} labelColor={navy} valueColor={darkText} /><InfoRow label="Annual Income" value={v(data,'income')} labelColor={navy} valueColor={darkText} /></div></div>
          <div><SectionHeading title="Family Details" color={navy} accentColor={gold} /><div style={{ padding: '0 4px' }}><InfoRow label="Father's Name" value={v(data,'fatherName')} labelColor={navy} valueColor={darkText} /><InfoRow label="Mother's Name" value={v(data,'motherName')} labelColor={navy} valueColor={darkText} /><InfoRow label="Siblings" value={v(data,'siblings')} labelColor={navy} valueColor={darkText} /><InfoRow label="Address" value={v(data,'address')} labelColor={navy} valueColor={darkText} /></div></div>
          <div><SectionHeading title="About Me" color={navy} accentColor={gold} /><p style={{ fontSize: '9.5px', color: darkText, lineHeight:'1.5', padding:'0 4px', margin:0 }}>{v(data,'about')}</p></div>
          <div><SectionHeading title="Partner Expectations" color={navy} accentColor={gold} /><p style={{ fontSize: '9.5px', color: darkText, lineHeight:'1.5', padding:'0 4px', margin:0 }}>{v(data,'partnerExpectations')}</p></div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '8px', paddingTop: '6px' }}><SectionDivider color={gold} /><div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '4px' }}>{data.email && <span style={{ fontSize: '8px', color: navy }}>✉ {data.email}</span>}{data.phone && <span style={{ fontSize: '8px', color: navy }}>✆ {data.phone}</span>}</div><OrnamentalDivider color={gold} width={120} /></div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PUBLIC API
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Transparent watermark overlay component (single centered watermark) */
export function WatermarkOverlay() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ transform: 'rotate(-25deg)', textAlign: 'center' }}>
        <div style={{ fontSize: '42px', fontWeight: 800, color: 'rgba(236, 72, 153, 0.18)', letterSpacing: '6px', textTransform: 'uppercase', fontFamily: 'sans-serif', userSelect: 'none' }}>
          Bio4Marriage
        </div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(236, 72, 153, 0.15)', marginTop: '4px', letterSpacing: '3px', fontFamily: 'sans-serif', userSelect: 'none' }}>
          www.bio4marriage.com
        </div>
      </div>
    </div>
  );
}

/** Wraps a template with watermark overlay (for unpaid previews) */
export function WatermarkedBiodataTemplate({ templateId, data }: { templateId: number; data: BiodataFormData }) {
  return (
    <div style={{ position: 'relative' }}>
      <BiodataTemplate templateId={templateId} data={data} />
      <WatermarkOverlay />
    </div>
  );
}

/** Full-size template renderer — used inside the previewRef for PDF capture */
export function BiodataTemplate({ templateId, data }: { templateId: number; data: BiodataFormData }) {
  switch (templateId) {
    case 1:  return <RoyalMaroonTemplate data={data} />;
    case 2:  return <BlushRoseTemplate data={data} />;
    case 3:  return <RoyalNavyTemplate data={data} />;
    case 4:  return <EmeraldCrescentTemplate data={data} />;
    case 5:  return <RoyalMughalTemplate data={data} />;
    case 6:  return <IvoryNikkahTemplate data={data} />;
    case 7:  return <HolyGraceTemplate data={data} />;
    case 8:  return <ChapelRoseTemplate data={data} />;
    case 9:  return <BlessedCrossTemplate data={data} />;
    case 10: return <KhalsaGoldTemplate data={data} />;
    case 11: return <RoyalPunjabTemplate data={data} />;
    case 12: return <AnandSahibTemplate data={data} />;
    case 13: return <BodhiSerenityTemplate data={data} />;
    case 14: return <LotusPathTemplate data={data} />;
    case 15: return <GoldenStupaTemplate data={data} />;
    case 16: return <AhimsaGoldTemplate data={data} />;
    case 17: return <NavkarModernTemplate data={data} />;
    case 18: return <TirthankaraRoyalTemplate data={data} />;
    default: return <BlushRoseTemplate data={data} />;
  }
}

/** Scaled-down preview for template selection pages — includes watermark.
 *  Uses religion-specific preview data for each template. */
export function TemplatePreview({ templateId, className, showWatermark = true }: { templateId: number; className?: string; showWatermark?: boolean }) {
  const template = getTemplateById(templateId);
  const previewData = template ? getPreviewDataForReligion(template.religion) : defaultPreviewData;

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
        {showWatermark ? (
          <WatermarkedBiodataTemplate templateId={templateId} data={previewData} />
        ) : (
          <BiodataTemplate templateId={templateId} data={previewData} />
        )}
      </div>
    </div>
  );
}