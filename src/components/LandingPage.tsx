import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChefHat, 
  Sparkles, 
  Users, 
  BookOpen, 
  Heart, 
  Leaf,
  ArrowRight,
  Search,
  Star,
  Clock,
  Utensils
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: "Fusion Recipe Wizard",
      description: "Personalized recipes at your fingertips"
    },
    {
      icon: Users,
      title: "Community Recipes",
      description: "Explore and share recipes worldwide"
    },
    {
      icon: BookOpen,
      title: "Simmering Stories",
      description: "Uncover culinary insights and traditions"
    },
    {
      icon: Heart,
      title: "Heritage Heals",
      description: "Rediscover traditional remedies"
    }
  ];

  const trendingRecipes = [
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
    <div className="min-h-screen bg-cream overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://cdn.pixabay.com/video/2023/06/29/169349-841069126_large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-brown-900/70 to-brown-900/40" />
        
        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ChefHat className="w-20 h-20 mx-auto text-cream mb-6" />
            <h1 className="font-display text-5xl md:text-7xl text-cream mb-6">
              Discover Culinary Magic
            </h1>
            <p className="text-xl md:text-2xl text-cream/90 mb-8 max-w-2xl mx-auto">
              Create, share, and explore recipes from around the world
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row gap-4"
          >
            <Link
              to="/login"
              className="px-8 py-4 bg-brown-600 text-cream rounded-lg hover:bg-brown-700 transition-all flex items-center gap-2 text-lg"
            >
              Start Cooking Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-cream/20 backdrop-blur-sm text-cream rounded-lg hover:bg-cream/30 transition-all flex items-center gap-2 text-lg"
            >
              Join Community
              <Users className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/80"
        >
          <div className="w-6 h-10 border-2 border-cream/80 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 bg-cream/80 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display text-brown-800 mb-4">
              Discover Our Features
            </h2>
            <p className="text-brown-600 max-w-2xl mx-auto">
              Experience the perfect blend of technology and tradition
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-brown-600 mb-4" />
                <h3 className="text-xl font-display text-brown-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-brown-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Recipes */}
      <section className="py-20 px-4 bg-brown-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display text-brown-800 mb-4">
              Trending Now
            </h2>
            <p className="text-brown-600 max-w-2xl mx-auto">
              Discover what's cooking in our community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingRecipes.map((recipe, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
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

      {/* CTA Section */}
      <section className="py-20 px-4 bg-brown-900 text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brown-500 to-transparent" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              Ready to Start Your Culinary Journey?
            </h2>
            <p className="text-xl text-cream/80 mb-8 max-w-2xl mx-auto">
              Join our community of food enthusiasts and discover a world of flavors
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-4 bg-cream text-brown-900 rounded-lg hover:bg-cream/90 transition-all flex items-center justify-center gap-2 text-lg"
              >
                Sign In
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 bg-brown-600 text-cream rounded-lg hover:bg-brown-700 transition-all flex items-center justify-center gap-2 text-lg"
              >
                Create Account
                <Users className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};