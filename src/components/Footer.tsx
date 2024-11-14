import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brown-900 text-cream mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-display text-xl md:text-2xl mb-4">Resiplicity</h3>
            <p className="text-cream/80 text-sm">
              Discover, create, and share your culinary masterpieces with our growing community of food enthusiasts.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-cream/80 text-sm">
              <li><Link to="/about" className="hover:text-cream transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-cream transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-cream transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-cream transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-cream/80 text-sm">
              <li><Link to="/recipe-guide" className="hover:text-cream transition-colors">Recipe Guide</Link></li>
              <li><Link to="/cooking-tips" className="hover:text-cream transition-colors">Cooking Tips</Link></li>
              <li><Link to="/blog" className="hover:text-cream transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-cream transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex flex-wrap gap-4 mb-4">
              <a href="#" className="text-cream/80 hover:text-cream transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-cream/80 hover:text-cream transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-cream/80 hover:text-cream transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-cream/80 hover:text-cream transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center space-x-2 text-cream/80 text-sm">
              <Mail className="w-4 h-4" />
              <a href="mailto:contact@resiplicity.com" className="hover:text-cream transition-colors break-all">
                contact@resiplicity.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-cream/10 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-cream/60 text-sm text-center sm:text-left">
              © {currentYear} Resiplicity. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-cream/60 text-sm">
              <Link to="/privacy" className="hover:text-cream transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-cream transition-colors">Terms</Link>
              <Link to="/cookies" className="hover:text-cream transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};