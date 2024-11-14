import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  MessageCircle, 
  Send, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Loader,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
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
          <MessageCircle className="w-16 h-16 mx-auto text-brown-600 mb-4" />
          <h1 className="text-4xl font-display text-brown-800 mb-4">Contact Us</h1>
          <p className="text-xl text-brown-600 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-cream rounded-lg shadow-md p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-display text-brown-800 mb-2">Thank You!</h3>
                  <p className="text-brown-600">
                    Your message has been sent successfully. We'll get back to you soon!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      required
                      className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      rows={5}
                      className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-brown-600 text-cream rounded-lg hover:bg-brown-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-cream rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-display text-brown-800 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4"
                >
                  <Mail className="w-6 h-6 text-brown-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-brown-800 mb-1">Email Us</h3>
                    <p className="text-brown-600">contact@resiplicity.com</p>
                    <p className="text-brown-600">support@resiplicity.com</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4"
                >
                  <Phone className="w-6 h-6 text-brown-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-brown-800 mb-1">Call Us</h3>
                    <p className="text-brown-600">+91</p>
                    <p className="text-sm text-brown-500">Mon-Fri, 9am-5pm IST</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4"
                >
                  <MapPin className="w-6 h-6 text-brown-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-brown-800 mb-1">Visit Us</h3>
                    <p className="text-brown-600">
                      Bangalore, India
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="bg-cream rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-display text-brown-800 mb-6">Follow Us</h2>
              <div className="grid grid-cols-2 gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 p-3 bg-brown-100 rounded-lg hover:bg-brown-200 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-brown-600" />
                  <span className="text-brown-800">Facebook</span>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 p-3 bg-brown-100 rounded-lg hover:bg-brown-200 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-brown-600" />
                  <span className="text-brown-800">Twitter</span>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 p-3 bg-brown-100 rounded-lg hover:bg-brown-200 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-brown-600" />
                  <span className="text-brown-800">Instagram</span>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 p-3 bg-brown-100 rounded-lg hover:bg-brown-200 transition-colors"
                >
                  <Youtube className="w-5 h-5 text-brown-600" />
                  <span className="text-brown-800">YouTube</span>
                </motion.a>
              </div>
            </div>

            <div className="bg-brown-100 rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-display text-brown-800 mb-4">Learn More About Us</h2>
              <p className="text-brown-600 mb-6">
                Discover our story, mission, and the team behind Resiplicity.
              </p>
              <Link
                to="/about"
                className="inline-block px-6 py-3 bg-brown-600 text-cream rounded-lg hover:bg-brown-700 transition-colors"
              >
                Visit About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};