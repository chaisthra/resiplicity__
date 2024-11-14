import React from 'react';
import { Flame, ThermometerSnowflake, Scale, Clock } from 'lucide-react';

export const CookingTips: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-display text-brown-800 mb-6">Cooking Tips</h1>

      <div className="prose prose-brown max-w-none">
        <img 
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2940" 
          alt="Professional cooking techniques"
          className="w-full rounded-lg mb-8 object-cover h-[400px]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-cream p-6 rounded-lg shadow-md">
            <Flame className="w-8 h-8 text-brown-600 mb-4" />
            <h3 className="text-xl font-display text-brown-800 mb-2">Temperature Control</h3>
            <p className="text-brown-600">
              Master the art of heat management. Understanding when to use high, medium, or low heat 
              is crucial for perfect results.
            </p>
          </div>

          <div className="bg-cream p-6 rounded-lg shadow-md">
            <Scale className="w-8 h-8 text-brown-600 mb-4" />
            <h3 className="text-xl font-display text-brown-800 mb-2">Proper Seasoning</h3>
            <p className="text-brown-600">
              Learn to season throughout the cooking process. Building layers of flavor is key to 
              creating memorable dishes.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-display text-brown-800 mb-4">Essential Kitchen Tips</h2>
        
        <div className="bg-cream p-6 rounded-lg shadow-md mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Knife Skills</h3>
              <img 
                src="https://images.unsplash.com/photo-1591985666643-1ecc67616216?auto=format&fit=crop&q=80&w=2940" 
                alt="Knife skills demonstration"
                className="w-full rounded-lg mb-4 h-[200px] object-cover"
              />
              <p className="text-brown-600">
                Proper knife skills are fundamental to cooking. Keep your knives sharp and learn the 
                basic cuts: slice, dice, chop, and julienne. A sharp knife is actually safer than a 
                dull one as it requires less force and provides more control.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Heat Management</h3>
              <img 
                src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&q=80&w=2940" 
                alt="Cooking with proper heat"
                className="w-full rounded-lg mb-4 h-[200px] object-cover"
              />
              <p className="text-brown-600">
                Understanding heat is crucial. Preheat pans properly, don't overcrowd them (which 
                lowers temperature), and learn when to use high heat for searing versus low heat 
                for gentle cooking.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-display text-brown-800 mb-4">Food Storage Tips</h2>
        <div className="bg-cream p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-start gap-4 mb-6">
            <ThermometerSnowflake className="w-6 h-6 text-brown-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Temperature Zones</h3>
              <p className="text-brown-600">
                Different foods require different storage temperatures. Learn the optimal storage 
                conditions for various ingredients to maximize freshness and minimize waste.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Refrigerator (35-38°F)</h4>
              <ul className="list-disc list-inside text-brown-600">
                <li>Dairy products</li>
                <li>Raw meat (bottom shelf)</li>
                <li>Leftovers (3-4 days)</li>
                <li>Prepared salads</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Pantry (50-70°F)</h4>
              <ul className="list-disc list-inside text-brown-600">
                <li>Dried goods</li>
                <li>Canned foods</li>
                <li>Oils and vinegars</li>
                <li>Root vegetables</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-display text-brown-800 mb-4">Time Management</h2>
        <div className="bg-cream p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-start gap-4 mb-6">
            <Clock className="w-6 h-6 text-brown-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Kitchen Organization</h3>
              <p className="text-brown-600">
                Efficient cooking starts with good organization. Plan your cooking sequence, prep 
                ingredients in advance, and clean as you go to maintain a smooth workflow.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Prep Work</h4>
              <p className="text-brown-600">
                Mise en place isn't just for professional kitchens. Having all ingredients measured, 
                cut, and ready before cooking starts makes the entire process smoother and more enjoyable.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Multi-tasking</h4>
              <p className="text-brown-600">
                Learn to manage multiple tasks efficiently. While something is simmering, prep ingredients 
                for the next step. Use downtime to clean up or prepare side dishes.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-brown-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-display text-brown-800 mb-4">Pro Tips</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Season in Layers</h3>
              <p className="text-brown-600">
                Don't just season at the end. Add salt and seasonings throughout the cooking process 
                to build depth of flavor. Taste and adjust as you go.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Rest Your Meats</h3>
              <p className="text-brown-600">
                Always let meat rest after cooking. This allows the juices to redistribute, resulting 
                in juicier, more flavorful results. The larger the cut, the longer the rest time needed.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Temperature Control</h3>
              <p className="text-brown-600">
                Learn to control heat effectively. High heat isn't always better - different cooking 
                methods require different temperatures for optimal results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};