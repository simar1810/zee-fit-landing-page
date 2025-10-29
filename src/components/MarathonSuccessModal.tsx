import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Clock, Users } from 'lucide-react';
import React, { useEffect } from 'react';

interface MarathonSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRedirect: () => void;
}

export const MarathonSuccessModal: React.FC<MarathonSuccessModalProps> = ({
  isOpen,
  onClose,
  onRedirect,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Auto redirect after 5 seconds
      const timer = setTimeout(() => {
        onRedirect();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onRedirect]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            position: 'relative'
          }}
        >
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
            opacity: 0.1
          }} />

          {/* Content */}
          <div style={{ padding: '2rem', position: 'relative', zIndex: 10 }}>
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
              }}
            >
              <CheckCircle style={{ width: '40px', height: '40px', color: 'white' }} />
            </motion.div>

            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                color: '#111827',
                textAlign: 'center',
                marginBottom: '0.5rem',
                lineHeight: '1.3'
              }}
            >
              Congratulations!
            </motion.h2>

            {/* Registration Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                fontSize: '1.125rem',
                color: '#374151',
                textAlign: 'center',
                marginBottom: '1.5rem',
                lineHeight: '1.5'
              }}
            >
              Registration completed successfully!
            </motion.p>

            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Clock style={{ width: '20px', height: '20px', color: '#10b981' }} />
                <span style={{ fontWeight: '600', color: '#374151' }}>Event Details</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Users style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Community Event</span>
              </div>
            </motion.div>

            {/* Branding */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ textAlign: 'center', marginBottom: '1.5rem' }}
            >
              <p style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#10b981',
                marginBottom: '0.25rem'
              }}>
                by ZeeFit
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginBottom: '0.5rem'
              }}>
                India's first community fitness brand
              </p>
            </motion.div>

            {/* Countdown Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{
                backgroundColor: '#fef3c7',
                border: '1px solid #f59e0b',
                borderRadius: '8px',
                padding: '1rem',
                textAlign: 'center'
              }}
            >
              <p style={{
                fontSize: '0.875rem',
                color: '#92400e',
                margin: 0,
                fontWeight: '500'
              }}>
                🚀 We will be starting in a few minutes
              </p>
            </motion.div>

            {/* Auto Redirect Notice */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                fontSize: '0.75rem',
                color: '#9ca3af',
                textAlign: 'center',
                marginTop: '1rem',
                marginBottom: 0
              }}
            >
              Redirecting to home page in 5 seconds...
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
