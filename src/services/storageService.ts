import { SiteConfig, ContactSubmission, JobApplication } from '../types';
import { initialSiteConfig } from '../data/initialData';

const CONFIG_KEY = 'nthropos_site_config_v1';
const SUBMISSIONS_KEY = 'nthropos_contact_submissions_v1';
const APPLICATIONS_KEY = 'nthropos_job_applications_v1';
const NEWSLETTER_KEY = 'nthropos_newsletter_subscribers_v1';
const RATE_LIMIT_KEY = 'nthropos_last_submission_ts';

export const storageService = {
  getSiteConfig(): SiteConfig {
    try {
      const stored = localStorage.getItem(CONFIG_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load site config from storage, using default', e);
    }
    return initialSiteConfig;
  },

  saveSiteConfig(config: SiteConfig): void {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save site config', e);
    }
  },

  resetSiteConfig(): SiteConfig {
    try {
      localStorage.removeItem(CONFIG_KEY);
    } catch (e) {
      console.error(e);
    }
    return initialSiteConfig;
  },

  getSubmissions(): ContactSubmission[] {
    try {
      const stored = localStorage.getItem(SUBMISSIONS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load submissions', e);
    }
    return [];
  },

  saveSubmission(data: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>): {
    success: boolean;
    error?: string;
    submission?: ContactSubmission;
  } {
    // Spam / rate limiting check (minimum 5 seconds between submissions)
    const now = Date.now();
    const lastSubmission = localStorage.getItem(RATE_LIMIT_KEY);
    if (lastSubmission && now - parseInt(lastSubmission, 10) < 5000) {
      return {
        success: false,
        error: 'Please wait a moment before sending another message.'
      };
    }

    // Server-grade validation
    if (!data.name || data.name.trim().length < 2) {
      return { success: false, error: 'Full name must be at least 2 characters.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.workEmail || !emailRegex.test(data.workEmail.trim())) {
      return { success: false, error: 'Please provide a valid work email address.' };
    }

    if (!data.projectType) {
      return { success: false, error: 'Please select a project type.' };
    }

    if (!data.message || data.message.trim().length < 15) {
      return {
        success: false,
        error: 'Please provide a descriptive message (at least 15 characters).'
      };
    }

    const newSubmission: ContactSubmission = {
      id: 'nth-' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      name: data.name.trim(),
      workEmail: data.workEmail.trim(),
      organization: data.organization?.trim() || undefined,
      projectType: data.projectType,
      budgetRange: data.budgetRange || 'Not specified',
      message: data.message.trim(),
      status: 'New'
    };

    try {
      const current = this.getSubmissions();
      const updated = [newSubmission, ...current];
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
      localStorage.setItem(RATE_LIMIT_KEY, now.toString());
      return { success: true, submission: newSubmission };
    } catch (e) {
      return {
        success: false,
        error: 'Storage failure. Could not record submission.'
      };
    }
  },

  updateSubmissionStatus(
    id: string,
    status: ContactSubmission['status']
  ): boolean {
    try {
      const list = this.getSubmissions();
      const idx = list.findIndex((s) => s.id === id);
      if (idx !== -1) {
        list[idx].status = status;
        localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(list));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  },

  deleteSubmission(id: string): boolean {
    try {
      const list = this.getSubmissions().filter((s) => s.id !== id);
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(list));
      return true;
    } catch (e) {
      console.error(e);
    }
    return false;
  },

  // Job Applications
  getApplications(): JobApplication[] {
    try {
      const stored = localStorage.getItem(APPLICATIONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  saveApplication(data: Omit<JobApplication, 'id' | 'createdAt'>): {
    success: boolean;
    error?: string;
  } {
    if (!data.fullName || data.fullName.trim().length < 2) {
      return { success: false, error: 'Full name is required.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email.trim())) {
      return { success: false, error: 'Valid email address is required.' };
    }
    if (!data.coverNote || data.coverNote.trim().length < 20) {
      return { success: false, error: 'Cover note must be at least 20 characters.' };
    }

    const application: JobApplication = {
      id: 'app-' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      roleId: data.roleId,
      roleTitle: data.roleTitle,
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      portfolioOrGithub: data.portfolioOrGithub.trim(),
      coverNote: data.coverNote.trim()
    };

    try {
      const current = this.getApplications();
      localStorage.setItem(APPLICATIONS_KEY, JSON.stringify([application, ...current]));
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Failed to record application.' };
    }
  },

  // Newsletter
  subscribeNewsletter(email: string): { success: boolean; message: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    try {
      const current = JSON.parse(localStorage.getItem(NEWSLETTER_KEY) || '[]');
      if (current.includes(email.trim().toLowerCase())) {
        return { success: true, message: 'You are already subscribed to Nthropos research briefings.' };
      }
      current.push(email.trim().toLowerCase());
      localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(current));
      return { success: true, message: 'Subscribed to Nthropos research briefings.' };
    } catch (e) {
      return { success: false, message: 'Subscription failed. Please try again.' };
    }
  }
};
