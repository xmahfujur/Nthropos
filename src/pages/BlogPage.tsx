import React, { useState } from 'react';
import { PageId, Article } from '../types';
import { articles } from '../data/initialData';
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Share2,
  CheckCircle2,
  Tag,
  Info
} from 'lucide-react';

interface BlogPageProps {
  initialArticleId?: string;
  onNavigate: (page: PageId) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  initialArticleId,
  onNavigate
}) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(() => {
    if (initialArticleId) {
      const found = articles.find((a) => a.id === initialArticleId);
      if (found) return found;
    }
    return null;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copyFeedback, setCopyFeedback] = useState(false);

  const categories = [
    'all',
    'Foundation Architectures',
    'Information Retrieval',
    'Model Adaptation',
    'Autonomous Systems',
    'Evaluation & Safety'
  ];

  const filteredArticles = articles.filter((a) => {
    if (selectedCategory === 'all') return true;
    return a.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleShare = (art: Article) => {
    navigator.clipboard.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-16">
      {/* If reading an article */}
      {selectedArticle ? (
        <article className="max-w-3xl mx-auto space-y-10 animate-in fade-in">
          {/* Back button */}
          <button
            onClick={() => setSelectedArticle(null)}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Publications</span>
          </button>

          {/* Meta headers */}
          <div className="space-y-4 border-b border-white/10 pb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="text-indigo-400">{selectedArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{selectedArticle.readTime}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400 bg-amber-950/40 border border-amber-500/20 px-2 py-0.5 rounded">
                Draft Research Note
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              {selectedArticle.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed italic">
              "{selectedArticle.excerpt}"
            </p>

            <div className="flex items-center justify-between pt-4 text-xs font-mono text-slate-500">
              <span>Prepared by Nthropos Research Group</span>
              <button
                onClick={() => handleShare(selectedArticle)}
                className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copyFeedback ? 'Link Copied!' : 'Share Note'}</span>
              </button>
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="p-6 rounded-xl bg-[#0d121f] border border-indigo-500/20 space-y-3">
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block font-semibold">
              Executive Summary & Key Invariants
            </span>
            <ul className="space-y-2">
              {selectedArticle.keyTakeaways.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Prose */}
          <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {selectedArticle.content.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Bottom attribution & discussion CTA */}
          <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Questions or competing empirical evidence regarding this analysis?
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded transition-colors cursor-pointer"
            >
              Discuss With Researchers
            </button>
          </div>
        </article>
      ) : (
        /* Blog Index View */
        <div className="space-y-12">
          {/* Header */}
          <section className="max-w-3xl space-y-6">
            <div className="text-xs font-mono text-indigo-400">Research & Engineering Publications</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Frontier Insights & Analytical Notes
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Analytical essays dissecting transformer mechanisms, retrieval dynamics, evaluation harnesses, and deterministic autonomous agents.
            </p>
            <div className="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-md text-xs text-indigo-200 flex items-center gap-2 max-w-2xl">
              <Info className="w-4 h-4 shrink-0 text-indigo-400" />
              <span>
                All publications reflect internal research notes and working hypotheses. Citations and data are validated prior to formal release.
              </span>
            </div>
          </section>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer capitalize ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white bg-[#0a0d15] border border-white/5'
                }`}
              >
                {cat === 'all' ? 'All Publications' : cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="p-6 rounded-xl bg-[#0a0d15] border border-white/5 hover:border-indigo-500/30 transition-all duration-200 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span className="text-indigo-400">{art.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{art.readTime}</span>
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                    {art.title}
                  </h2>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-indigo-400 font-medium">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
