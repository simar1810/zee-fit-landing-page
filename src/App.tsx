import { HeroSection } from './components/HeroSection';
import { MovementStory } from './components/MovementStory';
import { CommunityVoices } from './components/CommunityVoices';
import { MicroGamification } from './components/MicroGamification';
import { AboutSection } from './components/AboutSection';
import { MissionSection } from './components/MissionSection';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
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