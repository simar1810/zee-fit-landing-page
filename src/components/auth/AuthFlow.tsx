import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OtpRequest } from './OtpRequest';
import { OtpVerification } from './OtpVerification';
import { CaloriesBurnedModal } from '../CaloriesBurnedModal';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

type AuthStep = 'otp-request' | 'otp-verification';

export const AuthFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('otp-request');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [error, setError] = useState<string | null>(null);
  const [showCaloriesModal, setShowCaloriesModal] = useState(false);
  const [userWeight, setUserWeight] = useState(70); // Default weight
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleOtpSent = (phoneNumber: string, code: string) => {
    setPhone(phoneNumber);
    setCountryCode(code);
    setCurrentStep('otp-verification');
    setError(null);
  };

  const handleOtpVerified = (authData: any) => {
    // Get user weight from stored registration data
    const storedData = localStorage.getItem('registrationData');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setUserWeight(parsed.weightInKg || 70);
    }
    
    login(authData);
    setShowCaloriesModal(true);
  };

  const handleCaloriesComplete = () => {
    navigate('/#/challenges');
  };

  const handleBack = () => {
    setCurrentStep('otp-request');
    setError(null);
  };

  const handleError = (message: string) => {
    setError(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-red-800 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auth Steps */}
        <AnimatePresence mode="wait">
          {currentStep === 'otp-request' && (
            <OtpRequest
              key="otp-request"
              onOtpSent={handleOtpSent}
              onError={handleError}
            />
          )}
          
          {currentStep === 'otp-verification' && (
            <OtpVerification
              key="otp-verification"
              phone={phone}
              countryCode={countryCode}
              onVerified={handleOtpVerified}
              onBack={handleBack}
              onError={handleError}
            />
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            By continuing, you agree to our{' '}
            <a href="#" className="text-green-600 hover:text-green-700">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-green-600 hover:text-green-700">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {/* Calories Burned Modal */}
      <CaloriesBurnedModal
        isOpen={showCaloriesModal}
        onClose={() => setShowCaloriesModal(false)}
        userWeight={userWeight}
        onComplete={handleCaloriesComplete}
      />
    </div>
  );
};
