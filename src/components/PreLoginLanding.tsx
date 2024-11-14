import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChefHat, 
  Sparkles, 
  Users, 
  BookOpen, 
  Heart,
  ArrowRight,
  Search,
  Star,
  Clock,
  Play,
  Utensils,
  Coffee,
  Soup,
  Brain,
  Zap,
  Globe,
  Leaf,
  Award,
  MessageSquare
} from 'lucide-react';
import { Footer } from './Footer';

export const PreLoginLanding: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeFeature, setActiveFeature] = React.useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Recipe Creation",
      description: "Our advanced AI understands your preferences, ingredients, and dietary needs to create personalized recipes",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: Leaf,
      title: "Heritage Healing",
      description: "Discover traditional remedies and comfort foods passed down through generations",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: Globe,
      title: "Global Cuisine Library",
      description: "Explore authentic recipes from every corner of the world",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Zap,
      title: "Smart Recommendations",
      description: "Get personalized suggestions based on your cooking style and preferences",
      color: "from-amber-500 to-orange-500"
    }
  ];

  const testimonials = [
    {
      name: "Susheela",
      role: "Home Cook",
      quote: "The AI recipe generator is incredible! It helped me create amazing dishes with ingredients I already had.",
      avatar: "https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5
    },
    {
      name: "Dilchashmi",
      role: "Food Enthusiast",
      quote: "The Heritage Heals section helped me rediscover my grandmother's traditional remedies. It's like having centuries of wisdom at your fingertips.",
      avatar: "https://images.unsplash.com/photo-1532170579297-281918c8ae72?q=80&w=2984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5
    },
    {
      name: "Janhvi Jha",
      role: "Wellness Coach",
      quote: "Resiplicity combines modern technology with traditional wisdom beautifully. My clients love the personalized recipe suggestions.",
      avatar: "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5
    }
  ];

  const stats = [
    {
      number: "10,000+",
      label: "Global Recipes",
      icon: Globe
    },
    {
      number: "1,000+",
      label: "Traditional Remedies",
      icon: Heart
    },
    {
      number: "50+",
      label: "Cuisines",
      icon: Utensils
    },
    {
      number: "24/7",
      label: "AI Assistance",
      icon: Brain
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: "Expert-Verified Content",
      description: "All recipes and remedies are validated by our community of culinary experts"
    },
    {
      icon: MessageSquare,
      title: "Active Community",
      description: "Connect with food enthusiasts, share experiences, and learn from others"
    },
    {
      icon: Sparkles,
      title: "Personalized Experience",
      description: "AI-driven recommendations that adapt to your preferences and dietary needs"
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
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <ChefHat className="w-20 h-20 mx-auto text-cream mb-6" />
            </motion.div>
            <h1 className="font-display text-5xl md:text-7xl text-cream mb-6">
              Resiplicity
            </h1>
            <p className="text-xl md:text-2xl text-cream/90 mb-8 max-w-3xl mx-auto">
              Experience the perfect blend of AI-powered recipe creation and traditional culinary wisdom
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
              className="group px-8 py-4 bg-brown-600 text-cream rounded-lg hover:bg-brown-700 transition-all flex items-center gap-2 text-lg overflow-hidden relative"
            >
              <span className="relative z-10">Start Creating Recipes</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-brown-700 to-brown-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ type: "tween" }}
              />
            </Link>
            <Link
              to="/register"
              className="group px-8 py-4 bg-cream/20 backdrop-blur-sm text-cream rounded-lg hover:bg-cream/30 transition-all flex items-center gap-2 text-lg"
            >
              <span>Join Our Community</span>
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
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

      {/* Stats Section */}
      <section className="py-16 bg-brown-900 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-cream/80" />
                <h3 className="text-4xl font-display text-cream mb-2">{stat.number}</h3>
                <p className="text-cream/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-cream relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display text-brown-800 mb-4">
              Revolutionizing Home Cooking
            </h2>
            <p className="text-brown-600 max-w-2xl mx-auto">
              Discover how Resiplicity combines cutting-edge AI with traditional wisdom
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
                className="bg-white p-6 rounded-xl shadow-lg group relative overflow-hidden"
              >
                <div className="relative z-10">
                  <feature.icon className="w-12 h-12 text-brown-600 mb-4" />
                  <h3 className="text-xl font-display text-brown-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-brown-600">
                    {feature.description}
                  </p>
                </div>
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-brown-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display text-brown-800 mb-4">
              Why Choose Resiplicity?
            </h2>
            <p className="text-brown-600 max-w-2xl mx-auto">
              Join thousands of food enthusiasts who've transformed their cooking experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <benefit.icon className="w-12 h-12 text-brown-600 mb-4" />
                <h3 className="text-xl font-display text-brown-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-brown-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display text-brown-800 mb-4">
              What Our Users Say
            </h2>
            <p className="text-brown-600 max-w-2xl mx-auto">
              Join our growing community of satisfied users
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-display text-brown-800">{testimonial.name}</h3>
                    <p className="text-brown-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-brown-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-brown-900 text-cream relative overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            backgroundSize: ['100% 100%', '200% 200%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-10 bg-gradient-radial from-brown-500 to-transparent"
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              Ready to Transform Your Cooking?
            </h2>
            <p className="text-xl text-cream/80 mb-8 max-w-2xl mx-auto">
              Join Resiplicity today and discover a world of culinary possibilities
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="group px-8 py-4 bg-cream text-brown-900 rounded-lg hover:bg-cream/90 transition-all flex items-center justify-center gap-2 text-lg relative overflow-hidden"
              >
                <span className="relative z-10">Get Started Free</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cream/50 to-cream"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ type: "tween" }}
                />
              </Link>
              <Link
                to="/login"
                className="group px-8 py-4 bg-brown-600 text-cream rounded-lg hover:bg-brown-700 transition-all flex items-center justify-center gap-2 text-lg"
              >
                <span>Watch Demo</span>
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};