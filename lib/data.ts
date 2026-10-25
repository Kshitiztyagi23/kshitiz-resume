import {
  type Pipeline,
  feedbackLoop,
  meetingKnowledge,
  yoloBiasFix,
  faceLiveness,
  serialOcr,
  marketingAgents,
  spatialLearning,
  spikeverse,
  wordForThought,
  cineScope,
  mindsMirror,
} from './pipelines'

export type { Pipeline } from './pipelines'

export interface EducationItem {
  year: string
  degree: string
  institute: string
  score: string
  type: string
}

export interface AchievementItem {
  title: string
  description: string
  badge: string
  category: 'Award' | 'Research' | 'Scholarship'
  link?: string
}

export interface WorkExperienceItem {
  role: string
  company: string
  location?: string
  period: string
  type: string
  objective: string
  highlights: {
    title: string
    description: string
    metrics?: string
    tags?: string[]
    pipeline?: Pipeline
  }[]
  resultsSummary: string[]
  stack: string[]
}

export interface PublicationItem {
  title: string
  authors: string
  role: 'First Author' | 'Co-Author'
  venue: string
  year: string
  location?: string
  status: 'Presented & Published' | 'Ongoing Submission'
  highlight: string
  abstract: string
  findings: string[]
  tags: string[]
  links?: {
    pdf?: string
    code?: string
    talk?: string
  }
}

export interface ProjectItem {
  name: string
  tagline: string
  category: 'SDE & Full-Stack' | 'Machine Learning & AI' | 'Data Analytics & BI' | 'Biosignals & Robotics'
  context: string
  period: string
  bullets: string[]
  metrics?: string
  tags: string[]
  github?: string
  demo?: string
  featured?: boolean
  pipeline?: Pipeline
}

export interface LeadershipItem {
  role: string
  org: string
  period: string
  initiatives: string[]
  operations?: string[]
  tags: string[]
}

export interface CourseItem {
  name: string
  category: 'CS & AI' | 'Mathematics' | 'Bioengineering'
  tag?: 'Excellent Grade' | 'Online Specialized' | 'Core'
}

export const resumeData = {
  personal: {
    name: 'Kshitiz Tyagi',
    title: 'AI/ML Systems, Data Science & Software Engineering',
    department: 'Department of Biological Sciences and Bioengineering',
    institution: 'Indian Institute of Technology, Kanpur',
    degree: 'B.Tech (2023 – 2027)',
    cpi: '8.8 / 10.0',
    phone: '+91-8077616048',
    email: 'ktyagi23@iitk.ac.in',
    linkedin: 'kshitiz-tyagi',
    github: 'Kshitiztyagi23',
    linkedinUrl: 'https://linkedin.com/in/kshitiz-tyagi',
    githubUrl: 'https://github.com/Kshitiztyagi23',
    status: 'Available for SDE, Data Science & Analytics Roles',
    location: 'IIT Kanpur, India',
    bio: 'Academic Excellence Award recipient and fourth-year undergraduate at IIT Kanpur with hands-on internship experience engineering production AI systems, data pipelines, and analytics infrastructure at Battery Smart and Skaeo. Actively building robust software systems, deep learning models, and visual analytics platforms; published first-author researcher at CogSci 2026.',
  },

  metrics: [
    { 
      label: 'Academic Foundation', 
      value: '8.8 / 10.0', 
      subtext: 'Top 10% Batch @ IIT Kanpur', 
      highlight: true 
    },
    { 
      label: 'Autonomous AI Systems', 
      value: 'Self-Correcting Loops', 
      subtext: 'MCP Architecture & Atomic DB Claims', 
      highlight: true 
    },
    { 
      label: 'Applied Machine Learning', 
      value: 'Computer Vision', 
      subtext: 'Real-Time Biometrics, OCR & Model QA', 
      highlight: false 
    },
    { 
      label: 'Full-Stack & Analytics', 
      value: 'Cloud Platforms', 
      subtext: 'Databricks Schemas, React & FastAPI', 
      highlight: false 
    },
  ],

  education: [
    {
      year: '2023 – 2027',
      degree: 'B.Tech in Biological Sciences and Bioengineering',
      institute: 'Indian Institute of Technology, Kanpur',
      score: '8.8 / 10.0',
      type: 'Undergraduate Degree',
    },
    {
      year: '2022',
      degree: 'CBSE (Class XII)',
      institute: 'Dewan Public School, Hapur',
      score: '95.4%',
      type: 'Senior Secondary',
    },
    {
      year: '2020',
      degree: 'ICSE (Class X)',
      institute: 'S.D.A Senior Secondary School, Hapur',
      score: '89.0%',
      type: 'Secondary School',
    },
  ] as EducationItem[],

  scholasticAchievements: [
    {
      title: 'Academic Excellence Award (2024–2025)',
      description: 'Awarded for outstanding academic performance, ranking in the top 10% of the entire batch at IIT Kanpur.',
      badge: 'Top 10% Batch',
      category: 'Award',
    },
    {
      title: 'First-Author Paper at CogSci 2026 (Rio de Janeiro)',
      description: 'Delivered a peer-reviewed Flash Talk and poster at the 48th Annual Meeting of the Cognitive Science Society, formulating the Efficiency Hierarchy Model for perceptual grouping.',
      badge: 'CogSci 2026',
      category: 'Research',
    },
    {
      title: 'Reliance Foundation Scholar (2023)',
      description: 'Selected from a competitive nationwide pool of over 58,000 applicants based on academic excellence, leadership, and potential.',
      badge: '1 of 58,000',
      category: 'Scholarship',
    },
    {
      title: 'Co-Author on Metacognitive Computational Thinking Study',
      description: 'Empirical research across 103 participants investigating developmental trajectories and educator blind spots in algorithmic reasoning.',
      badge: 'Preprint ’26',
      category: 'Research',
    },
  ] as AchievementItem[],

  experience: [
    {
      role: 'Data Science & Systems Intern',
      company: 'Battery Smart',
      location: 'Gurugram, India',
      period: 'May 2026 – Jul 2026',
      type: 'Full-time Internship',
      objective:
        'Shipped production AI infrastructure for Battery Smart’s Databricks-scale analytics assistant: a self-correcting feedback loop, a meeting-knowledge extraction pipeline, and a bias fix for a computer vision model in verification flow.',
      highlights: [
        {
          title: 'Self-Correcting Feedback Loop (MCP & DB Isolation)',
          description:
            'Built a self-correcting feedback loop on top of the AI assistant’s MCP server: flagged errors get logged to Postgres, posted as a Slack review card for approval, then committed to GitHub via the REST API and batched into a PR (Pull Request). Prevented replicas from racing on the same correction with one atomic database claim SQL statement.',
          metrics: '3–5s latency · 0 duplicate commits',
          tags: ['MCP', 'PostgreSQL', 'Concurrency Control', 'Slack API', 'GitHub REST API'],
          pipeline: feedbackLoop,
        },
        {
          title: '6-Stage Meeting Knowledge Extraction Pipeline',
          description:
            'Meeting transcripts (ingested via API or Slack) go through a 6-stage pipeline: PII redaction first, then a headless LLM (Kiro CLI) extracts structured knowledge points, stored as vector embeddings within a 1GiB memory budget. At query time, the assistant matches the user’s question against these embeddings to pull in relevant context.',
          metrics: '1,613 meetings · $0 inference cost · <1GiB RAM',
          tags: ['NLP', 'MiniLM', 'Knowledge Embeddings', 'PII Redaction', 'Data Pipeline'],
          pipeline: meetingKnowledge,
        },
        {
          title: 'Databricks Schema Architecture & RCA Playbook',
          description:
            'Authored ~6,200 lines of Databricks documentation across 230+ tables in 7 business domains, and built a 12-page RCA playbook with tested SQL patterns; explored a hybrid retrieval system (BM25, MiniLM, RRF) and Graphify to map cross-domain dependencies.',
          metrics: '230+ tables · 7 business domains · 12-page SQL RCA',
          tags: ['Databricks', 'Advanced SQL', 'BM25', 'Graphify', 'Schema Design'],
        },
        {
          title: 'Computer Vision Model Bias Remediation (YOLO)',
          description:
            'Diagnosed a training data bias in a YOLO face-verification model that repeatedly blocked bearded drivers despite no actual occlusion. Relabeled data in CVAT and fine-tuned the model across 50 epochs.',
          metrics: '508 false blocks eliminated · 3.3x defect catch · 0.84 ➔ 0.96 conf',
          tags: ['YOLO', 'CVAT', 'Computer Vision', 'Fine-Tuning', 'Model Evaluation'],
          pipeline: yoloBiasFix,
        },
      ],
      resultsSummary: [
        'Corrections now go from flagged to committed in 3–5 seconds with zero duplicate commits across autoscaled pods.',
        'The retrained vision model passed a 94,924-image production evaluation before deployment, catching 3.3x more genuine defects with raised confidence scores from 0.84 to 0.96.',
        'The assistant went from no coverage to verified, accurate answers across 7 business domains, modeled to run at a marginal cost of $0 against a 1,613-conversation backlog.',
        'Manual fixes now ship themselves: corrections go live in 3–5 seconds, and institutional spoken meeting knowledge that used to vanish after each session is captured and served back automatically.',
      ],
      stack: ['Python', 'PostgreSQL', 'Databricks', 'SQL', 'Docker', 'YOLO', 'MiniLM', 'BM25', 'Graphify', 'Slack API', 'GitHub REST API'],
    },
    {
      role: 'Machine Learning & AI Systems Engineering Intern',
      company: 'Skaeo',
      location: 'Remote',
      period: 'May 2025 – Jul 2025',
      type: 'Full-time Internship',
      objective:
        'Engineered ML systems for real-time security, computer vision, and workflow automation in production environments.',
      highlights: [
        {
          title: 'Real-Time Face Liveness Detection System',
          description:
            'Integrated a traditional face liveness detection system using dlib (HOG face detector + 68-point facial landmarks) in the "My RollCall Pro" mobile app to prevent spoofing. Evaluated multiple approaches and optimized multi-cue tracking for Eye Aspect Ratio (EAR blink), Mouth Aspect Ratio (MAR smile), and pupil dynamics.',
          metrics: '5s inference time post-API integration',
          tags: ['dlib', 'Computer Vision', 'Facial Landmarks', 'Biometrics', 'FastAPI'],
          pipeline: faceLiveness,
        },
        {
          title: 'High-Speed Serial Number OCR Pipeline',
          description:
            'Benchmarked OCR engines across latency-accuracy trade-offs; customized RapidOCR with ONNX Runtime, developing complete image preprocessing and extraction logic for high-speed serial number recognition.',
          metrics: '2s inference latency in production',
          tags: ['RapidOCR', 'ONNX Runtime', 'Python', 'Image Processing', 'Performance'],
          pipeline: serialOcr,
        },
        {
          title: 'Multi-Agent Marketing Automation Engine',
          description:
            'Built an automated system using LangChain and Phidata streamlining SWOT analysis, dynamic content ideation, generation, and post scheduling; built a Telegram bot analyzing URLs for automated contextual interaction.',
          metrics: '+29.8% marketing efficiency · -40% manual effort',
          tags: ['LangChain', 'Phidata', 'LLMs', 'Workflow Automation', 'Telegram API'],
          pipeline: marketingAgents,
        },
      ],
      resultsSummary: [
        'Achieved sub-5s face liveness and sub-2s OCR latency in live production environments.',
        'Boosted marketing efficiency by 29.8% and reduced operational manual effort by 40%.',
      ],
      stack: ['Python', 'FastAPI', 'dlib', 'OpenCV', 'RapidOCR', 'ONNX Runtime', 'LangChain', 'Phidata'],
    },
  ] as WorkExperienceItem[],

  projects: [
    {
      name: 'Adaptive Spatial Learning Platform',
      tagline: 'Interactive 3D spatial reasoning engine with real-time contextual guidance & constraint verification.',
      category: 'SDE & Full-Stack',
      context: 'Research Platform | Prof. Anveshna Srivastava, IIT Kanpur',
      period: 'Ongoing (2025 – Present)',
      bullets: [
        'Architected a full-stack platform using React, FastAPI, and PostgreSQL for session orchestration and complex interaction telemetry.',
        'Engineered a real-time feedback engine evaluating user spatial reasoning steps to deliver dynamic scaffolding.',
        'Prototyped interactive 3D LEGO-based task modules with automated constraint validation and scoring.',
        'Designed scalable AWS deployment architecture with event logging pipelines, production workflows, and normalized data models.',
      ],
      metrics: 'Real-time 3D task validation · AWS cloud architecture',
      tags: ['React', 'FastAPI', 'PostgreSQL', 'AWS', '3D Graphics', 'Full-Stack SWE'],
      pipeline: spatialLearning,
      featured: true,
    },
    {
      name: 'Spikeverse',
      tagline: 'Neuromorphic SNN conversion of Double DQN Atari agent cutting inference energy by 40%+.',
      category: 'Machine Learning & AI',
      context: 'Brain & Cognitive Science Club, IIT Kanpur — Project Mentor',
      period: 'May 2025 – Jul 2025',
      bullets: [
        'Engineered a Double DQN agent with prioritized experience replay mastering Atari Breakout (peak score 290 in 2,000 episodes).',
        'Spearheaded conversion to biologically realistic Spiking Neural Networks using Leaky Integrate-and-Fire (LIF) neurons and surrogate gradients.',
        'Projected to reduce inference power consumption by over 40% while preserving deep Q-learning benchmark performance.',
      ],
      metrics: '40%+ Energy Reduction · 2,000 Training Episodes',
      tags: ['PyTorch', 'Double DQN', 'SNN', 'LIF Neurons', 'Neuromorphic', 'Reinforcement Learning'],
      pipeline: spikeverse,
      featured: true,
    },
    {
      name: 'Word For Thought',
      tagline: 'Speech emotion recognition system utilizing acoustic spectrograms and 2D CNN signal processing.',
      category: 'Machine Learning & AI',
      context: 'Brain & Cognitive Science Club, IIT Kanpur — Project Mentor',
      period: 'Dec 2024 – Jan 2025',
      bullets: [
        'Led a 20+ member team building an end-to-end audio speech pipeline converting raw waveforms into time-frequency spectrograms via FFT.',
        'Trained and fine-tuned a 2D Convolutional Neural Network on extracted spectral acoustic patterns.',
        'Achieved 97% emotion classification accuracy with robust low-latency inference on unseen test signals.',
      ],
      metrics: '97% Emotion Accuracy · 20+ Member Team Lead',
      tags: ['Python', '2D CNN', 'FFT Spectrograms', 'Librosa', 'Signal Processing', 'Audio ML'],
      pipeline: wordForThought,
      featured: true,
    },
    {
      name: 'The Minds Mirror',
      tagline: 'Visual stimulus EEG signal classification using 1D CNNs with SMOTE data balancing.',
      category: 'Biosignals & Robotics',
      context: 'Brain & Cognitive Science Club, IIT Kanpur',
      period: 'May 2024 – Jul 2024',
      bullets: [
        'Curated a 200-sample EEG dataset using PsychoPy experimental paradigms under controlled visual stimulation.',
        'Extracted spectral and temporal features using FFT, STFT, Autocorrelation, and Welch power spectral density methods.',
        'Trained a 1D CNN with SMOTE data balancing, achieving 90% accuracy on real-time numeric vs. non-numeric classification.',
      ],
      metrics: '90% Classification Accuracy · 200 EEG Samples',
      tags: ['EEG', 'PsychoPy', '1D CNN', 'SMOTE', 'Welch PSD', 'Biosignals'],
      pipeline: mindsMirror,
      featured: false,
    },
    {
      name: 'CineScope',
      tagline: 'Multi-dimensional visual analytics platform for 900K+ global movies with PCA/t-SNE clustering.',
      category: 'Data Analytics & BI',
      context: 'CS 661 Big Data Visual Analytics | Prof. Soumya Dutta',
      period: 'May 2025 – Jul 2025',
      bullets: [
        'Developed an interactive dashboard using Plotly & Dash to visually analyze 900,000+ movies across runtime, genre, and financials.',
        'Preprocessed textual and categorical metadata, applying PCA and t-SNE for multidimensional clustering and trend analysis.',
        'Engineered 7+ interactive visual modules featuring dynamic streamgraphs, choropleth maps, and multi-filter cross-talk.',
      ],
      metrics: '900K+ Movies · 7+ Dynamic Visualizations · t-SNE Clustering',
      tags: ['Python', 'Plotly', 'Dash', 'PCA / t-SNE', 'Big Data', 'Visual Analytics'],
      pipeline: cineScope,
      featured: true,
    },
    {
      name: 'Gan Forge',
      tagline: 'Generative adversarial synthesis with DCGAN (60K+ face images) and CycleGAN artistic style transfer.',
      category: 'Machine Learning & AI',
      context: 'Association of Computer Activities, IIT Kanpur — Project Mentor',
      period: 'May 2025 – Present',
      bullets: [
        'Trained a Deep Convolutional GAN (DCGAN) on 60,000+ curated face images for high-fidelity generative synthesis.',
        'Implemented CycleGAN for unpaired bidirectional style transfer between 800+ Van Gogh paintings and natural scenery.',
        'Trained multi-class neural classifiers reaching 96% benchmark accuracy.',
      ],
      metrics: '60K+ Images · 800+ Art Transfers · 96% Accuracy',
      tags: ['PyTorch', 'DCGAN', 'CycleGAN', 'Style Transfer', 'Computer Vision'],
      featured: false,
    },
    {
      name: 'Sumo Bot',
      tagline: 'Combat robotics system with Bluetooth smartphone control and high-torque collision dynamics.',
      category: 'Biosignals & Robotics',
      context: 'Robotics Club, IIT Kanpur — Robothon Runners-Up',
      period: 'Apr 2024',
      bullets: [
        'Led a 5-member engineering team to design, prototype, and fabricate a durable smartphone-controlled combat robot.',
        'Optimized traction control algorithms, weight distribution, and collision mechanics for high-stakes dynamic arena combat.',
        'Secured 2nd place (Runners-up) in the annual Robothon tournament at IIT Kanpur.',
      ],
      metrics: '2nd Place (Runners-Up) · Team of 5 Lead',
      tags: ['Robotics', 'Embedded C', 'Hardware Prototyping', 'Bluetooth Telemetry'],
      featured: false,
    },
    {
      name: 'Biobytes',
      tagline: 'DNA sequence classification with k-mer frequency modeling and Laplace smoothing.',
      category: 'Data Analytics & BI',
      context: 'BioSoc, IIT Kanpur',
      period: 'May 2024 – Jun 2024',
      bullets: [
        'Engineered statistical DNA sequence classifiers leveraging k-mer decomposition and CountVectorizer.',
        'Implemented Laplace smoothing and feature selection to mitigate zero-frequency penalties and sparsity.',
        'Benchmarked Naive Bayes and Random Forest architectures for robust biological classification.',
      ],
      metrics: 'k-mer Statistical Modeling · Sparsity Handling',
      tags: ['Bioinformatics', 'Scikit-Learn', 'k-mer', 'Random Forest', 'Python'],
      featured: false,
    },
    {
      name: 'Mood Monitor',
      tagline: 'NLP-driven stress detection from unstructured textual streams using regularized classifiers.',
      category: 'Data Analytics & BI',
      context: 'Brain & Cognitive Science Club, IIT Kanpur',
      period: 'Dec 2023 – Jan 2024',
      bullets: [
        'Built a text classification pipeline to detect psycholinguistic stress indicators using TF-IDF and Logistic Regression.',
        'Conducted tokenization, stop-word pruning, and sentiment polarities with confusion matrix validation.',
      ],
      metrics: 'NLP Sentiment Classification',
      tags: ['NLP', 'TF-IDF', 'Logistic Regression', 'Scikit-Learn', 'Python'],
      featured: false,
    },
  ] as ProjectItem[],

  publications: [
    {
      title: 'When Motion Wins: Cognitive Efficiency in Perceptual Grouping',
      authors: 'Kshitiz Tyagi (First Author), Prof. Anveshna Srivastava',
      role: 'First Author',
      venue: '48th Annual Meeting of the Cognitive Science Society (CogSci 2026)',
      year: '2026',
      location: 'Rio de Janeiro, Brazil',
      status: 'Presented & Published',
      highlight: 'Formulated the Efficiency Hierarchy Model for perceptual grouping competition & reaction time overhead.',
      abstract:
        'Designed a psychophysics experiment (N = 46, 230 trials) quantifying pairwise cue competition between motion (Common Fate) and 5 classical Gestalt principles. Evaluated choice distributions and right-skewed RT latencies using Exact Binomial Tests, Mann-Whitney U, and Kruskal-Wallis non-parametric tests. Discovered a dissociation between perceptual dominance and efficiency, identifying a 2.7x RT resolution overhead in Good Continuity despite low selection frequency.',
      findings: [
        'Quantified graded dominance: Motion won 91.3% vs. Prägnanz and 65.2% vs. Similarity.',
        'Formulated the Efficiency Hierarchy Model: Perceptual grouping as a cost-sensitive competitive system.',
        'Identified a 2.7x RT resolution overhead in Good Continuity despite low selection frequency.',
        'Delivered peer-reviewed Flash Talk & Poster presentation at CogSci 2026.',
      ],
      tags: ['Statistical Modeling', 'Psychophysics', 'Efficiency Hierarchy', 'Non-Parametric Stats', 'Python'],
    },
    {
      title: 'Plural Pathways to Computational Thinking',
      authors: 'Prof. Anveshna Srivastava, Kshitiz Tyagi (Co-Author)',
      role: 'Co-Author',
      venue: 'Journal / Conference Submission (Under Review)',
      year: '2026',
      location: 'IIT Kanpur',
      status: 'Ongoing Submission',
      highlight: 'Empirical study across 103 participants uncovering educator expert blind spots in algorithmic reasoning.',
      abstract:
        'Co-authored an empirical study investigating computational thinking (CT) across 103 participants (middle school, high school, and educators), pairing a 28-item standardized CT test with hands-on unplugged algorithmic tasks. Conducted parametric and non-parametric statistical analyses (paired t-tests, Spearman correlations, Cohen’s d). Demonstrated decoupled correlations (r = 0.32–0.39) among test scores, algorithmic output, and metacognitive awareness.',
      findings: [
        'Quantified substantial developmental gap between middle-school students and teachers (d = 0.99, p = 0.009).',
        'Demonstrated CT operates as a multidimensional construct rather than a single skill.',
        'Identified educator expert blind spots: high algorithm efficiency with low metacognitive articulation.',
        'Formulated empirical recommendations for metacognitive scaffolding in computing education.',
      ],
      tags: ['Computational Thinking', 'Metacognition', 'Statistical Analysis', 'Empirical Study'],
    },
  ] as PublicationItem[],

  skills: {
    'Software Engineering & Cloud': [
      'Python',
      'C / C++',
      'Java',
      'SQL',
      'TypeScript / JavaScript',
      'Data Structures & Algorithms (DSA)',
      'Object-Oriented Programming (OOP)',
      'System Design',
      'FastAPI',
      'React',
      'Next.js',
      'Node.js',
      'REST APIs',
      'PostgreSQL',
      'Redis (Caching)',
      'Docker',
      'Kubernetes',
      'AWS (EC2, S3)',
      'CI/CD (GitHub Actions)',
      'Git / GitHub',
      'Concurrency Control',
      'Linux / Bash',
    ],
    'Applied Machine Learning & Deep Learning': [
      'PyTorch',
      'TensorFlow',
      'Scikit-learn',
      'Large Language Models (LLMs)',
      'Vector Databases (Chroma / FAISS)',
      'Agentic AI Workflows',
      'LangChain',
      'Phidata',
      'Hugging Face',
      'Fine-Tuning & Model Evaluation',
      'YOLO (Ultralytics)',
      'Computer Vision',
      'OpenCV',
      'dlib (68 Landmarks)',
      'RapidOCR',
      'ONNX Runtime',
      'Double DQN (RL)',
      'Spiking Neural Networks (SNN)',
      'DCGAN & CycleGAN',
      'CVAT (Data Annotation)',
    ],
    'Data Analytics, BI & Big Data': [
      'Databricks',
      'Advanced SQL (CTEs, Window Functions)',
      'ETL / ELT Pipelines',
      'Data Modeling & Schemas',
      'Plotly & Dash',
      'Exploratory Data Analysis (EDA)',
      'Feature Engineering',
      'pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'Principal Component Analysis (PCA)',
      't-SNE Clustering',
      'BM25 & Semantic Search',
      'Reciprocal Rank Fusion (RRF)',
      'Graphify (Knowledge Graphs)',
      'Root-Cause Analysis (RCA)',
    ],
    'Signal Processing & Statistical Methods': [
      'A/B Testing & Experimentation',
      'Statistical Hypothesis Testing',
      'Non-Parametric Stats (Mann-Whitney U, Kruskal-Wallis)',
      'Exact Binomial Tests',
      'Regression & Classification',
      'Cohen’s d Effect Sizes',
      'Cross-Validation & Hyperparameter Tuning',
      'SMOTE Data Balancing',
      'Librosa (Audio ML & FFT)',
      'EEG Biosignal Processing',
      'PsychoPy',
    ],
  },

  leadership: [
    {
      role: 'Coordinator',
      org: 'BioSoc, IIT Kanpur',
      period: 'Jun 2025 – Mar 2026',
      initiatives: [
        'Spearheaded departmental Research Mentorship Conclaves, orchestrating faculty–student interaction drives that facilitated 85+ undergraduate lab attachments.',
        'Organized hands-on computational biology workshops and scientific lecture series with eminent researchers.',
        'Directed a 35+ member multidisciplinary team across technical, events, and marketing verticals, overseeing budget allocations and institutional governance.',
        'Boosted departmental student engagement by 60% and instituted structured peer-mentorship networks.',
      ],
      tags: ['Team Lead (35+)', '85+ Lab Attachments', 'Event Governance', '+60% Engagement'],
    },
    {
      role: 'Secretary – Research Wing',
      org: 'Academics and Career Council (AnC), IIT Kanpur',
      period: 'Jun 2024 – Mar 2025',
      initiatives: [
        'Led sessions on IRS, NSRC, and international research internships, including lab tours to C3i Hub security facilities.',
        'Maintained online Research Wing portals and compiled the annual Research Gazette highlighting faculty and student achievements.',
        'Organized senior-led mentorship drives to guide junior students in securing premier academic attachments.',
      ],
      tags: ['Research Outreach', 'Annual Gazette', 'C3i Lab Tours'],
    },
    {
      role: 'Secretary',
      org: 'Brain & Cognitive Science Club, IIT Kanpur',
      period: 'Jun 2023 – Mar 2024',
      initiatives: [
        'Selected from 300+ applicants for the premier 2-tier STEM club; conducted live coding sessions on Game Theory & ML for 100+ students.',
        'Mentored 40+ students across guided research projects under the club’s annual flagship initiatives.',
        'Organized AI/ML workshops and collaborated with Spheron & Innopelux (NVIDIA Inception) to deliver community GPU workshops.',
      ],
      tags: ['100+ Students Taught', '40+ Project Mentees', 'NVIDIA Inception Collab'],
    },
  ] as LeadershipItem[],

  courses: [
    { name: 'Big Data Visual Analytics', category: 'CS & AI', tag: 'Core' },
    { name: 'Introduction to Machine Learning', category: 'CS & AI', tag: 'Core' },
    { name: 'Data Structure and Algorithm', category: 'CS & AI', tag: 'Core' },
    { name: 'Fundamentals of Computing - I & II', category: 'CS & AI', tag: 'Excellent Grade' },
    { name: 'Applied Probability and Statistics', category: 'Mathematics', tag: 'Core' },
    { name: 'Neural Networks and Deep Learning', category: 'CS & AI', tag: 'Online Specialized' },
    { name: 'Convolutional Neural Networks', category: 'CS & AI', tag: 'Online Specialized' },
    { name: 'Supervised Machine Learning', category: 'CS & AI', tag: 'Online Specialized' },
    { name: 'Bioinformatic & Computational Biology', category: 'Bioengineering', tag: 'Excellent Grade' },
    { name: 'Biochemistry', category: 'Bioengineering', tag: 'Excellent Grade' },
    { name: 'Organ System Physiology and Anatomy', category: 'Bioengineering', tag: 'Excellent Grade' },
    { name: 'Biochemical Engineering', category: 'Bioengineering', tag: 'Excellent Grade' },
  ] as CourseItem[],

  extracurricular: [
    {
      icon: '🥇',
      title: 'Gold Medalist – Cultural Festival',
      description: 'Won the Gold Medal in group dance during Galaxy ’25 (Inter-Hall Cultural Championship) at IIT Kanpur.',
    },
    {
      icon: '🩸',
      title: 'Active Blood Donation Volunteer',
      description: 'Regular volunteer in annual blood donation drives organized by Raktarpan, IIT Kanpur (2024 & 2025).',
    },
    {
      icon: '⚙️',
      title: 'Takneek ’24 Competitor',
      description: 'Competed in Takneek ’24, the intra-IITK Science and Technology Championship in robotics & design.',
    },
  ],
}
