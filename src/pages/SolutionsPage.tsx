import React, { useState } from 'react';
import { PageId } from '../types';
import {
  Sparkles,
  Brain,
  Workflow,
  Cpu,
  Database,
  Terminal,
  ArrowRight,
  CheckCircle2,
  Settings2,
  ShieldAlert
} from 'lucide-react';

interface SolutionsPageProps {
  onNavigate: (page: PageId) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onNavigate }) => {
  const [selectedSolution, setSelectedSolution] = useState<string>('custom-ai');

  const solutions = [
    {
      id: 'custom-ai',
      title: 'Custom AI Application Development',
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
      tagline: 'End-to-end intelligent applications crafted for domain-specific user workflows.',
      problem:
        'Generic off-the-shelf AI wrappers fail to understand specialized organizational workflows, lack deterministic output guarantees, and cannot integrate cleanly into legacy enterprise software.',
      approach:
        'We design purpose-built AI systems that combine modern generative architectures with custom state management, schema-constrained decoding, and low-latency client interfaces.',
      useCases: [
        'Domain-specific analytical copilots for biomedical & clinical research',
        'Automated document extraction and contract intelligence platforms',
        'Complex multi-modal creative synthesis workbenches'
      ],
      deliverables: [
        'Full-stack React/Node.js web application architecture',
        'Schema-validated streaming inference gateways',
        'Custom telemetry, error-handling, and fallback orchestration'
      ]
    },
    {
      id: 'llm-fine-tuning',
      title: 'LLM Integration & Fine-Tuning',
      icon: <Brain className="w-5 h-5 text-sky-400" />,
      tagline: 'Parameter-efficient adaptation and distillation for private domain precision.',
      problem:
        'Foundation models out of the box are prone to stylistic verbosity, hallucinate niche domain terms, and represent high ongoing API latency and token costs.',
      approach:
        'We employ parameter-efficient tuning (LoRA, QLoRA) and model distillation to produce compact, high-precision domain models that can be self-hosted on private infrastructure.',
      useCases: [
        'Proprietary compliance checking and formal legal syntax translation',
        'Domain-specific code generation tailored to private internal libraries',
        'Compact edge-inference models operating under strict air-gapped constraints'
      ],
      deliverables: [
        'Dataset curation, synthetic augmentation, and decontamination pipelines',
        'LoRA/QLoRA adapter weights with full evaluation scorecards',
        'Continuous calibration monitoring to eliminate task drift'
      ]
    },
    {
      id: 'rag-systems',
      title: 'RAG & Enterprise Knowledge Systems',
      icon: <Database className="w-5 h-5 text-cyan-400" />,
      tagline: 'Verified semantic retrieval with mathematical provenance and zero hallucination.',
      problem:
        'Standard semantic search returns irrelevant chunks for specialized terminology, and naive RAG setups hallucinate citations or miss multi-document cross-references.',
      approach:
        'We architect hybrid retrieval engines combining dense neural embeddings with sparse BM25 indices, unified by reciprocal rank fusion and cross-encoder rerankers with parent-document expansion.',
      useCases: [
        'Enterprise engineering manuals and technical architecture retrieval',
        'Regulatory policy and compliance audit traversal with verbatim attribution',
        'Cross-repository software documentation and bug root-cause synthesis'
      ],
      deliverables: [
        'Hybrid vector-lexical indexing pipeline with real-time updates',
        'Hierarchical parent-child chunking architecture',
        'Cryptographic citation verification and confidence gating'
      ]
    },
    {
      id: 'ai-agents',
      title: 'AI Agents & Workflow Automation',
      icon: <Workflow className="w-5 h-5 text-indigo-300" />,
      tagline: 'Deterministic execution loops with sandboxed tool use and human checkpoints.',
      problem:
        'Unconstrained agent loops suffer from exponential failure compounding, get trapped in repetitive tool calling, and introduce severe security risks when given write permissions.',
      approach:
        'We frame agentic execution as a formal bounded state machine with explicit invariant checks, containerized sandboxes, rollback capabilities, and strict escalation gates.',
      useCases: [
        'Multi-step data reconciliation across disconnected internal ERPs',
        'Autonomous security triage and dependency vulnerability remediation',
        'Automated regression testing and synthetic scenario validation'
      ],
      deliverables: [
        'Directed Acyclic Graph (DAG) workflow orchestrator',
        'Isolated tool execution environment with policy-as-code guards',
        'Human-in-the-loop audit dashboards and replay checkpoints'
      ]
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning Solutions',
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      tagline: 'Classical ML, predictive modeling, and hybrid neural-symbolic systems.',
      problem:
        'Not every business problem requires an LLM. Misapplying massive generative models to tabular or time-series problems leads to exorbitant costs and poor explainability.',
      approach:
        'We deploy the right mathematical tool for the objective—ranging from gradient-boosted decision trees to graph neural networks and hybrid neuro-symbolic estimators.',
      useCases: [
        'High-frequency time-series anomaly detection in manufacturing sensor telemetry',
        'Customer lifetime valuation and churn propensity modeling',
        'Graph-based fraud ring detection across financial transaction networks'
      ],
      deliverables: [
        'Feature engineering pipelines and automated drift detectors',
        'Quantized ONNX models with sub-5ms inference latency',
        'SHAP/LIME explainability dashboards for regulatory stakeholders'
      ]
    },
    {
      id: 'prototypes-research',
      title: 'AI Prototypes & Research Engineering',
      icon: <Terminal className="w-5 h-5 text-emerald-400" />,
      tagline: 'Rapid feasibility de-risking and proof-of-concept development in 2-4 weeks.',
      problem:
        'Organizations frequently spend months on expensive engineering initiatives only to find that current model architectures cannot meet fundamental accuracy thresholds.',
      approach:
        'We execute structured feasibility sprints that test critical assumptions on your actual data, delivering working prototypes and honest go/no-go technical evaluations.',
      useCases: [
        'De-risking speculative generative AI feature ideas before product roadmapping',
        'Auditing competitor claims and evaluating third-party foundation models',
        'Building functional investor and executive technical demonstration prototypes'
      ],
      deliverables: [
        'Working functional prototype web interface and API harness',
        'Comprehensive empirical feasibility audit and risk analysis report',
        'Production architecture roadmap and cost/latency projections'
      ]
    }
  ];

  const current = solutions.find((s) => s.id === selectedSolution) || solutions[0];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-24">
      {/* Header */}
      <section className="max-w-3xl space-y-6">
        <div className="text-xs font-mono text-indigo-400">Engineering Offerings</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Practical AI Engineering for Ambitious Teams
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          We translate frontier AI research into robust software. We do not sell generic chatbot templates; we engineer domain-specific systems designed for high-stakes operational environments.
        </p>
      </section>

      {/* Solutions Grid / Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation list */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-mono text-slate-500 block px-3 mb-2">
            Select Service Domain
          </span>
          {solutions.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSolution(s.id)}
              className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                selectedSolution === s.id
                  ? 'bg-[#131929] border-indigo-500/40 text-white shadow-md shadow-indigo-950/40'
                  : 'bg-[#0a0d15] border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-1 rounded bg-[#1a2133]">{s.icon}</div>
                <span className="text-xs sm:text-sm font-semibold">{s.title}</span>
              </div>
              <ArrowRight
                className={`w-3.5 h-3.5 transition-transform ${
                  selectedSolution === s.id ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Detailed Breakdown Card */}
        <div className="lg:col-span-8 p-8 sm:p-10 rounded-2xl bg-[#0c101b] border border-white/10 space-y-8">
          <div className="space-y-3 border-b border-white/5 pb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              {current.icon}
              <span>Technical Solution Profile</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {current.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              {current.tagline}
            </p>
          </div>

          {/* Problem vs Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-lg bg-[#07090e] border border-rose-500/10 space-y-2">
              <span className="text-xs font-mono text-rose-400 flex items-center gap-1.5 font-semibold">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>The Engineering Challenge</span>
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                {current.problem}
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#07090e] border border-indigo-500/10 space-y-2">
              <span className="text-xs font-mono text-indigo-400 flex items-center gap-1.5 font-semibold">
                <Settings2 className="w-3.5 h-3.5" />
                <span>The Nthropos Approach</span>
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                {current.approach}
              </p>
            </div>
          </div>

          {/* Real Use Cases */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              High-Impact Use Cases
            </h3>
            <ul className="space-y-2">
              {current.useCases.map((uc, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{uc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Core Technical Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {current.deliverables.map((del, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded bg-[#07090e] border border-white/5 text-xs text-slate-300 leading-snug"
                >
                  {del}
                </div>
              ))}
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono text-slate-400">
              Timeline: 3 – 8 week structured engineering engagement
            </span>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-all shadow-md shadow-indigo-600/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Scope This Solution</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Engagement Process Callout */}
      <section className="p-8 sm:p-12 rounded-xl bg-[#090d16] border border-white/5 text-center space-y-6">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          How We Work With Technical Partners
        </h3>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We operate as an embedded senior engineering cell alongside your product and research teams, ensuring complete IP ownership, knowledge transfer, and reproducible code.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 text-xs font-medium text-slate-200 hover:text-white bg-[#121624] hover:bg-[#1a2135] border border-white/10 rounded-md transition-colors cursor-pointer"
          >
            Schedule Technical Architecture Call
          </button>
        </div>
      </section>
    </div>
  );
};
