import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { getSharedRemedies } from '../../services/sharedRemedies';
import { SharedRemedyCard } from './SharedRemedyCard';
import type { SharedRemedy } from '../../services/sharedRemedies';

export const SharedRemedyGallery: React.FC = () => {
  const [remedies, setRemedies] = useState<SharedRemedy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRemedies();
  }, []);

  const fetchRemedies = async () => {
    try {
      setLoading(true);
      const { success, data, error: fetchError } = await getSharedRemedies();

      if (!success || fetchError) {
        throw new Error(fetchError || 'Failed to fetch remedies');
      }

      setRemedies(data || []);
    } catch (err) {
      console.error('Error fetching shared remedies:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch remedies');
    } finally {
      setLoading(false);
    }
  };

  const handleRemedyUpdate = (updatedRemedy: SharedRemedy) => {
    setRemedies(prev =>
      prev.map(remedy =>
        remedy.id === updatedRemedy.id ? updatedRemedy : remedy
      )
    );
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
        No shared remedies yet. Be the first to share a remedy!
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
        >
          <SharedRemedyCard
            remedy={remedy}
            onUpdate={handleRemedyUpdate}
          />
        </motion.div>
      ))}
    </div>
  );
};