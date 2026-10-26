// System architecture maps rendered by <PipelineMap />.
// Stages sit on a grid: `col` runs left → right in flow order, `row` stacks
// parallel branches. Forward edges should connect adjacent columns; an edge
// pointing backwards (to.col <= from.col) is drawn as a loop over the top.

export type StageKind = 'source' | 'process' | 'model' | 'store' | 'serve' | 'human'

export interface PipelineStage {
  id: string
  label: string
  kind: StageKind
  col: number
  row: number
  detail: string
  tech?: string[]
}

export interface PipelineEdge {
  from: string
  to: string
  label?: string
}

export interface Pipeline {
  caption: string
  stages: PipelineStage[]
  edges: PipelineEdge[]
}

export const spatialPlatform: Pipeline = {
  caption: 'rules decide what to say · the LLM only decides how to say it',
  stages: [
    {
      id: 'client',
      label: 'React client',
      kind: 'source',
      col: 0,
      row: 0,
      detail:
        'React 19 + TypeScript app that runs the task sequence, including a Three.js workbench with 21 3D LEGO puzzles. Every placement, removal and check is logged.',
      tech: ['React', 'TypeScript', 'Three.js / R3F'],
    },
    {
      id: 'api',
      label: 'FastAPI',
      kind: 'serve',
      col: 1,
      row: 0,
      detail: 'Async FastAPI backend for participants, sessions, stages, trials and LEGO events. Resumes a session where the server left it.',
      tech: ['FastAPI', 'SQLAlchemy'],
    },
    {
      id: 'rules',
      label: 'Rule engine',
      kind: 'process',
      col: 2,
      row: 0,
      detail: 'Works out what the student got wrong and picks a fixed hint. Hints get more specific after each failed check.',
      tech: ['Python'],
    },
    {
      id: 'llm',
      label: 'LLM phrasing',
      kind: 'model',
      col: 3,
      row: 0,
      detail:
        'Rewrites the hint as one short, child-friendly sentence. Falls back to the fixed text if the call fails, takes over 6s or breaks the writing rules. It never sees names or the answer.',
      tech: ['Claude', 'OpenAI-compatible APIs'],
    },
    {
      id: 'db',
      label: 'PostgreSQL',
      kind: 'store',
      col: 2,
      row: 1,
      detail: 'Neon Postgres with 13 tables and Alembic migrations. Each hint is stored with whether the student then fixed the error.',
      tech: ['PostgreSQL', 'Alembic'],
    },
    {
      id: 'admin',
      label: 'Admin console',
      kind: 'human',
      col: 3,
      row: 1,
      detail: 'Passcode-protected console to configure sessions and task sets, watch live sessions and export CSVs.',
      tech: ['React'],
    },
  ],
  edges: [
    { from: 'client', to: 'api' },
    { from: 'api', to: 'rules' },
    { from: 'rules', to: 'llm' },
    { from: 'llm', to: 'client', label: 'hint' },
    { from: 'api', to: 'db' },
    { from: 'db', to: 'admin' },
  ],
}

export const feedbackLoop: Pipeline = {
  caption: 'approve → committed in 3–5s · safe across 2–4 autoscaled replicas',
  stages: [
    {
      id: 'flag',
      label: 'Assistant flag',
      kind: 'source',
      col: 0,
      row: 0,
      detail: 'When the assistant gets something wrong, it calls an MCP tool with a structured fix: which file, which section, what to change.',
      tech: ['MCP'],
    },
    {
      id: 'log',
      label: 'Postgres log',
      kind: 'store',
      col: 1,
      row: 0,
      detail: 'The correction and the exact patch are written to Postgres as pending review.',
      tech: ['PostgreSQL'],
    },
    {
      id: 'review',
      label: 'Slack review',
      kind: 'human',
      col: 2,
      row: 0,
      detail: 'A Slack card tags a domain expert, who can approve, edit, investigate or reject. An atomic claim makes sure only one replica posts it.',
      tech: ['Slack API'],
    },
    {
      id: 'commit',
      label: 'Commit worker',
      kind: 'process',
      col: 3,
      row: 0,
      detail:
        'On approval, a background worker takes an atomic SQL claim so only one replica acts, applies the patch and commits it through the GitHub API in about 3–5s.',
      tech: ['PostgreSQL', 'GitHub REST API'],
    },
    {
      id: 'pr',
      label: 'Batched PR',
      kind: 'serve',
      col: 4,
      row: 0,
      detail: 'Applied patches are batched onto a dated branch and raised as a single pull request on a schedule.',
      tech: ['GitHub REST API'],
    },
  ],
  edges: [
    { from: 'flag', to: 'log' },
    { from: 'log', to: 'review' },
    { from: 'review', to: 'commit' },
    { from: 'commit', to: 'pr' },
  ],
}

export const meetingKnowledge: Pipeline = {
  caption: '1,613-conversation backlog · $0 inference cost · <1 GiB RAM',
  stages: [
    {
      id: 'api',
      label: 'API pull',
      kind: 'source',
      col: 0,
      row: 0,
      detail: 'Route A: transcripts pulled from the recording device’s API.',
    },
    {
      id: 'slack',
      label: 'Slack ingest',
      kind: 'source',
      col: 0,
      row: 1,
      detail: 'Route B: transcripts uploaded through Slack.',
      tech: ['Slack API'],
    },
    {
      id: 'dedup',
      label: 'Dedup',
      kind: 'store',
      col: 1,
      row: 0,
      detail: 'Content-hashed so the same transcript is never processed twice; records who ingested it.',
      tech: ['SHA-256', 'PostgreSQL'],
    },
    {
      id: 'pii',
      label: 'PII redaction',
      kind: 'process',
      col: 2,
      row: 0,
      detail: 'Runs locally and fails closed: phone numbers, IDs, cards and more are redacted, and speakers are pseudonymized.',
    },
    {
      id: 'filter',
      label: 'MiniLM filter',
      kind: 'model',
      col: 3,
      row: 0,
      detail: 'A keyword denylist plus a MiniLM similarity check drops sensitive segments before any LLM sees them.',
      tech: ['MiniLM'],
    },
    {
      id: 'extract',
      label: 'Triplet extraction',
      kind: 'model',
      col: 4,
      row: 0,
      detail:
        'A headless LLM (Kiro CLI, $0 marginal cost) extracts subject → predicate → object facts with context and confidence, then re-scans them for PII.',
      tech: ['Kiro CLI'],
    },
    {
      id: 'store',
      label: 'Knowledge store',
      kind: 'store',
      col: 5,
      row: 0,
      detail: 'Duplicates are merged; a repeated fact raises its corroboration count instead of adding a row.',
      tech: ['PostgreSQL'],
    },
    {
      id: 'serve',
      label: 'Assistant',
      kind: 'serve',
      col: 6,
      row: 0,
      detail: 'Served to the assistant as lower-trust notes; the verified knowledge base always wins. A kill switch turns serving off.',
      tech: ['MCP'],
    },
  ],
  edges: [
    { from: 'api', to: 'dedup' },
    { from: 'slack', to: 'dedup' },
    { from: 'dedup', to: 'pii' },
    { from: 'pii', to: 'filter' },
    { from: 'filter', to: 'extract' },
    { from: 'extract', to: 'store' },
    { from: 'store', to: 'serve' },
  ],
}

export const yoloBiasFix: Pipeline = {
  caption: '3.3x defect catch · confidence 0.84 → 0.96 · ~95,000 images',
  stages: [
    {
      id: 'blocks',
      label: 'False blocks',
      kind: 'source',
      col: 0,
      row: 0,
      detail: 'The face-verification model kept blocking bearded drivers even when nothing covered their face.',
    },
    {
      id: 'diagnose',
      label: 'Bias diagnosis',
      kind: 'process',
      col: 1,
      row: 0,
      detail: 'Traced the failures to a facial-hair bias in the training data, not real occlusion.',
      tech: ['Model Evaluation'],
    },
    {
      id: 'relabel',
      label: 'CVAT relabel',
      kind: 'human',
      col: 2,
      row: 0,
      detail: 'Relabeled the training data in CVAT.',
      tech: ['CVAT'],
    },
    {
      id: 'finetune',
      label: 'Fine-tune',
      kind: 'model',
      col: 3,
      row: 0,
      detail: 'Fine-tuned YOLO for 50 epochs across ~95,000 images.',
      tech: ['YOLO'],
    },
    {
      id: 'eval',
      label: 'Prod eval',
      kind: 'process',
      col: 4,
      row: 0,
      detail: 'Evaluated on production images before release: 3.3x more real defects caught, confidence up from 0.84 to 0.96.',
      tech: ['Model Evaluation'],
    },
    {
      id: 'deploy',
      label: 'Deploy',
      kind: 'serve',
      col: 5,
      row: 0,
      detail: 'Shipped back into the verification flow.',
    },
  ],
  edges: [
    { from: 'blocks', to: 'diagnose' },
    { from: 'diagnose', to: 'relabel' },
    { from: 'relabel', to: 'finetune' },
    { from: 'finetune', to: 'eval' },
    { from: 'eval', to: 'deploy' },
  ],
}

export const faceAntiSpoof: Pipeline = {
  caption: 'edge anti-spoofing against 2D presentation attacks · ~5s latency',
  stages: [
    {
      id: 'frame',
      label: 'Camera frame',
      kind: 'source',
      col: 0,
      row: 1,
      detail: 'Frames from the “My RollCall Pro” mobile app.',
    },
    {
      id: 'detect',
      label: 'HOG face detect',
      kind: 'model',
      col: 1,
      row: 1,
      detail: 'dlib’s HOG detector finds the face.',
      tech: ['dlib'],
    },
    {
      id: 'landmarks',
      label: '68 landmarks',
      kind: 'model',
      col: 2,
      row: 1,
      detail: 'dlib fits 68 facial landmarks.',
      tech: ['dlib'],
    },
    {
      id: 'ear',
      label: 'Blink · EAR',
      kind: 'process',
      col: 3,
      row: 0,
      detail: 'Eye Aspect Ratio tracks blinks.',
    },
    {
      id: 'mar',
      label: 'Smile · MAR',
      kind: 'process',
      col: 3,
      row: 1,
      detail: 'Mouth Aspect Ratio tracks smiles.',
    },
    {
      id: 'gaze',
      label: 'Pupil gaze',
      kind: 'process',
      col: 3,
      row: 2,
      detail: 'Pupil movement tracks gaze.',
    },
    {
      id: 'verdict',
      label: 'Liveness check',
      kind: 'serve',
      col: 4,
      row: 1,
      detail: 'The cues together decide whether a live person is present, rejecting printed or on-screen faces in about 5s.',
      tech: ['FastAPI'],
    },
  ],
  edges: [
    { from: 'frame', to: 'detect' },
    { from: 'detect', to: 'landmarks' },
    { from: 'landmarks', to: 'ear' },
    { from: 'landmarks', to: 'mar' },
    { from: 'landmarks', to: 'gaze' },
    { from: 'ear', to: 'verdict' },
    { from: 'mar', to: 'verdict' },
    { from: 'gaze', to: 'verdict' },
  ],
}

export const synapticSpike: Pipeline = {
  caption: '33 subjects · 1.7M+ observations · run on an HPC cluster',
  stages: [
    {
      id: 'seq',
      label: 'Stimulus sequence',
      kind: 'source',
      col: 0,
      row: 0,
      detail: 'The trial sequence presented in a roving mismatch-negativity paradigm.',
    },
    {
      id: 'hgf',
      label: '3-level HGF',
      kind: 'model',
      col: 1,
      row: 0,
      detail: 'A Bayesian Hierarchical Gaussian Filter models each subject’s trial-by-trial belief updates, prediction errors and volatility.',
      tech: ['pyhgf'],
    },
    {
      id: 'eeg',
      label: 'Raw EEG',
      kind: 'source',
      col: 1,
      row: 1,
      detail: 'EEG recordings from 33 participants.',
      tech: ['EEG'],
    },
    {
      id: 'extract',
      label: 'Channel extract',
      kind: 'process',
      col: 2,
      row: 0,
      detail: 'Single-trial amplitudes at Fz, Cz and Pz are extracted per subject and merged with the model output, as a SLURM array job.',
      tech: ['Python', 'SLURM'],
    },
    {
      id: 'lmer',
      label: 'LM vs LMER',
      kind: 'model',
      col: 3,
      row: 0,
      detail: 'Linear and mixed-effects models at every timepoint, corrected with cluster permutation tests (500 permutations), over 1.7M+ observations.',
      tech: ['R', 'lme4'],
    },
    {
      id: 'olife',
      label: 'Trait link',
      kind: 'serve',
      col: 4,
      row: 0,
      detail: 'EEG effects are correlated with O-LIFE schizotypy scores.',
      tech: ['R'],
    },
  ],
  edges: [
    { from: 'seq', to: 'hgf' },
    { from: 'hgf', to: 'extract' },
    { from: 'eeg', to: 'extract' },
    { from: 'extract', to: 'lmer' },
    { from: 'lmer', to: 'olife' },
  ],
}

export const serialOcr: Pipeline = {
  caption: '~2s inference in production',
  stages: [
    {
      id: 'image',
      label: 'Input image',
      kind: 'source',
      col: 0,
      row: 0,
      detail: 'A photo containing a device serial number.',
    },
    {
      id: 'prep',
      label: 'Preprocessing',
      kind: 'process',
      col: 1,
      row: 0,
      detail: 'Custom image preprocessing before recognition.',
      tech: ['OpenCV'],
    },
    {
      id: 'ocr',
      label: 'RapidOCR',
      kind: 'model',
      col: 2,
      row: 0,
      detail: 'RapidOCR customized to run on ONNX Runtime, chosen after benchmarking several OCR engines on latency vs. accuracy.',
      tech: ['RapidOCR', 'ONNX Runtime'],
    },
    {
      id: 'extract',
      label: 'Extract + validate',
      kind: 'process',
      col: 3,
      row: 0,
      detail: 'Extraction and validation logic pulls the serial number out of the recognized text and checks it.',
      tech: ['Python'],
    },
    {
      id: 'serial',
      label: 'Serial number',
      kind: 'serve',
      col: 4,
      row: 0,
      detail: 'Returned in about 2s in the production pipeline.',
    },
  ],
  edges: [
    { from: 'image', to: 'prep' },
    { from: 'prep', to: 'ocr' },
    { from: 'ocr', to: 'extract' },
    { from: 'extract', to: 'serial' },
  ],
}

export const cineScope: Pipeline = {
  caption: '900K+ titles · cross-filtered Dash dashboard',
  stages: [
    {
      id: 'data',
      label: 'Movie metadata',
      kind: 'source',
      col: 0,
      row: 1,
      detail: '900K+ titles from the TMDB dataset: runtime, genre, country, studio and financials.',
    },
    {
      id: 'prep',
      label: 'Preprocessing',
      kind: 'process',
      col: 1,
      row: 1,
      detail: 'Cleaning and encoding of text and categorical metadata.',
      tech: ['pandas'],
    },
    {
      id: 'reduce',
      label: 'PCA · t-SNE',
      kind: 'model',
      col: 2,
      row: 1,
      detail: 'Dimensionality reduction to cluster titles and surface trends.',
      tech: ['scikit-learn'],
    },
    {
      id: 'dash',
      label: 'Dash app',
      kind: 'serve',
      col: 3,
      row: 1,
      detail: 'Plotly / Dash dashboard on box-office trends, genre popularity and studio ROI.',
      tech: ['Dash', 'Plotly'],
    },
    {
      id: 'stream',
      label: 'Streamgraphs',
      kind: 'serve',
      col: 4,
      row: 0,
      detail: 'Streamgraphs of trends over time.',
    },
    {
      id: 'map',
      label: 'Choropleths',
      kind: 'serve',
      col: 4,
      row: 1,
      detail: 'Choropleth maps by country.',
    },
    {
      id: 'filter',
      label: 'Cross-filters',
      kind: 'serve',
      col: 4,
      row: 2,
      detail: 'Real-time filters that update every linked chart.',
    },
  ],
  edges: [
    { from: 'data', to: 'prep' },
    { from: 'prep', to: 'reduce' },
    { from: 'reduce', to: 'dash' },
    { from: 'dash', to: 'stream' },
    { from: 'dash', to: 'map' },
    { from: 'dash', to: 'filter' },
  ],
}
