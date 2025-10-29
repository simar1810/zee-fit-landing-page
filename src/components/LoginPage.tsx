import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2, Phone, Shield } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { setCookie } from '../utils/cookies';

export const LoginPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // For now, let's handle login without the auth context
  // We'll redirect to challenges page after successful login
  const handleLogin = (authData: any) => {
    // Store auth data in localStorage for now
    // Store tokens in cookies
    
    setCookie('accessToken', authData.accessToken, 7);
    setCookie('refreshToken', authData.refreshToken, 30);
    setCookie('user', JSON.stringify(authData.user), 7);
    // Redirect to challenges page
    navigate('/#/challenges');
  };
  
  const navigate = useNavigate();

  const countryOptions = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
  ];

  // Resend timer
  React.useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      setError('Please enter your phone number');
      return;
    }

    if (phone.length < 8) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      await apiService.sendOtp({
        phone: phone.trim(),
        countryCode,
      });
      
      setCurrentStep('otp');
    } catch (error: any) {
      setError(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

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

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // For login, we'll use minimal data since user already exists
      const authData = await apiService.verifyOtp({
        phone,
        countryCode,
        otp: otpString,
        name: 'User',
        age: '25',
        gender: 'male',
        heightInCm: 175,
        weightInKg: 70,
        q1: 1,
        q2: 2,
        q3: 3,
        device: navigator.userAgent,
      });

      handleLogin(authData);
    } catch (error: any) {
      setError(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    
    try {
      await apiService.sendOtp({ phone, countryCode });
      setResendTimer(60);
    } catch (error: any) {
      setError(error.message || 'Failed to resend OTP');
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
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
              <h1 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#111827',
                margin: 0
              }}>Login to ZeeFit</h1>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: 0
              }}>Access your challenges</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e7eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px', color: '#6b7280' }} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          <AnimatePresence mode="wait">
            {currentStep === 'phone' && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <Phone style={{ width: '48px', height: '48px', color: '#10b981', margin: '0 auto 16px' }} />
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#111827',
                    marginBottom: '8px'
                  }}>Enter Your Phone</h2>
                  <p style={{ color: '#6b7280' }}>We'll send you a verification code</p>
                </div>

                <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Country Code */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>Country Code</label>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '16px',
                        outline: 'none',
                        backgroundColor: 'white'
                      }}
                    >
                      {countryOptions.map((option) => (
                        <option key={option.code} value={option.code}>
                          {option.flag} {option.country} ({option.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter your phone number"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '16px',
                        outline: 'none',
                        backgroundColor: 'white'
                      }}
                      disabled={isLoading}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading || !phone.trim()}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, #10b981, #059669)',
                      color: 'white',
                      padding: '12px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      border: 'none',
                      cursor: isLoading || !phone.trim() ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '16px',
                      opacity: isLoading || !phone.trim() ? 0.5 : 1
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Send OTP
                        <ArrowRight style={{ width: '20px', height: '20px' }} />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}

            {currentStep === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <Shield style={{ width: '48px', height: '48px', color: '#10b981', margin: '0 auto 16px' }} />
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#111827',
                    marginBottom: '8px'
                  }}>Verify Your Phone</h2>
                  <p style={{ color: '#6b7280' }}>
                    Enter the 6-digit code sent to <br />
                    <span style={{ fontWeight: '500' }}>{countryCode} {phone}</span>
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* OTP Input */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
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
                          width: '40px',
                          height: '40px',
                          textAlign: 'center',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          border: '2px solid #d1d5db',
                          borderRadius: '8px',
                          outline: 'none',
                          backgroundColor: 'white'
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
                      padding: '12px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      border: 'none',
                      cursor: isLoading || !isOtpComplete ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '16px',
                      opacity: isLoading || !isOtpComplete ? 0.5 : 1
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify & Login
                        <ArrowRight style={{ width: '20px', height: '20px' }} />
                      </>
                    )}
                  </motion.button>

                  {/* Resend */}
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
                        opacity: resendTimer > 0 ? 0.5 : 1
                      }}
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Send OTP'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  marginTop: '16px',
                  padding: '12px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px'
                }}
              >
                <p style={{ color: '#dc2626', margin: 0, fontSize: '14px' }}>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

    
        </div>
      </div>
      </div>
    </>
  );
};
