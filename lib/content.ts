import {
  type Pipeline,
  spatialPlatform,
  feedbackLoop,
  meetingKnowledge,
  yoloBiasFix,
  faceAntiSpoof,
  serialOcr,
  synapticSpike,
  cineScope,
} from './pipelines'

// Everything the homepage shows, in the order a recruiter reads it:
// experience → projects → research → about. Keep entries short; the CV has the rest.

export const personal = {
  name: 'Kshitiz Tyagi',
  email: 'ktyagi23@iitk.ac.in',
  github: 'Kshitiztyagi23',
  githubUrl: 'https://github.com/Kshitiztyagi23',
  linkedin: 'kshitiz-tyagi',
  linkedinUrl: 'https://linkedin.com/in/kshitiz-tyagi',
  status: 'Open to SDE, data science & analytics roles',
  proof: 'Interned at Battery Smart and Skaeo · First-author paper at CogSci 2026',
}

export interface WorkItem {
  slug: string
  title: string
  line: string
  // Experience cards lead with an impact number; projects lead with their title
  stat?: { value: string; label: string }
  context?: string
  metric?: string
  tags: string[]
  problem: string
  built: string
  outcome: string
  repo?: string
  pipeline: Pipeline
}

export interface Job {
  company: string
  role: string
  period: string
  place: string
  summary: string
  items: WorkItem[]
  also: string[]
}

export const experience: Job[] = [
  {
    company: 'Battery Smart',
    role: 'Data Science Intern',
    period: 'May – Jul 2026',
    place: 'Gurugram',
    summary:
      'India’s EV battery-swapping network. I worked on Second Brain, the AI assistant teams use to ask questions of company data.',
    items: [
      {
        slug: 'self-correcting-feedback-loop',
        title: 'Self-correcting AI assistant',
        line: 'Built a review loop that turns expert corrections into live fixes, with zero duplicate commits.',
        stat: { value: '3–5s', label: 'from expert approval to live fix' },
        tags: ['RAG', 'MCP', 'PostgreSQL', 'Slack API', 'GitHub API'],
        problem:
          'When an expert corrected a wrong answer from the assistant, the correction was never saved, so the same mistake came back.',
        built:
          'Built the loop end to end: the assistant logs a proposed fix, an expert approves it in Slack, and a worker commits it to the knowledge base on GitHub.',
        outcome: 'Fixes go live 3–5 seconds after approval and stay correct across 2–4 autoscaled servers, with zero duplicate commits.',
        pipeline: feedbackLoop,
      },
      {
        slug: 'meeting-knowledge-pipeline',
        title: 'Meeting knowledge pipeline',
        line: 'Built a pipeline that turns meeting transcripts into facts the assistant can use, with personal data removed first.',
        stat: { value: '$0', label: 'model cost to process a 1,613-conversation backlog' },
        tags: ['NLP', 'LLMs', 'PII redaction', 'MiniLM', 'PostgreSQL'],
        problem: 'Decisions and know-how from team meetings were lost as soon as each meeting ended.',
        built:
          'Six stages: deduplication, local PII redaction, a MiniLM sensitivity filter, LLM fact extraction, and storage the assistant can query.',
        outcome: 'No paid model calls and under 1 GB of memory; personal data is redacted before any model sees the text.',
        pipeline: meetingKnowledge,
      },
      {
        slug: 'yolo-bias-fix',
        title: 'Face-verification bias fix',
        line: 'Found why a production model kept rejecting bearded drivers, and retrained it.',
        stat: { value: '3.3x', label: 'more real defects caught after retraining' },
        tags: ['Computer Vision', 'YOLO', 'PyTorch', 'CVAT'],
        problem: 'A face-verification model in production kept blocking bearded drivers even when their faces were fully visible.',
        built: 'Traced it to a bias in the training data, relabeled the data in CVAT and fine-tuned the YOLO model on ~95,000 images.',
        outcome: 'Confidence rose from 0.84 to 0.96, and the model now catches 3.3x more genuine defects.',
        pipeline: yoloBiasFix,
      },
    ],
    also: [
      'Documented 230+ Databricks tables (~6,200 lines) so the assistant answers from verified definitions',
      'Wrote a 12-page SQL playbook for diagnosing wrong AI-generated queries',
      'Built a hybrid search router (MiniLM + BM25 + RRF) so questions reach the right documents',
    ],
  },
  {
    company: 'Skaeo',
    role: 'ML & AI Systems Intern',
    period: 'May – Jul 2025',
    place: 'Remote',
    summary: 'Shipped computer vision features to production and automated a marketing workflow.',
    items: [
      {
        slug: 'face-anti-spoofing',
        title: 'Face anti-spoofing',
        line: 'Added a liveness check so an attendance app can’t be fooled by a photo.',
        stat: { value: '~5s', label: 'to verify a live face' },
        tags: ['Computer Vision', 'dlib', 'OpenCV', 'FastAPI'],
        problem: 'The “My RollCall Pro” attendance app could be fooled by holding up a photo or a screen.',
        built: 'Built a pipeline on dlib face landmarks that checks three live signals: blinking, smiling and eye movement.',
        outcome: 'Rejects photo and screen spoofs with a decision in about 5 seconds.',
        pipeline: faceAntiSpoof,
      },
      {
        slug: 'serial-number-ocr',
        title: 'Serial-number OCR',
        line: 'Built serial-number recognition from photos after benchmarking several OCR engines.',
        stat: { value: '~2s', label: 'per image in production' },
        tags: ['OCR', 'ONNX Runtime', 'Python'],
        problem: 'Serial numbers had to be read from photos quickly and reliably inside a production flow.',
        built: 'Benchmarked OCR engines for speed vs. accuracy, then customized RapidOCR on ONNX Runtime with preprocessing and validation.',
        outcome: 'About 2 seconds per image in production.',
        pipeline: serialOcr,
      },
    ],
    also: ['Automated a marketing workflow with LLM agents (LangChain, Phidata), cutting manual turnaround by 40%'],
  },
]

export const projects: WorkItem[] = [
  {
    slug: 'spatial-learning-platform',
    title: 'Adaptive Spatial Learning Platform',
    context: 'Full-stack · 2026 – now',
    line: 'Building a full-stack web app where students solve 3D puzzles and get AI-written hints.',
    metric: '13-table schema · admin console · CSV exports · LLM with fallback',
    tags: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Three.js'],
    problem: 'Students needed one app to work through 3D spatial tasks across several sessions, with every action recorded.',
    built:
      'Built the React + Three.js front end, an async FastAPI backend, a 13-table Postgres schema and an admin console for setup and data export.',
    outcome: 'Rules choose each hint and an LLM only rewords it, so the app keeps working when the AI call fails or is slow.',
    repo: 'https://github.com/Kshitiztyagi23/spatial_learning_platform',
    pipeline: spatialPlatform,
  },
  {
    slug: 'cinescope',
    title: 'CineScope',
    context: 'Data analytics · 2025',
    line: 'Built an interactive dashboard for exploring box-office trends, genres and studio ROI.',
    metric: '900K+ films · clustering · linked filters',
    tags: ['Python', 'pandas', 'Plotly', 'Dash', 'scikit-learn'],
    problem: 'A dataset of 900K+ films is hard to explore without writing code.',
    built: 'Cleaned the data, clustered it with PCA and t-SNE, and built a Dash app with linked charts and real-time filters.',
    outcome: 'Trends by genre, country and studio can be explored from one screen.',
    repo: 'https://github.com/Kshitiztyagi23/CineScope_CS661',
    pipeline: cineScope,
  },
  {
    slug: 'synapticspike',
    title: 'SynapticSpike',
    context: 'Data science · 2025',
    line: 'Fitted a Bayesian learning model to EEG from 33 people and tested it with mixed-effects models.',
    metric: '1.7M+ observations · R + Python · HPC cluster',
    tags: ['Python', 'R', 'Statistics', 'Bayesian modeling', 'SLURM'],
    problem: 'Do the surprises predicted by a computational model of learning show up in people’s brain responses?',
    built:
      'Fitted a 3-level Hierarchical Gaussian Filter per person, then ran linear and mixed-effects models at every timepoint with permutation testing.',
    outcome: 'Scaled to 1.7M+ observations by running the analysis as parallel jobs on an HPC cluster.',
    repo: 'https://github.com/Kshitiztyagi23/SynapticSpike',
    pipeline: synapticSpike,
  },
]

export interface MoreItem {
  title: string
  line: string
  repo?: string
}

export const otherProjects: MoreItem[] = [
  {
    title: 'Deepfake-resistant vKYC',
    line: 'Team hackathon entry: deepfake detection for video KYC with a fine-tuned SigLIP model.',
    repo: 'https://github.com/Kshitiztyagi23/BOBhackathon_2025',
  },
  {
    title: 'Word For Thought',
    line: 'Led a 20+ member team building speech emotion recognition, 97% accuracy.',
    repo: 'https://github.com/Kshitiztyagi23/WordForThought',
  },
  { title: 'The Minds Mirror', line: 'Classified EEG signals with a 1D CNN, 90% accuracy.' },
  { title: 'BioBytes', line: 'Classified DNA sequences with k-mer features and XGBoost.' },
]

export const research = {
  title: 'When Motion Wins: Hierarchies of Cognitive Efficiency in Perceptual Grouping',
  authors: 'Tyagi, K., Pandey, V., & Srivastava, A.',
  venue: 'CogSci 2026 · Rio de Janeiro',
  format: 'Peer-reviewed poster',
  line: 'Designed and ran a 46-person experiment on which visual cues people use to group objects, and analyzed it with non-parametric statistics. Motion usually won, but the cue picked most often was not always the fastest to process.',
  link: 'https://www.cgs.iitk.ac.in/',
  linkLabel: 'IITK publication listing',
  results: [
    { opponent: 'Prägnanz', winRate: 91.3 },
    { opponent: 'Similarity', winRate: 65.2 },
  ],
  rtOverhead: { value: '2.7x', label: 'slower to process Good Continuity, even though it was rarely chosen' },
  secondary: {
    title: 'Plural Pathways to Computational Thinking',
    meta: 'Co-author · under review at RPTEL',
    line: 'Ran regression and hypothesis tests on how problem-solving strategies change with age.',
  },
}

export const about =
  'Final-year B.Tech at IIT Kanpur, CPI 8.8 (top 10% of my batch). Most of my work covers the whole system: the data pipeline, the model, and the backend that serves it.'

export const toolkit = [
  { group: 'languages', items: ['Python', 'SQL', 'C++', 'Java', 'R'] },
  { group: 'ml / ai', items: ['PyTorch', 'TensorFlow', 'LangChain', 'OpenCV', 'YOLO', 'Hugging Face'] },
  { group: 'data / backend', items: ['pandas', 'Databricks', 'PostgreSQL', 'FastAPI', 'Redis', 'React'] },
  { group: 'infra', items: ['Docker', 'AWS', 'MCP', 'CUDA', 'Git'] },
]

export const recognition = [
  { title: 'Academic Excellence Award', detail: 'Top 10% of batch, 2024–25' },
  { title: 'Reliance Foundation Scholar', detail: 'Selected from 58,000 applicants' },
  { title: 'Overall Coordinator, BioSoc', detail: 'Led 6 teams · managed a ₹2 lakh budget' },
  { title: 'Secretary, BCS Club', detail: 'Mentored 40+ students · workshops for 200+' },
]
