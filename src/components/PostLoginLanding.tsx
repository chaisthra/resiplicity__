import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  BookOpen, 
  History, 
  Heart,
  ArrowRight,
  Search,
  Clock,
  Star,
  LogOut
} from 'lucide-react';
import { Footer } from './Footer';
import { supabase } from '../services/supabase';

export const PostLoginLanding: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: "Recipe Wizard",
      description: "Create personalized recipes",
      path: "/dashboard",
      tab: "wizard"
    },
    {
      icon: BookOpen,
      title: "Community",
      description: "Explore shared recipes",
      path: "/dashboard",
      tab: "community"
    },
    {
      icon: History,
      title: "Saved Recipes",
      description: "Access your collection",
      path: "/dashboard",
      tab: "saved"
    },
    {
      icon: Heart,
      title: "Heritage Heals",
      description: "Traditional remedies",
      path: "/dashboard",
      tab: "heritage"
    }
  ];

  const recentRecipes = [
    {
      title: "Mediterranean Quinoa Bowl",
      time: "30 mins",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2940"
    },
    {
      title: "Thai Basil Chicken",
      time: "25 mins",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&q=80&w=2532"
    },
    {
      title: "Moroccan Tagine",
      time: "45 mins",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&q=80&w=2940"
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Welcome Section */}
      <section className="relative bg-brown-900 text-cream py-20 px-4 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="https://cdn.pixabay.com/video/2022/11/30/141046-776768279_large.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-brown-900/50 to-brown-900/80" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="absolute top-0 right-0">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-brown-600 text-cream rounded-lg hover:bg-brown-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-display mb-6">
              Welcome Back to Resiplicity
            </h1>
            <p className="text-xl text-cream/80 max-w-2xl mx-auto mb-8">
              Continue your culinary journey
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
                <input
                  type="text"
                  placeholder="Search recipes, ingredients, or techniques..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-cream/20 text-cream placeholder-cream/50 focus:outline-none focus:ring-2 focus:ring-cream/30"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Access Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to={feature.path}
                  className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <feature.icon className="w-12 h-12 text-brown-600 mb-4" />
                  <h3 className="text-xl font-display text-brown-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-brown-600 mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-brown-600 hover:text-brown-800">
                    <span>Access</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-20 px-4 bg-brown-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display text-brown-800 mb-4">
              Recent Activity
            </h2>
            <p className="text-brown-600 max-w-2xl mx-auto">
              Continue where you left off
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentRecipes.map((recipe, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display text-brown-800 mb-2">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center justify-between text-brown-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{recipe.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};