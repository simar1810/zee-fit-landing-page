import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Trophy, Target, Percent, X } from 'lucide-react';

interface MarathonCaloriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  userWeight: number; // Weight in kg
  onComplete: () => void;
}

const TOTAL_INDIA_CALORIES = 10000;

export const MarathonCaloriesModal: React.FC<MarathonCaloriesModalProps> = ({
  isOpen,
  onClose,
  userWeight,
  onComplete,
}) => {
  const [totalCalories, setTotalCalories] = useState(0);
  const [userCalories, setUserCalories] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const targetCalories = Math.round(userWeight * 4);
  const maxCalories = Math.round(userWeight * 6);

  const userPercentOfIndia = ((userCalories / TOTAL_INDIA_CALORIES) * 100).toFixed(6);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTotalCalories(0);
      setUserCalories(0);
      setAnimationComplete(false);

      const totalDuration = 2000;
      const totalSteps = 40;
      const totalStepSize = maxCalories / totalSteps;
      const totalStepInterval = totalDuration / totalSteps;

      let totalStep = 0;
      const totalInterval = setInterval(() => {
        totalStep++;
        setTotalCalories(Math.min(totalStep * totalStepSize, maxCalories));
        if (totalStep >= totalSteps) clearInterval(totalInterval);
      }, totalStepInterval);

      const userDuration = 2500;
      const userSteps = 50;
      const userStepSize = targetCalories / userSteps;
      const userStepInterval = userDuration / userSteps;

      let userStep = 0;
      const userInterval = setInterval(() => {
        userStep++;
        setUserCalories(Math.min(userStep * userStepSize, targetCalories));
        if (userStep >= userSteps) {
          clearInterval(userInterval);
          setAnimationComplete(true);
        }
      }, userStepInterval);

      return () => {
        clearInterval(totalInterval);
        clearInterval(userInterval);
      };
    }
  }, [isOpen, targetCalories, maxCalories]);

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: isMobile ? '8px' : '16px',
          overflow: 'hidden',
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
            borderRadius: isMobile ? '12px' : '16px',
            border: '1px solid rgba(55, 65, 81, 0.5)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            maxWidth: isMobile ? '100%' : '650px',
            width: '100%',
            maxHeight: isMobile ? '90vh' : '80vh',
            minHeight: isMobile ? '300px' : '400px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            marginTop: isMobile ? '20px' : '0',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isMobile ? '16px' : '24px',
            borderBottom: '1px solid rgba(55, 65, 81, 0.5)',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#f97316',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Flame style={{ width: '20px', height: '20px', color: 'white' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                  Calories Burned
                </h2>
                <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
                  Your fitness journey starts now!
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: '32px', height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X style={{ width: '16px', height: '16px', color: '#10b981' }} />
            </button>
          </div>

          {/* Content */}
          <div style={{
            flex: 1,
            padding: isMobile ? '16px' : '24px',
            overflow: 'auto', // allow scrolling on mobile
            maxHeight: isMobile ? 'calc(90vh - 120px)' : 'none',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '32px', position: 'relative' }}>
              {/* Static blocks */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  fontSize: isMobile ? '18px' : '22px', 
                  fontWeight: 'bold', 
                  color: 'white', 
                  marginBottom: '8px' 
                }}>
                  Total Calories Burned (India)
                </h3>
                <motion.div
                  style={{ 
                    fontSize: isMobile ? '28px' : '40px', 
                    fontWeight: 'bold', 
                    color: '#f97316', 
                    marginBottom: '8px' 
                  }}
                  key={totalCalories}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {TOTAL_INDIA_CALORIES.toLocaleString()}
                </motion.div>
                <p style={{ 
                  color: '#9ca3af', 
                  margin: 0, 
                  fontSize: isMobile ? '12px' : '14px' 
                }}>
                  kcal combined by all participants
                </p>
              </div>

              {/* Target */}
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderRadius: isMobile ? '6px' : '8px',
                padding: isMobile ? '12px' : '16px',
                marginBottom: isMobile ? '16px' : '24px',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Target style={{ width: isMobile ? '16px' : '20px', height: isMobile ? '16px' : '20px', color: '#10b981' }} />
                  <span style={{ 
                    fontWeight: '500', 
                    color: 'white', 
                    fontSize: isMobile ? '14px' : '16px' 
                  }}>
                    Your Target
                  </span>
                </div>
                <motion.div
                  style={{ 
                    fontSize: isMobile ? '24px' : '36px', 
                    fontWeight: 'bold', 
                    color: '#10b981' 
                  }}
                  key={userCalories}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {Math.round(userCalories)}
                </motion.div>
                <p style={{ 
                  fontSize: isMobile ? '12px' : '14px', 
                  color: '#9ca3af', 
                  margin: 0 
                }}>
                  kcal ({userWeight}kg × 4km)
                </p>
              </div>

              {/* Contribution */}
              <div style={{
                backgroundColor: 'rgba(249, 115, 22, 0.1)',
                borderRadius: isMobile ? '6px' : '8px',
                padding: isMobile ? '12px' : '16px',
                marginBottom: isMobile ? '16px' : '24px',
                border: '1px solid rgba(249, 115, 22, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Percent style={{ width: isMobile ? '16px' : '20px', height: isMobile ? '16px' : '20px', color: '#f97316' }} />
                  <span style={{ 
                    fontWeight: '500', 
                    color: 'white', 
                    fontSize: isMobile ? '14px' : '16px' 
                  }}>
                    Your Contribution
                  </span>
                </div>
                <motion.div
                  style={{ 
                    fontSize: isMobile ? '20px' : '28px', 
                    fontWeight: 'bold', 
                    color: '#f97316' 
                  }}
                  key={userPercentOfIndia}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {userPercentOfIndia}%
                </motion.div>
                <p style={{ 
                  fontSize: isMobile ? '12px' : '14px', 
                  color: '#9ca3af', 
                  margin: 0 
                }}>
                  of India's total effort
                </p>
              </div>

              {/* Progress Bar */}
              <div style={{
                width: '100%',
                backgroundColor: '#374151',
                borderRadius: '9999px',
                height: '12px',
                marginBottom: '24px'
              }}>
                <motion.div
                  style={{
                    background: 'linear-gradient(to right, #10b981, #f97316)',
                    height: '12px',
                    borderRadius: '9999px'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((userCalories / targetCalories) * 100, 100)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Achievement - layered absolutely to prevent height jump */}
              <div style={{ minHeight: '70px', position: 'relative' }}>
                <AnimatePresence>
                  {animationComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '8px',
                        padding: '16px',
                        position: 'absolute',
                        left: 0, right: 0,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                        <Trophy style={{ width: '20px', height: '20px', color: '#10b981' }} />
                        <span style={{ fontWeight: '500', color: '#10b981' }}>Congratulations!</span>
                      </div>
                      <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
                        You’ve reached your target of {targetCalories} calories!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: isMobile ? '8px' : '12px', 
              marginTop: 'auto',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <motion.button
                onClick={handleComplete}
                style={{
                  flex: 1,
                  background: 'linear-gradient(to right, #10b981, #059669)',
                  color: 'white',
                  padding: isMobile ? '14px 16px' : '12px 16px',
                  borderRadius: isMobile ? '6px' : '8px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: isMobile ? '14px' : '16px'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trophy style={{ width: '16px', height: '16px' }} />
                Continue to Challenges
              </motion.button>

              <motion.button
                onClick={onClose}
                style={{
                  padding: isMobile ? '14px 16px' : '12px 16px',
                  color: '#6b7280',
                  fontWeight: '500',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: isMobile ? '14px' : '16px'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
