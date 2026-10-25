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

/* ───────────────────────── Battery Smart ───────────────────────── */

export const feedbackLoop: Pipeline = {
  caption: 'flag → commit in 3–5s · 0 duplicate commits across replicas',
  stages: [
    {
      id: 'flag',
      label: 'Assistant flag',
      kind: 'source',
      col: 0,
      row: 0,
      detail: 'A wrong answer from the analytics assistant is flagged through its MCP server.',
      tech: ['MCP'],
    },
    {
      id: 'log',
      label: 'Postgres log',
      kind: 'store',
      col: 1,
      row: 0,
      detail: 'Each flagged error is logged to PostgreSQL.',
      tech: ['PostgreSQL'],
    },
    {
      id: 'review',
      label: 'Slack review',
      kind: 'human',
      col: 2,
      row: 0,
      detail: 'The correction is posted to Slack as a review card and waits for approval.',
      tech: ['Slack API'],
    },
    {
      id: 'claim',
      label: 'Atomic claim',
      kind: 'process',
      col: 3,
      row: 0,
      detail:
        'Autoscaled replicas can race on the same correction. A single atomic claim statement in SQL lets exactly one of them take it.',
      tech: ['PostgreSQL', 'Concurrency Control'],
    },
    {
      id: 'commit',
      label: 'GitHub commit',
      kind: 'serve',
      col: 4,
      row: 0,
      detail: 'The approved correction is committed through the GitHub REST API.',
      tech: ['GitHub REST API'],
    },
    {
      id: 'pr',
      label: 'Batched PR',
      kind: 'serve',
      col: 5,
      row: 0,
      detail: 'Commits are batched into a pull request.',
      tech: ['GitHub REST API'],
    },
  ],
  edges: [
    { from: 'flag', to: 'log' },
    { from: 'log', to: 'review' },
    { from: 'review', to: 'claim' },
    { from: 'claim', to: 'commit' },
    { from: 'commit', to: 'pr' },
  ],
}

export const meetingKnowledge: Pipeline = {
  caption: '1,613-meeting backlog · modeled at $0 inference cost · <1 GiB RAM',
  stages: [
    {
      id: 'api',
      label: 'Transcript API',
      kind: 'source',
      col: 0,
      row: 0,
      detail: 'Meeting transcripts arrive through an API.',
    },
    {
      id: 'slack',
      label: 'Slack ingest',
      kind: 'source',
      col: 0,
      row: 1,
      detail: 'Transcripts can also come in through Slack.',
      tech: ['Slack API'],
    },
    {
      id: 'pii',
      label: 'PII redaction',
      kind: 'process',
      col: 1,
      row: 0,
      detail: 'Personal information is redacted first, before any model sees the text.',
      tech: ['PII Redaction'],
    },
    {
      id: 'extract',
      label: 'LLM extraction',
      kind: 'model',
      col: 2,
      row: 0,
      detail: 'A headless LLM (Kiro CLI) extracts structured knowledge points from each transcript.',
      tech: ['Kiro CLI'],
    },
    {
      id: 'embed',
      label: 'Vector store',
      kind: 'store',
      col: 3,
      row: 0,
      detail: 'Knowledge points are stored as vector embeddings within a 1 GiB memory budget.',
      tech: ['MiniLM', 'Knowledge Embeddings'],
    },
    {
      id: 'question',
      label: 'User question',
      kind: 'source',
      col: 3,
      row: 1,
      detail: 'At query time, a user asks the assistant a question.',
    },
    {
      id: 'match',
      label: 'Embedding match',
      kind: 'process',
      col: 4,
      row: 0,
      detail: 'The question is matched against the stored embeddings to find relevant knowledge.',
    },
    {
      id: 'context',
      label: 'Assistant context',
      kind: 'serve',
      col: 5,
      row: 0,
      detail: 'Matched knowledge is pulled into the assistant’s context for its answer.',
      tech: ['MCP'],
    },
  ],
  edges: [
    { from: 'api', to: 'pii' },
    { from: 'slack', to: 'pii' },
    { from: 'pii', to: 'extract' },
    { from: 'extract', to: 'embed' },
    { from: 'embed', to: 'match' },
    { from: 'question', to: 'match' },
    { from: 'match', to: 'context' },
  ],
}

export const yoloBiasFix: Pipeline = {
  caption: '508 false blocks removed · 3.3x defect catch · confidence 0.84 → 0.96',
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
      detail: 'Traced the failures to a bias in the training data, not real occlusion.',
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
      detail: 'Fine-tuned the YOLO model for 50 epochs.',
      tech: ['YOLO'],
    },
    {
      id: 'eval',
      label: 'Prod eval',
      kind: 'process',
      col: 4,
      row: 0,
      detail:
        'Passed a 94,924-image production evaluation: 3.3x more genuine defects caught, confidence up from 0.84 to 0.96.',
      tech: ['Model Evaluation'],
    },
    {
      id: 'deploy',
      label: 'Deploy',
      kind: 'serve',
      col: 5,
      row: 0,
      detail: 'Deployed to the verification flow, eliminating 508 false blocks.',
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

/* ───────────────────────────── Skaeo ───────────────────────────── */

export const faceLiveness: Pipeline = {
  caption: 'multi-cue anti-spoofing · 5s inference after API integration',
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
      detail: 'dlib’s HOG face detector locates the face.',
      tech: ['dlib'],
    },
    {
      id: 'landmarks',
      label: '68 landmarks',
      kind: 'model',
      col: 2,
      row: 1,
      detail: 'dlib fits 68 facial landmarks to the detected face.',
      tech: ['dlib', 'Facial Landmarks'],
    },
    {
      id: 'ear',
      label: 'EAR · blink',
      kind: 'process',
      col: 3,
      row: 0,
      detail: 'Eye Aspect Ratio tracks blinks.',
    },
    {
      id: 'mar',
      label: 'MAR · smile',
      kind: 'process',
      col: 3,
      row: 1,
      detail: 'Mouth Aspect Ratio tracks smiles.',
    },
    {
      id: 'pupil',
      label: 'Pupil dynamics',
      kind: 'process',
      col: 3,
      row: 2,
      detail: 'Pupil movement is tracked as a third cue.',
    },
    {
      id: 'verdict',
      label: 'Liveness check',
      kind: 'process',
      col: 4,
      row: 1,
      detail: 'The tracked cues together decide whether a live person is in front of the camera, which stops spoofing.',
      tech: ['Biometrics'],
    },
    {
      id: 'api',
      label: 'API',
      kind: 'serve',
      col: 5,
      row: 1,
      detail: 'Integrated into the app through an API; inference takes 5s.',
      tech: ['FastAPI'],
    },
  ],
  edges: [
    { from: 'frame', to: 'detect' },
    { from: 'detect', to: 'landmarks' },
    { from: 'landmarks', to: 'ear' },
    { from: 'landmarks', to: 'mar' },
    { from: 'landmarks', to: 'pupil' },
    { from: 'ear', to: 'verdict' },
    { from: 'mar', to: 'verdict' },
    { from: 'pupil', to: 'verdict' },
    { from: 'verdict', to: 'api' },
  ],
}

export const serialOcr: Pipeline = {
  caption: '2s inference latency in production',
  stages: [
    {
      id: 'image',
      label: 'Input image',
      kind: 'source',
      col: 0,
      row: 0,
      detail: 'An image containing a serial number.',
    },
    {
      id: 'prep',
      label: 'Preprocessing',
      kind: 'process',
      col: 1,
      row: 0,
      detail: 'Custom image preprocessing before recognition.',
      tech: ['Image Processing'],
    },
    {
      id: 'ocr',
      label: 'RapidOCR',
      kind: 'model',
      col: 2,
      row: 0,
      detail:
        'RapidOCR, customized and run on ONNX Runtime. Chosen after benchmarking OCR engines on latency vs. accuracy.',
      tech: ['RapidOCR', 'ONNX Runtime'],
    },
    {
      id: 'extract',
      label: 'Extraction',
      kind: 'process',
      col: 3,
      row: 0,
      detail: 'Extraction logic pulls the serial number out of the recognized text.',
      tech: ['Python'],
    },
    {
      id: 'serial',
      label: 'Serial number',
      kind: 'serve',
      col: 4,
      row: 0,
      detail: 'Returned with 2s inference latency in production.',
    },
  ],
  edges: [
    { from: 'image', to: 'prep' },
    { from: 'prep', to: 'ocr' },
    { from: 'ocr', to: 'extract' },
    { from: 'extract', to: 'serial' },
  ],
}

export const marketingAgents: Pipeline = {
  caption: '+29.8% marketing efficiency · −40% manual effort',
  stages: [
    {
      id: 'swot',
      label: 'SWOT analysis',
      kind: 'model',
      col: 0,
      row: 0,
      detail: 'Agents run the SWOT analysis.',
      tech: ['LangChain', 'Phidata'],
    },
    {
      id: 'ideate',
      label: 'Ideation',
      kind: 'model',
      col: 1,
      row: 0,
      detail: 'Dynamic content ideation.',
      tech: ['LangChain', 'Phidata'],
    },
    {
      id: 'generate',
      label: 'Generation',
      kind: 'model',
      col: 2,
      row: 0,
      detail: 'Content generation with LLMs.',
      tech: ['LLMs'],
    },
    {
      id: 'schedule',
      label: 'Scheduling',
      kind: 'serve',
      col: 3,
      row: 0,
      detail: 'Generated posts are scheduled automatically.',
      tech: ['Workflow Automation'],
    },
    {
      id: 'url',
      label: 'Shared URL',
      kind: 'source',
      col: 0,
      row: 1,
      detail: 'A URL sent to the Telegram bot.',
    },
    {
      id: 'bot',
      label: 'Telegram bot',
      kind: 'serve',
      col: 1,
      row: 1,
      detail: 'The bot analyzes the URL and responds in context, automatically.',
      tech: ['Telegram API'],
    },
  ],
  edges: [
    { from: 'swot', to: 'ideate' },
    { from: 'ideate', to: 'generate' },
    { from: 'generate', to: 'schedule' },
    { from: 'url', to: 'bot' },
  ],
}

/* ──────────────────────────── Projects ─────────────────────────── */

export const spatialLearning: Pipeline = {
  caption: 'real-time feedback loop · deployment architecture designed for AWS',
  stages: [
    {
      id: 'task',
      label: '3D task module',
      kind: 'source',
      col: 0,
      row: 0,
      detail: 'Interactive 3D LEGO-based tasks in the React client.',
      tech: ['React', '3D Graphics'],
    },
    {
      id: 'api',
      label: 'Session API',
      kind: 'serve',
      col: 1,
      row: 0,
      detail: 'FastAPI orchestrates sessions and receives interaction telemetry.',
      tech: ['FastAPI'],
    },
    {
      id: 'validate',
      label: 'Constraint check',
      kind: 'process',
      col: 2,
      row: 0,
      detail: 'Automated constraint validation and scoring for each task.',
    },
    {
      id: 'feedback',
      label: 'Feedback engine',
      kind: 'process',
      col: 3,
      row: 0,
      detail: 'Evaluates the learner’s spatial reasoning steps in real time and returns dynamic scaffolding.',
    },
    {
      id: 'events',
      label: 'Event logging',
      kind: 'process',
      col: 2,
      row: 1,
      detail: 'Event logging pipeline for interaction telemetry.',
      tech: ['AWS'],
    },
    {
      id: 'db',
      label: 'PostgreSQL',
      kind: 'store',
      col: 3,
      row: 1,
      detail: 'Normalized data models for sessions and telemetry.',
      tech: ['PostgreSQL'],
    },
  ],
  edges: [
    { from: 'task', to: 'api' },
    { from: 'api', to: 'validate' },
    { from: 'validate', to: 'feedback' },
    { from: 'feedback', to: 'task', label: 'scaffolding' },
    { from: 'api', to: 'events' },
    { from: 'events', to: 'db' },
  ],
}

export const spikeverse: Pipeline = {
  caption: 'peak score 290 in 2,000 episodes · projected 40%+ inference energy cut',
  stages: [
    {
      id: 'env',
      label: 'Atari Breakout',
      kind: 'source',
      col: 0,
      row: 0,
      detail: 'The game environment the agent learns to play.',
    },
    {
      id: 'replay',
      label: 'Prioritized replay',
      kind: 'store',
      col: 1,
      row: 1,
      detail: 'Prioritized experience replay buffer of past transitions.',
    },
    {
      id: 'ddqn',
      label: 'Double DQN',
      kind: 'model',
      col: 2,
      row: 0,
      detail: 'Double DQN agent. Peak score of 290 within 2,000 episodes.',
      tech: ['PyTorch', 'Double DQN'],
    },
    {
      id: 'snn',
      label: 'SNN conversion',
      kind: 'model',
      col: 3,
      row: 0,
      detail: 'Converted to a spiking neural network with Leaky Integrate-and-Fire neurons, trained with surrogate gradients.',
      tech: ['SNN', 'LIF Neurons'],
    },
    {
      id: 'spiking',
      label: 'Spiking agent',
      kind: 'serve',
      col: 4,
      row: 0,
      detail: 'Projected to cut inference power by over 40% while keeping Double DQN benchmark performance.',
      tech: ['Neuromorphic'],
    },
  ],
  edges: [
    { from: 'env', to: 'replay' },
    { from: 'replay', to: 'ddqn' },
    { from: 'ddqn', to: 'env', label: 'actions' },
    { from: 'ddqn', to: 'snn' },
    { from: 'snn', to: 'spiking' },
  ],
}

export const wordForThought: Pipeline = {
  caption: '97% emotion accuracy on unseen test signals',
  stages: [
    {
      id: 'wave',
      label: 'Raw waveform',
      kind: 'source',
      col: 0,
      row: 0,
      detail: 'Raw speech audio.',
    },
    {
      id: 'spec',
      label: 'FFT spectrogram',
      kind: 'process',
      col: 1,
      row: 0,
      detail: 'Waveforms are converted into time-frequency spectrograms with the FFT.',
      tech: ['Librosa', 'FFT Spectrograms'],
    },
    {
      id: 'cnn',
      label: '2D CNN',
      kind: 'model',
      col: 2,
      row: 0,
      detail: 'A 2D CNN trained and fine-tuned on the spectral patterns.',
      tech: ['2D CNN'],
    },
    {
      id: 'emotion',
      label: 'Emotion class',
      kind: 'serve',
      col: 3,
      row: 0,
      detail: '97% classification accuracy on unseen test signals, with low-latency inference.',
    },
  ],
  edges: [
    { from: 'wave', to: 'spec' },
    { from: 'spec', to: 'cnn' },
    { from: 'cnn', to: 'emotion' },
  ],
}

export const cineScope: Pipeline = {
  caption: '900K+ movies · 7+ linked visual modules',
  stages: [
    {
      id: 'data',
      label: 'Movie metadata',
      kind: 'source',
      col: 0,
      row: 1,
      detail: '900,000+ movies with runtime, genre, financial, text and categorical fields.',
      tech: ['Big Data'],
    },
    {
      id: 'prep',
      label: 'Preprocessing',
      kind: 'process',
      col: 1,
      row: 1,
      detail: 'Textual and categorical metadata cleaned and encoded.',
      tech: ['Python'],
    },
    {
      id: 'reduce',
      label: 'PCA · t-SNE',
      kind: 'model',
      col: 2,
      row: 1,
      detail: 'PCA and t-SNE for multidimensional clustering and trend analysis.',
      tech: ['PCA / t-SNE'],
    },
    {
      id: 'dash',
      label: 'Dash app',
      kind: 'serve',
      col: 3,
      row: 1,
      detail: 'Interactive Plotly / Dash dashboard holding 7+ visual modules.',
      tech: ['Plotly', 'Dash'],
    },
    {
      id: 'stream',
      label: 'Streamgraphs',
      kind: 'serve',
      col: 4,
      row: 0,
      detail: 'Dynamic streamgraphs.',
    },
    {
      id: 'map',
      label: 'Choropleths',
      kind: 'serve',
      col: 4,
      row: 1,
      detail: 'Choropleth maps.',
    },
    {
      id: 'filter',
      label: 'Cross-filtering',
      kind: 'serve',
      col: 4,
      row: 2,
      detail: 'Multi-filter cross-talk between modules.',
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

export const mindsMirror: Pipeline = {
  caption: '90% accuracy · 200 EEG samples',
  stages: [
    {
      id: 'stim',
      label: 'PsychoPy stimuli',
      kind: 'source',
      col: 0,
      row: 0,
      detail: 'Controlled visual stimulation built with PsychoPy paradigms.',
      tech: ['PsychoPy'],
    },
    {
      id: 'eeg',
      label: 'EEG capture',
      kind: 'store',
      col: 1,
      row: 0,
      detail: 'A curated 200-sample EEG dataset.',
      tech: ['EEG'],
    },
    {
      id: 'features',
      label: 'Spectral features',
      kind: 'process',
      col: 2,
      row: 0,
      detail: 'Spectral and temporal features via FFT, STFT, autocorrelation and Welch PSD.',
      tech: ['Welch PSD'],
    },
    {
      id: 'smote',
      label: 'SMOTE',
      kind: 'process',
      col: 3,
      row: 0,
      detail: 'SMOTE to balance the classes.',
      tech: ['SMOTE'],
    },
    {
      id: 'cnn',
      label: '1D CNN',
      kind: 'model',
      col: 4,
      row: 0,
      detail: '1D CNN classifier.',
      tech: ['1D CNN'],
    },
    {
      id: 'label',
      label: 'Numeric / not',
      kind: 'serve',
      col: 5,
      row: 0,
      detail: 'Real-time numeric vs. non-numeric classification at 90% accuracy.',
    },
  ],
  edges: [
    { from: 'stim', to: 'eeg' },
    { from: 'eeg', to: 'features' },
    { from: 'features', to: 'smote' },
    { from: 'smote', to: 'cnn' },
    { from: 'cnn', to: 'label' },
  ],
}
