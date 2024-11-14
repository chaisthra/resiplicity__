import React from 'react';
import { AlertCircle } from 'lucide-react';

export const SimmeringStories: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-brown-100 border-l-4 border-brown-600 p-4 rounded-lg flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-brown-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-brown-800 mb-1">Coming Soon</h3>
          <p className="text-brown-600">Some features may not be available to users at this time. We're working on making everything perfect for you!</p>
        </div>
      </div>

      <div className="w-full h-[800px] rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://rad-raindrop-f2036d.netlify.app/"
          title="Simmering Stories"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          loading="lazy"
        />
      </div>
    </div>
  );
};