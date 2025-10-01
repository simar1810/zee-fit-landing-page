import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { apiService, VerifyOtpRequest } from '../../services/api';

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  countryCode: string;
  onVerified: (authData: any) => void;
  onError: (message: string) => void;
}

export const OtpModal: React.FC<OtpModalProps> = ({
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
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Verify Your Phone</h2>
                <p className="text-sm text-gray-600">
                  {countryCode} {phone}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-6">
                Enter the 6-digit code sent to your phone
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP Input Fields */}
              <div className="flex justify-center gap-3">
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
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    disabled={isLoading}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading || !isOtpComplete}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Continue
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              {/* Resend OTP */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendTimer > 0}
                  className="text-green-600 hover:text-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
