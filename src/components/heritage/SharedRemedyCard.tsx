import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, ChevronDown, Clock, Users, MapPin, Loader } from 'lucide-react';
import { validateSharedRemedy, checkUserVote } from '../../services/sharedRemedies';
import type { SharedRemedy } from '../../services/sharedRemedies';

const DEFAULT_IMAGE = "https://cdn.pixabay.com/photo/2020/03/12/04/27/home-remedy-4923848_1280.jpg";

interface SharedRemedyCardProps {
  remedy: SharedRemedy;
  onUpdate: (remedy: SharedRemedy) => void;
}

export const SharedRemedyCard: React.FC<SharedRemedyCardProps> = ({ remedy, onUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchUserVote = async () => {
      if (remedy.id) {
        const { vote } = await checkUserVote(remedy.id);
        setUserVote(vote);
      }
    };
    fetchUserVote();
  }, [remedy.id]);

  const handleVote = async (vote: 'up' | 'down') => {
    if (voting || !remedy.id) return;
    
    try {
      setVoting(true);
      setError(null);
      
      const { success, data, error: voteError } = await validateSharedRemedy(remedy.id, vote);

      if (!success || voteError) {
        throw new Error(voteError || 'Failed to record vote');
      }

      if (data) {
        onUpdate(data);
        setUserVote(vote);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to vote');
    } finally {
      setVoting(false);
    }
  };

  const getTrustScoreColor = (score: number = 50) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getTrustScoreLabel = (score: number = 50, votes: number = 0) => {
    if (votes < 5) return 'Not enough votes';
    if (score >= 80) return 'Highly Trusted';
    if (score >= 60) return 'Trusted';
    if (score >= 40) return 'Mixed Reviews';
    return 'Needs Improvement';
  };

  const displayImage = imageError || !remedy.image_url ? DEFAULT_IMAGE : remedy.image_url;

  return (
    <motion.div
      layout
      className="bg-cream rounded-lg shadow-md overflow-hidden"
    >
      <div className="aspect-video relative overflow-hidden bg-brown-100">
        <img 
          src={displayImage}
          alt={remedy.title}
          className="w-full h-full object-cover transition-opacity duration-300"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        {remedy.dietary_info && remedy.dietary_info.length > 0 && (
          <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1.5">
            <span className="text-sm text-brown-800">
              {remedy.dietary_info.join(', ')}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-display text-brown-800 mb-2">{remedy.title}</h3>
            <div className="flex items-center gap-4 text-sm text-brown-600">
              {remedy.region && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {remedy.region}
                  {remedy.sub_region && ` - ${remedy.sub_region}`}
                </div>
              )}
              {remedy.target_age && (
                <div>Age: {remedy.target_age}</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-brown-600">
              <div className="mb-1">{getTrustScoreLabel(remedy.trust_score, remedy.votes)}</div>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${getTrustScoreColor(remedy.trust_score)}`}
                  style={{ width: `${remedy.trust_score}%` }}
                />
              </div>
              <div className="mt-1 text-xs">
                {remedy.votes || 0} {(remedy.votes === 1) ? 'vote' : 'votes'}
              </div>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 hover:bg-brown-200 rounded-full transition-colors"
            >
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        <p className="text-brown-700 mb-4">{remedy.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-brown-600">
            {remedy.prep_time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Prep: {remedy.prep_time}</span>
              </div>
            )}
            {remedy.servings && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">{remedy.servings} servings</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleVote('up')}
              disabled={voting || userVote === 'up'}
              className={`p-2 rounded-full transition-colors ${
                voting ? 'opacity-50 cursor-not-allowed' : 
                userVote === 'up' ? 'bg-green-100 text-green-600' :
                'hover:bg-brown-100'
              }`}
              title={userVote === 'up' ? 'You voted this up' : 'This worked for me'}
            >
              {voting ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <ThumbsUp className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => handleVote('down')}
              disabled={voting || userVote === 'down'}
              className={`p-2 rounded-full transition-colors ${
                voting ? 'opacity-50 cursor-not-allowed' : 
                userVote === 'down' ? 'bg-red-100 text-red-600' :
                'hover:bg-brown-100'
              }`}
              title={userVote === 'down' ? 'You voted this down' : "This didn't work"}
            >
              {voting ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <ThumbsDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {expanded && (
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
                  {remedy.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-brown-700">{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-brown-800 mb-2">Instructions</h4>
                <ol className="list-decimal list-inside space-y-2">
                  {remedy.instructions.map((instruction, index) => (
                    <li key={index} className="text-brown-700">{instruction}</li>
                  ))}
                </ol>
              </div>

              {remedy.health_benefits && remedy.health_benefits.length > 0 && (
                <div>
                  <h4 className="font-semibold text-brown-800 mb-2">Health Benefits</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {remedy.health_benefits.map((benefit, index) => (
                      <li key={index} className="text-brown-700">{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {remedy.precautions && remedy.precautions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-brown-800 mb-2">Precautions</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {remedy.precautions.map((precaution, index) => (
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

              {remedy.additional_info && (
                <div>
                  <h4 className="font-semibold text-brown-800 mb-2">Additional Information</h4>
                  <p className="text-brown-700">{remedy.additional_info}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};