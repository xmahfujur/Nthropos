import React, { useState } from 'react';
import { PageId, CareerRole } from '../types';
import { careerRoles } from '../data/initialData';
import { storageService } from '../services/storageService';
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  X,
  Zap,
  Globe,
  Cpu,
  Shield
} from 'lucide-react';

interface CareersPageProps {
  onNavigate: (page: PageId) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [applyingRole, setApplyingRole] = useState<CareerRole | null>(null);

  // Application form state
  const [appForm, setAppForm] = useState({
    fullName: '',
    email: '',
    portfolioOrGithub: '',
    coverNote: ''
  });
  const [appStatus, setAppStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [appError, setAppError] = useState('');

  const departments = ['all', 'Research', 'Infrastructure', 'Engineering'];

  const filteredRoles = careerRoles.filter((r) => {
    if (selectedDepartment === 'all') return true;
    return r.department.toLowerCase() === selectedDepartment.toLowerCase();
  });

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingRole) return;
    setAppStatus('submitting');
    setAppError('');

    setTimeout(() => {
      const res = storageService.saveApplication({
        roleId: applyingRole.id,
        roleTitle: applyingRole.title,
        fullName: appForm.fullName,
        email: appForm.email,
        portfolioOrGithub: appForm.portfolioOrGithub,
        coverNote: appForm.coverNote
      });

      if (res.success) {
        setAppStatus('success');
        setAppForm({ fullName: '', email: '', portfolioOrGithub: '', coverNote: '' });
      } else {
        setAppStatus('error');
        setAppError(res.error || 'Failed to submit application.');
      }
    }, 400);
  };

  const perks = [
    {
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      title: 'Dedicated Compute Clusters',
      desc: 'Uncapped access to modern GPU clusters for rigorous model experiments and low-latency benchmark evaluations.'
    },
    {
      icon: <Globe className="w-5 h-5 text-sky-400" />,
      title: 'Autonomous & Remote-First',
      desc: 'Work from wherever you produce your best thinking. Asynchronous collaboration with high trust and minimal meetings.'
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: 'Competitive Equity & Salary',
      desc: 'Top-of-market compensation packages with generous equity grants and comprehensive health and wellness coverage.'
    },
    {
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
      title: 'Open Source & Publishing',
      desc: 'We encourage academic publishing, conference travel, and contributing novel libraries back to the research community.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-24">
      {/* Header */}
      <section className="max-w-3xl space-y-6">
        <div className="text-xs font-mono text-indigo-400">Careers & Fellowships</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Work at the Mathematical Frontier of Intelligence
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          We are building a lean, exceptionally capable team of research scientists, systems architects, and AI engineers focused on turning foundational discoveries into reliable software.
        </p>
      </section>

      {/* Perks Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {perks.map((p, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-[#0c101b] border border-white/5 space-y-3"
          >
            <div className="p-2 rounded bg-[#131826] w-fit border border-white/5">{p.icon}</div>
            <h2 className="text-base font-bold text-white tracking-tight">{p.title}</h2>
            <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </section>

      {/* Open Roles Section */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Current Open Roles ({careerRoles.length})
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer capitalize ${
                  selectedDepartment === dept
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white bg-[#0a0d15] border border-white/5'
                }`}
              >
                {dept === 'all' ? 'All Departments' : dept}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              className="p-8 rounded-xl bg-[#0b0e18] border border-white/5 hover:border-indigo-500/30 transition-all space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">{role.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="text-indigo-400">{role.department}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{role.location}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{role.type}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setApplyingRole(role);
                    setAppStatus('idle');
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors cursor-pointer shrink-0 self-start md:self-center"
                >
                  Apply for Role
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                {role.overview}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Key Responsibilities:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {role.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-indigo-400 mt-0.5">·</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Desired Qualifications:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {role.qualifications.map((q, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* General Fellowship Callout */}
      <section className="p-8 rounded-xl bg-[#090d16] border border-white/5 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Don't see an exact match?</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          We frequently create custom positions for outstanding researchers, compiler experts, and distributed systems engineers. Send a speculative brief to our research team.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="px-5 py-2.5 text-xs font-medium text-slate-200 hover:text-white bg-[#121624] border border-white/10 rounded cursor-pointer"
        >
          Send General Research Inquiry
        </button>
      </section>

      {/* Application Modal */}
      {applyingRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0c101c] border border-white/10 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setApplyingRole(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/5 cursor-pointer"
              aria-label="Close application modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono text-indigo-400">Position Application</span>
              <h3 className="text-xl font-bold text-white">{applyingRole.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{applyingRole.department} · {applyingRole.location}</p>
            </div>

            {appStatus === 'success' ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-base font-semibold text-white">Application Recorded</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you for applying to Nthropos. Our engineering leadership reviews applications directly and will reach out if there is a mutual fit.
                </p>
                <button
                  onClick={() => setApplyingRole(null)}
                  className="mt-2 px-4 py-2 text-xs font-medium bg-emerald-700 hover:bg-emerald-600 text-white rounded cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={appForm.fullName}
                    onChange={(e) => setAppForm({ ...appForm, fullName: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3 py-2 text-xs bg-[#131929] border border-white/10 rounded focus:border-indigo-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={appForm.email}
                    onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                    placeholder="name@institution.edu"
                    className="w-full px-3 py-2 text-xs bg-[#131929] border border-white/10 rounded focus:border-indigo-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    GitHub, Google Scholar, or Portfolio URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={appForm.portfolioOrGithub}
                    onChange={(e) => setAppForm({ ...appForm, portfolioOrGithub: e.target.value })}
                    placeholder="https://github.com/username or scholar profile"
                    className="w-full px-3 py-2 text-xs bg-[#131929] border border-white/10 rounded focus:border-indigo-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Technical Summary / Cover Note * (min 20 characters)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={appForm.coverNote}
                    onChange={(e) => setAppForm({ ...appForm, coverNote: e.target.value })}
                    placeholder="Highlight your relevant research contributions, systems engineering experience, or why you want to work on frontier architectures..."
                    className="w-full px-3 py-2 text-xs bg-[#131929] border border-white/10 rounded focus:border-indigo-500 text-white"
                  />
                </div>

                {appError && (
                  <p className="text-xs text-rose-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{appError}</span>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={appStatus === 'submitting'}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded transition-colors cursor-pointer disabled:opacity-50"
                >
                  {appStatus === 'submitting' ? 'Submitting Application...' : 'Send Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
