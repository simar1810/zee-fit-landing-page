import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, User, Ruler, Weight, Calendar, Users, Target, MessageSquare, Quote, Zap, Phone } from 'lucide-react';
import { setCookie, getCookie } from '../utils/cookies';
import { apiService } from '../services/api';
import { MarathonOtpModal } from './MarathonOtpModal';
import { MarathonCaloriesModal } from './MarathonCaloriesModal';
import { ChallengeSelectionModal } from './ChallengeSelectionModal';
import { MarathonSuccessModal } from './MarathonSuccessModal';

// Import images
import runnerImg from '../assets/pexels-photo-841130.jpeg';
import measuringImg from '../assets/pexels-photo-3768916.jpeg';
import weightImg from '../assets/pexels-photo-3837757.jpeg';
import ageImg from '../assets/pexels-photo-3768593.jpeg';
import genderImg from '../assets/pexels-photo-1552249.jpeg';
import obstaclesImg from '../assets/pexels-photo-3822622.jpeg';
import goalsImg from '../assets/pexels-photo-3837433.jpeg';
import motivationImg from '../assets/pexels-photo-1229356.jpeg';
import challengeImg from '../assets/pexels-photo-3823488.jpeg';
import contactImg from '../assets/pexels-photo-5384445.jpeg';

interface FormData {
  name: string;
  heightUnit: 'cm' | 'ft';
  heightCm: string;
  heightFt: string;
  heightIn: string;
  weight: string;
  age: string;
  gender: string;
  holdingBack: string;
  improve: string;
  challenge: string;
  mobile: string;
}

const motivationalQuotes = [
  "The miracle isn't that I finished. The miracle is that I had the courage to start.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Don't limit your challenges. Challenge your limits.",
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind you have to convince."
];

const fitnessImages = [
  runnerImg, // Runner
  measuringImg, // Measuring
  weightImg, // Weight
  ageImg, // Age/fitness
  genderImg, // Gender diversity
  obstaclesImg, // Obstacles
  goalsImg, // Goals
  motivationImg, // Motivation
  challengeImg, // Challenge
  contactImg  // Contact
];

const challenges = [
  { id: 'lose_weight', title: 'Weight loss', desc: 'I want to lose weight', icon: '⏰' },
  { id: 'gain_muscles', title: 'Gain muscles', desc: 'I want to gain muscles', icon: '⚡' },
  { id: 'discipline', title: 'I am not disciplined', desc: 'I want to be disciplined', icon: '🎯' },
  { id: 'Phone', title: 'I scroll too much phone', desc: 'Having trouble sticking to a routine', icon: '📅' }
];

export function Marathon() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);
  
  // Check authentication status on component load
  React.useEffect(() => {
    const token = getCookie('accessToken');
    const userData = getCookie('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    heightUnit: 'cm',
    heightCm: '',
    heightFt: '',
    heightIn: '',
    weight: '',
    age: '',
    gender: '',
    holdingBack: '',
    improve: '',
    challenge: '',
    mobile: ''
  });
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showChallengeSelection, setShowChallengeSelection] = useState(false);
  const [showCaloriesModal, setShowCaloriesModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [otpPhone, setOtpPhone] = useState('');
  const [otpCountryCode, setOtpCountryCode] = useState('+91');
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);

  const totalSteps = 10;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get step title and subtitle
  const getStepTitle = () => {
    const titles = [
      "What's Your Name?",
      "What's Your Height?",
      "What's Your Weight?",
      "What's Your Age?",
      "What's Your Gender?",
      "What's Holding You Back?",
      "What Do You Want to Improve?",
      "Stay Motivated",
      "What's Your Biggest Challenge?",
      "Let's Get Started!"
    ];
    return titles[currentStep] || "Step";
  };

  const getStepSubtitle = () => {
    const subtitles = [
      "Let's start with the basics",
      "Help us understand your body composition",
      "This helps us calculate your BMI and goals",
      "Age affects your fitness recommendations",
      "This helps us personalize your experience",
      "Understanding your challenges helps us help you",
      "Your goals shape your personalized program",
      "Remember why you started this journey",
      "Tell us about the obstacles you face in your fitness journey",
      "We're excited to help you achieve your goals"
    ];
    return subtitles[currentStep] || "Continue your journey";
  };

  // Cycle motivational quotes
  useEffect(() => {
    if (currentStep === 7) { // Motivation quotes step
      const interval = setInterval(() => {
        setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  // Check if current step is valid
  useEffect(() => {
    const isValid = validateCurrentStep();
    setShowContinue(isValid);
  }, [formData, currentStep]);

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 0: return formData.name.trim().length > 0;
      case 1: 
        if (formData.heightUnit === 'cm') {
          return formData.heightCm.trim().length > 0 && parseFloat(formData.heightCm) > 0;
        } else {
          return formData.heightFt.trim().length > 0 && formData.heightIn.trim().length > 0 
                 && parseFloat(formData.heightFt) > 0 && parseFloat(formData.heightIn) >= 0;
        }
      case 2: return formData.weight.trim().length > 0 && parseFloat(formData.weight) > 0;
      case 3: return formData.age.trim().length > 0 && parseInt(formData.age) > 0 && parseInt(formData.age) < 150;
      case 4: return formData.gender.trim().length > 0;
      case 5: return formData.holdingBack.trim().length > 0;
      case 6: return formData.improve.trim().length > 0;
      case 7: return true; // Motivation step - auto valid
      case 8: return formData.challenge.trim().length > 0;
      case 9: return formData.mobile.trim().length > 0;
      default: return false;
    }
  };

  const nextStep = async () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - complete registration
      await handleFinalSubmission();
    }
  };

  const handleFinalSubmission = async () => {
    if (isAuthenticated) {
      // User is already authenticated, just show success
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Convert form data to API format
      const heightInCm = formData.heightUnit === 'cm' 
        ? parseFloat(formData.heightCm) 
        : (parseFloat(formData.heightFt) * 30.48) + (parseFloat(formData.heightIn) * 2.54);

      // Map form responses to API format
      const q1 = formData.holdingBack === 'Motivation' ? 1 : 
                 formData.holdingBack === 'Disciplined' ? 2 :
                 formData.holdingBack === 'Time' ? 3 : 4;

      const q2 = formData.improve === 'better_health' ? 1 :
                 formData.improve === 'more_energy' ? 2 :
                 formData.improve === 'increased_focus' ? 3 : 4;

      const q3 = formData.challenge === 'lose_weight' ? 1 :
                 formData.challenge === 'gain_muscles' ? 2 :
                 formData.challenge === 'discipline' ? 3 : 4;

      // Store form data for OTP verification
      const registrationData = {
        name: formData.name,
        age: formData.age,
        gender: formData.gender.toLowerCase() as 'male' | 'female' | 'other',
        heightInCm: Math.round(heightInCm),
        weightInKg: parseFloat(formData.weight),
        q1,
        q2,
        q3,
        phone: formData.mobile,
        countryCode: '+91'
      };

      // Store in localStorage for OTP verification step
      localStorage.setItem('registrationData', JSON.stringify(registrationData));
      
      // Send OTP first, then show modal
      setOtpPhone(formData.mobile);
      
      try {
        await apiService.sendOtp({ 
          phone: formData.mobile, 
          countryCode: '+91' // Default to India for now
        });
        setShowOtpModal(true);
      } catch (error: any) {
        console.error('Marathon: Failed to send OTP:', error);
        setSubmitError('Failed to send OTP. Please try again.');
      }
      
    } catch (error: any) {
      setSubmitError(error.message || 'Failed to save registration data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOtpVerified = (authData: any) => {
    setShowOtpModal(false);
    
    // Store auth data in cookies
    setCookie('accessToken', authData.accessToken, 7);
    setCookie('refreshToken', authData.refreshToken, 30);
    setCookie('user', JSON.stringify(authData.user), 7);
    
    // Update local state
    setIsAuthenticated(true);
    setUser(authData.user);
    
    
    // Get user weight from stored registration data
    const storedData = localStorage.getItem('registrationData');
    let userWeight = 70; // Default weight
    if (storedData) {
      const parsed = JSON.parse(storedData);
      userWeight = parsed.weightInKg || 70;
    }
    
    // Show challenge selection modal
    setShowChallengeSelection(true);
  };

  const handleChallengesSelected = async (challengeIds: string[]) => {
    setSelectedChallenges(challengeIds);
    setShowChallengeSelection(false);

    // Join selected challenges
    if (challengeIds.length > 0) {
      try {
        const result = await apiService.joinMultipleChallenges(challengeIds);
      } catch (error: any) {
        console.error('Marathon: Failed to join challenges:', error);
        // Continue with flow even if challenge joining fails
      }
    }

    // Show calories modal
    setShowCaloriesModal(true);
  };

  const handleCaloriesComplete = () => {
    setShowCaloriesModal(false);
    // Show success modal instead of redirecting
    setShowSuccessModal(true);
  };

  const handleSuccessRedirect = () => {
    setShowSuccessModal(false);
    // Redirect to home page
    window.location.href = '/';
  };

  const handleOtpError = (message: string) => {
    setSubmitError(message);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: isMobile ? '24px' : '32px' }}>
              <User style={{ margin: '0 auto 16px', color: '#10b981', fontSize: isMobile ? '36px' : '48px' }} />
              <h2 style={{ fontSize: isMobile ? '24px' : '30px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Let's Get Started!</h2>
              <p style={{ color: '#9ca3af', fontSize: isMobile ? '14px' : '16px' }}>What should we call you?</p>
            </div>
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              style={{
                width: '100%',
                padding: isMobile ? '14px 20px' : '16px 24px',
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: isMobile ? '8px' : '12px',
                color: 'white',
                fontSize: isMobile ? '16px' : '16px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#10b981';
                e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#374151';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        );

      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: isMobile ? '24px' : '32px' }}>
              <Ruler style={{ margin: '0 auto 16px', color: '#10b981', fontSize: isMobile ? '36px' : '48px' }} />
              <h2 style={{ fontSize: isMobile ? '24px' : '30px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Your Height</h2>
              <p style={{ color: '#9ca3af', fontSize: isMobile ? '14px' : '16px' }}>This helps us personalize your fitness plan</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: isMobile ? '12px' : '16px' }}>
                <button
                  onClick={() => updateFormData('heightUnit', 'cm')}
                  style={{
                    flex: 1,
                    padding: isMobile ? '10px 12px' : '12px 16px',
                    borderRadius: isMobile ? '6px' : '8px',
                    border: 'none',
                    backgroundColor: formData.heightUnit === 'cm' ? '#10b981' : '#1f2937',
                    color: formData.heightUnit === 'cm' ? 'white' : '#9ca3af',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: isMobile ? '14px' : '16px'
                  }}
                >
                  Centimeters
                </button>
                <button
                  onClick={() => updateFormData('heightUnit', 'ft')}
                  style={{
                    flex: 1,
                    padding: isMobile ? '10px 12px' : '12px 16px',
                    borderRadius: isMobile ? '6px' : '8px',
                    border: 'none',
                    backgroundColor: formData.heightUnit === 'ft' ? '#10b981' : '#1f2937',
                    color: formData.heightUnit === 'ft' ? 'white' : '#9ca3af',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: isMobile ? '14px' : '16px'
                  }}
                >
                  Feet & Inches
                </button>
              </div>

              {formData.heightUnit === 'cm' ? (
                <input
                  type="number"
                  placeholder="Height in cm"
                  value={formData.heightCm}
                  onChange={(e) => updateFormData('heightCm', e.target.value)}
                  style={{
                    width: '100%',
                    padding: isMobile ? '14px 20px' : '16px 24px',
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: isMobile ? '8px' : '12px',
                    color: 'white',
                    fontSize: isMobile ? '16px' : '16px',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#10b981';
                    e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#374151';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              ) : (
                <div style={{ display: 'flex', gap: isMobile ? '12px' : '16px' }}>
                  <input
                    type="number"
                    placeholder="Feet"
                    value={formData.heightFt}
                    onChange={(e) => updateFormData('heightFt', e.target.value)}
                    style={{
                      flex: 1,
                      padding: isMobile ? '14px 20px' : '16px 24px',
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: isMobile ? '8px' : '12px',
                      color: 'white',
                      fontSize: isMobile ? '16px' : '16px',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#10b981';
                      e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#374151';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Inches"
                    value={formData.heightIn}
                    onChange={(e) => updateFormData('heightIn', e.target.value)}
                    style={{
                      flex: 1,
                      padding: isMobile ? '14px 20px' : '16px 24px',
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: isMobile ? '8px' : '12px',
                      color: 'white',
                      fontSize: isMobile ? '16px' : '16px',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#10b981';
                      e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#374151';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <Weight style={{ margin: '0 auto 16px', color: '#10b981', fontSize: '48px' }} />
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Your Weight</h2>
              <p style={{ color: '#9ca3af' }}>Enter your current weight in kg</p>
            </div>
            <input
              type="number"
              placeholder="Weight in kg"
              value={formData.weight}
              onChange={(e) => updateFormData('weight', e.target.value)}
              style={{
                width: '100%',
                padding: '16px 24px',
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#10b981';
                e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#374151';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        );

      case 3:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <Calendar style={{ margin: '0 auto 16px', color: '#10b981', fontSize: '48px' }} />
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Your Age</h2>
              <p style={{ color: '#9ca3af' }}>This helps us create age-appropriate workouts</p>
            </div>
            <input
              type="number"
              placeholder="Your age"
              value={formData.age}
              onChange={(e) => updateFormData('age', e.target.value)}
              style={{
                width: '100%',
                padding: '16px 24px',
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#10b981';
                e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#374151';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        );

      case 4:
        return (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: isMobile ? '16px' : '24px',
            height: '100%',
            justifyContent: 'space-between'
          }}>
            <div style={{ textAlign: 'center', marginBottom: isMobile ? '24px' : '32px' }}>
              <Users style={{ 
                margin: '0 auto 16px', 
                color: '#10b981', 
                fontSize: isMobile ? '36px' : '48px' 
              }} />
              <h2 style={{ 
                fontSize: isMobile ? '24px' : '30px', 
                fontWeight: 'bold', 
                color: 'white', 
                marginBottom: '8px' 
              }}>
                Gender
              </h2>
              <p style={{ 
                color: '#9ca3af', 
                fontSize: isMobile ? '14px' : '16px' 
              }}>
                This helps us provide better recommendations
              </p>
            </div>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: isMobile ? '12px' : '16px',
              flex: 1,
              justifyContent: 'center'
            }}>
              {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map((option) => (
                <button
                  key={option}
                  onClick={() => updateFormData('gender', option)}
                  style={{
                    padding: isMobile ? '20px 16px' : '24px 20px',
                    borderRadius: isMobile ? '8px' : '12px',
                    border: 'none',
                    backgroundColor: formData.gender === option ? '#10b981' : '#1f2937',
                    color: formData.gender === option ? 'white' : '#d1d5db',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    fontSize: isMobile ? '16px' : '18px',
                    fontWeight: '500',
                    minHeight: isMobile ? '60px' : '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <Target style={{ margin: '0 auto 16px', color: '#10b981', fontSize: '48px' }} />
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>What's Holding You Back?</h2>
              <p style={{ color: '#9ca3af' }}>Understanding your challenges helps us help you</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
              {[
                { id: 'Motivation', title: 'I lack motivation', desc: 'Struggling to get motivated to exercise', icon: '⏰' },
                { id: 'Disciplined', title: 'I am not disciplined', desc: 'Feeling tired and unmotivated to exercise', icon: '⚡' },
                { id: 'Time', title: 'I dont have enough time', desc: 'Not sure where to start or what to do', icon: '🎯' },
                { id: 'Phone', title: 'I scroll too much phone', desc: 'Having trouble sticking to a routine', icon: '📅' }
              
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateFormData('holdingBack', option.id)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: formData.holdingBack === option.id ? '2px solid #10b981' : '2px solid transparent',
                    backgroundColor: formData.holdingBack === option.id ? '#10b981' : '#1f2937',
                    color: formData.holdingBack === option.id ? 'white' : '#d1d5db',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{option.title}</div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <MessageSquare style={{ margin: '0 auto 16px', color: '#10b981', fontSize: '48px' }} />
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>What Do You Want to Improve?</h2>
              <p style={{ color: '#9ca3af' }}>Your goals shape your personalized program</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
              {[
                { id: 'better_health', title: 'Better Health', desc: 'Lose excess weight and achieve a healthier body composition' },
                { id: 'more_energy', title: 'More Energy', desc: 'Build lean muscle mass and increase strength' },
                { id: 'increased_focus', title: 'Better focus and concentration', desc: 'Improve stamina, endurance, and heart health' },
                { id: 'confidence', title: 'Confidence & Mental Health', desc: 'Feel more confident and improve mental wellness' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateFormData('improve', option.id)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: formData.improve === option.id ? '2px solid #10b981' : '2px solid transparent',
                    backgroundColor: formData.improve === option.id ? '#10b981' : '#1f2937',
                    color: formData.improve === option.id ? 'white' : '#d1d5db',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{option.title}</div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <Quote style={{ margin: '0 auto 16px', color: '#10b981', fontSize: '48px' }} />
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Daily Motivation</h2>
              <p style={{ color: '#9ca3af' }}>Let these words inspire your journey</p>
            </div>
            <div style={{
              background: 'linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
              borderRadius: '12px',
              padding: '32px',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuote}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  style={{ textAlign: 'center' }}
                >
                  <p style={{ fontSize: '20px', color: 'white', fontStyle: 'italic', lineHeight: '1.6' }}>
                    "{motivationalQuotes[currentQuote]}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        );

      case 8:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: isMobile ? '24px' : '32px' }}>
              <Zap style={{ margin: '0 auto 16px', color: '#10b981', fontSize: isMobile ? '36px' : '48px' }} />
              <h2 style={{ fontSize: isMobile ? '24px' : '30px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Almost There!</h2>
              <p style={{ color: '#9ca3af', fontSize: isMobile ? '14px' : '16px' }}>Choose your biggest fitness challenge</p>
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(200px, 1fr))', 
              gap: isMobile ? '12px' : '16px' 
            }}>
              {challenges.map((challenge, index) => (
                <motion.button
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => updateFormData('challenge', challenge.id)}
                  style={{
                    padding: isMobile ? '20px' : '24px',
                    borderRadius: isMobile ? '8px' : '12px',
                    border: 'none',
                    background: formData.challenge === challenge.id 
                      ? 'linear-gradient(135deg, #10b981, #059669)' 
                      : '#1f2937',
                    color: formData.challenge === challenge.id ? 'white' : '#d1d5db',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    minHeight: isMobile ? '120px' : 'auto'
                  }}
                >
                  <div style={{ fontSize: isMobile ? '20px' : '24px', marginBottom: '8px' }}>{challenge.icon}</div>
                  <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '600', marginBottom: '8px' }}>{challenge.title}</h3>
                  <p style={{ fontSize: isMobile ? '12px' : '14px', opacity: 0.8 }}>{challenge.desc}</p>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 9:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <Phone style={{ margin: '0 auto 16px', color: '#10b981', fontSize: '48px' }} />
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Stay Connected</h2>
              <p style={{ color: '#9ca3af' }}>We'll send you personalized tips and updates</p>
            </div>
            <input
              type="tel"
              placeholder="Your mobile number"
              value={formData.mobile}
              onChange={(e) => updateFormData('mobile', e.target.value)}
              style={{
                width: '100%',
                padding: '16px 24px',
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#10b981';
                e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#374151';
                e.target.style.boxShadow = 'none';
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                🎉 Congratulations! Your personalized Marathon Route is ready!
              </p>
              {submitError && (
                <p style={{ fontSize: '14px', color: '#ef4444', marginTop: '8px' }}>
                  {submitError}
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <style>
        {`
          div[style*="scrollbarWidth: 'none'"]::-webkit-scrollbar {
            display: none;
          }
          
          /* Mobile-specific styles */
          @media (max-width: 768px) {
            input, button {
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
            }
            
            input[type="number"] {
              -moz-appearance: textfield;
            }
            
            input[type="number"]::-webkit-outer-spin-button,
            input[type="number"]::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            
            /* Mobile form improvements */
            .mobile-form-container {
              max-height: 100%;
              overflow-y: auto;
              -webkit-overflow-scrolling: touch;
            }
            
            /* Mobile bottom section */
            .mobile-bottom-section {
              position: relative;
              z-index: 1;
            }
            
            /* Smooth scrolling for mobile */
            * {
              -webkit-overflow-scrolling: touch;
            }
          }
        `}
      </style>
      <div style={{
        height: '100vh',
        background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #000000 100%)',
        overflow: 'hidden'
      }}>
      {/* Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '8px',
        backgroundColor: '#1f2937',
        zIndex: 50
      }}>
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(to right, #10b981, #10b981)'
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div style={{ 
        display: 'flex', 
        height: '100vh', 
        paddingTop: '8px',
        flexDirection: isMobile ? 'column' : 'row',
        overflow: isMobile ? 'hidden' : 'visible'
      }}>
        {/* Left Side - Form */}
        <div 
          className={isMobile ? 'mobile-form-container' : ''}
          style={{
            width: isMobile ? '100%' : '40%',
            height: isMobile ? '100%' : '500px',
            display: 'flex',
            flexDirection: 'column',
            padding: isMobile ? '16px 20px' : '16px 32px'
          }}
        >
          {/* Fixed Header */}
          <div style={{
            flexShrink: 0,
            paddingBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ width: '100%', maxWidth: '512px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`header-${currentStep}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 style={{
                    fontSize: isMobile ? '24px' : '32px',
                    fontWeight: '700',
                    color: '#10b981',
                    marginBottom: '8px',
                    textAlign: 'center'
                  }}>
                    {getStepTitle()}
                  </h1>
                  <p style={{
                    fontSize: isMobile ? '14px' : '16px',
                    color: '#9ca3af',
                    textAlign: 'center',
                    lineHeight: '1.5'
                  }}>
                    {getStepSubtitle()}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div 
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflowY: isMobile ? 'auto' : 'auto',
              overflowX: 'hidden',
              minHeight: "300px",
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingBottom: isMobile ? '10px' : '0px'
            }}
          >
            <div style={{ width: '100%', maxWidth: '512px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundColor: 'rgba(17, 24, 39, 0.5)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: isMobile ? '12px' : '16px',
                    padding: isMobile ? '20px' : '32px',
                    border: '1px solid rgba(55, 65, 81, 0.5)',
                    position: 'relative'
                  }}
                >
                  {/* Back Arrow Button */}
                  {currentStep > 0 && (
                    <button
                      onClick={prevStep}
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        color: '#10b981',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        zIndex: 10
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}
                  
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Fixed Footer */}
          <div style={{
            flexShrink: 0,
            paddingTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ width: '100%', maxWidth: '512px' }}>
              {/* Step Counter */}
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <p style={{ color: '#9ca3af', fontSize: '14px' }}>
                  Step {currentStep + 1} of {totalSteps}
                </p>
              </div>

              {/* Continue Button */}
              <AnimatePresence>
                {showContinue && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={nextStep}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, #10b981, #059669)',
                      color: 'white',
                      padding: isMobile ? '14px 20px' : '16px 24px',
                      borderRadius: isMobile ? '8px' : '12px',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s',
                      fontSize: isMobile ? '16px' : '16px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(to right, #059669, #047857)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(to right, #10b981, #059669)';
                    }}
                  >
                    {isSubmitting ? 'Saving...' : currentStep === totalSteps - 1 ? 'Complete Journey' : 'Continue'}
                    <ChevronRight size={20} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Section with Images and Triangle */}
          {/* {isMobile && (
            <div 
              className="mobile-bottom-section object-[left_bottom]"
              style={{
                width: '100%',
                height: '40%',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#1f2937',
                clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)',
                marginTop: 'auto'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                  }}
                >
                  <img
                    src={fitnessImages[currentStep]}
                    alt="Fitness inspiration"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      backgroundColor: '#374151'
                    }}
                    onLoad={() => {}}
                    onError={(e) => {
                      console.error('Mobile image failed to load:', fitnessImages[currentStep], e);
                      e.currentTarget.style.backgroundColor = '#6b7280';
                      e.currentTarget.style.display = 'flex';
                      e.currentTarget.style.alignItems = 'center';
                      e.currentTarget.style.justifyContent = 'center';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.fontSize = '18px';
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, transparent, rgba(17, 24, 39, 0.8))'
                  }} />
                </motion.div>
              </AnimatePresence>
            </div>
          )} */}

        {/* Right Side - Dynamic Image */}
        <div style={{
          display: isMobile ? 'none' : 'block',
          width: '60%',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#1f2937',
          clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
            >
              <img
                src={fitnessImages[currentStep]}
                alt="Fitness inspiration"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  backgroundColor: '#374151'
                }}
                onLoad={() => {}}
                onError={(e) => {
                  console.error('Image failed to load:', fitnessImages[currentStep], e);
                  e.currentTarget.style.backgroundColor = '#6b7280';
                  e.currentTarget.style.display = 'flex';
                  e.currentTarget.style.alignItems = 'center';
                  e.currentTarget.style.justifyContent = 'center';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.fontSize = '18px';
                }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to left, transparent, rgba(17, 24, 39, 0.5))'
              }} />
              {/* Triangular overlay for better visual effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '20%',
                height: '100%',
                background: 'linear-gradient(to right, rgba(17, 24, 39, 0.8), transparent)',
                clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)'
              }} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* OTP Modal */}
      <MarathonOtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        phone={otpPhone}
        countryCode={otpCountryCode}
        onVerified={handleOtpVerified}
        onError={handleOtpError}
      />

      {/* Challenge Selection Modal */}
      <ChallengeSelectionModal
        isOpen={showChallengeSelection}
        onClose={() => setShowChallengeSelection(false)}
        onChallengesSelected={handleChallengesSelected}
        user={user}
      />

      {/* Calories Burned Modal */}
      <MarathonCaloriesModal
        isOpen={showCaloriesModal}
        onClose={() => setShowCaloriesModal(false)}
        userWeight={parseFloat(formData.weight) || 70}
        onComplete={handleCaloriesComplete}
      />

      {/* Success Modal */}
      <MarathonSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onRedirect={handleSuccessRedirect}
      />
      </div>
    </>
  );
}
