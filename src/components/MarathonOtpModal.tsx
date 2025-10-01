import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { apiService, VerifyOtpRequest } from '../services/api';

interface MarathonOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  countryCode: string;
  onVerified: (authData: any) => void;
  onError: (message: string) => void;
}

export const MarathonOtpModal: React.FC<MarathonOtpModalProps> = ({
  isOpen,
  onClose,
  phone,
  countryCode,
  onVerified,
  onError,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  // Resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('').slice(0, 6);
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      onError('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    
    try {
      // Get stored registration data from Marathon component
      const storedData = localStorage.getItem('registrationData');
      let registrationData = {
        name: 'User',
        age: '25',
        gender: 'male' as 'male' | 'female' | 'other',
        heightInCm: 175,
        weightInKg: 70,
        q1: 1,
        q2: 2,
        q3: 3,
      };

      if (storedData) {
        const parsed = JSON.parse(storedData);
        registrationData = {
          name: parsed.name || 'User',
          age: parsed.age || '25',
          gender: parsed.gender || 'male',
          heightInCm: parsed.heightInCm || 175,
          weightInKg: parsed.weightInKg || 70,
          q1: parsed.q1 || 1,
          q2: parsed.q2 || 2,
          q3: parsed.q3 || 3,
        };
      }

      const verifyData: VerifyOtpRequest = {
        phone,
        countryCode,
        otp: otpString,
        name: registrationData.name,
        age: registrationData.age,
        gender: registrationData.gender,
        heightInCm: registrationData.heightInCm,
        weightInKg: registrationData.weightInKg,
        q1: registrationData.q1,
        q2: registrationData.q2,
        q3: registrationData.q3,
        device: navigator.userAgent,
      };


      const authData = await apiService.verifyOtp(verifyData);
      onVerified(authData);
    } catch (error: any) {
      onError(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    
    try {
      await apiService.sendOtp({ phone, countryCode });
      setResendTimer(60); // 60 seconds cooldown
    } catch (error: any) {
      console.error('MarathonOtpModal: OTP resend failed:', error);
      onError(error.message || 'Failed to resend OTP');
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

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
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '16px'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: '16px',
            border: '1px solid rgba(55, 65, 81, 0.5)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px',
            borderBottom: '1px solid rgba(55, 65, 81, 0.5)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Shield style={{ width: '20px', height: '20px', color: 'white' }} />
              </div>
              <div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 0
                }}>Verify Your Phone</h2>
                <p style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  margin: 0
                }}>
                  {countryCode} {phone}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
              }}
            >
              <X style={{ width: '16px', height: '16px', color: '#10b981' }} />
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <p style={{
                color: '#9ca3af',
                marginBottom: '24px',
                fontSize: '16px'
              }}>
                Enter the 6-digit code sent to your phone
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* OTP Input Fields */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    style={{
                      width: '48px',
                      height: '48px',
                      textAlign: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      border: '2px solid #374151',
                      borderRadius: '8px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: '#1f2937',
                      color: 'white'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#10b981';
                      e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#374151';
                      e.target.style.boxShadow = 'none';
                    }}
                    disabled={isLoading}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading || !isOtpComplete}
                style={{
                  width: '100%',
                  background: 'linear-gradient(to right, #10b981, #059669)',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: isLoading || !isOtpComplete ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  fontSize: '16px',
                  opacity: isLoading || !isOtpComplete ? 0.5 : 1
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={(e) => {
                  if (!isLoading && isOtpComplete) {
                    e.currentTarget.style.background = 'linear-gradient(to right, #059669, #047857)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading && isOtpComplete) {
                    e.currentTarget.style.background = 'linear-gradient(to right, #10b981, #059669)';
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Continue
                    <ArrowRight style={{ width: '20px', height: '20px' }} />
                  </>
                )}
              </motion.button>

              {/* Resend OTP */}
              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendTimer > 0}
                  style={{
                    color: '#10b981',
                    fontWeight: '500',
                    border: 'none',
                    background: 'none',
                    cursor: resendTimer > 0 ? 'not-allowed' : 'pointer',
                    opacity: resendTimer > 0 ? 0.5 : 1,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (resendTimer === 0) {
                      e.currentTarget.style.color = '#059669';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (resendTimer === 0) {
                      e.currentTarget.style.color = '#10b981';
                    }
                  }}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                </button>
              </div>
            </form>

      
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
