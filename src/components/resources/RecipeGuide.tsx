import React from 'react';
import { Book, ChefHat, Utensils, Clock } from 'lucide-react';

export const RecipeGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-display text-brown-800 mb-6">Recipe Guide</h1>
      
      <div className="prose prose-brown max-w-none">
        <img 
          src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=2940" 
          alt="Cooking ingredients and utensils"
          className="w-full rounded-lg mb-8 object-cover h-[400px]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-cream p-6 rounded-lg shadow-md">
            <ChefHat className="w-8 h-8 text-brown-600 mb-4" />
            <h3 className="text-xl font-display text-brown-800 mb-2">Understanding Recipes</h3>
            <p className="text-brown-600">
              Learn how to read and interpret recipes like a professional chef. Understanding measurements, 
              techniques, and terminology is key to successful cooking.
            </p>
          </div>

          <div className="bg-cream p-6 rounded-lg shadow-md">
            <Utensils className="w-8 h-8 text-brown-600 mb-4" />
            <h3 className="text-xl font-display text-brown-800 mb-2">Essential Equipment</h3>
            <p className="text-brown-600">
              Discover the must-have tools and equipment for your kitchen. From basic utensils to 
              specialized gadgets, we'll help you build your culinary arsenal.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-display text-brown-800 mb-4">Recipe Structure</h2>
        <p className="mb-6">
          Every recipe on Resiplicity follows a consistent structure designed to make cooking easier 
          and more enjoyable. Here's what you'll find in each recipe:
        </p>

        <div className="bg-cream p-6 rounded-lg shadow-md mb-8">
          <ol className="list-decimal list-inside space-y-4">
            <li className="text-brown-800">
              <span className="font-semibold">Title and Description</span>
              <p className="ml-6 text-brown-600">
                A clear, descriptive title followed by a brief introduction that sets expectations 
                and provides context for the dish.
              </p>
            </li>
            <li className="text-brown-800">
              <span className="font-semibold">Ingredient List</span>
              <p className="ml-6 text-brown-600">
                All ingredients listed in order of use, with precise measurements and any necessary 
                preparation notes.
              </p>
            </li>
            <li className="text-brown-800">
              <span className="font-semibold">Step-by-Step Instructions</span>
              <p className="ml-6 text-brown-600">
                Clear, numbered steps that guide you through the cooking process, with timing and 
                visual cues included.
              </p>
            </li>
            <li className="text-brown-800">
              <span className="font-semibold">Tips and Variations</span>
              <p className="ml-6 text-brown-600">
                Helpful suggestions, substitutions, and variations to customize the recipe to your 
                needs and preferences.
              </p>
            </li>
          </ol>
        </div>

        <img 
          src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=2940" 
          alt="Cooking process"
          className="w-full rounded-lg mb-8 object-cover h-[300px]"
        />

        <h2 className="text-2xl font-display text-brown-800 mb-4">Measurement Guide</h2>
        <div className="bg-cream p-6 rounded-lg shadow-md mb-8">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Abbreviation</th>
                <th className="text-left py-2">Meaning</th>
                <th className="text-left py-2">Equivalent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">tsp</td>
                <td>Teaspoon</td>
                <td>5ml</td>
              </tr>
              <tr>
                <td className="py-2">tbsp</td>
                <td>Tablespoon</td>
                <td>15ml</td>
              </tr>
              <tr>
                <td className="py-2">c</td>
                <td>Cup</td>
                <td>240ml</td>
              </tr>
              <tr>
                <td className="py-2">oz</td>
                <td>Ounce</td>
                <td>28.35g</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-display text-brown-800 mb-4">Common Cooking Terms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-cream p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Sauté</h3>
            <p className="text-brown-600">
              To cook food quickly in a small amount of oil over high heat while stirring or tossing.
            </p>
          </div>
          <div className="bg-cream p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Blanch</h3>
            <p className="text-brown-600">
              To briefly cook in boiling water, then plunge into ice water to stop the cooking process.
            </p>
          </div>
          <div className="bg-cream p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Fold</h3>
            <p className="text-brown-600">
              To gently combine ingredients using a lifting and turning motion to maintain airiness.
            </p>
          </div>
          <div className="bg-cream p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Reduce</h3>
            <p className="text-brown-600">
              To boil a liquid until it thickens and intensifies in flavor through evaporation.
            </p>
          </div>
        </div>

        <div className="bg-brown-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-display text-brown-800 mb-4">Recipe Success Tips</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-brown-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Read Through First</h3>
                <p className="text-brown-600">
                  Always read the entire recipe before starting. This helps you understand the 
                  process and ensure you have all necessary ingredients and equipment.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ChefHat className="w-5 h-5 text-brown-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Mise en Place</h3>
                <p className="text-brown-600">
                  Prepare and measure all ingredients before you start cooking. This French term 
                  means "everything in its place" and is crucial for smooth cooking.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Book className="w-5 h-5 text-brown-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Take Notes</h3>
                <p className="text-brown-600">
                  Keep notes on any modifications you make and how they turned out. This helps you 
                  perfect recipes to your taste over time.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};