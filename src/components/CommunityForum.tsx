import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  Heart,
  Share2,
  Plus,
  Send,
  Sparkles,
  MapPin,
  CheckCircle,
  Tag,
  X,
} from 'lucide-react';
import { Language, CommunityPost, UserProfile } from '../types';
import { translations } from '../translations';
import { initialPosts } from '../data/mockData';

interface CommunityForumProps {
  language: Language;
  userProfile: UserProfile;
}

export const CommunityForum: React.FC<CommunityForumProps> = ({
  language,
  userProfile,
}) => {
  const t = translations[language] || translations.en;
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
  const [showNewPostModal, setShowNewPostModal] = useState<boolean>(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCrop, setPostCrop] = useState('Capsicum');
  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: userProfile.name,
      location: `${userProfile.district}, Odisha`,
      crop: postCrop,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      date: 'Just now',
      title: postTitle,
      content: postContent,
      likes: 1,
      commentsCount: 0,
      tags: [postCrop, 'PolyhouseFarmer', 'Odisha'],
      replies: [],
    };

    setPosts([newPost, ...posts]);
    setPostTitle('');
    setPostContent('');
    setShowNewPostModal(false);
  };

  const handleAddReply = (postId: string) => {
    if (!replyContent.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            replies: [
              ...p.replies,
              {
                author: userProfile.name,
                role: 'Farmer',
                content: replyContent.trim(),
                date: 'Just now',
              },
            ],
          };
        }
        return p;
      })
    );
    setReplyContent('');
    setActiveReplyPostId(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 text-white shadow-xl relative overflow-hidden border border-emerald-700">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/15 mb-3">
              <Users className="w-3.5 h-3.5 text-lime-300" />
              <span>Odisha & Pan-India Kisan Community</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {language === 'or' ? 'କୃଷକ ଚର୍ଚ୍ଚା ଓ ଅଭିଜ୍ଞତା (Kisan Forum)' : 'Farmer Community & Peer Network'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl">
              Share real harvest photos, fertigation tips, disease experiences, and market sales records with fellow polyhouse farmers.
            </p>
          </div>

          <button
            onClick={() => setShowNewPostModal(true)}
            className="py-3 px-5 rounded-2xl bg-gradient-to-r from-lime-400 to-emerald-400 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create Discussion</span>
          </button>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {post.author}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {post.crop}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{post.location}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
              {post.title}
            </h3>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {post.content}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-stone-800 text-slate-600 dark:text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-stone-800 text-xs">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-rose-500 transition"
                >
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  <span className="font-bold">{post.likes}</span>
                </button>

                <button
                  onClick={() =>
                    setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id)
                  }
                  className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-600 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-bold">{post.replies.length} replies</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-400">PolySmart Verified Grower</span>
            </div>

            {/* Replies thread */}
            {post.replies.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-50 dark:border-stone-800/80">
                {post.replies.map((reply, rIdx) => (
                  <div
                    key={rIdx}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-stone-800/60 border border-slate-200/50 dark:border-stone-700/50 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {reply.author}{' '}
                        <span className="text-[10px] font-normal text-emerald-600">
                          ({reply.role})
                        </span>
                      </span>
                      <span className="text-[10px] text-slate-400">{reply.date}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Add reply input */}
            {activeReplyPostId === post.id && (
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a supportive reply or suggestion..."
                  className="flex-1 bg-slate-50 dark:bg-stone-800 border border-slate-200 dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white"
                />
                <button
                  onClick={() => handleAddReply(post.id)}
                  className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-2xl border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-stone-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Start a New Farmer Discussion
              </h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPost} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Topic Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Drip fertigation tips for early season capsicum"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Crop Focused
                </label>
                <select
                  value={postCrop}
                  onChange={(e) => setPostCrop(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-slate-900 dark:text-white font-medium"
                >
                  <option value="Capsicum">Colored Bell Pepper (Capsicum)</option>
                  <option value="Dutch Rose">Dutch Cut Rose</option>
                  <option value="Tomato">Polyhouse Tomato</option>
                  <option value="Cucumber">English Cucumber</option>
                  <option value="Strawberry">Strawberries</option>
                  <option value="General">General Polyhouse Architecture</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Details & Observations
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details of your crop variety, fertilizer dosage, weather observation, or yield records..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/30"
                >
                  Publish to Kisan Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
