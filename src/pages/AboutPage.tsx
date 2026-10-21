import React from 'react';
import { PageId, SiteConfig } from '../types';
import { teamMembers, milestones } from '../data/initialData';
import { ArrowRight, ShieldCheck, Microscope, Cpu, Compass, Users } from 'lucide-react';

interface AboutPageProps {
  config: SiteConfig;
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ config, onNavigate }) => {
  const principles = [
    {
      title: 'Scientific Rigor',
      icon: <Microscope className="w-5 h-5 text-indigo-400" />,
      desc: 'We treat AI architectures as empirical systems requiring reproducible benchmarks, formal failure analysis, and honest metric reporting.'
    },
    {
      title: 'Responsible Development',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      desc: 'We construct deterministic safeguards, execution sandboxes, and behavioral guardrails that prioritize user agency and computational safety.'
    },
    {
      title: 'Engineering Excellence',
      icon: <Cpu className="w-5 h-5 text-sky-400" />,
      desc: 'Research is only as valuable as its deployment reliability. We design modular, high-throughput systems that hold up under production stress.'
    },
    {
      title: 'Continuous Learning',
      icon: <Compass className="w-5 h-5 text-indigo-300" />,
      desc: 'The frontier moves rapidly. We maintain humble curiosity, iteratively discarding outdated hypotheses in light of new mathematical evidence.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-28">
      {/* Hero Intro */}
      <section className="max-w-3xl space-y-6">
        <div className="text-xs font-mono text-indigo-400">About Nthropos</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Pioneering AI Systems with Scientific Discipline
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Nthropos was founded on a simple observation: while foundation models have demonstrated unprecedented capabilities, the gap between proof-of-concept demos and dependable, verified production software remains vast.
        </p>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          We operate as an integrated research and engineering studio, pairing mathematical exploration of transformer mechanics with rigorous systems architecture to build AI that expands human problem-solving capacity.
        </p>
      </section>

      {/* Mission & Vision Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-xl bg-[#0c101a] border border-white/5 space-y-4">
          <span className="text-xs font-mono text-indigo-400">Our Mission</span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Expanding Human Capability
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {config.mission}
          </p>
        </div>

        <div className="p-8 rounded-xl bg-[#0c101a] border border-white/5 space-y-4">
          <span className="text-xs font-mono text-indigo-400">Our Vision</span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Moving Ideas Forward
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {config.vision}
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="space-y-12">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-mono text-indigo-400">First Principles</div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            What Governs Our Work
          </h2>
          <p className="text-sm text-slate-400">
            Four foundational commitments that anchor our research and product development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((pr, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-[#0a0d15] border border-white/5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#141a29] border border-white/10 flex items-center justify-center">
                  {pr.icon}
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {pr.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pr.desc}
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-600 block pt-2 border-t border-white/5">
                Principle 0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Team Profiles */}
      <section className="space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-6">
          <div className="max-w-xl space-y-2">
            <div className="text-xs font-mono text-indigo-400">Research & Engineering Leadership</div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              The Team Behind Nthropos
            </h2>
            <p className="text-sm text-slate-400">
              Interdisciplinary practitioners spanning transformer theory, high-throughput systems, and verifiable evaluation.
            </p>
          </div>

          <button
            onClick={() => onNavigate('careers')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Explore Open Roles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-[#0b0e18] border border-white/5 space-y-4 hover:border-white/15 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">{member.name}</h3>
                  <span className="text-xs text-indigo-400 font-mono block">
                    {member.role}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-indigo-950/60 border border-indigo-500/20 text-indigo-300 text-xs font-mono flex items-center justify-center">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
              </div>

              <div className="text-xs font-mono text-slate-400 bg-[#07090e] px-2.5 py-1.5 rounded border border-white/5">
                Focus: {member.focus}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap & Phases */}
      <section className="space-y-12">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-mono text-indigo-400">Evolution Trajectory</div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Organizational Trajectory
          </h2>
          <p className="text-sm text-slate-400">
            A transparent overview of our developmental milestones and active initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-[#0c101b] border border-white/5 space-y-3"
            >
              <span className="text-xs font-mono text-indigo-400 block font-semibold">
                {m.year}
              </span>
              <h3 className="text-base font-bold text-white tracking-tight">
                {m.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="p-10 rounded-xl bg-gradient-to-r from-indigo-950/40 to-slate-900/40 border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl font-bold text-white">
            Join Our Research or Inquire About Collaborative Engineering
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            We actively collaborate with enterprise engineering teams, academic researchers, and forward-thinking product architects.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('careers')}
            className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-[#121624] border border-white/10 rounded transition-colors cursor-pointer"
          >
            Careers & Fellowships
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded transition-colors cursor-pointer"
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
};
