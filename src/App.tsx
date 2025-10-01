import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { HeroSection } from './components/HeroSection';
import { MovementStory } from './components/MovementStory';
import { CommunityVoices } from './components/CommunityVoices';
import { MicroGamification } from './components/MicroGamification';
import { AboutSection } from './components/AboutSection';
import { MissionSection } from './components/MissionSection';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import { Marathon } from './components/Marathon';
import { ChallengesPage } from './components/ChallengesPage';
import { isAuthenticated, getCurrentUser, getCookie, setCookie, clearAllAuthData } from './utils/cookies';
import config, { validateEnvironment } from './utils/config';
import { LoginPage } from './components/LoginPage';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', overflowX: 'hidden' }}>

      {/* Hero Section with Video Background and Live Counters */}
      <HeroSection />
      
      {/* Movement Story - Horizontal Scroll Journey */}
      <MovementStory />
      
      {/* Community Voices - Video Grid */}
      <CommunityVoices />
      
      {/* Micro Gamification - Interactive Cards */}
      <MicroGamification />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Mission Section - Cinematic Dark Mode */}
      <MissionSection />
      
      {/* Footer */}
      <Footer />
      
      {/* Toast Notifications */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid #e5e7eb',
            color: '#1f2937',
          },
        }}
      />
    </div>
  );
}

// Protected Route Component
const ProtectedRoute = ({ children }: { children: any }) => {
  const [authState, setAuthState] = React.useState({ isAuthenticated: false, isLoading: true });
  
  React.useEffect(() => {
    const checkAuth = async () => {
      const token = getCookie('accessToken');
      const user = getCurrentUser();
      
      
      if (!token || !user) {
        setAuthState({ isAuthenticated: false, isLoading: false });
        return;
      }
      
      // Validate token with backend
      try {
        
        const response = await fetch(`${config.API_BASE_URL}/users/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        
        if (response.ok) {
          setAuthState({ isAuthenticated: true, isLoading: false });
        } else if (response.status === 401) {
          
          // Try to refresh the token
          const refreshToken = getCookie('refreshToken');
          if (refreshToken) {
            try {
              const refreshResponse = await fetch(`${config.API_BASE_URL}/auth/refresh`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
              });
              
              if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();
                
                // Update tokens
                setCookie('accessToken', refreshData.accessToken, 7);
                setCookie('refreshToken', refreshData.refreshToken, 30);
                
                setAuthState({ isAuthenticated: true, isLoading: false });
                return;
              } else {
              }
            } catch (refreshError) {
              console.error('ProtectedRoute - Token refresh error:', refreshError);
            }
          } else {
          }
          
          // If we get here, refresh failed or no refresh token
          clearAllAuthData();
          setAuthState({ isAuthenticated: false, isLoading: false });
        } else {
          const errorData = await response.json().catch(() => ({}));
          

          setAuthState({ isAuthenticated: false, isLoading: false });
        }
      } catch (error) {
        console.error('ProtectedRoute - Token validation failed:', error);
        
        // Clear invalid tokens
        clearAllAuthData();
        setAuthState({ isAuthenticated: false, isLoading: false });
      }
    };
    
    checkAuth();
  }, []);
  
  if (authState.isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f9fafb', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '32px',
            height: '32px',
            border: '4px solid #10b981',
            borderTop: '4px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#6b7280' }}>Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!authState.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/rfu" element={<Marathon />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/challenges" element={
        <ProtectedRoute children={<ChallengesPage />} />
      } />
      <Route path="/challenges/:id" element={
        <ProtectedRoute children={<ChallengesPage />} />
      } />
      <Route path="/challenges/:id/progress" element={
        <ProtectedRoute children={<ChallengesPage />} />
      } />
    </Routes>
  );
}

export default function App() {
  // Validate environment variables on app start
  useEffect(() => {
    validateEnvironment();
  }, []);

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
      <Router>
        <AppRoutes />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'white',
              border: '1px solid #e5e7eb',
              color: '#1f2937',
            },
          }}
        />
      </Router>
    </>
  );
}