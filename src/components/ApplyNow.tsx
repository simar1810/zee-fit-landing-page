import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { Footer } from './Footer';

export function ApplyNow() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    motivation: '',
    availability: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.experience || !formData.motivation) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Application submitted successfully! We\'ll get back to you soon. 🎉');
    setIsSubmitting(false);
    
    // Reset form
    setFormData({ 
      name: '', 
      email: '', 
      phone: '', 
      experience: '', 
      motivation: '',
      availability: ''
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      {/* Header Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)', 
        borderBottom: '1px solid #e5e7eb',
        padding: '60px 24px 40px'
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ 
              fontSize: 48, 
              fontWeight: 800, 
              letterSpacing: -1, 
              color: '#111827', 
              margin: 0,
              marginBottom: 16,
              background: 'linear-gradient(135deg, #10b981 0%, #f97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Apply Now
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ color: '#6b7280', fontSize: 18, lineHeight: 1.6, maxWidth: 600 }}
          >
            Join the Zeefit movement and be part of India's first community fitness revolution. 
            Fill out the form below and we'll get in touch with you soon.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '48px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: 16,
              padding: 40,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}
          >
            {/* Name Field */}
            <div style={{ marginBottom: 24 }}>
              <Label htmlFor="name" style={{ display: 'block', marginBottom: 8, color: '#374151', fontWeight: 500 }}>
                Full Name <span style={{ color: '#ef4444' }}>*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: 8,
                  fontSize: 16,
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#10b981';
                  e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: 24 }}>
              <Label htmlFor="email" style={{ display: 'block', marginBottom: 8, color: '#374151', fontWeight: 500 }}>
                Email Address <span style={{ color: '#ef4444' }}>*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: 8,
                  fontSize: 16,
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#10b981';
                  e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            {/* Phone Field */}
            <div style={{ marginBottom: 24 }}>
              <Label htmlFor="phone" style={{ display: 'block', marginBottom: 8, color: '#374151', fontWeight: 500 }}>
                Phone Number <span style={{ color: '#ef4444' }}>*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: 8,
                  fontSize: 16,
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#10b981';
                  e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            {/* Experience Field */}
            <div style={{ marginBottom: 24 }}>
              <Label htmlFor="experience" style={{ display: 'block', marginBottom: 8, color: '#374151', fontWeight: 500 }}>
                Fitness Experience <span style={{ color: '#ef4444' }}>*</span>
              </Label>
              <Textarea
                id="experience"
                placeholder="Tell us about your fitness journey and experience..."
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: 8,
                  fontSize: 16,
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#10b981';
                  e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            {/* Motivation Field */}
            <div style={{ marginBottom: 24 }}>
              <Label htmlFor="motivation" style={{ display: 'block', marginBottom: 8, color: '#374151', fontWeight: 500 }}>
                Why do you want to join Zeefit? <span style={{ color: '#ef4444' }}>*</span>
              </Label>
              <Textarea
                id="motivation"
                placeholder="Share your motivation and what you hope to achieve..."
                value={formData.motivation}
                onChange={(e) => handleInputChange('motivation', e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: 8,
                  fontSize: 16,
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#10b981';
                  e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            {/* Availability Field */}
            <div style={{ marginBottom: 32 }}>
              <Label htmlFor="availability" style={{ display: 'block', marginBottom: 8, color: '#374151', fontWeight: 500 }}>
                Availability (Optional)
              </Label>
              <Textarea
                id="availability"
                placeholder="When are you typically available for workouts? (e.g., Morning 6-8 AM, Evening 6-8 PM)"
                value={formData.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: 8,
                  fontSize: 16,
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#10b981';
                  e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #10b981 0%, #f97316 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 50,
                  fontSize: 18,
                  fontWeight: 600,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
                }}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{
                      width: 24,
                      height: 24,
                      border: '3px solid white',
                      borderTop: '3px solid transparent',
                      borderRadius: '50%',
                      margin: '0 auto'
                    }}
                  />
                ) : (
                  'Submit Application 🚀'
                )}
              </Button>
            </motion.div>

            {/* Privacy Note */}
            <p style={{ 
              marginTop: 24, 
              textAlign: 'center', 
              fontSize: 14, 
              color: '#6b7280',
              lineHeight: 1.6
            }}>
              By submitting this application, you agree to be part of India's first community fitness movement. 
              We respect your privacy and will never spam you.
            </p>
          </motion.form>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              marginTop: 48,
              padding: 32,
              background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
              borderRadius: 16,
              border: '1px solid #e5e7eb'
            }}
          >
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>
              What Happens Next?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
              <div>
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #10b981 0%, #f97316 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                  fontSize: 24
                }}>
                  1️⃣
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>
                  Review
                </h3>
                <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6 }}>
                  Our team will review your application
                </p>
              </div>
              <div>
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #10b981 0%, #f97316 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                  fontSize: 24
                }}>
                  2️⃣
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>
                  Contact
                </h3>
                <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6 }}>
                  We'll reach out via email or phone
                </p>
              </div>
              <div>
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #10b981 0%, #f97316 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                  fontSize: 24
                }}>
                  3️⃣
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>
                  Welcome
                </h3>
                <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6 }}>
                  Join the community and start your journey
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

