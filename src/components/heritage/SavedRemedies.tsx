import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader, ChevronDown, Clock, Users, MapPin } from 'lucide-react';
import { supabase } from '../../services/supabase';

export const SavedRemedies: React.FC = () => {
  const [remedies, setRemedies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchSavedRemedies();
  }, []);

  const fetchSavedRemedies = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Please sign in to view saved remedies');

      const { data, error } = await supabase
        .from('heritage_remedies')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRemedies(data || []);
    } catch (err) {
      console.error('Error fetching saved remedies:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch saved remedies');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin text-brown-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
        {error}
      </div>
    );
  }

  if (remedies.length === 0) {
    return (
      <div className="text-center py-12 text-brown-600">
        No saved remedies yet. Generate or submit some remedies to see them here!
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {remedies.map((remedy) => (
        <motion.div
          key={remedy.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-cream rounded-lg shadow-md overflow-hidden"
        >
          {remedy.image_url && (
            <div className="aspect-video relative overflow-hidden bg-brown-100">
              <img 
                src={remedy.image_url}
                alt={remedy.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&q=80&w=2787";
                }}
              />
            </div>
          )}

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-display text-brown-800 mb-2">{remedy.title}</h3>
                <div className="flex items-center gap-4 text-sm text-brown-600">
                  {remedy.region && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {remedy.region}
                    </div>
                  )}
                  {remedy.illness && (
                    <div>For: {remedy.illness}</div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setExpandedId(expandedId === remedy.id ? null : remedy.id)}
                className="p-2 hover:bg-brown-200 rounded-full transition-colors"
              >
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    expandedId === remedy.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            <p className="text-brown-700 mb-4">{remedy.description}</p>

            <div className="flex items-center gap-6 text-brown-600">
              {remedy.cooking_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{remedy.cooking_time}</span>
                </div>
              )}
              {remedy.servings && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{remedy.servings} servings</span>
                </div>
              )}
            </div>

            {expandedId === remedy.id && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="mt-6 pt-6 border-t border-brown-200"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-brown-800 mb-2">Ingredients</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {remedy.ingredients.map((ingredient: string, index: number) => (
                        <li key={index} className="text-brown-700">{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-brown-800 mb-2">Instructions</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      {remedy.instructions.map((instruction: string, index: number) => (
                        <li key={index} className="text-brown-700">{instruction}</li>
                      ))}
                    </ol>
                  </div>

                  {remedy.health_benefits && remedy.health_benefits.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-brown-800 mb-2">Health Benefits</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {remedy.health_benefits.map((benefit: string, index: number) => (
                          <li key={index} className="text-brown-700">{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {remedy.precautions && remedy.precautions.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-brown-800 mb-2">Precautions</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {remedy.precautions.map((precaution: string, index: number) => (
                          <li key={index} className="text-brown-700">{precaution}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {remedy.tradition && (
                    <div>
                      <h4 className="font-semibold text-brown-800 mb-2">Traditional Background</h4>
                      <p className="text-brown-700">{remedy.tradition}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};