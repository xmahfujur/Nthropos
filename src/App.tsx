/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, SiteConfig } from './types';
import { storageService } from './services/storageService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdminDrawer } from './components/AdminDrawer';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ResearchPage } from './pages/ResearchPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { BlogPage } from './pages/BlogPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [extraId, setExtraId] = useState<string | undefined>(undefined);
  const [config, setConfig] = useState<SiteConfig>(() => storageService.getSiteConfig());
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Keyboard shortcut (Alt + S or Cmd/Ctrl + Shift + A) to open team studio
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (page: PageId, detailId?: string) => {
    setCurrentPage(page);
    setExtraId(detailId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-[#f1f5f9] selection:bg-indigo-600/30 selection:text-indigo-200">
      {/* Top Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
        announcement={config.announcement}
      />

      {/* Main Page Content */}
      <main className="flex-1 w-full" id="main-content">
        {currentPage === 'home' && (
          <HomePage config={config} onNavigate={handleNavigate} />
        )}
        {currentPage === 'about' && (
          <AboutPage config={config} onNavigate={handleNavigate} />
        )}
        {currentPage === 'research' && (
          <ResearchPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'solutions' && (
          <SolutionsPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'projects' && (
          <ProjectsPage initialProjectId={extraId} onNavigate={handleNavigate} />
        )}
        {currentPage === 'blog' && (
          <BlogPage initialArticleId={extraId} onNavigate={handleNavigate} />
        )}
        {currentPage === 'careers' && (
          <CareersPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'contact' && (
          <ContactPage config={config} onNavigate={handleNavigate} />
        )}
        {currentPage === 'privacy' && (
          <LegalPage initialTab="privacy" onNavigate={handleNavigate} />
        )}
        {currentPage === 'terms' && (
          <LegalPage initialTab="terms" onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        config={config}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Editorial & Submissions Studio Drawer */}
      <AdminDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
      />
    </div>
  );
}
