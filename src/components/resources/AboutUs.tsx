import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Code, Sparkles } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: "Fusion Recipe Wizard",
      description: "AI-driven personalized recipes based on ingredients and preferences"
    },
    {
      icon: Heart,
      title: "Community Recipes",
      description: "Share, validate, and explore traditional and modern culinary creations"
    },
    {
      icon: Code,
      title: "Smart Features",
      description: "Advanced AI algorithms for recipe generation and customization"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-12"
      >
        {/* Hero Section */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-display text-brown-800 mb-6">
            Welcome to Resiplicity
          </h1>
          <p className="text-xl text-brown-600 max-w-2xl mx-auto">
            Where culinary creativity meets advanced technology
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-cream rounded-lg shadow-md p-8 relative overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute top-0 right-0 w-32 h-32 bg-brown-200 rounded-full -mr-16 -mt-16 opacity-20"
          />
          <h2 className="text-3xl font-display text-brown-800 mb-4">Our Vision</h2>
          <p className="text-brown-600">
            At Resiplicity, we aim to transform the way people approach cooking. Whether you're a 
            beginner or a seasoned chef, our platform is built to provide dynamic recipe recommendations 
            tailored to your preferences, available ingredients, and time constraints.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-cream p-6 rounded-lg shadow-md"
            >
              <feature.icon className="w-8 h-8 text-brown-600 mb-4" />
              <h3 className="text-xl font-display text-brown-800 mb-2">{feature.title}</h3>
              <p className="text-brown-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-cream rounded-lg shadow-md p-8"
        >
          <h2 className="text-3xl font-display text-brown-800 mb-6">Meet the Team</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://i1.rgstatic.net/ii/profile.image/11431281098351596-1668890778316_Q512/Chaithra-n.jpg"
              alt="Chaithra N"
              className="w-48 h-48 rounded-full object-cover shadow-lg"
            />
            <div>
              <h3 className="text-2xl font-display text-brown-800 mb-2">Chaithra N</h3>
              <p className="text-brown-600 mb-4">
                A passionate B.Tech student specializing in Artificial Intelligence and Machine Learning 
                at Jain (Deemed-to-be University), Bangalore. Bringing technical expertise and 
                innovation to Resiplicity.
              </p>
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="https://github.com/chaisthra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brown-600 hover:text-brown-800"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="https://www.linkedin.com/in/chaithra-n-a91192225/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brown-600 hover:text-brown-800"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="chaithra3nats@resiplicity.com"
                  className="text-brown-600 hover:text-brown-800"
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-brown-100 rounded-lg shadow-md p-8 text-center"
        >
          <h2 className="text-3xl font-display text-brown-800 mb-4">Get in Touch</h2>
          <p className="text-brown-600 mb-6">
            We'd love to hear from you! For feedback, suggestions, or collaborations, reach out to us.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-brown-600 text-cream rounded-lg hover:bg-brown-700 transition-colors"
          >
            Contact Us
          </motion.button>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="fixed bottom-8 right-8 w-16 h-16 bg-brown-600 rounded-full flex items-center justify-center text-cream shadow-lg"
        >
          <Heart className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </div>
  );
};