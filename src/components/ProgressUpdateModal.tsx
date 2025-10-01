import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, TrendingUp, Award } from 'lucide-react';
import { apiService } from '../services/api';

interface ProgressUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  challengeId: string;
  challengeName: string;
  onProgressUpdated: () => void;
  currentProgress?: {
    progressMetrics?: {
      steps?: number;
      calories?: number;
      distance?: number;
    };
    spiritScore?: number;
    consistencyPct?: number;
  };
}

export const ProgressUpdateModal: React.FC<ProgressUpdateModalProps> = ({
  isOpen,
  onClose,
  challengeId,
  challengeName,
  onProgressUpdated,
  currentProgress,
}) => {
  const [progressData, setProgressData] = useState({
    steps: '',
    calories: '',
    distance: '',
    spiritScore: '',
    consistencyPct: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with current progress data
  useEffect(() => {
    if (isOpen && currentProgress) {
      setProgressData({
        steps: currentProgress.progressMetrics?.steps?.toString() || '',
        calories: currentProgress.progressMetrics?.calories?.toString() || '',
        distance: currentProgress.progressMetrics?.distance?.toString() || '',
        spiritScore: currentProgress.spiritScore?.toString() || '',
        consistencyPct: currentProgress.consistencyPct?.toString() || '',
      });
    } else if (isOpen) {
      // Reset form when opening without current progress
      setProgressData({
        steps: '',
        calories: '',
        distance: '',
        spiritScore: '',
        consistencyPct: '',
      });
    }
  }, [isOpen, currentProgress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const updateData: any = {};
      
      // Build progress metrics object
      const progressMetrics: Record<string, any> = {};
      if (progressData.steps) progressMetrics.steps = parseInt(progressData.steps);
      if (progressData.calories) progressMetrics.calories = parseInt(progressData.calories);
      if (progressData.distance) progressMetrics.distance = parseFloat(progressData.distance);
      
      if (Object.keys(progressMetrics).length > 0) {
        updateData.progressMetrics = progressMetrics;
      }
      
      if (progressData.spiritScore) {
        updateData.spiritScore = parseInt(progressData.spiritScore);
      }
      
      if (progressData.consistencyPct) {
        updateData.consistencyPct = parseFloat(progressData.consistencyPct);
      }

      await apiService.updateChallengeProgress(challengeId, updateData);
      
      onProgressUpdated();
      onClose();
      
      // Reset form
      setProgressData({
        steps: '',
        calories: '',
        distance: '',
        spiritScore: '',
        consistencyPct: '',
      });
    } catch (error: any) {
      setError(error.message || 'Failed to update progress');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProgressData(prev => ({
      ...prev,
      [field]: value
    }));
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
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '16px',
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
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px',
            borderBottom: '1px solid rgba(55, 65, 81, 0.5)',
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
                <TrendingUp style={{ width: '20px', height: '20px', color: 'white' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                  Update Progress
                </h2>
                <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
                  {challengeName}
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
            padding: '24px',
            overflow: 'auto',
          }}>
            {/* Current Progress Display */}
            {currentProgress ? (
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '20px'
              }}>
                <h3 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#10b981', 
                  margin: '0 0 12px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Target style={{ width: '16px', height: '16px' }} />
                  Current Progress
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                  {currentProgress.progressMetrics?.steps && (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Steps</div>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>
                        {currentProgress.progressMetrics.steps.toLocaleString()}
                      </div>
                    </div>
                  )}
                  {currentProgress.progressMetrics?.calories && (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Calories</div>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>
                        {currentProgress.progressMetrics.calories.toLocaleString()}
                      </div>
                    </div>
                  )}
                  {currentProgress.progressMetrics?.distance && (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Distance</div>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>
                        {currentProgress.progressMetrics.distance} km
                      </div>
                    </div>
                  )}
                  {currentProgress.spiritScore && (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Spirit Score</div>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>
                        {currentProgress.spiritScore}/10
                      </div>
                    </div>
                  )}
                  {currentProgress.consistencyPct && (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Consistency</div>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>
                        {currentProgress.consistencyPct}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{
                backgroundColor: 'rgba(107, 114, 128, 0.1)',
                border: '1px solid rgba(107, 114, 128, 0.3)',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <h3 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#9ca3af', 
                  margin: '0 0 8px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <Target style={{ width: '16px', height: '16px' }} />
                  No Progress Yet
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#6b7280', 
                  margin: 0 
                }}>
                  Start tracking your progress by filling out the form below
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Progress Metrics */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: 0 }}>
                  Progress Metrics
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      color: '#d1d5db', 
                      marginBottom: '6px' 
                    }}>
                      Steps
                    </label>
                    <input
                      type="number"
                      placeholder="Enter steps taken"
                      value={progressData.steps}
                      onChange={(e) => handleInputChange('steps', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.2s'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      color: '#d1d5db', 
                      marginBottom: '6px' 
                    }}>
                      Calories Burned
                    </label>
                    <input
                      type="number"
                      placeholder="Enter calories burned"
                      value={progressData.calories}
                      onChange={(e) => handleInputChange('calories', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.2s'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      color: '#d1d5db', 
                      marginBottom: '6px' 
                    }}>
                      Distance (km)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Enter distance covered"
                      value={progressData.distance}
                      onChange={(e) => handleInputChange('distance', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.2s'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Spirit Score */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: 0 }}>
                  Spirit Score (1-10)
                </h3>
                <input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="Rate your motivation (1-10)"
                  value={progressData.spiritScore}
                  onChange={(e) => handleInputChange('spiritScore', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                />
              </div>

              {/* Consistency */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: 0 }}>
                  Consistency Percentage
                </h3>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="Enter consistency % (0-100)"
                  value={progressData.consistencyPct}
                  onChange={(e) => handleInputChange('consistencyPct', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                />
              </div>

              {error && (
                <div style={{
                  padding: '12px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  color: '#fca5a5',
                  fontSize: '14px'
                }}>
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(to right, #10b981, #059669)',
                    color: 'white',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '16px',
                    opacity: isLoading ? 0.7 : 1
                  }}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  <Award style={{ width: '16px', height: '16px' }} />
                  {isLoading ? 'Updating...' : 'Update Progress'}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '12px 16px',
                    color: '#6b7280',
                    fontWeight: '500',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
