import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Target, Calendar, Users, ArrowRight } from 'lucide-react';
import config from '../utils/config';

interface Challenge {
  _id: string;
  name: string;
  slug: string;
  goalType: string;
  status: string;
  startsAt: string;
  endsAt: string;
  rules: {
    minSteps?: number;
    minCalories?: number;
    minWeightLoss?: number;
  };
  cities?: string[];
  description?: string;
}

interface ChallengeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChallengesSelected: (selectedChallenges: string[]) => void;
  user: any;
}

export function ChallengeSelectionModal({ 
  isOpen, 
  onClose, 
  onChallengesSelected, 
  user 
}: ChallengeSelectionModalProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadChallenges();
    }
  }, [isOpen]);

  const loadChallenges = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${config.API_BASE_URL}/challenges/get-all`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getCookie('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load challenges');
      }

      const data = await response.json();
      setChallenges(data.data?.challenges || []);
    } catch (err: any) {
      console.error('Error loading challenges:', err);
      setError(err.message || 'Failed to load challenges');
    } finally {
      setLoading(false);
    }
  };

  const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const toggleChallenge = (challengeId: string) => {
    setSelectedChallenges(prev => 
      prev.includes(challengeId) 
        ? prev.filter(id => id !== challengeId)
        : [...prev, challengeId]
    );
  };

  const handleContinue = () => {
    onChallengesSelected(selectedChallenges);
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getGoalTypeIcon = (goalType: string) => {
    switch (goalType) {
      case 'steps':
        return '👟';
      case 'weight_loss':
        return '⚖️';
      case 'calories':
        return '🔥';
      case 'consistency':
        return '📅';
      case 'marathon':
        return '🏃';
      default:
        return '🎯';
    }
  };

  const getGoalTypeLabel = (goalType: string) => {
    switch (goalType) {
      case 'steps':
        return 'Daily Steps';
      case 'weight_loss':
        return 'Weight Loss';
      case 'calories':
        return 'Calories Burned';
      case 'consistency':
        return 'Consistency';
      case 'marathon':
        return 'Marathon';
      default:
        return 'Fitness Goal';
    }
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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{
            backgroundColor: '#1f2937',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #374151',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 0.25rem 0'
              }}>
                Choose Your Challenges
              </h2>
              <p style={{
                color: '#9ca3af',
                margin: '0',
                fontSize: '0.875rem'
              }}>
                Select the challenges you want to participate in
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.backgroundColor = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9ca3af';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>
          </div>

          {/* Content */}
          <div style={{
            padding: '1.5rem',
            flex: 1,
            overflowY: 'auto'
          }}>
            {loading ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  border: '4px solid #10b981',
                  borderTop: '4px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <span style={{ color: '#9ca3af', marginLeft: '0.75rem' }}>
                  Loading challenges...
                </span>
              </div>
            ) : error ? (
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                color: '#ef4444'
              }}>
                <p>{error}</p>
                <button
                  onClick={loadChallenges}
                  style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer'
                  }}
                >
                  Try Again
                </button>
              </div>
            ) : challenges.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                color: '#9ca3af'
              }}>
                <Target style={{ width: '48px', height: '48px', margin: '0 auto 1rem', color: '#6b7280' }} />
                <p>No challenges available at the moment.</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem'
              }}>
                {challenges.map((challenge) => (
                  <motion.div
                    key={challenge._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      backgroundColor: selectedChallenges.includes(challenge._id) ? '#065f46' : '#374151',
                      border: selectedChallenges.includes(challenge._id) ? '2px solid #10b981' : '2px solid #4b5563',
                      borderRadius: '8px',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onClick={() => toggleChallenge(challenge._id)}
                    onMouseEnter={(e) => {
                      if (!selectedChallenges.includes(challenge._id)) {
                        e.currentTarget.style.backgroundColor = '#4b5563';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!selectedChallenges.includes(challenge._id)) {
                        e.currentTarget.style.backgroundColor = '#374151';
                      }
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginBottom: '0.75rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>
                          {getGoalTypeIcon(challenge.goalType)}
                        </span>
                        <div>
                          <h3 style={{
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: '600',
                            margin: '0 0 0.25rem 0'
                          }}>
                            {challenge.name}
                          </h3>
                          <p style={{
                            color: '#9ca3af',
                            fontSize: '0.875rem',
                            margin: '0'
                          }}>
                            {getGoalTypeLabel(challenge.goalType)}
                          </p>
                        </div>
                      </div>
                      {selectedChallenges.includes(challenge._id) && (
                        <div style={{
                          width: '20px',
                          height: '20px',
                          backgroundColor: '#10b981',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Check style={{ width: '12px', height: '12px', color: 'white' }} />
                        </div>
                      )}
                    </div>

                    {challenge.description && (
                      <p style={{
                        color: '#d1d5db',
                        fontSize: '0.875rem',
                        marginBottom: '0.75rem',
                        lineHeight: '1.4'
                      }}>
                        {challenge.description}
                      </p>
                    )}

                    <div style={{ marginBottom: '0.75rem' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#9ca3af',
                        marginBottom: '0.5rem'
                      }}>
                        <Calendar style={{ width: '14px', height: '14px' }} />
                        <span>
                          {formatDate(challenge.startsAt)} - {formatDate(challenge.endsAt)}
                        </span>
                      </div>
                      
                      {challenge.rules.minSteps && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.875rem',
                          color: '#9ca3af',
                          marginBottom: '0.25rem'
                        }}>
                          <Target style={{ width: '14px', height: '14px' }} />
                          <span>Min {challenge.rules.minSteps.toLocaleString()} steps/day</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid #374151',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}>
            <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
              {selectedChallenges.length} challenge{selectedChallenges.length !== 1 ? 's' : ''} selected
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={onClose}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'transparent',
                  color: '#9ca3af',
                  border: '1px solid #4b5563',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = '#6b7280';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#9ca3af';
                  e.currentTarget.style.borderColor = '#4b5563';
                }}
              >
                Skip for Now
              </button>
              <button
                onClick={handleContinue}
                disabled={selectedChallenges.length === 0}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: selectedChallenges.length > 0 ? '#10b981' : '#4b5563',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: selectedChallenges.length > 0 ? 'pointer' : 'not-allowed',
                  fontSize: '1rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  minWidth: '120px',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  if (selectedChallenges.length > 0) {
                    e.currentTarget.style.backgroundColor = '#059669';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedChallenges.length > 0) {
                    e.currentTarget.style.backgroundColor = '#10b981';
                  }
                }}
              >
                Continue
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
