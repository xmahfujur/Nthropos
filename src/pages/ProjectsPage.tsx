import React, { useState } from 'react';
import { PageId, ProjectConcept } from '../types';
import { projectConcepts } from '../data/initialData';
import { ProjectCardVisual } from '../components/ProjectCardVisual';
import {
  Layers,
  ArrowRight,
  ExternalLink,
  Cpu,
  CheckCircle2,
  Terminal,
  Play,
  RotateCcw,
  Sliders,
  Sparkles,
  Info
} from 'lucide-react';

interface ProjectsPageProps {
  initialProjectId?: string;
  onNavigate: (page: PageId) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  initialProjectId,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectConcept>(() => {
    if (initialProjectId) {
      const found = projectConcepts.find((p) => p.id === initialProjectId);
      if (found) return found;
    }
    return projectConcepts[0];
  });

  // Interactive Concept Simulation Lab State
  const [activeTab, setActiveTab] = useState<'architecture' | 'simulation'>('architecture');

  // Interactive simulation states
  // 1. RAG Simulation State
  const [ragQuery, setRagQuery] = useState('How does multi-head attention retain high-entropy tokens?');
  const [ragRunning, setRagRunning] = useState(false);
  const [ragResults, setRagResults] = useState<{
    denseScore: number;
    bm25Rank: number;
    chunkText: string;
    source: string;
  }[] | null>(null);

  // 2. Playground Simulation State
  const [temperature, setTemperature] = useState(0.3);
  const [topP, setTopP] = useState(0.9);
  const [promptSample, setPromptSample] = useState('Analyze the stability bounds of low-rank adapter matrices.');

  // 3. Agent Simulation State
  const [agentStep, setAgentStep] = useState(0);
  const [agentRunning, setAgentRunning] = useState(false);

  const categories = ['all', 'Retrieval', 'Research Tooling', 'Evaluation', 'Automation'];

  const filtered = projectConcepts.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const runRagSimulation = () => {
    setRagRunning(true);
    setRagResults(null);
    setTimeout(() => {
      setRagResults([
        {
          denseScore: 0.892,
          bm25Rank: 1,
          chunkText:
            'Induction circuits in intermediate transformer layers preserve token sequences across context bounds through dedicated copy-suppression attention heads.',
          source: 'doc_transformer_circuits_v2.pdf (p. 14, §3.2)'
        },
        {
          denseScore: 0.841,
          bm25Rank: 4,
          chunkText:
            'Reciprocal rank fusion weights dense cosine distance against sparse lexical co-occurrence to eliminate out-of-vocabulary false negatives.',
          source: 'hybrid_retrieval_benchmarks.pdf (p. 8, §2.1)'
        }
      ]);
      setRagRunning(false);
    }, 500);
  };

  const runAgentStep = () => {
    setAgentRunning(true);
    let step = 0;
    setAgentStep(0);
    const interval = setInterval(() => {
      step += 1;
      setAgentStep(step);
      if (step >= 4) {
        clearInterval(interval);
        setAgentRunning(false);
      }
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-24">
      {/* Header */}
      <section className="max-w-3xl space-y-6">
        <div className="text-xs font-mono text-indigo-400">Architectural Concepts & Demonstrations</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Systems We Design & Explore
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          These projects represent demonstration concepts and research prototypes designed to test specific engineering hypotheses in retrieval, evaluation, and workflow autonomy.
        </p>
        <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-md text-xs text-amber-200/90 flex items-center gap-2 max-w-2xl">
          <Info className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            Notice: All showcase projects are demonstration prototypes designed to validate engineering feasibility.
          </span>
        </div>
      </section>

      {/* Category Filter Tabs */}
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
            {cat === 'all' ? 'All Demonstration Concepts' : cat}
          </button>
        ))}
      </div>

      {/* Grid of Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            onClick={() => {
              setActiveProject(proj);
              const element = document.getElementById('project-detail-workbench');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`p-6 rounded-xl border transition-all duration-300 space-y-5 cursor-pointer ${
              activeProject.id === proj.id
                ? 'bg-[#0f1422] border-indigo-500/50 ring-1 ring-indigo-500/30'
                : 'bg-[#0a0d15] border-white/5 hover:border-white/15'
            }`}
          >
            <ProjectCardVisual type={proj.visualType} title={proj.title} />

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">{proj.category}</span>
                <span className="text-indigo-400">{proj.tag}</span>
              </div>

              <h2 className="text-xl font-bold text-white tracking-tight">
                {proj.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {proj.shortDescription}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs text-indigo-400 font-medium">
              <span>{activeProject.id === proj.id ? 'Currently Inspecting' : 'Inspect in Workbench'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* =========================================================================
          DETAILED PROJECT WORKBENCH & INTERACTIVE LAB
          ========================================================================= */}
      <section
        id="project-detail-workbench"
        className="p-8 sm:p-12 rounded-2xl bg-[#0b0e18] border border-white/10 space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
              <span>Demonstration Specification</span>
              <span aria-hidden="true">·</span>
              <span>{activeProject.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {activeProject.title}
            </h2>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-[#121726] rounded-md border border-white/5 shrink-0">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Architecture & Problem
            </button>
            <button
              onClick={() => setActiveTab('simulation')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'simulation'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Interactive Concept Lab</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Architecture & Problem */}
        {activeTab === 'architecture' && (
          <div className="space-y-8">
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              {activeProject.fullDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-[#07090f] border border-white/5 space-y-3">
                <span className="text-xs font-mono text-rose-400 font-semibold">
                  Core Engineering Challenge
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeProject.problem}
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#07090f] border border-white/5 space-y-3">
                <span className="text-xs font-mono text-indigo-400 font-semibold">
                  Architectural Pillars
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {activeProject.architecture.map((arch, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5">·</span>
                      <span>{arch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Demonstrated System Capabilities
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeProject.keyCapabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="p-4 rounded bg-[#07090f] border border-white/5 text-xs text-slate-300 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Interactive Concept Lab */}
        {activeTab === 'simulation' && (
          <div className="p-6 rounded-xl bg-[#07090f] border border-white/5 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 block">
                  Interactive Prototype Sandbox
                </span>
                <h4 className="text-base font-bold text-white">
                  Live Technical Simulation: {activeProject.title}
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                In-Memory Client Harness
              </span>
            </div>

            {/* RAG SIMULATOR */}
            {activeProject.visualType === 'rag' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">
                  Simulate hybrid dense-sparse vector scoring, parent-document expansion, and citation verification against a technical corpus.
                </p>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-slate-300">
                    Query Embedding Input:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={ragQuery}
                      onChange={(e) => setRagQuery(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-[#0f1422] border border-white/10 rounded text-white"
                    />
                    <button
                      onClick={runRagSimulation}
                      disabled={ragRunning}
                      className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {ragRunning ? <span>Reranking...</span> : <span>Run RAG Retrieval</span>}
                    </button>
                  </div>
                </div>

                {ragResults && (
                  <div className="space-y-3 pt-3">
                    <span className="text-xs font-mono text-slate-400">
                      Top-2 Retrieved & Attributed Passages (RRF Combined Rank):
                    </span>
                    {ragResults.map((res, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded bg-[#0b0e18] border border-indigo-500/20 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-indigo-300">
                            Dense Score: {res.denseScore} · BM25 Rank: #{res.bm25Rank}
                          </span>
                          <span className="text-emerald-400">✓ Cryptographic Attribution Match</span>
                        </div>
                        <p className="text-xs text-slate-200 italic">"{res.chunkText}"</p>
                        <div className="text-[11px] font-mono text-slate-500">
                          Source: {res.source}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* RESEARCH SYNTHESIS SIMULATOR */}
            {activeProject.visualType === 'research' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">
                  Automated natural language inference (NLI) contradiction detection between scientific claims.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded bg-[#0b0e18] border border-white/5 space-y-2">
                    <span className="text-xs font-mono text-sky-400">Paper A (§4.1 Conclusion)</span>
                    <p className="text-xs text-slate-300">
                      "Low-rank adapter scaling with r=16 consistently preserves reasoning accuracy while cutting trainable parameters by 94%."
                    </p>
                  </div>
                  <div className="p-4 rounded bg-[#0b0e18] border border-white/5 space-y-2">
                    <span className="text-xs font-mono text-indigo-400">Paper B (§3.4 Empirical Audit)</span>
                    <p className="text-xs text-slate-300">
                      "On out-of-distribution reasoning benchmarks, r=16 exhibits 18% catastrophic degradation unless regularized with replay buffers."
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200 space-y-1">
                  <div className="font-mono font-semibold flex items-center gap-1.5 text-amber-400">
                    <span>⚠ Divergence Detected: NLI Contradiction Confidence 91.4%</span>
                  </div>
                  <p>
                    Reconciliation hypothesis: Paper A evaluated strictly in-distribution test splits, whereas Paper B probed out-of-distribution math shifts.
                  </p>
                </div>
              </div>
            )}

            {/* PLAYGROUND SIMULATOR */}
            {activeProject.visualType === 'playground' && (
              <div className="space-y-5">
                <p className="text-xs text-slate-400">
                  Inspect sampling temperature curves, entropy boundaries, and KV-cache footprints.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-slate-300">
                      <span>Temperature:</span>
                      <span className="text-indigo-400">{temperature}</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.2"
                      step="0.05"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>0.0 (Deterministic)</span>
                      <span>1.2 (High Entropy)</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-slate-300">
                      <span>Top-p Nucleus:</span>
                      <span className="text-sky-400">{topP}</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={topP}
                      onChange={(e) => setTopP(parseFloat(e.target.value))}
                      className="w-full accent-sky-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>0.1 (Strict Tail Cut)</span>
                      <span>1.0 (Full Vocabulary)</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded bg-[#0b0e18] border border-white/5 space-y-2">
                  <span className="text-xs font-mono text-slate-400 block">
                    Estimated KV-Cache Memory & Latency (Batch 1, 8k Tokens):
                  </span>
                  <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-2.5 rounded bg-[#07090e]">
                      <span className="text-slate-500 block text-[10px]">FP16 Footprint</span>
                      <span className="text-white font-bold">1.04 GB</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#07090e]">
                      <span className="text-slate-500 block text-[10px]">INT4 Quantized</span>
                      <span className="text-emerald-400 font-bold">0.26 GB (-75%)</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#07090e]">
                      <span className="text-slate-500 block text-[10px]">Token Latency</span>
                      <span className="text-indigo-300 font-bold">14.2 ms/tok</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AGENT AUTOMATION SIMULATOR */}
            {activeProject.visualType === 'automation' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">
                  Step through a bounded DAG state machine with automated invariant checks and rollback gates.
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={runAgentStep}
                    disabled={agentRunning}
                    className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{agentRunning ? 'Executing Pipeline...' : 'Run Workflow Trace'}</span>
                  </button>
                  <button
                    onClick={() => setAgentStep(0)}
                    className="p-2 text-slate-400 hover:text-white rounded bg-[#121726] border border-white/5 cursor-pointer"
                    title="Reset Trace"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2 pt-2">
                  {[
                    { step: 1, label: 'State Initialization', detail: 'Schema parsed & container sandbox provisioned' },
                    { step: 2, label: 'Plan & Formulate Actions', detail: 'Target invariants checked against policy table' },
                    { step: 3, label: 'Isolated Tool Execution', detail: 'Read-only API query executed in ephemeral Docker pod' },
                    { step: 4, label: 'Verification & Checkpoint', detail: 'Output hash verified, state committed to audit log' }
                  ].map((s) => (
                    <div
                      key={s.step}
                      className={`p-3 rounded border text-xs font-mono transition-all flex items-center justify-between ${
                        agentStep >= s.step
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                          : 'bg-[#0b0e18] border-white/5 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>[Step 0{s.step}]</span>
                        <span className="font-semibold text-white">{s.label}:</span>
                        <span>{s.detail}</span>
                      </div>
                      {agentStep >= s.step && (
                        <span className="text-emerald-400 font-bold">PASS</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400">
            Interested in deploying an architectural variant of this prototype?
          </span>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors cursor-pointer"
          >
            Inquire About Custom Implementation
          </button>
        </div>
      </section>
    </div>
  );
};
