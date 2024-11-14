import React from 'react';
import { motion } from 'framer-motion';
import { 
  ScrollText, 
  UserCheck, 
  Shield, 
  Users, 
  FileText, 
  Lock,
  AlertCircle,
  Scale,
  Mail
} from 'lucide-react';

export const TermsOfService: React.FC = () => {
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
      icon: UserCheck,
      title: "Eligibility",
      content: [
        "Must be at least 13 years old",
        "Parental supervision required if under 18",
        "Accurate information required",
        "Valid email address needed"
      ]
    },
    {
      icon: Shield,
      title: "Acceptable Use",
      content: [
        "No unlawful or harmful purposes",
        "No offensive or defamatory content",
        "Respect community guidelines",
        "No disruptive activities"
      ]
    },
    {
      icon: Users,
      title: "Community Features",
      content: [
        "Recipe sharing and validation",
        "Trust score system",
        "Content moderation",
        "Community engagement rules"
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
          <ScrollText className="w-16 h-16 mx-auto text-brown-600 mb-4" />
          <h1 className="text-4xl font-display text-brown-800 mb-4">Terms of Service</h1>
          <p className="text-brown-600">Last updated: March 8, 2024</p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          variants={itemVariants}
          className="bg-cream rounded-lg shadow-md p-8 mb-8"
        >
          <p className="text-brown-600">
            Welcome to Resiplicity. By accessing or using our website, you agree to comply with 
            and be bound by these Terms of Service. Please read them carefully.
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
              <FileText className="w-6 h-6 text-brown-600" />
              Content Ownership
            </h2>
            <ul className="space-y-2 text-brown-600">
              <li>• You retain ownership of uploaded content</li>
              <li>• Platform-generated content belongs to Resiplicity</li>
              <li>• Non-exclusive license granted for operational use</li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-cream rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-display text-brown-800 mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-brown-600" />
              Privacy and Security
            </h2>
            <p className="text-brown-600">
              Your use of Resiplicity is also governed by our Privacy Policy. Please review it to 
              understand how we collect and use your information.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-cream rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-display text-brown-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-brown-600" />
              Disclaimers
            </h2>
            <p className="text-brown-600">
              Services are provided "as is" without warranties. We are not liable for any damages 
              arising from use of the platform.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-cream rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-display text-brown-800 mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-brown-600" />
              Governing Law
            </h2>
            <p className="text-brown-600">
              These terms are governed by applicable laws. Any disputes will be resolved in 
              appropriate jurisdictions.
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
            Questions?
          </h2>
          <p className="text-brown-600 mb-4">
            If you have any questions about our Terms of Service, please contact us:
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