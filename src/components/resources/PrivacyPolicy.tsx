import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Server, Settings, Bell, Globe, Book, Mail } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: [
        "Personal Information",
        "Usage Data",
        "Uploaded Content",
        "Community Contributions"
      ]
    },
    {
      icon: Server,
      title: "How We Use Your Information",
      content: [
        "To Provide Services",
        "To Enhance User Experience",
        "To Maintain Security",
        "To Develop Insights"
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "Encryption protocols",
        "Regular security audits",
        "Secure data storage",
        "OAuth authentication"
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
        >
          <Shield className="w-16 h-16 mx-auto text-brown-600 mb-4" />
          <h1 className="text-4xl font-display text-brown-800 mb-4">Privacy Policy</h1>
          <p className="text-brown-600">Last updated: March 8, 2024</p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          variants={itemVariants}
          className="bg-cream rounded-lg shadow-md p-8 mb-8"
        >
          <p className="text-brown-600">
            At Resiplicity, your privacy is of utmost importance to us. This Privacy Policy outlines 
            the types of information we collect, how we use it, and the steps we take to ensure its 
            protection.
          </p>
        </motion.div>

        {/* Main Sections */}
        <motion.div 
          variants={containerVariants}
          className="space-y-8"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-cream rounded-lg shadow-md overflow-hidden"
            >
              <div className="bg-brown-100 p-6 flex items-center gap-4">
                <section.icon className="w-6 h-6 text-brown-600" />
                <h2 className="text-2xl font-display text-brown-800">{section.title}</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 * itemIndex }}
                      className="flex items-center gap-2 text-brown-600"
                    >
                      <div className="w-2 h-2 bg-brown-400 rounded-full" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Sections */}
        <motion.div 
          variants={containerVariants}
          className="mt-8 space-y-8"
        >
          <motion.div variants={itemVariants} className="bg-cream rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-display text-brown-800 mb-4 flex items-center gap-2">
              <Settings className="w-6 h-6 text-brown-600" />
              Your Choices
            </h2>
            <ul className="space-y-2 text-brown-600">
              <li>• Access or update your personal information through account settings</li>
              <li>• Request deletion of your account and associated data</li>
              <li>• Opt-out of non-essential communications</li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-cream rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-display text-brown-800 mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-brown-600" />
              Third-Party Services
            </h2>
            <p className="text-brown-600">
              We may integrate with third-party services. Please review their privacy policies 
              before engaging with them.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-cream rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-display text-brown-800 mb-4 flex items-center gap-2">
              <Bell className="w-6 h-6 text-brown-600" />
              Updates to Policy
            </h2>
            <p className="text-brown-600">
              We may update this Privacy Policy periodically. You will be notified of significant 
              changes via email or on the website.
            </p>
          </motion.div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          variants={itemVariants}
          className="mt-12 bg-brown-100 rounded-lg shadow-md p-8 text-center"
        >
          <h2 className="text-2xl font-display text-brown-800 mb-4 flex items-center justify-center gap-2">
            <Mail className="w-6 h-6 text-brown-600" />
            Contact Us
          </h2>
          <p className="text-brown-600 mb-4">
            If you have any questions about our Privacy Policy, please contact us:
          </p>
          <motion.a
            href="mailto:support@resiplicity.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 bg-brown-600 text-cream rounded-lg hover:bg-brown-700 transition-colors"
          >
            support@resiplicity.com
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};