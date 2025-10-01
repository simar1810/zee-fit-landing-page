import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Trophy, Target } from 'lucide-react';

interface CaloriesBurnedModalProps {
  isOpen: boolean;
  onClose: () => void;
  userWeight: number; // Weight in kg
  onComplete: () => void;
}

export const CaloriesBurnedModal: React.FC<CaloriesBurnedModalProps> = ({
  isOpen,
  onClose,
  userWeight,
  onComplete,
}) => {
  const [totalCalories, setTotalCalories] = useState(0);
  const [userCalories, setUserCalories] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Calculate target calories (weight * 4km)
  const targetCalories = Math.round(userWeight * 4);
  const maxCalories = Math.round(userWeight * 6); // Maximum calories for animation

  useEffect(() => {
    if (isOpen) {
      // Reset values when modal opens
      setTotalCalories(0);
      setUserCalories(0);
      setAnimationComplete(false);

      // Animate total calories
      const totalInterval = setInterval(() => {
        setTotalCalories(prev => {
          if (prev >= maxCalories) {
            clearInterval(totalInterval);
            return maxCalories;
          }
          return prev + Math.random() * 5 + 1; // Random increment
        });
      }, 50);

      // Animate user calories (weight * 4km)
      const userInterval = setInterval(() => {
        setUserCalories(prev => {
          if (prev >= targetCalories) {
            clearInterval(userInterval);
            setAnimationComplete(true);
            return targetCalories;
          }
          return prev + Math.random() * 3 + 0.5; // Slower increment
        });
      }, 80);

      // Cleanup intervals
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
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 overflow-y-hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Calories Burned</h2>
                <p className="text-sm text-gray-600">Your fitness journey starts now!</p>
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
            {/* Calories Display */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Total Calories Burned</h3>
                <motion.div
                  className="text-4xl font-bold text-orange-600 mb-2"
                  key={totalCalories}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {Math.round(totalCalories)}
                </motion.div>
                <p className="text-gray-600">kcal</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-700">Your Target</span>
                </div>
                <motion.div
                  className="text-3xl font-bold text-green-600"
                  key={userCalories}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {Math.round(userCalories)}
                </motion.div>
                <p className="text-sm text-gray-600">kcal ({userWeight}kg × 4km)</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <motion.div
                  className="bg-gradient-to-r from-green-500 to-orange-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${Math.min((userCalories / targetCalories) * 100, 100)}%` 
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Achievement Message */}
              <AnimatePresence>
                {animationComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Congratulations!</span>
                    </div>
                    <p className="text-sm text-green-700">
                      You've reached your target of {targetCalories} calories!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={handleComplete}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trophy className="w-4 h-4" />
                Continue to Challenges
              </motion.button>
              
              <motion.button
                onClick={onClose}
                className="px-4 py-3 text-gray-600 hover:text-gray-800 font-medium"
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
