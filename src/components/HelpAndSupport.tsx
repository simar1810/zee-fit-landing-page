import React from 'react';
import { Footer } from './Footer';

export function HelpAndSupport() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -0.5, color: '#111827', margin: 0 }}>Contact Us</h1>
          <p style={{ color: '#6b7280', marginTop: 8 }}>We're here to help. Reach out to us through any of the channels below.</p>
        </div>
      </div>

      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>
          {/* Contact Information Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 48 }}>
            {/* Email */}
            <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, textAlign: 'center', transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ width: 56, height: 56, margin: '0 auto 16px', borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Email Support</h2>
              <p style={{ color: '#6b7280', marginBottom: 12, fontSize: 14 }}>For general inquiries and support</p>
              <a href="mailto:support@wellnessz.in" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 500, fontSize: 16 }}>
                support@wellnessz.in
              </a>
            </section>

            {/* Phone */}
            <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, textAlign: 'center', transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ width: 56, height: 56, margin: '0 auto 16px', borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Phone Support</h2>
              <p style={{ color: '#6b7280', marginBottom: 12, fontSize: 14 }}>Call us for immediate assistance</p>
              <a href="tel:+917888624347" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 500, fontSize: 16 }}>
                +91 7888624347
              </a>
            </section>

            {/* Office Hours */}
            <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, textAlign: 'center', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ width: 56, height: 56, margin: '0 auto 16px', borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Business Hours</h2>
              <p style={{ color: '#6b7280', marginBottom: 12, fontSize: 14 }}>When we're available</p>
              <p style={{ color: '#374151', fontWeight: 500, fontSize: 16 }}>
                Monday - Friday<br />
                9:00 AM - 6:00 PM IST
              </p>
            </section>
          </div>

          {/* Office Location */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 12 }}>Visit Our Office</h2>
                <p style={{ color: '#6b7280', marginBottom: 16, lineHeight: 1.6 }}>
                  We'd love to have you visit us at our corporate office. Feel free to stop by during business hours.
                </p>
                <div style={{ background: '#f9fafb', padding: 20, borderRadius: 8, border: '1px solid #e5e7eb' }}>
                  <p style={{ color: '#374151', lineHeight: 1.8, margin: 0 }}>
                    <strong style={{ color: '#111827' }}>Corporate Office</strong><br />
                    A-197, TC Coworks Space<br />
                    Office Number S-04, 2nd Floor<br />
                    Sec-63, Sector 63<br />
                    Noida, Uttar Pradesh 201309<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)' }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Need Help?</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 20 }}>
              Our support team is committed to providing you with the best possible assistance. Whether you have questions about your account, need technical support, or want to learn more about our services, we're here to help.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>General Inquiries</h3>
                <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6 }}>
                  Questions about our services, pricing, or features
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>Technical Support</h3>
                <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6 }}>
                  Troubleshooting app issues or technical difficulties
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>Account Assistance</h3>
                <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6 }}>
                  Help with billing, subscriptions, or account settings
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
