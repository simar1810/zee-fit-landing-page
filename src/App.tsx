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
      
      console.log('ProtectedRoute - Token exists:', !!token);
      console.log('ProtectedRoute - User exists:', !!user);
      
      if (!token || !user) {
        console.log('ProtectedRoute - No token or user, redirecting to home');
        setAuthState({ isAuthenticated: false, isLoading: false });
        return;
      }
      
      // Validate token with backend
      try {
        console.log('ProtectedRoute - Validating token with backend...');
        console.log('ProtectedRoute - Token (first 20 chars):', token ? token.substring(0, 20) + '...' : 'null');
        
        const response = await fetch('http://localhost:3010/api/users/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        console.log('ProtectedRoute - Backend response status:', response.status);
        
        if (response.ok) {
          console.log('ProtectedRoute - Token is valid');
          setAuthState({ isAuthenticated: true, isLoading: false });
        } else if (response.status === 401) {
          console.log('ProtectedRoute - Token expired, attempting refresh...');
          
          // Try to refresh the token
          const refreshToken = getCookie('refreshToken');
          if (refreshToken) {
            try {
              console.log('ProtectedRoute - Attempting token refresh...');
              const refreshResponse = await fetch(`${config.API_BASE_URL}/auth/refresh`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
              });
              
              if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();
                console.log('ProtectedRoute - Token refreshed successfully');
                
                // Update tokens
                setCookie('accessToken', refreshData.accessToken, 7);
                setCookie('refreshToken', refreshData.refreshToken, 30);
                
                setAuthState({ isAuthenticated: true, isLoading: false });
                return;
              } else {
                console.log('ProtectedRoute - Token refresh failed, status:', refreshResponse.status);
              }
            } catch (refreshError) {
              console.error('ProtectedRoute - Token refresh error:', refreshError);
            }
          } else {
            console.log('ProtectedRoute - No refresh token available');
          }
          
          // If we get here, refresh failed or no refresh token
          console.log('ProtectedRoute - Authentication failed, clearing tokens');
          clearAllAuthData();
          setAuthState({ isAuthenticated: false, isLoading: false });
        } else {
          console.log('ProtectedRoute - Token is invalid, status:', response.status);
          const errorData = await response.json().catch(() => ({}));
          console.log('ProtectedRoute - Error response:', errorData);
          

          setAuthState({ isAuthenticated: false, isLoading: false });
        }
      } catch (error) {
        console.error('ProtectedRoute - Token validation failed:', error);
        console.log('ProtectedRoute - Network error or server not running');
        
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
    console.log('User not authenticated, redirecting to home');
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/marathon" element={<Marathon />} />
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