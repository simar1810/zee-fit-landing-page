import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, Target, ArrowRight, Loader2, LogOut, Eye, BarChart3, ArrowLeft, TrendingUp } from 'lucide-react';
import { getCurrentUser, clearAllAuthData } from '../utils/cookies';
import { apiService, Challenge } from '../services/api';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ProgressUpdateModal } from './ProgressUpdateModal';

export const ChallengesPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [user, setUser] = React.useState(getCurrentUser());
  const [challenges, setChallenges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [challengeProgress, setChallengeProgress] = useState<any>(null);
  const [showProgressUpdateModal, setShowProgressUpdateModal] = useState(false);

  const handleLogout = async () => {
    try {
      // Clear all authentication data
      clearAllAuthData();
      
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    console.log('ChallengesPage: User authenticated:', !!user);
    console.log('ChallengesPage: User data:', user);
    console.log('ChallengesPage: Current route:', location.pathname);
    console.log('ChallengesPage: Challenge ID:', id);
    
    if (user) {
      if (id) {
        // Individual challenge or progress view
        if (location.pathname.includes('/progress')) {
          loadChallengeProgress(id);
        } else {
          loadChallengeDetails(id);
        }
      } else {
        // Main challenges list
      loadChallenges();
      }
    } else {
      setIsLoading(false);
    }
  }, [user, id, location.pathname]);

  const loadChallenges = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check if user is authenticated
      if (!user) {
        setError('You must be logged in to view challenges');
        setIsLoading(false);
        return;
      }
      
      // Load user's joined challenges instead of all challenges
      console.log('Loading my challenges...');
      const response = await apiService.getMyChallenges();
      console.log('My challenges response:', response);
      setChallenges(response.data?.challenges || []);
    } catch (err: any) {
      console.error('Error loading challenges:', err);
      setError(err.message || 'Failed to load challenges');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewChallenge = (challengeId: string) => {
    // Navigate to challenge details page
    navigate(`/challenges/${challengeId}`);
  };

  const handleViewProgress = (challengeId: string) => {
    // Navigate to challenge progress page
    navigate(`/challenges/${challengeId}/progress`);
  };

  const handleUpdateProgress = () => {
    setShowProgressUpdateModal(true);
  };

  const handleProgressUpdated = async () => {
    // Refresh the current view data
    if (id) {
      if (location.pathname.includes('/progress')) {
        await loadChallengeProgress(id);
      } else {
        await loadChallengeDetails(id);
      }
    } else {
      await loadChallenges();
    }
  };

  const loadChallengeDetails = async (challengeId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Loading challenge details for ID:', challengeId);
      const response = await apiService.getChallengeById(challengeId);
      console.log('Challenge details response:', response);
      if (response.data && (response.data as any).challenge) {
        setSelectedChallenge((response.data as any).challenge);
      } else {
        setSelectedChallenge(response.data);
      }
    } catch (err: any) {
      console.error('Error loading challenge details:', err);
      setError(err.message || 'Failed to load challenge details');
    } finally {
      setIsLoading(false);
    }
  };

  const loadChallengeProgress = async (challengeId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Loading challenge progress for ID:', challengeId);
      const response = await apiService.getChallengeProgress(challengeId);
      console.log('Challenge progress response:', response);
      setChallengeProgress(response.data);
    } catch (err: any) {
      console.error('Error loading challenge progress:', err);
      setError(err.message || 'Failed to load challenge progress');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString('en-US', {
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
        return 'Calorie Burn';
      case 'consistency':
        return 'Consistency';
      case 'marathon':
        return 'Marathon Training';
      default:
        return goalType;
    }
  };

  // Determine what content to show based on the route
  const isProgressView = location.pathname.includes('/progress');
  const isChallengeDetailsView = id && !isProgressView;
  const isChallengesListView = !id;

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f9fafb', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 style={{ 
            width: '32px', 
            height: '32px', 
            animation: 'spin 1s linear infinite', 
            color: '#10b981', 
            margin: '0 auto 16px' 
          }} />
          <p style={{ color: '#6b7280' }}>
            {isProgressView ? 'Loading progress...' : 
             isChallengeDetailsView ? 'Loading challenge details...' : 
             'Loading challenges...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {(isChallengeDetailsView || isProgressView) && (
                <button
                  onClick={() => navigate('/challenges')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#6b7280',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '0.375rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#374151';
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <ArrowLeft style={{ width: '16px', height: '16px' }} />
                  Back to Challenges
                </button>
              )}
            <div>
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#111827',
                margin: '0 0 0.25rem 0'
                }}>
                  {isProgressView ? 'Challenge Progress' : 
                   isChallengeDetailsView ? 'Challenge Details' : 
                   'ZeeFit Challenges'}
                </h1>
                <p style={{ color: '#6b7280', margin: '0' }}>
                  {isProgressView ? 'Track your progress and achievements' :
                   isChallengeDetailsView ? 'View challenge details and rules' :
                   `Welcome back, ${user?.name || 'User'}!`}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#6b7280',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '0.375rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              <LogOut style={{ width: '16px', height: '16px' }} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {error && (
          <div style={{
            marginBottom: '1.5rem',
            padding: '1rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '0.5rem'
          }}>
            <p style={{ color: '#991b1b', margin: '0' }}>{error}</p>
          </div>
        )}

        {/* Render different content based on route */}
        {isProgressView && challengeProgress && (
          <ChallengeProgressView 
            challengeProgress={challengeProgress} 
            onViewDetails={() => navigate(`/challenges/${id}`)}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {isChallengeDetailsView && selectedChallenge && (
          <ChallengeDetailsView 
            challenge={selectedChallenge} 
            onViewProgress={() => navigate(`/challenges/${id}/progress`)}
          />
        )}

        {isChallengesListView && (
          <>
        {challenges.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <Trophy style={{ width: '64px', height: '64px', color: '#9ca3af', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>No Joined Challenges</h3>
            <p style={{ color: '#6b7280' }}>You haven't joined any challenges yet. Start your fitness journey!</p>
            <button
              onClick={() => navigate('/')}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Browse Challenges
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {challenges.map((challengeData) => {
              const challenge = challengeData.challenge;
              const participation = challengeData.participation;
              return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: '1px solid #e5e7eb',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                }}
              >
                <div style={{ padding: '1.5rem' }}>
                  {/* Challenge Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{getGoalTypeIcon(challenge.goalType)}</span>
                      <div>
                        <h3 style={{
                          fontWeight: '600',
                          color: '#111827',
                          margin: '0 0 0.25rem 0'
                        }}>{challenge.name}</h3>
                        <p style={{
                          fontSize: '0.875rem',
                          color: '#6b7280',
                          margin: '0'
                        }}>{getGoalTypeLabel(challenge.goalType)}</p>
                      </div>
                    </div>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: challenge.status === 'active' ? '#dcfce7' : 
                                      challenge.status === 'completed' ? '#fef3c7' : '#e5e7eb',
                      color: challenge.status === 'active' ? '#166534' : 
                             challenge.status === 'completed' ? '#92400e' : '#374151',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      borderRadius: '9999px'
                    }}>
                      {challenge.status}
                    </span>
                  </div>

                  {/* Challenge Details */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      marginBottom: '0.75rem'
                    }}>
                      <Calendar style={{ width: '16px', height: '16px' }} />
                      <span>
                        {formatDate(challenge.startsAt)} - {formatDate(challenge.endsAt)}
                      </span>
                    </div>
                    
                    {challenge.rules?.title && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        marginBottom: '0.75rem'
                      }}>
                        <Target style={{ width: '16px', height: '16px' }} />
                        <span>{challenge.rules.title}</span>
                      </div>
                    )}

                    {challenge.cities && challenge.cities.length > 0 && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        marginBottom: '0.75rem'
                      }}>
                        <Users style={{ width: '16px', height: '16px' }} />
                        <span>{challenge.cities.join(', ')}</span>
                      </div>
                    )}

                    {/* Participation Info */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      marginBottom: '0.75rem'
                    }}>
                      <Trophy style={{ width: '16px', height: '16px' }} />
                      <span>Joined {formatDate(participation.joinedAt)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <motion.button
                      onClick={() => handleViewChallenge(challenge.id)}
                      style={{
                        flex: 1,
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#2563eb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#3b82f6';
                      }}
                    >
                      <Eye style={{ width: '16px', height: '16px' }} />
                      View
                    </motion.button>
                    
                  <motion.button
                      onClick={() => handleViewProgress(challenge.id)}
                    style={{
                        flex: 1,
                        backgroundColor: '#10b981',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#059669';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#10b981';
                    }}
                  >
                      <BarChart3 style={{ width: '16px', height: '16px' }} />
                      Progress
                  </motion.button>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
        )}
          </>
        )}
      </div>

      {/* Progress Update Modal */}
      {showProgressUpdateModal && id && (
        <ProgressUpdateModal
          isOpen={showProgressUpdateModal}
          onClose={() => setShowProgressUpdateModal(false)}
          challengeId={id}
          challengeName={selectedChallenge?.name || challengeProgress?.challenge?.name || 'Challenge'}
          onProgressUpdated={handleProgressUpdated}
          currentProgress={challengeProgress?.participation}
        />
      )}
    </div>
  );
};

// Challenge Details View Component
const ChallengeDetailsView: React.FC<{ challenge: any; onViewProgress: () => void }> = ({ challenge, onViewProgress }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getGoalTypeIcon = (goalType: string) => {
    switch (goalType) {
      case 'steps': return '👟';
      case 'weight_loss': return '⚖️';
      case 'calories': return '🔥';
      case 'consistency': return '📅';
      case 'marathon': return '🏃';
      default: return '🎯';
    }
  };

  const getGoalTypeLabel = (goalType: string) => {
    switch (goalType) {
      case 'steps': return 'Daily Steps';
      case 'weight_loss': return 'Weight Loss';
      case 'calories': return 'Calorie Burn';
      case 'consistency': return 'Consistency';
      case 'marathon': return 'Marathon Training';
      default: return goalType;
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden'
    }}>
      <div style={{ padding: '2rem' }}>
        {/* Challenge Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>{getGoalTypeIcon(challenge.goalType)}</span>
            <div>
              <h2 style={{
                fontSize: '1.875rem',
                fontWeight: 'bold',
                color: '#111827',
                margin: '0 0 0.5rem 0'
              }}>{challenge.name}</h2>
              <p style={{
                fontSize: '1rem',
                color: '#6b7280',
                margin: '0'
              }}>{getGoalTypeLabel(challenge.goalType)}</p>
            </div>
          </div>
          <span style={{
            padding: '0.5rem 1rem',
            backgroundColor: challenge.joined ? '#dcfce7' : '#fef3c7',
            color: challenge.joined ? '#166534' : '#92400e',
            fontSize: '0.875rem',
            fontWeight: '500',
            borderRadius: '9999px'
          }}>
            {challenge.joined ? 'Joined' : 'Available'}
          </span>
        </div>

        {/* Challenge Details */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem',
            color: '#6b7280',
            marginBottom: '1rem'
          }}>
            <Calendar style={{ width: '20px', height: '20px' }} />
            <span>
              {formatDate(challenge.startsAt)} - {formatDate(challenge.endsAt)}
            </span>
          </div>
          
          {challenge.rules?.title && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              color: '#6b7280',
              marginBottom: '1rem'
            }}>
              <Target style={{ width: '20px', height: '20px' }} />
              <span>{challenge.rules.title}</span>
            </div>
          )}
          
          {challenge.rules?.desc && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              color: '#6b7280',
              marginBottom: '1rem'
            }}>
              <Target style={{ width: '20px', height: '20px' }} />
              <span>{challenge.rules.desc}</span>
            </div>
          )}

          {challenge.cities && challenge.cities.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              color: '#6b7280',
              marginBottom: '1rem'
            }}>
              <Users style={{ width: '20px', height: '20px' }} />
              <span>Available in: {challenge.cities.join(', ')}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <motion.button
          onClick={onViewProgress}
          style={{
            width: '100%',
            backgroundColor: '#10b981',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#059669';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#10b981';
          }}
        >
          <BarChart3 style={{ width: '20px', height: '20px' }} />
          View Progress
        </motion.button>
      </div>
    </div>
  );
};

// Challenge Progress View Component
const ChallengeProgressView: React.FC<{ challengeProgress: any; onViewDetails: () => void; onUpdateProgress: () => void }> = ({ challengeProgress, onViewDetails, onUpdateProgress }) => {
  const { challenge, participation, progress } = challengeProgress;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getGoalTypeIcon = (goalType: string) => {
    switch (goalType) {
      case 'steps': return '👟';
      case 'weight_loss': return '⚖️';
      case 'calories': return '🔥';
      case 'consistency': return '📅';
      case 'marathon': return '🏃';
      default: return '🎯';
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden'
    }}>
      <div style={{ padding: '2rem' }}>
        {/* Challenge Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>{getGoalTypeIcon(challenge.goalType)}</span>
            <div>
              <h2 style={{
                fontSize: '1.875rem',
                fontWeight: 'bold',
                color: '#111827',
                margin: '0 0 0.5rem 0'
              }}>{challenge.name}</h2>
              <p style={{
                fontSize: '1rem',
                color: '#6b7280',
                margin: '0'
              }}>Progress Tracking</p>
            </div>
          </div>
          <span style={{
            padding: '0.5rem 1rem',
            backgroundColor: challenge.status === 'active' ? '#dcfce7' : 
                            challenge.status === 'completed' ? '#fef3c7' : '#e5e7eb',
            color: challenge.status === 'active' ? '#166534' : 
                   challenge.status === 'completed' ? '#92400e' : '#374151',
            fontSize: '0.875rem',
            fontWeight: '500',
            borderRadius: '9999px'
          }}>
            {challenge.status}
          </span>
        </div>

        {/* Progress Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
              {progress.progressPercentage}%
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Progress</div>
          </div>
          
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
              {progress.daysElapsed}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Days Elapsed</div>
          </div>
          
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
              {progress.daysRemaining}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Days Remaining</div>
          </div>
        </div>

        {/* Detailed Progress Metrics */}
        {participation.progressMetrics && Object.keys(participation.progressMetrics).length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              color: '#111827', 
              marginBottom: '1rem' 
            }}>
              Your Progress Details
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem'
            }}>
              {participation.progressMetrics.steps && (
                <div style={{
                  backgroundColor: '#f0f9ff',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #e0f2fe',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0369a1' }}>
                    {participation.progressMetrics.steps.toLocaleString()}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Steps</div>
                </div>
              )}
              
              {participation.progressMetrics.calories && (
                <div style={{
                  backgroundColor: '#fef2f2',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #fecaca',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626' }}>
                    {participation.progressMetrics.calories.toLocaleString()}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Calories</div>
                </div>
              )}
              
              {participation.progressMetrics.distance && (
                <div style={{
                  backgroundColor: '#f0fdf4',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #bbf7d0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>
                    {participation.progressMetrics.distance} km
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Distance</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Spirit Score and Consistency */}
        {(participation.spiritScore || participation.consistencyPct) && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              color: '#111827', 
              marginBottom: '1rem' 
            }}>
              Your Performance
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem'
            }}>
              {participation.spiritScore && (
                <div style={{
                  backgroundColor: '#fefce8',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #fde68a',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d97706' }}>
                    {participation.spiritScore}/10
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Spirit Score</div>
                </div>
              )}
              
              {participation.consistencyPct && (
                <div style={{
                  backgroundColor: '#f3e8ff',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d8b4fe',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9333ea' }}>
                    {participation.consistencyPct}%
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Consistency</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* No Progress Yet */}
        {(!participation.progressMetrics || Object.keys(participation.progressMetrics).length === 0) && 
         !participation.spiritScore && !participation.consistencyPct && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              backgroundColor: '#f9fafb',
              padding: '2rem',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                color: '#111827', 
                marginBottom: '0.5rem' 
              }}>
                No Progress Yet
              </h3>
              <p style={{ 
                color: '#6b7280', 
                marginBottom: '1.5rem' 
              }}>
                Start tracking your progress to see your achievements here
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#10b981',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                <TrendingUp style={{ width: '16px', height: '16px' }} />
                Use "Update Progress" button to get started
              </div>
            </div>
          </div>
        )}

        {/* Challenge Details */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem',
            color: '#6b7280',
            marginBottom: '1rem'
          }}>
            <Calendar style={{ width: '20px', height: '20px' }} />
            <span>
              {formatDate(challenge.startsAt)} - {formatDate(challenge.endsAt)}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem',
            color: '#6b7280',
            marginBottom: '1rem'
          }}>
            <Trophy style={{ width: '20px', height: '20px' }} />
            <span>Joined {formatDate(participation.joinedAt)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <motion.button
            onClick={onUpdateProgress}
            style={{
              flex: 1,
              backgroundColor: '#10b981',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              fontWeight: '500'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#059669';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#10b981';
            }}
          >
            <TrendingUp style={{ width: '20px', height: '20px' }} />
            Update Progress
          </motion.button>

          <motion.button
            onClick={onViewDetails}
            style={{
              flex: 1,
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              fontWeight: '500'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3b82f6';
            }}
          >
            <Eye style={{ width: '20px', height: '20px' }} />
            View Details
          </motion.button>
        </div>
      </div>
    </div>
  );
};
