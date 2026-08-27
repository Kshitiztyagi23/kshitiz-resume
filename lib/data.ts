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
  category: 'AI & ML Systems' | 'Cognitive & EEG' | 'Computer Vision' | 'Data Analytics' | 'Robotics'
  context: string
  period: string
  bullets: string[]
  metrics?: string
  tags: string[]
  github?: string
  demo?: string
  featured?: boolean
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
    title: 'AI/ML Systems Engineer & Cognitive Science Researcher',
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
    status: 'Available for AI / ML & Research Roles',
    location: 'IIT Kanpur, India',
    bio: 'Fourth-year undergraduate at IIT Kanpur engineering production-grade AI systems, self-healing RAG architectures, and neuro-computational models. First-author researcher at CogSci 2026 with experience shipping full-stack ML at Battery Smart and Skaeo.',
  },

  metrics: [
    { label: 'Academic CPI', value: '8.8 / 10.0', subtext: 'Top 10% @ IIT Kanpur', highlight: true },
    { label: 'Research Publication', value: 'CogSci ’26', subtext: 'First Author (Flash Talk & Poster)', highlight: true },
    { label: 'Production Models', value: '95K+ Evs', subtext: 'YOLO Bias Fix (3.3x Boost)', highlight: false },
    { label: 'Reliance Scholar', value: '1 of 58K', subtext: 'Nationwide Merit Selection', highlight: false },
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
      role: 'Data Science Intern',
      company: 'Battery Smart',
      location: 'Gurugram / Remote',
      period: 'May 2026 – Jul 2026',
      type: 'Full-time Internship',
      objective:
        'Shipped production AI infrastructure for Databricks-scale analytics: an automated self-correcting RAG feedback loop, meeting knowledge extraction pipeline, and CV bias fix.',
      highlights: [
        {
          title: 'Autonomous Self-Improving RAG Pipeline',
          description:
            'Engineered an event-driven continuous learning loop via an MCP (Model Context Protocol) architecture connecting PostgreSQL to Slack and GitHub REST API. Auto-committed human-in-the-loop expert corrections into retrieval knowledge base in 3–5 seconds with atomic SQL claims preventing multi-pod race conditions.',
          metrics: '3–5s latency · 0 duplicate commits',
          tags: ['MCP', 'PostgreSQL', 'Slack API', 'GitHub REST API', 'RAG'],
        },
        {
          title: 'Conversational Knowledge Extraction & Graph',
          description:
            'Architected a 6-stage NLP pipeline extracting structured Subject-Predicate-Object temporal triplets from meeting transcripts using a headless LLM (Kiro CLI). Processed a 1,613-conversation backlog at $0 inference cost with local regex PII de-identification and a MiniLM semantic sensitivity filter (≥ 0.6 cosine threshold) within a 1GiB memory budget.',
          metrics: '1,613 meetings · $0 inference cost · <1GiB RAM',
          tags: ['NLP', 'MiniLM', 'Knowledge Graph', 'PII Redaction'],
        },
        {
          title: 'Hybrid Semantic Retrieval & Topological Routing',
          description:
            'Developed a hybrid retrieval router fusing Dense Semantic Embeddings (MiniLM), Sparse BM25, and Reciprocal Rank Fusion (RRF). Generated a 1,248-node / 92-community knowledge graph via Graphify (Leiden clustering) to map cross-domain table dependencies across 230+ Databricks tables.',
          metrics: '1,248-node graph · 92 communities · 230+ tables',
          tags: ['BM25', 'RRF', 'Graphify', 'Databricks', 'Vector Search'],
        },
        {
          title: 'Computer Vision Model Bias Remediation',
          description:
            'Diagnosed severe representation bias in a production YOLO face-verification classifier misidentifying facial hair as occlusions. Relabeled datasets in CVAT, fine-tuned YOLO across 50 epochs, and evaluated over ~95,000 production images.',
          metrics: '508 false blocks eliminated · 3.3x defect catch · 0.84 ➔ 0.96 conf',
          tags: ['YOLO', 'CVAT', 'Computer Vision', 'Fine-Tuning'],
        },
      ],
      resultsSummary: [
        'Corrections go from flagged to committed in 3–5s with zero duplicate commits across autoscaled pods.',
        'Retrained vision model caught 3.3x more genuine defects on 94,924 live images, boosting confidence from 0.84 to 0.96.',
        'Authored ~6,200 lines of Databricks schema docs and 12-page RCA SQL playbook, eliminating LLM hallucinations across 7 verticals.',
      ],
      stack: ['Python', 'Databricks', 'PostgreSQL', 'YOLO', 'MiniLM', 'BM25', 'Graphify', 'Docker', 'Slack API'],
    },
    {
      role: 'Machine Learning & AI Systems Engineering Intern',
      company: 'Skaeo',
      location: 'Remote',
      period: 'May 2025 – Jul 2025',
      type: 'Full-time Internship',
      objective:
        'Engineered high-throughput ML systems for real-time biometric security, computer vision OCR, and autonomous multi-agent workflow automation.',
      highlights: [
        {
          title: 'Real-Time Face Liveness Detection System',
          description:
            'Integrated a traditional face liveness detection system using dlib HOG detector and 68-point facial landmarks into "My RollCall Pro". Analyzed Eye Aspect Ratio (EAR), Mouth Aspect Ratio (MAR), and pupil movement dynamics to prevent spoofing.',
          metrics: '5s inference post-API · Robust anti-spoofing',
          tags: ['dlib', 'Computer Vision', 'Facial Landmarks', 'Biometrics'],
        },
        {
          title: 'Optimized Serial Number OCR Pipeline',
          description:
            'Systematically benchmarked OCR engines before customizing RapidOCR with ONNX Runtime. Engineered complete image preprocessing and extraction logic for high-speed serial number recognition.',
          metrics: '2s inference latency in production',
          tags: ['RapidOCR', 'ONNX Runtime', 'Python', 'Image Processing'],
        },
        {
          title: 'Autonomous Multi-Agent Marketing Engine',
          description:
            'Built an automated system using LangChain and Phidata streamlining SWOT analysis, dynamic content ideation, generation, and scheduled publishing; engineered an automated Telegram bot for contextual interaction.',
          metrics: '+29.8% marketing efficiency · -40% manual effort',
          tags: ['LangChain', 'Phidata', 'LLMs', 'Telegram Bot API'],
        },
      ],
      resultsSummary: [
        'Achieved sub-5s face liveness and sub-2s OCR latency in live production environments.',
        'Boosted marketing efficiency by 29.8% and reduced operational manual effort by 40%.',
      ],
      stack: ['Python', 'dlib', 'ONNX Runtime', 'RapidOCR', 'LangChain', 'Phidata', 'OpenCV'],
    },
  ] as WorkExperienceItem[],

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
      tags: ['Cognitive Science', 'Psychophysics', 'Efficiency Hierarchy', 'Non-Parametric Stats', 'Python'],
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

  projects: [
    {
      name: 'Adaptive Spatial Learning Platform',
      tagline: 'Interactive 3D spatial reasoning engine with real-time contextual guidance & LEGO modules.',
      category: 'AI & ML Systems',
      context: 'Research Project | Prof. Anveshna Srivastava, IIT Kanpur',
      period: 'Ongoing (2025 – Present)',
      bullets: [
        'Architected a full-stack platform using React, FastAPI, and PostgreSQL for session orchestration and complex interaction telemetry.',
        'Engineered a real-time feedback engine evaluating user spatial reasoning steps to deliver dynamic scaffolding.',
        'Prototyped interactive 3D LEGO-based task modules with automated constraint validation and scoring.',
        'Designed scalable AWS deployment architecture with event logging pipelines and normalized data models.',
      ],
      metrics: 'Real-time 3D task validation · AWS cloud architecture',
      tags: ['React', 'FastAPI', 'PostgreSQL', 'AWS', '3D Graphics', 'EdTech AI'],
      featured: true,
    },
    {
      name: 'CineScope',
      tagline: 'Multi-dimensional visual analytics platform for 900K+ global movies with PCA/t-SNE clustering.',
      category: 'Data Analytics',
      context: 'CS 661 Big Data Visual Analytics | Prof. Soumya Dutta',
      period: 'May 2025 – Jul 2025',
      bullets: [
        'Developed an interactive dashboard using Plotly & Dash to visually analyze 900,000+ movies across runtime, genre, and financials.',
        'Preprocessed textual and categorical metadata, applying PCA and t-SNE for multidimensional clustering and trend analysis.',
        'Engineered 7+ interactive visual modules featuring dynamic streamgraphs, choropleth maps, and multi-filter cross-talk.',
      ],
      metrics: '900K+ Movies · 7+ Dynamic Visualizations · t-SNE Clustering',
      tags: ['Python', 'Plotly', 'Dash', 'PCA / t-SNE', 'Big Data', 'Visual Analytics'],
      featured: true,
    },
    {
      name: 'Spikeverse',
      tagline: 'Neuromorphic SNN conversion of Double DQN Atari agent cutting inference energy by 40%+.',
      category: 'Cognitive & EEG',
      context: 'Brain & Cognitive Science Club, IIT Kanpur — Project Mentor',
      period: 'May 2025 – Jul 2025',
      bullets: [
        'Engineered a Double DQN agent with prioritized experience replay mastering Atari Breakout (peak score 290 in 2,000 episodes).',
        'Spearheaded conversion to biologically realistic Spiking Neural Networks using Leaky Integrate-and-Fire (LIF) neurons and surrogate gradients.',
        'Projected to reduce inference power consumption by over 40% while preserving deep Q-learning benchmark performance.',
      ],
      metrics: '40%+ Energy Reduction · 2,000 Training Episodes',
      tags: ['PyTorch', 'Double DQN', 'SNN', 'LIF Neurons', 'Neuromorphic', 'RL'],
      featured: true,
    },
    {
      name: 'Word For Thought',
      tagline: 'Speech emotion recognition system utilizing acoustic spectrograms and 2D CNNs.',
      category: 'AI & ML Systems',
      context: 'Brain & Cognitive Science Club, IIT Kanpur — Project Mentor',
      period: 'Dec 2024 – Jan 2025',
      bullets: [
        'Led a 20+ member team building an end-to-end audio speech pipeline converting raw waveforms into time-frequency spectrograms via FFT.',
        'Trained and fine-tuned a 2D Convolutional Neural Network on extracted spectral acoustic patterns.',
        'Achieved 97% emotion classification accuracy with robust low-latency inference on unseen test signals.',
      ],
      metrics: '97% Emotion Accuracy · 20+ Member Team Lead',
      tags: ['Python', '2D CNN', 'FFT Spectrograms', 'Librosa', 'Speech Processing'],
      featured: true,
    },
    {
      name: 'The Minds Mirror',
      tagline: 'Visual stimulus EEG signal classification using 1D CNNs with SMOTE augmentation.',
      category: 'Cognitive & EEG',
      context: 'Brain & Cognitive Science Club, IIT Kanpur',
      period: 'May 2024 – Jul 2024',
      bullets: [
        'Curated a 200-sample EEG dataset using PsychoPy experimental paradigms under controlled visual stimulation.',
        'Extracted spectral and temporal features using FFT, STFT, Autocorrelation, and Welch power spectral density methods.',
        'Trained a 1D CNN with SMOTE data balancing, achieving 90% accuracy on real-time numeric vs. non-numeric classification.',
      ],
      metrics: '90% Classification Accuracy · 200 EEG Samples',
      tags: ['EEG', 'PsychoPy', '1D CNN', 'SMOTE', 'Welch PSD', 'Neuroscience'],
      featured: false,
    },
    {
      name: 'Gan Forge',
      tagline: 'Generative adversarial synthesis with DCGAN (60K+ anime faces) and CycleGAN artistic transfer.',
      category: 'Computer Vision',
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
      category: 'Robotics',
      context: 'Robotics Club, IIT Kanpur — Robothon Runners-Up',
      period: 'Apr 2024',
      bullets: [
        'Led a 5-member engineering team to design, prototype, and fabricate a durable smartphone-controlled combat robot.',
        'Optimized traction control algorithms, weight distribution, and collision mechanics for high-stakes dynamic arena combat.',
        'Secured 2nd place (Runners-up) in the annual Robothon tournament at IIT Kanpur.',
      ],
      metrics: '2nd Place (Runners-Up) · Team of 5 Lead',
      tags: ['Robotics', 'Embedded C', 'Hardware Prototyping', 'Bluetooth Control'],
      featured: false,
    },
    {
      name: 'Biobytes',
      tagline: 'DNA sequence classification with k-mer frequency modeling and Laplace smoothing.',
      category: 'Data Analytics',
      context: 'BioSoc, IIT Kanpur',
      period: 'May 2024 – Jun 2024',
      bullets: [
        'Engineered statistical DNA sequence classifiers leveraging k-mer decomposition and CountVectorizer.',
        'Implemented Laplace smoothing and feature selection to mitigate zero-frequency penalties and curse of dimensionality.',
        'Benchmarked Naive Bayes and Random Forest architectures for robust biological classification.',
      ],
      metrics: 'k-mer NLP Modeling · High Imbalance Handling',
      tags: ['Bioinformatics', 'Scikit-Learn', 'k-mer', 'Random Forest', 'Python'],
      featured: false,
    },
    {
      name: 'Mood Monitor',
      tagline: 'NLP-driven stress detection from unstructured textual streams using regularized classifiers.',
      category: 'AI & ML Systems',
      context: 'Brain & Cognitive Science Club, IIT Kanpur',
      period: 'Dec 2023 – Jan 2024',
      bullets: [
        'Built a text classification pipeline to detect psycholinguistic stress indicators using TF-IDF and Logistic Regression.',
        'Conducted tokenization, stop-word pruning, and sentiment polarities with rigorous confusion matrix validation.',
      ],
      metrics: 'NLP Sentiment Classification',
      tags: ['NLP', 'TF-IDF', 'Logistic Regression', 'Scikit-Learn', 'Python'],
      featured: false,
    },
  ] as ProjectItem[],

  skills: {
    'Languages': ['Python', 'C', 'C++', 'Java', 'SQL', 'TypeScript', 'JavaScript'],
    'AI, ML & Deep Learning': [
      'PyTorch',
      'TensorFlow',
      'Scikit-learn',
      'YOLO (Ultralytics)',
      'LangChain',
      'FastAPI',
      'dlib',
      'OpenCV',
      'Hugging Face',
      'RAG & Vector DBs',
      'ONNX Runtime',
    ],
    'Data Science & Signal Processing': [
      'NumPy',
      'pandas',
      'Plotly & Dash',
      'Matplotlib',
      'Seaborn',
      'Librosa',
      'PsychoPy',
      'Graphify',
    ],
    'Platforms & Cloud Infrastructure': [
      'AWS',
      'Docker',
      'Databricks',
      'PostgreSQL',
      'Git',
      'Kubernetes',
      'Grafana',
      'LaTeX',
      'Jupyter',
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
