import React from 'react';
import { Calendar, User, Tag } from 'lucide-react';

export const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Slow Cooking",
      excerpt: "Discover how traditional slow-cooking methods can transform simple ingredients into extraordinary dishes.",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=2940",
      date: "2024-03-08",
      author: "Chef Maria Rodriguez",
      category: "Techniques"
    },
    {
      id: 2,
      title: "Seasonal Ingredients: Spring Edition",
      excerpt: "A guide to the best spring ingredients and how to use them in your cooking.",
      image: "https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&q=80&w=2940",
      date: "2024-03-07",
      author: "James Chen",
      category: "Ingredients"
    },
    {
      id: 3,
      title: "Heritage Recipes: Stories from Grandma's Kitchen",
      excerpt: "Exploring family recipes that have been passed down through generations.",
      image: "https://images.unsplash.com/photo-1551218372-a8789b81b253?auto=format&fit=crop&q=80&w=2940",
      date: "2024-03-06",
      author: "Sarah Thompson",
      category: "Heritage"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-display text-brown-800 mb-6">Culinary Blog</h1>

      <div className="prose prose-brown max-w-none">
        <div className="grid gap-8">
          {blogPosts.map(post => (
            <article key={post.id} className="bg-cream rounded-lg shadow-md overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-[300px] object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-brown-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {post.category}
                  </div>
                </div>
                <h2 className="text-2xl font-display text-brown-800 mb-4">{post.title}</h2>
                <p className="text-brown-600 mb-4">{post.excerpt}</p>
                <button className="text-brown-600 hover:text-brown-800 font-medium">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-brown-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-display text-brown-800 mb-4">Featured Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <h3 className="font-semibold text-brown-800 mb-2">Techniques</h3>
              <p className="text-brown-600 text-sm">Master essential cooking methods</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <h3 className="font-semibold text-brown-800 mb-2">Ingredients</h3>
              <p className="text-brown-600 text-sm">Explore seasonal produce</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <h3 className="font-semibold text-brown-800 mb-2">Heritage</h3>
              <p className="text-brown-600 text-sm">Traditional family recipes</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <h3 className="font-semibold text-brown-800 mb-2">Health</h3>
              <p className="text-brown-600 text-sm">Nutritious cooking tips</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <h3 className="font-semibold text-brown-800 mb-2">Equipment</h3>
              <p className="text-brown-600 text-sm">Kitchen tool guides</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <h3 className="font-semibold text-brown-800 mb-2">Culture</h3>
              <p className="text-brown-600 text-sm">Food stories worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};