import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "How do I save my favorite recipes?",
          a: "Once logged in, you can save recipes by clicking the bookmark icon on any recipe card. Access your saved recipes from your profile dashboard."
        },
        {
          q: "Can I modify serving sizes?",
          a: "Yes! Each recipe includes a serving size adjuster that automatically recalculates ingredient quantities based on your desired number of servings."
        },
        {
          q: "How do I share my own recipes?",
          a: "Click the 'Share Recipe' button in the community section. You can add ingredients, instructions, photos, and tips to share with our community."
        }
      ]
    },
    {
      category: "Recipe Wizard",
      questions: [
        {
          q: "How does the Recipe Wizard work?",
          a: "The Recipe Wizard uses AI to generate personalized recipes based on your available ingredients, dietary preferences, and cooking skill level."
        },
        {
          q: "Can I specify dietary restrictions?",
          a: "Absolutely! The Recipe Wizard allows you to specify various dietary restrictions including vegetarian, vegan, gluten-free, and more."
        },
        {
          q: "How accurate are the generated recipes?",
          a: "Our AI-generated recipes are tested and validated by our community. The trust score system helps identify the most reliable recipes."
        }
      ]
    },
    {
      category: "Heritage Heals",
      questions: [
        {
          q: "What is Heritage Heals?",
          a: "Heritage Heals is our collection of traditional remedies and comfort foods from various cultures, focusing on natural healing through food."
        },
        {
          q: "How are remedies verified?",
          a: "Each remedy undergoes community validation and includes trust scores. We recommend consulting healthcare professionals before trying new remedies."
        },
        {
          q: "Can I contribute family remedies?",
          a: "Yes! You can share your family's traditional remedies through the Heritage Heals submission form. Include the history and cultural context of the remedy."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          q: "What browsers are supported?",
          a: "Resiplicity works best on modern browsers like Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience."
        },
        {
          q: "Is my data secure?",
          a: "Yes, we use industry-standard encryption and security measures to protect your data. Your personal information is never shared without your consent."
        },
        {
          q: "Can I use the app offline?",
          a: "While basic browsing requires an internet connection, we're working on an offline mode for saved recipes in future updates."
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-display text-brown-800 mb-6">Frequently Asked Questions</h1>

      <div className="prose prose-brown max-w-none">
        <div className="bg-cream p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-brown-600" />
            <h2 className="text-2xl font-display text-brown-800">Quick Help</h2>
          </div>
          <p className="text-brown-600">
            Find answers to common questions about using Resiplicity. Can't find what you're looking for? 
            Contact our support team through the help center.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((category, index) => (
            <div key={index} className="bg-cream rounded-lg shadow-md overflow-hidden">
              <h2 className="text-xl font-display text-brown-800 p-6 bg-brown-100">
                {category.category}
              </h2>
              <div className="p-6 space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <details key={faqIndex} className="group">
                    <summary className="flex items-center justify-between cursor-pointer">
                      <span className="font-semibold text-brown-800">{faq.q}</span>
                      <ChevronDown className="w-5 h-5 text-brown-600 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-4 text-brown-600 pl-4 border-l-2 border-brown-200">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-brown-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-display text-brown-800 mb-4">Still Need Help?</h2>
          <p className="text-brown-600 mb-4">
            Our support team is here to help you with any questions or issues you may have.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-brown-800 mb-2">Contact Support</h3>
              <p className="text-brown-600 text-sm">
                Email us at support@resiplicity.com for personalized assistance.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-brown-800 mb-2">Community Forum</h3>
              <p className="text-brown-600 text-sm">
                Join our community forum to connect with other users and share experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};