import { SiteConfig, Capability, ResearchTopic, ProjectConcept, Article, CareerRole } from '../types';

export const initialSiteConfig: SiteConfig = {
  companyName: 'Nthropos',
  tagline: 'Frontier AI Research & Applied Engineering',
  heroHeadline: 'Building Intelligence for What Comes Next.',
  heroSupportingText:
    'Nthropos is an AI company exploring the frontier of intelligent systems, generative AI, and practical AI engineering to turn ambitious ideas into meaningful technology.',
  mission:
    'Build intelligent AI systems that expand human capabilities and solve meaningful real-world problems.',
  vision:
    'We believe the future of AI will be shaped by rigorous research, thoughtful engineering, and technology designed to create meaningful value for people.',
  contactEmail: 'inquiries@nthropos.ai',
  primaryLocation: 'San Francisco, CA · Remote First',
  socials: {
    github: 'https://github.com/nthropos',
    x: 'https://x.com/nthropos_ai',
    linkedin: 'https://linkedin.com/company/nthropos',
    huggingface: 'https://huggingface.co/nthropos'
  },
  announcement: {
    active: true,
    text: 'Research Exploration: Evaluating Non-Determinism in Multi-Step Agentic Pipelines',
    linkPage: 'research'
  }
};

export const capabilities: Capability[] = [
  {
    id: 'generative-ai',
    title: 'Generative AI',
    shortDesc:
      'Build AI-powered applications, intelligent workflows, and systems that generate useful content and insights.',
    fullDesc:
      'Designing domain-specific generative interfaces that augment creative and analytical tasks. We architect robust context pipelines, structured output validation, and multimodal generation systems tuned for real work.',
    iconName: 'Sparkles',
    focusAreas: [
      'Structured Output Generation',
      'Context Augmentation',
      'Multimodal Synthesis',
      'Enterprise Copilot Tooling'
    ]
  },
  {
    id: 'large-language-models',
    title: 'Large Language Models',
    shortDesc:
      'Explore LLM architectures, model adaptation, fine-tuning, evaluation, inference optimization, and language-based applications.',
    fullDesc:
      'Bridging foundation models and production constraints. We evaluate parameter-efficient tuning, model distillation, quantization protocols, and contextual alignment to optimize both latency and semantic precision.',
    iconName: 'Brain',
    focusAreas: [
      'Parameter-Efficient Fine-Tuning (PEFT)',
      'Model Distillation & Quantization',
      'Prompt Optimization & Caching',
      'Context Window Expansion'
    ]
  },
  {
    id: 'ai-research-dev',
    title: 'AI Research & Development',
    shortDesc:
      'Experiment with machine learning, deep learning, reasoning systems, multimodal AI, and emerging AI techniques.',
    fullDesc:
      'Investigating structural frontiers in neural architectures. We study verifiable chain-of-thought verification, cross-attention mechanics, and empirical safety bounds for autonomous cognitive behaviors.',
    iconName: 'Cpu',
    focusAreas: [
      'Self-Correction & Verification Loops',
      'Symbolic-Neural Hybrids',
      'Multimodal Representation Learning',
      'Empirical Reliability Metrics'
    ]
  },
  {
    id: 'ai-engineering',
    title: 'AI Engineering',
    shortDesc:
      'Transform research into reliable software through model deployment, API development, data pipelines, evaluation, and production infrastructure.',
    fullDesc:
      'Turning probabilistic models into predictable software systems. We engineer telemetry pipelines, continuous eval harnesses, semantic caching, and resilient inference gateways.',
    iconName: 'Workflow',
    focusAreas: [
      'High-Throughput Inference Gateways',
      'CI/CD Evaluation Harnesses',
      'Deterministic Safeguards & Sandboxing',
      'Vector Index Pipeline Infrastructure'
    ]
  }
];

export const researchTopics: ResearchTopic[] = [
  {
    id: 'large-language-models',
    title: 'Large Language Models',
    status: 'Core Discipline',
    description:
      'Investigating model capacity, inductive biases, and architectural shifts in transformer and state-space language representations.',
    keyQuestions: [
      'How do architectural modifications influence reasoning retention across high-context windows?',
      'What are the optimal loss formulations for compact student models undergoing multi-teacher distillation?'
    ],
    methods: ['Architectural ablation', 'Targeted perplexity profiling', 'Synthetic curriculum training']
  },
  {
    id: 'model-training-fine-tuning',
    title: 'Model Training and Fine-Tuning',
    status: 'Active Investigation',
    description:
      'Developing data-efficient adaptation techniques that prevent catastrophic forgetting while imparting strict domain constraints.',
    keyQuestions: [
      'Can low-rank adapters reliably maintain calibration under high out-of-distribution shifts?',
      'How can human feedback signals be aligned with formal mathematical proofs for logical tasks?'
    ],
    methods: ['LoRA / QLoRA parameter scaling', 'Direct Preference Optimization (DPO)', 'Task-specific reward modeling']
  },
  {
    id: 'rag-systems',
    title: 'Retrieval-Augmented Generation (RAG)',
    status: 'Active Investigation',
    description:
      'Advancing hybrid dense-sparse indexing, dynamic chunk reranking, and self-reflective retrieval to eliminate hallucinations.',
    keyQuestions: [
      'When should a model decide whether retrieval is strictly necessary versus answering from internal parameters?',
      'How to resolve conflicting cross-document provenance in streaming retrieval chains?'
    ],
    methods: ['ColBERT token-level embeddings', 'Hypothetical Document Embeddings (HyDE)', 'Graph-augmented context trees']
  },
  {
    id: 'ai-agents-tool-use',
    title: 'AI Agents and Tool Use',
    status: 'Active Investigation',
    description:
      'Architecting verifiable planning loops, sandbox execution policies, and state checkpointing for multi-step autonomous workflows.',
    keyQuestions: [
      'How do we guarantee bounded execution steps in self-directed tool loops?',
      'What formal state-machine representations best mitigate compounding decision errors?'
    ],
    methods: ['ReAct and Plan-and-Solve variants', 'Isolated execution environments', 'Deterministic runtime monitors']
  },
  {
    id: 'multimodal-intelligence',
    title: 'Multimodal Intelligence',
    status: 'Planned Exploration',
    description:
      'Exploring shared latent spaces across textual, visual, and structured tabular data to ground abstract concepts in tangible signals.',
    keyQuestions: [
      'What projection architectures preserve fine spatial tokens without diluting language representations?',
      'Can unified representations reason jointly across audio waveforms and code specifications?'
    ],
    methods: ['Cross-attention visual projection', 'Contrastive latent alignment', 'Sparse perceptual tokenizers']
  },
  {
    id: 'model-evaluation-reliability',
    title: 'Model Evaluation and Reliability',
    status: 'Core Discipline',
    description:
      'Designing quantitative stress tests, behavioral red-teaming harnesses, and automated grading pipelines for non-deterministic systems.',
    keyQuestions: [
      'How do we detect subtle factual drifts across iterative model updates before end users observe them?',
      'Can LLM-as-a-judge approaches achieve inter-rater reliability comparable to expert human panels?'
    ],
    methods: ['Adversarial perturbation benchmarks', 'Blind comparative grading', 'Formal invariant checking']
  },
  {
    id: 'efficient-ai-systems',
    title: 'Efficient AI Systems',
    status: 'Planned Exploration',
    description:
      'Engineering low-bit quantization, speculative decoding, and kernel optimizations to deliver high-performance inference on commodity compute.',
    keyQuestions: [
      'What are the perceptual and logical degradation limits of 2-bit weight quantization?',
      'How can speculative drafting models be trained concurrently with base foundation weights?'
    ],
    methods: ['Paged KV-cache optimization', 'FlashAttention kernel tuning', 'Speculative sampling trees']
  }
];

export const projectConcepts: ProjectConcept[] = [
  {
    id: 'intelligent-knowledge-assistant',
    title: 'Intelligent Knowledge Assistant',
    category: 'Retrieval',
    tag: 'RAG Retrieval System',
    shortDescription:
      'A dense-retrieval knowledge synthesis system that traverses enterprise archives with verified attribution.',
    fullDescription:
      'Designed to explore multi-hop query resolution across dense technical corpora. The system utilizes reciprocal rank fusion across semantic vector embeddings and sparse lexical indices, delivering verifiable paragraph-level citations with cryptographic source tracing.',
    problem:
      'Traditional enterprise search leaves knowledge fragmented across silos, while standard generative responses hallucinate unsourced claims.',
    architecture: [
      'Hierarchical Chunking with Parent-Child Document linking',
      'Hybrid Retrieval: Vector (Cosine) + BM25 Lexical',
      'Cross-Encoder Reranker for contextual relevance filtering',
      'Structured Source Citation with verbatim quote validation'
    ],
    visualType: 'rag',
    keyCapabilities: [
      'Zero-hallucination citation verification',
      'Dynamic threshold routing between local & retrieved context',
      'Sub-150ms semantic search across 500k+ documents',
      'Multi-hop synthesis for cross-document queries'
    ],
    isDemoConcept: true
  },
  {
    id: 'ai-research-assistant',
    title: 'AI Research Assistant',
    category: 'Research Tooling',
    tag: 'Literature Synthesis',
    shortDescription:
      'An application for exploring, organizing, and synthesizing technical information and academic papers.',
    fullDescription:
      'Investigates deep technical distillation and structured literature reviews. It maps citation trajectories, highlights competing scientific hypotheses, extracts mathematical notations, and generates structured comparative synthesis tables for researchers.',
    problem:
      'Researchers spend up to 40% of their time manually reading and comparing papers with incompatible notations and contradictory methodology claims.',
    architecture: [
      'LaTeX and PDF document parser with structural AST extraction',
      'Citation network graph representation with co-authorship weighting',
      'Hypothesis contradiction detector using natural language inference (NLI)',
      'Structured comparative schema generator'
    ],
    visualType: 'research',
    keyCapabilities: [
      'Automatic mathematical formula cross-referencing',
      'Methodology comparison matrix generation',
      'Contradiction identification across paper conclusions',
      'BibTeX and Zotero bidirectional sync interface'
    ],
    isDemoConcept: true
  },
  {
    id: 'language-model-playground',
    title: 'Language Model Playground',
    category: 'Evaluation',
    tag: 'Inference & Evaluation Lab',
    shortDescription:
      'An interactive interface for experimenting with model parameters, sampling strategies, and latency evaluation.',
    fullDescription:
      'An engineering workbench built to inspect temperature curves, top-p/top-k sampling variations, speculative decoding speedups, and token-level log probabilities. Provides side-by-side behavioral audits across quantization tiers.',
    problem:
      'Engineering teams frequently deploy models with default sampling configurations without understanding token probabilities or tail hallucination risks.',
    architecture: [
      'Streaming token tokenizer with real-time entropy visualization',
      'Interactive probability density viewer for top candidates',
      'Quantization comparison runner (FP16 vs INT8 vs INT4)',
      'Deterministic seed reproduction harness'
    ],
    visualType: 'playground',
    keyCapabilities: [
      'Real-time token entropy and surprise coloring',
      'Side-by-side prompt differential evaluation',
      'KV-cache footprint calculator per batch size',
      'Automated red-team prompt generation'
    ],
    isDemoConcept: true
  },
  {
    id: 'ai-automation-platform',
    title: 'AI Automation Platform',
    category: 'Automation',
    tag: 'Agentic Workflow Pipeline',
    shortDescription:
      'An application for integrating resilient AI reasoning loops into complex multi-step digital workflows.',
    fullDescription:
      'A deterministic workflow orchestrator that coordinates autonomous agents with strict rollback checkpoints, human-in-the-loop approvals, and structured tool sandbox execution. Replaces brittle script chains with self-healing task loops.',
    problem:
      'Unconstrained agent loops suffer from compounding failure rates when executing complex, real-world multi-step enterprise workflows.',
    architecture: [
      'Directed Acyclic Graph (DAG) state coordinator',
      'Isolated Docker/Wasm tool execution sandboxes',
      'Rollback and replay checkpoint database',
      'Policy-as-code invariant verification gate'
    ],
    visualType: 'automation',
    keyCapabilities: [
      'Guaranteed termination state machine',
      'Zero-trust credential injection for tool calling',
      'Dynamic human escalation triggers',
      'Deterministic replay for audit and debugging'
    ],
    isDemoConcept: true
  }
];

export const articles: Article[] = [
  {
    id: 'understanding-large-language-models',
    title: 'Understanding Large Language Models: From Invariant Priors to Emergent Reasoning',
    slug: 'understanding-large-language-models',
    date: 'Draft Concept',
    readTime: '8 min read',
    category: 'Foundation Architectures',
    excerpt:
      'An analytical look at how scale, training token density, and architectural inductive biases shape emergent model behaviors.',
    content: [
      'Modern large language models are frequently characterized as simple statistical next-token predictors. While their loss function is deceptively straightforward, the internal representations that emerge during massive gradient descent reveal deep hierarchical world models.',
      'In this exploration, we examine the mathematical boundary between memorization and algorithmic generalization. We analyze how multi-head self-attention heads form functional circuits—such as induction heads that enable in-context learning—and how weight decay regimes influence representation geometry.',
      'Key findings in empirical scaling research emphasize that token quality and curated curriculum design often yield greater reasoning gains than raw parameter scaling alone.'
    ],
    keyTakeaways: [
      'Induction circuits form the foundational mechanism for in-context reasoning.',
      'Data diversity and deduplication prevent latent rank collapse during extended pretraining.',
      'Reasoning abilities exhibit non-linear phase transitions corresponding to representation depth.'
    ],
    isDraft: true
  },
  {
    id: 'building-reliable-rag-systems',
    title: 'Building Reliable RAG Systems: Beyond Naive Vector Similarity',
    slug: 'building-reliable-rag-systems',
    date: 'Draft Concept',
    readTime: '7 min read',
    category: 'Information Retrieval',
    excerpt:
      'Why cosine similarity on dense embeddings fails in production, and how to architect hybrid retrieval with reciprocal rank fusion.',
    content: [
      'Naive Retrieval-Augmented Generation (RAG)—chunking text into 500-token blocks, calculating embeddings, and retrieving the top-3 via cosine distance—fails in real-world deployments. It suffers from semantic drift, context starvation, and vulnerability to lexical distractors.',
      'To build production-grade knowledge systems, architectures must employ hybrid retrieval that combines sparse BM25 indexing with dense neural representations, unified via Reciprocal Rank Fusion (RRF).',
      'Furthermore, integrating parent-document retrieval allows the system to index small, semantically coherent passages while delivering full context sections to the generative model for grounded answer synthesis.'
    ],
    keyTakeaways: [
      'Hybrid dense-sparse retrieval outperforms pure vector search across domain-specific jargon.',
      'Cross-encoder rerankers dramatically boost precision at top-3 recall.',
      'Self-reflective retrieval gates prevent unnecessary context pollution on trivial queries.'
    ],
    isDraft: true
  },
  {
    id: 'fine-tuning-models-for-real-world-applications',
    title: 'Fine-Tuning Models for Real-World Applications: Precision, Drift, and LoRA',
    slug: 'fine-tuning-models-for-real-world-applications',
    date: 'Draft Concept',
    readTime: '9 min read',
    category: 'Model Adaptation',
    excerpt:
      'A practical guide to parameter-efficient fine-tuning, catastrophic forgetting mitigation, and evaluation harnesses.',
    content: [
      'Fine-tuning is often viewed as a panacea for domain specialization, but improper adaptation frequently erodes the model’s core logical capabilities—a phenomenon known as catastrophic forgetting.',
      'Low-Rank Adaptation (LoRA) and quantized variants (QLoRA) enable rapid adaptation by injecting trainable rank decomposition matrices while freezing original parameters. By training strictly targeted layers and blending task datasets with general reasoning anchors, teams can attain high domain performance without degrading baseline fluency.',
      'We outline an empirical methodology for measuring calibration error, task accuracy, and inference throughput trade-offs.'
    ],
    keyTakeaways: [
      'Targeting attention projection matrices (q_proj, v_proj) yields the highest parameter efficiency.',
      'Regularization with replay buffers prevents semantic degradation on out-of-domain prompts.',
      'Domain fine-tuning should follow rigorous evaluation against golden hold-out test sets.'
    ],
    isDraft: true
  },
  {
    id: 'ai-agents-and-tool-use',
    title: 'AI Agents and Tool Use: Establishing Bound State Machines and Determinism',
    slug: 'ai-agents-and-tool-use',
    date: 'Draft Concept',
    readTime: '6 min read',
    category: 'Autonomous Systems',
    excerpt:
      'How to engineer agentic loops with bounded state execution, rollback guarantees, and sandboxed security perimeters.',
    content: [
      'Unchecked autonomous agents frequently devolve into infinite loops or compounding errors when tool execution fails. To transform experimental agents into dependable enterprise software, we must frame agentic execution as a formal state machine.',
      'By defining explicit state transitions, maximum recursive depth limits, and deterministic validation predicates between steps, systems can catch anomalies early and trigger clean fallback branches or human intervention.',
      'Sandboxing is non-negotiable: all tool invocations must execute in ephemeral, resource-constrained environments with strict egress policy enforcement.'
    ],
    keyTakeaways: [
      'Deterministic state machines prevent cascading agent divergence.',
      'Tool schemas must enforce strict JSON Schema typing and input sanitization.',
      'Checkpointing after each tool action allows instant rollback to safe states.'
    ],
    isDraft: true
  },
  {
    id: 'evaluating-generative-ai-systems',
    title: 'Evaluating Generative AI Systems: Moving Beyond Heuristic Benchmarks',
    slug: 'evaluating-generative-ai-systems',
    date: 'Draft Concept',
    readTime: '8 min read',
    category: 'Evaluation & Safety',
    excerpt:
      'Constructing multidimensional evaluation harnesses that balance automated grading, adversarial probes, and semantic consistency.',
    content: [
      'Traditional NLP metrics like BLEU and ROUGE are fundamentally inadequate for evaluating open-ended generative AI systems. Modern evaluation requires a multi-layered approach that couples reference-free metrics with rigorous automated judges and task-specific adversarial probes.',
      'In this article, we dissect the design of continuous evaluation harnesses that operate in CI/CD pipelines. We address the subtle biases inherent in LLM-as-a-judge patterns—such as position bias and verbosity preference—and demonstrate calibration techniques that align synthetic evaluation with expert human judgment.',
      'A rigorous evaluation regime is the single most critical asset in maintaining production AI reliability across model updates.'
    ],
    keyTakeaways: [
      'Automated judges must be calibrated against verified gold-standard human annotations.',
      'Adversarial perturbations reveal brittle edge cases that standard test splits obscure.',
      'Evaluation metrics must decouple stylistic fluency from factual accuracy.'
    ],
    isDraft: true
  }
];

export const teamMembers = [
  {
    name: 'Dr. Elena Vance',
    role: 'Head of Research Architecture',
    focus: 'Neural Foundations & Reasoning Systems',
    bio: 'Dedicated to investigating emergent reasoning dynamics, parameter-efficient adaptation, and representation stability in high-context transformers.'
  },
  {
    name: 'Marcus Chen',
    role: 'Principal Systems Architect',
    focus: 'Distributed Inference & Production Systems',
    bio: 'Specializes in low-latency model serving, custom kernel acceleration, and architecting resilient infrastructure for high-throughput AI workloads.'
  },
  {
    name: 'Aria Thorne',
    role: 'Director of AI Engineering',
    focus: 'Enterprise Retrieval & Agentic Pipelines',
    bio: 'Leads the translation of frontier model techniques into dependable enterprise software, focusing on hybrid RAG and verifiable workflow execution.'
  },
  {
    name: 'David Okafor',
    role: 'Lead Evaluation & Safety Engineer',
    focus: 'Model Alignment & Reliability Harnesses',
    bio: 'Researches quantitative stress-testing, automated red-teaming frameworks, and behavioral verification for non-deterministic AI systems.'
  }
];

export const careerRoles: CareerRole[] = [
  {
    id: 'research-scientist-reasoning',
    title: 'Research Scientist — Reasoning & Evaluation',
    department: 'Research',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    experience: '3+ years post-PhD or equivalent industry research',
    overview:
      'Join our core research team to investigate multi-step reasoning capabilities, self-correction algorithms, and mathematical verification in language architectures.',
    responsibilities: [
      'Design, conduct, and analyze empirical experiments on transformer reasoning mechanics.',
      'Develop novel evaluation methodologies that probe limits in logical generalization.',
      'Publish research insights and collaborate with engineering on practical implementation.'
    ],
    qualifications: [
      'Deep expertise in PyTorch, JAX, or modern tensor frameworks.',
      'Demonstrated research track record in NLP, cognitive architectures, or deep learning.',
      'Strong commitment to reproducible scientific methods and transparent reporting.'
    ]
  },
  {
    id: 'senior-ai-systems-engineer',
    title: 'Senior AI Systems Engineer — Inference Infrastructure',
    department: 'Infrastructure',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    experience: '5+ years systems engineering',
    overview:
      'Architect our distributed inference engine, optimize GPU/TPU memory allocation, and push the envelope on latency and throughput efficiency.',
    responsibilities: [
      'Build and maintain high-throughput inference gateways serving multi-tenant workloads.',
      'Implement custom kernel optimizations, speculative decoding, and continuous batching.',
      'Scale zero-downtime deployment pipelines for large model weights.'
    ],
    qualifications: [
      'Strong proficiency in Rust, C++, and Python systems programming.',
      'Experience with vLLM, TensorRT-LLM, Triton, or CUDA programming.',
      'Deep understanding of Linux network stacks, memory management, and GPU architectures.'
    ]
  },
  {
    id: 'full-stack-ai-engineer',
    title: 'Full-Stack AI Engineer — Applied Solutions',
    department: 'Engineering',
    location: 'Remote (Global)',
    type: 'Full-time',
    experience: '3+ years full-stack development',
    overview:
      'Build the interfaces and application layers that connect our intelligence engines to real-world workflows, researchers, and end users.',
    responsibilities: [
      'Develop modern, responsive web applications in React, TypeScript, and Node.js.',
      'Integrate streaming token protocols, semantic caching, and dynamic vector queries.',
      'Collaborate closely with design to craft intuitive, latency-resilient user interfaces.'
    ],
    qualifications: [
      'Extensive experience with modern TypeScript, React, and server-side runtimes.',
      'Familiarity with vector databases, embeddings, and generative AI APIs.',
      'Obsessive attention to UI/UX polish, accessibility, and client performance.'
    ]
  }
];

export const milestones = [
  {
    year: 'Phase 01',
    title: 'Foundation & Principles',
    description:
      'Established Nthropos with a core mandate: pursue rigorous AI research coupled with uncompromising engineering discipline.'
  },
  {
    year: 'Phase 02',
    title: 'Retrieval & Hybrid RAG Lab',
    description:
      'Formulated our experimental hybrid dense-sparse retrieval architecture, testing attribution verification on complex corpora.'
  },
  {
    year: 'Phase 03',
    title: 'Inference Engine & Evaluation Benchmarks',
    description:
      'Developed our continuous behavioral testing harness to measure calibration drift and reasoning retention in adapted models.'
  },
  {
    year: 'Phase 04 (Current)',
    title: 'Agentic Workflows & Enterprise Scoping',
    description:
      'Actively exploring bound state machines and verifiable tool sandboxes to deliver reliable, autonomous task completion.'
  }
];
