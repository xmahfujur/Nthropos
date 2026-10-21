import React, { useState, useEffect } from 'react';
import { SiteConfig, ContactSubmission, JobApplication } from '../types';
import { storageService } from '../services/storageService';
import {
  X,
  Lock,
  Download,
  Trash2,
  CheckCircle,
  Save,
  RotateCcw,
  Inbox,
  Briefcase,
  Settings,
  ShieldAlert
} from 'lucide-react';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onUpdateConfig: (newConfig: SiteConfig) => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'submissions' | 'applications' | 'settings'>('submissions');

  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Editable config local state
  const [editableConfig, setEditableConfig] = useState<SiteConfig>(config);

  useEffect(() => {
    setEditableConfig(config);
  }, [config]);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    setSubmissions(storageService.getSubmissions());
    setApplications(storageService.getApplications());
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Authorized team access passcode
    if (passcode === 'nthropos' || passcode === 'admin' || passcode === 'nthropos2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. (Hint: use "nthropos" for editorial access)');
    }
  };

  const handleStatusChange = (id: string, status: ContactSubmission['status']) => {
    storageService.updateSubmissionStatus(id, status);
    loadData();
    showNotice(`Submission marked as ${status}`);
  };

  const handleDeleteSubmission = (id: string) => {
    if (window.confirm('Delete this submission record?')) {
      storageService.deleteSubmission(id);
      loadData();
      showNotice('Submission removed');
    }
  };

  const showNotice = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveSiteConfig(editableConfig);
    onUpdateConfig(editableConfig);
    showNotice('Brand mission, vision, and settings updated successfully.');
  };

  const handleResetConfig = () => {
    if (window.confirm('Reset all brand copy, mission, and vision to initial defaults?')) {
      const reset = storageService.resetSiteConfig();
      setEditableConfig(reset);
      onUpdateConfig(reset);
      showNotice('Reset to initial defaults.');
    }
  };

  // Export submissions to CSV
  const handleExportCSV = () => {
    if (submissions.length === 0) {
      alert('No submissions to export.');
      return;
    }
    const headers = ['ID', 'Date', 'Name', 'Email', 'Organization', 'Project Type', 'Budget', 'Status', 'Message'];
    const rows = submissions.map((s) => [
      s.id,
      s.createdAt,
      `"${s.name.replace(/"/g, '""')}"`,
      s.workEmail,
      `"${(s.organization || '').replace(/"/g, '""')}"`,
      `"${s.projectType.replace(/"/g, '""')}"`,
      s.budgetRange || '',
      s.status,
      `"${s.message.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nthropos_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export submissions to JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `nthropos_inquiries_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  };

  if (!isOpen) return null;

  const filteredSubmissions = submissions.filter((s) => {
    if (statusFilter === 'all') return true;
    return s.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#090c13] border-l border-white/10 h-full overflow-y-auto flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#06080e]">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-white">Nthropos Editorial Studio</span>
            <span className="text-xs font-mono text-indigo-400">v1.2</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close Studio Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Temporary Feedback Notification */}
        {feedbackMsg && (
          <div className="bg-emerald-950/80 border-b border-emerald-500/20 px-6 py-2.5 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Authorized Access</h3>
            <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed">
              Access project inquiries, lead logs, and brand mission controls. Enter the editorial key to proceed.
            </p>

            <form onSubmit={handleAuthSubmit} className="w-full max-w-xs space-y-3">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. nthropos)"
                className="w-full px-3 py-2 text-sm bg-[#121622] border border-white/10 rounded focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500 text-center font-mono"
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-2 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors cursor-pointer"
              >
                Unlock Studio
              </button>
              {authError && (
                <p className="text-xs text-rose-400 flex items-center justify-center gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  <span>{authError}</span>
                </p>
              )}
              <div className="pt-4 text-[11px] text-slate-500">
                <span>Default editorial passcode: </span>
                <code className="text-indigo-300 bg-indigo-950/60 px-1 py-0.5 rounded font-mono">nthropos</code>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Navigation Tabs */}
            <div className="flex border-b border-white/5 bg-[#0b0e17] px-6">
              <button
                onClick={() => setActiveTab('submissions')}
                className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                  activeTab === 'submissions'
                    ? 'border-indigo-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>Contact Inquiries</span>
                <span className="font-mono text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                  {submissions.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                  activeTab === 'applications'
                    ? 'border-indigo-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Career Applications</span>
                <span className="font-mono text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                  {applications.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                  activeTab === 'settings'
                    ? 'border-indigo-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Brand & Copy Settings</span>
              </button>
            </div>

            {/* TAB 1: Inquiries / Submissions */}
            {activeTab === 'submissions' && (
              <div className="p-6 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Status filter */}
                  <div className="flex items-center gap-1.5">
                    {['all', 'new', 'under review', 'contacted', 'archived'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer capitalize ${
                          statusFilter === status
                            ? 'bg-indigo-600 text-white font-medium'
                            : 'bg-[#121622] text-slate-400 hover:text-white'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  {/* Export buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportCSV}
                      className="px-2.5 py-1 text-xs bg-[#121622] hover:bg-[#1a2030] text-slate-300 rounded border border-white/5 flex items-center gap-1 cursor-pointer"
                      title="Export CSV"
                    >
                      <Download className="w-3 h-3" />
                      <span>CSV</span>
                    </button>
                    <button
                      onClick={handleExportJSON}
                      className="px-2.5 py-1 text-xs bg-[#121622] hover:bg-[#1a2030] text-slate-300 rounded border border-white/5 flex items-center gap-1 cursor-pointer"
                      title="Export JSON"
                    >
                      <Download className="w-3 h-3" />
                      <span>JSON</span>
                    </button>
                  </div>
                </div>

                {filteredSubmissions.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs">
                    <Inbox className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p>No contact submissions match current filter.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredSubmissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-4 rounded-lg bg-[#0e121d] border border-white/5 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white text-sm">{sub.name}</span>
                              {sub.organization && (
                                <span className="text-xs text-slate-400 font-mono">
                                  ({sub.organization})
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-indigo-400 font-mono">{sub.workEmail}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Status picker */}
                            <select
                              value={sub.status}
                              onChange={(e) =>
                                handleStatusChange(sub.id, e.target.value as ContactSubmission['status'])
                              }
                              className="text-xs bg-[#171d2e] border border-white/10 rounded px-2 py-1 text-slate-300 focus:outline-none"
                            >
                              <option value="New">New</option>
                              <option value="Under Review">Under Review</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Archived">Archived</option>
                            </select>

                            <button
                              onClick={() => handleDeleteSubmission(sub.id)}
                              className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                              title="Delete Submission"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-1 font-mono pt-1">
                          <span>Type: {sub.projectType}</span>
                          <span>Budget: {sub.budgetRange}</span>
                          <span>Date: {new Date(sub.createdAt).toLocaleDateString()}</span>
                        </div>

                        <p className="text-xs text-slate-300 bg-[#080a10] p-3 rounded border border-white/5 whitespace-pre-wrap leading-relaxed">
                          {sub.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Career Applications */}
            {activeTab === 'applications' && (
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Candidate Submissions ({applications.length})
                  </span>
                </div>

                {applications.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs">
                    <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p>No candidate applications recorded yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className="p-4 rounded-lg bg-[#0e121d] border border-white/5 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-semibold text-white">{app.fullName}</span>
                            <span className="text-xs text-indigo-400 font-mono block">
                              {app.email}
                            </span>
                          </div>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/20 text-indigo-300">
                            {app.roleTitle}
                          </span>
                        </div>
                        {app.portfolioOrGithub && (
                          <div className="text-xs text-slate-400 font-mono">
                            Portfolio: <a href={app.portfolioOrGithub} target="_blank" rel="noreferrer" className="underline text-sky-400">{app.portfolioOrGithub}</a>
                          </div>
                        )}
                        <p className="text-xs text-slate-300 bg-[#080a10] p-3 rounded border border-white/5 whitespace-pre-wrap">
                          {app.coverNote}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Brand & Copy Customizer */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveConfig} className="p-6 space-y-5">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">Live Brand Customizer</h4>
                  <p className="text-xs text-slate-400">
                    Edit brand claims, company mission, vision, and hero copy. Changes update instantly across the entire website.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Hero Headline
                    </label>
                    <input
                      type="text"
                      value={editableConfig.heroHeadline}
                      onChange={(e) =>
                        setEditableConfig({ ...editableConfig, heroHeadline: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs bg-[#121622] border border-white/10 rounded focus:border-indigo-500 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Hero Supporting Text
                    </label>
                    <textarea
                      rows={2}
                      value={editableConfig.heroSupportingText}
                      onChange={(e) =>
                        setEditableConfig({
                          ...editableConfig,
                          heroSupportingText: e.target.value
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-[#121622] border border-white/10 rounded focus:border-indigo-500 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Company Mission
                    </label>
                    <textarea
                      rows={2}
                      value={editableConfig.mission}
                      onChange={(e) =>
                        setEditableConfig({ ...editableConfig, mission: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs bg-[#121622] border border-white/10 rounded focus:border-indigo-500 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Company Vision
                    </label>
                    <textarea
                      rows={2}
                      value={editableConfig.vision}
                      onChange={(e) =>
                        setEditableConfig({ ...editableConfig, vision: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs bg-[#121622] border border-white/10 rounded focus:border-indigo-500 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={editableConfig.contactEmail}
                        onChange={(e) =>
                          setEditableConfig({ ...editableConfig, contactEmail: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs bg-[#121622] border border-white/10 rounded focus:border-indigo-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Primary Location
                      </label>
                      <input
                        type="text"
                        value={editableConfig.primaryLocation}
                        onChange={(e) =>
                          setEditableConfig({
                            ...editableConfig,
                            primaryLocation: e.target.value
                          })
                        }
                        className="w-full px-3 py-2 text-xs bg-[#121622] border border-white/10 rounded focus:border-indigo-500 text-white"
                      />
                    </div>
                  </div>

                  {/* Announcement Bar Settings */}
                  <div className="p-3 bg-[#0e121d] rounded border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-white">Top Announcement Bar</label>
                      <input
                        type="checkbox"
                        checked={editableConfig.announcement?.active ?? true}
                        onChange={(e) =>
                          setEditableConfig({
                            ...editableConfig,
                            announcement: {
                              active: e.target.checked,
                              text: editableConfig.announcement?.text || '',
                              linkPage: editableConfig.announcement?.linkPage
                            }
                          })
                        }
                        className="accent-indigo-600 rounded"
                      />
                    </div>
                    <input
                      type="text"
                      value={editableConfig.announcement?.text || ''}
                      onChange={(e) =>
                        setEditableConfig({
                          ...editableConfig,
                          announcement: {
                            active: editableConfig.announcement?.active ?? true,
                            text: e.target.value,
                            linkPage: editableConfig.announcement?.linkPage
                          }
                        })
                      }
                      placeholder="Announcement notice text"
                      className="w-full px-3 py-1.5 text-xs bg-[#121622] border border-white/10 rounded text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/5">
                  <button
                    type="button"
                    onClick={handleResetConfig}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-400 hover:text-white rounded border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Defaults</span>
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors cursor-pointer shadow-sm shadow-indigo-600/30"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Brand Config</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
