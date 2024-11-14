import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Sparkles, BookOpen, History, BookText, Heart, Menu, X } from 'lucide-react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PreLoginLanding } from './components/PreLoginLanding';
import { PostLoginLanding } from './components/PostLoginLanding';
import { CommunityRecipes } from './components/CommunityRecipes';
import { RecipeWizard } from './components/RecipeWizard';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { SavedRecipes } from './components/SavedRecipes';
import { SimmeringStories } from './components/SimmeringStories';
import { HeritageHeals } from './components/HeritageHeals';
import { Footer } from './components/Footer';
import { UserMenu } from './components/UserMenu';
import { AccountManagement } from './components/AccountManagement';
import { RecipeGuide } from './components/resources/RecipeGuide';
import { CookingTips } from './components/resources/CookingTips';
import { Blog } from './components/resources/Blog';
import { FAQ } from './components/resources/FAQ';
import { AboutUs } from './components/resources/AboutUs';
import { Contact } from './components/resources/Contact';
import { PrivacyPolicy } from './components/resources/PrivacyPolicy';
import { TermsOfService } from './components/resources/TermsOfService';
import { supabase } from './services/supabase';

function App() {
  const [session, setSession] = useState<any>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState<'wizard' | 'community' | 'saved' | 'stories' | 'heritage'>('community');
  const [initializing, setInitializing] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitializing(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-600"></div>
      </div>
    );
  }

  if (!session) {
    if (location.pathname === '/') {
      return <PreLoginLanding />;
    }
    if (location.pathname === '/register' || showRegister) {
      return (
        <RegisterScreen
          onRegister={() => setSession(true)}
          onBackToLogin={() => setShowRegister(false)}
        />
      );
    }
    if (location.pathname === '/login') {
      return (
        <LoginScreen
          onLogin={() => setSession(true)}
          onRegister={() => setShowRegister(true)}
        />
      );
    }
    return <Navigate to="/" />;
  }

  if (location.pathname === '/') {
    return <PostLoginLanding />;
  }

  const navigationTabs = [
    { id: 'wizard', label: 'Fusion Recipe Wizard', icon: Sparkles },
    { id: 'community', label: 'Community Recipes', icon: BookOpen },
    { id: 'saved', label: 'Saved Recipes', icon: History },
    { id: 'stories', label: 'Simmering Stories', icon: BookText },
    { id: 'heritage', label: 'Heritage Heals', icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-texture bg-cream/95 bg-blend-overlay">
      <div className="culinary-pattern"></div>
      <div className="content-wrapper max-w-6xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 relative">
          <div className="flex items-center justify-between">
            <Link to="/" className="group">
              <h1 className="font-display text-4xl md:text-6xl mb-2 md:mb-4 text-brown-800 transition-colors group-hover:text-brown-600">
                Resiplicity
              </h1>
              <p className="text-brown-600 font-light tracking-wide transition-opacity group-hover:opacity-80 text-sm md:text-base">
                DISCOVER & SHARE RECIPES
              </p>
            </Link>
            
            <div className="flex items-center gap-4">
              <UserMenu />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-brown-600 hover:text-brown-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`${
            mobileMenuOpen ? 'flex' : 'hidden'
          } md:hidden flex-col gap-2 mt-4 bg-cream rounded-lg p-4 shadow-lg absolute top-full left-0 right-0 z-50`}>
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-brown-600 text-cream'
                    : 'bg-brown-100 hover:bg-brown-200 text-brown-800'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-2">
              {navigationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-brown-600 text-cream'
                      : 'bg-brown-100 hover:bg-brown-200 text-brown-800'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ErrorBoundary>
          <Routes>
            <Route path="/dashboard" element={
              activeTab === 'wizard' ? (
                <RecipeWizard />
              ) : activeTab === 'saved' ? (
                <SavedRecipes />
              ) : activeTab === 'stories' ? (
                <SimmeringStories />
              ) : activeTab === 'heritage' ? (
                <HeritageHeals />
              ) : (
                <CommunityRecipes />
              )
            } />
            <Route path="/account" element={<AccountManagement />} />
            <Route path="/recipe-guide" element={<RecipeGuide />} />
            <Route path="/cooking-tips" element={<CookingTips />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
}

export default App;