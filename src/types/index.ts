export type PageId =
  | 'home'
  | 'about'
  | 'research'
  | 'solutions'
  | 'projects'
  | 'blog'
  | 'careers'
  | 'contact'
  | 'privacy'
  | 'terms';

export interface SiteConfig {
  companyName: string;
  tagline: string;
  heroHeadline: string;
  heroSupportingText: string;
  mission: string;
  vision: string;
  contactEmail: string;
  primaryLocation: string;
  socials: {
    github: string;
    x: string;
    linkedin: string;
    huggingface: string;
  };
  announcement?: {
    active: boolean;
    text: string;
    linkPage?: PageId;
  };
}

export interface Capability {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: 'Sparkles' | 'Brain' | 'Cpu' | 'Workflow';
  focusAreas: string[];
}

export interface ResearchTopic {
  id: string;
  title: string;
  status: 'Active Investigation' | 'Planned Exploration' | 'Core Discipline';
  description: string;
  keyQuestions: string[];
  methods: string[];
}

export interface ProjectConcept {
  id: string;
  title: string;
  category: 'Retrieval' | 'Research Tooling' | 'Evaluation' | 'Automation';
  tag: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  architecture: string[];
  visualType: 'rag' | 'research' | 'playground' | 'automation';
  keyCapabilities: string[];
  isDemoConcept: true;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
  isDraft: true;
}

export interface CareerRole {
  id: string;
  title: string;
  department: 'Research' | 'Engineering' | 'Infrastructure' | 'Product';
  location: string;
  type: string;
  experience: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
}

export interface ContactSubmission {
  id: string;
  createdAt: string;
  name: string;
  workEmail: string;
  organization?: string;
  projectType: string;
  budgetRange?: string;
  message: string;
  status: 'New' | 'Under Review' | 'Contacted' | 'Archived';
}

export interface JobApplication {
  id: string;
  createdAt: string;
  roleId: string;
  roleTitle: string;
  fullName: string;
  email: string;
  portfolioOrGithub: string;
  coverNote: string;
}
