import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Loader2 } from 'lucide-react';
import { apiService } from '../../services/api';
import { OtpModal } from './OtpModal';

interface OtpRequestProps {
  onOtpSent: (phone: string, countryCode: string) => void;
  onError: (message: string) => void;
}

export const OtpRequest: React.FC<OtpRequestProps> = ({ onOtpSent, onError }) => {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const countryOptions = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      onError('Please enter your phone number');
      return;
    }

    if (phone.length < 8) {
      onError('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    
    try {
      await apiService.sendOtp({
        phone: phone.trim(),
        countryCode,
      });
      
      setShowOtpModal(true);
    } catch (error: any) {
      onError(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Your Phone Number</h2>
        <p className="text-gray-600">We'll send you a verification code</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Country Code Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country Code
          </label>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {countryOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.flag} {option.country} ({option.code})
              </option>
            ))}
          </select>
        </div>

        {/* Phone Number Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading || !phone.trim()}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending OTP...
            </>
          ) : (
            <>
              Send OTP
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </form>


      {/* OTP Modal */}
      <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        phone={phone}
        countryCode={countryCode}
        onVerified={(authData) => {
          setShowOtpModal(false);
          onOtpSent(phone, countryCode);
        }}
        onError={onError}
      />
    </motion.div>
  );
};
