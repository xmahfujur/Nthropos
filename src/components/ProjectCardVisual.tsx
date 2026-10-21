import React from 'react';

interface ProjectCardVisualProps {
  type: 'rag' | 'research' | 'playground' | 'automation';
  title?: string;
}

export const ProjectCardVisual: React.FC<ProjectCardVisualProps> = ({ type, title }) => {
  return (
    <div
      className="relative w-full aspect-video overflow-hidden rounded-lg bg-[#0a0d14] border border-white/5 flex items-center justify-center group-hover:border-indigo-500/20 transition-all duration-300"
      aria-label={title || `${type} technical diagram`}
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* RAG Visual */}
      {type === 'rag' && (
        <svg
          viewBox="0 0 400 225"
          className="w-full h-full p-4 text-indigo-400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Query input node */}
          <rect x="25" y="95" width="80" height="36" rx="4" fill="#131825" stroke="#4f46e5" strokeWidth="1.2" />
          <text x="65" y="117" fill="#c7d2fe" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="500">
            Query Vector
          </text>

          {/* Flow arrows */}
          <path d="M105 113 L150 75" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
          <path d="M105 113 L150 113" stroke="#38bdf8" strokeWidth="1.2" />
          <path d="M105 113 L150 151" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />

          {/* Dense Index Cluster */}
          <g transform="translate(150, 45)">
            <rect width="100" height="136" rx="6" fill="#0f1422" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <text x="50" y="20" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">
              Hybrid Index
            </text>

            {/* Document chunks */}
            <rect x="12" y="32" width="76" height="18" rx="3" fill="#1b2133" stroke="#38bdf8" strokeWidth="1" />
            <text x="50" y="44" fill="#e2e8f0" fontSize="8" textAnchor="middle" fontFamily="monospace">Dense 768d</text>

            <rect x="12" y="58" width="76" height="18" rx="3" fill="#1b2133" stroke="#6366f1" strokeWidth="1" />
            <text x="50" y="70" fill="#e2e8f0" fontSize="8" textAnchor="middle" fontFamily="monospace">BM25 Sparse</text>

            <rect x="12" y="84" width="76" height="18" rx="3" fill="#1b2133" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="50" y="96" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">Parent Docs</text>

            {/* RRF score indicator */}
            <rect x="12" y="110" width="76" height="16" rx="2" fill="#2e1065" stroke="#a855f7" strokeWidth="0.8" />
            <text x="50" y="121" fill="#f5d0fe" fontSize="8" textAnchor="middle" fontFamily="monospace">RRF Rerank</text>
          </g>

          {/* Synthesizer & Attribution Output */}
          <path d="M250 113 L290 113" stroke="#a855f7" strokeWidth="1.5" />
          <polygon points="290,110 296,113 290,116" fill="#a855f7" />

          <g transform="translate(296, 75)">
            <rect width="84" height="76" rx="6" fill="#131825" stroke="#818cf8" strokeWidth="1.2" />
            <text x="42" y="24" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="600">Grounded</text>
            <text x="42" y="38" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="600">Response</text>
            <line x1="12" y1="46" x2="72" y2="46" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="42" y="60" fill="#38bdf8" fontSize="8" textAnchor="middle" fontFamily="monospace">✓ Verified [1..4]</text>
          </g>
        </svg>
      )}

      {/* Research Assistant Visual */}
      {type === 'research' && (
        <svg
          viewBox="0 0 400 225"
          className="w-full h-full p-4 text-sky-400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Scientific paper nodes */}
          <circle cx="80" cy="70" r="22" fill="#131825" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="80" y="73" fill="#bae6fd" fontSize="9" textAnchor="middle" fontFamily="monospace">Paper A</text>

          <circle cx="80" cy="155" r="22" fill="#131825" stroke="#6366f1" strokeWidth="1.2" />
          <text x="80" y="158" fill="#c7d2fe" fontSize="9" textAnchor="middle" fontFamily="monospace">Paper B</text>

          <circle cx="180" cy="112" r="28" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
          <text x="180" y="110" fill="#f5d0fe" fontSize="10" textAnchor="middle" fontWeight="600">Synthesis</text>
          <text x="180" y="122" fill="#c084fc" fontSize="8" textAnchor="middle" fontFamily="monospace">Core AST</text>

          {/* Arcs with cross-citations */}
          <path d="M102 70 C 130 70, 145 95, 155 105" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M102 155 C 130 155, 145 130, 155 120" stroke="#6366f1" strokeWidth="1" strokeDasharray="2 2" />

          {/* Output matrix card */}
          <g transform="translate(240, 52)">
            <rect width="135" height="120" rx="6" fill="#131825" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="16" y="24" fill="#94a3b8" fontSize="9" fontFamily="monospace">Taxonomy Matrix</text>
            <line x1="16" y1="34" x2="119" y2="34" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

            <rect x="16" y="44" width="103" height="16" rx="2" fill="#1e293b" />
            <text x="24" y="55" fill="#e2e8f0" fontSize="8">Methodology Delta</text>

            <rect x="16" y="66" width="103" height="16" rx="2" fill="#1e293b" />
            <text x="24" y="77" fill="#e2e8f0" fontSize="8">Formula Notation Align</text>

            <rect x="16" y="88" width="103" height="16" rx="2" fill="#1e293b" />
            <text x="24" y="99" fill="#38bdf8" fontSize="8">Conflict: Claim §4.2</text>
          </g>
        </svg>
      )}

      {/* Language Model Playground Visual */}
      {type === 'playground' && (
        <svg
          viewBox="0 0 400 225"
          className="w-full h-full p-4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Token generation probability bars */}
          <g transform="translate(30, 45)">
            <text x="0" y="15" fill="#94a3b8" fontSize="10" fontFamily="monospace">Next-Token LogProbs</text>

            <rect x="0" y="30" width="120" height="16" rx="2" fill="#1e1b4b" stroke="#6366f1" strokeWidth="0.8" />
            <rect x="0" y="30" width="102" height="16" rx="2" fill="#4f46e5" opacity="0.8" />
            <text x="6" y="41" fill="#ffffff" fontSize="8" fontFamily="monospace">"computational" (85.2%)</text>

            <rect x="0" y="52" width="120" height="16" rx="2" fill="#1e1b4b" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
            <rect x="0" y="52" width="36" height="16" rx="2" fill="#6366f1" opacity="0.4" />
            <text x="6" y="63" fill="#cbd5e1" fontSize="8" fontFamily="monospace">"statistical" (9.4%)</text>

            <rect x="0" y="74" width="120" height="16" rx="2" fill="#1e1b4b" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
            <rect x="0" y="74" width="18" height="16" rx="2" fill="#6366f1" opacity="0.3" />
            <text x="6" y="85" fill="#cbd5e1" fontSize="8" fontFamily="monospace">"algorithmic" (4.1%)</text>

            <rect x="0" y="96" width="120" height="16" rx="2" fill="#1e1b4b" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
            <rect x="0" y="96" width="8" height="16" rx="2" fill="#6366f1" opacity="0.2" />
            <text x="6" y="107" fill="#cbd5e1" fontSize="8" fontFamily="monospace">"discrete" (1.3%)</text>
          </g>

          {/* Attention heat matrix */}
          <g transform="translate(190, 45)">
            <text x="0" y="15" fill="#94a3b8" fontSize="10" fontFamily="monospace">Cross-Attention Heads</text>
            <rect x="0" y="30" width="180" height="100" rx="4" fill="#0f1422" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

            {/* Matrix grid cells */}
            {[0, 1, 2, 3, 4].map((r) =>
              [0, 1, 2, 3, 4, 5].map((c) => {
                const op = ((r * 3 + c * 7) % 10) / 10 * 0.8 + 0.1;
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={12 + c * 26}
                    y={40 + r * 16}
                    width="20"
                    height="11"
                    rx="2"
                    fill="#38bdf8"
                    opacity={op}
                  />
                );
              })
            )}

            <text x="14" y="122" fill="#64748b" fontSize="7" fontFamily="monospace">Head 0..31 · Temp 0.20 · Top-p 0.95</text>
          </g>
        </svg>
      )}

      {/* AI Automation Platform Visual */}
      {type === 'automation' && (
        <svg
          viewBox="0 0 400 225"
          className="w-full h-full p-4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Node 1: Input Trigger */}
          <rect x="25" y="95" width="70" height="34" rx="4" fill="#131825" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="60" y="115" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="500">Trigger</text>

          {/* Arrow */}
          <line x1="95" y1="112" x2="135" y2="112" stroke="#64748b" strokeWidth="1.2" />
          <polygon points="135,109 141,112 135,115" fill="#64748b" />

          {/* Node 2: Agent Reasoning Loop */}
          <g transform="translate(142, 65)">
            <rect width="115" height="95" rx="6" fill="#0f1422" stroke="#6366f1" strokeWidth="1.2" />
            <text x="57" y="24" fill="#c7d2fe" fontSize="10" textAnchor="middle" fontWeight="600">ReAct Sandbox</text>

            <rect x="12" y="36" width="91" height="18" rx="3" fill="#1e1b4b" stroke="#818cf8" strokeWidth="0.8" />
            <text x="57" y="48" fill="#e0e7ff" fontSize="8" textAnchor="middle" fontFamily="monospace">Step 1: Plan</text>

            <rect x="12" y="60" width="91" height="18" rx="3" fill="#1e1b4b" stroke="#818cf8" strokeWidth="0.8" />
            <text x="57" y="72" fill="#e0e7ff" fontSize="8" textAnchor="middle" fontFamily="monospace">Step 2: Tool Call</text>
          </g>

          {/* Human Checkpoint Gate */}
          <line x1="257" y1="112" x2="285" y2="112" stroke="#64748b" strokeWidth="1.2" />
          <polygon points="285,109 291,112 285,115" fill="#64748b" />

          <g transform="translate(292, 80)">
            <rect width="82" height="65" rx="4" fill="#131825" stroke="#10b981" strokeWidth="1.2" />
            <text x="41" y="24" fill="#a7f3d0" fontSize="9" textAnchor="middle" fontWeight="600">Gate Verified</text>
            <text x="41" y="38" fill="#6ee7b7" fontSize="8" textAnchor="middle" fontFamily="monospace">Invariant Pass</text>
            <rect x="12" y="46" width="58" height="12" rx="2" fill="#064e3b" />
            <text x="41" y="55" fill="#6ee7b7" fontSize="7" textAnchor="middle" fontFamily="monospace">✓ Checkpoint</text>
          </g>
        </svg>
      )}

      {/* Subtle corner badge for visual polish */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/40 border border-white/5 text-[10px] font-mono text-slate-400">
        <span>arch:concept</span>
      </div>
    </div>
  );
};
