export const resumeData = {
  personal: {
    name: 'Kshitiz Tyagi',
    title: 'Third Year Undergraduate',
    subtitle: 'B.Tech · Biological Sciences & Bioengineering · IIT Kanpur',
    phone: '+91-8077616048',
    email: 'ktyagi23@iitk.ac.in',
    linkedin: 'kshitiz-tyagi',
    github: 'Kshitiztyagi23',
    linkedinUrl: 'https://linkedin.com/in/kshitiz-tyagi',
    githubUrl: 'https://github.com/Kshitiztyagi23',
    tagline: 'Building intelligent systems at the intersection of AI, neuroscience, and bioengineering.',
  },

  education: [
    {
      year: '2023 – 2027',
      degree: 'B.Tech',
      institute: 'Indian Institute of Technology, Kanpur',
      score: '8.8 / 10.0',
      type: 'University',
    },
    {
      year: '2022',
      degree: 'CBSE (XII)',
      institute: 'Dewan Public School, Hapur',
      score: '95.4%',
      type: 'Senior Secondary',
    },
    {
      year: '2020',
      degree: 'ICSE (X)',
      institute: 'S.D.A Senior Secondary School, Hapur',
      score: '89.0%',
      type: 'Secondary',
    },
  ],

  achievements: [
    {
      text: 'Reliance Foundation Scholarship awarded through merit-cum-means process, selected from over 58,000 applicants in 2023.',
      icon: '🎖',
      category: 'Scholarship',
    },

  ],

  experience: [
    {
      role: 'Machine Learning & AI Systems Engineering Intern',
      company: 'Skaeo',
      period: 'May 2025 – Jul 2025',
      objective:
        'Designed scalable ML systems for real-time security, computer vision, and intelligent workflow automation in complex production environments.',
      bullets: [
        'Implemented Face Liveness Detection using dlib (HOG + 68 landmarks), leveraging EAR, MAR, and pupil-shift cues in the My RollCall Pro app to prevent spoofing.',
        'Customized and deployed RapidOCR with ONNX Runtime for fast, reliable serial number extraction in smart manufacturing pipelines.',
        'Automated marketing workflows using LangChain and Phidata for SWOT analysis, dynamic content generation, and intelligent scheduling; built a Telegram Bot for contextual posts.',
      ],
      results: [
        'Real-time 5s inference for face liveness and 2s OCR latency in production settings.',
        'Boosted marketing efficiency by 29.8% and reduced manual effort by 40% at scale.',
      ],
      tags: ['Python', 'dlib', 'ONNX', 'RapidOCR', 'LangChain', 'Phidata', 'Computer Vision'],
    },
  ],

  projects: [
    {
      name: 'CineScope',
      context: 'CS 661 – Big Data Visual Analytics Course',
      period: 'May 2025 – Present',
      description:
        'Scalable, insight-driven analytical tool for data-backed decision-making in entertainment analytics.',
      bullets: [
        'Developed an Interactive Dashboard using Plotly & Dash to visually analyze global movie data across multiple dimensions.',
        'Extracted patterns by preprocessing textual and categorical data for sentiment, genre, and runtime trend analysis.',
        'Created 7+ interactive visualizations with real-time filters across 800K+ movies.',
      ],
      tags: ['Python', 'Plotly', 'Dash', 'Data Viz', 'NLP'],
      color: 'cyan',
    },
    {
      name: 'Spikeverse',
      context: 'Brain & Cognitive Science Club, IIT Kanpur — Project Mentor',
      period: 'May 2025 – Present',
      description:
        'Converting a high-performance DQN Atari agent into a biologically-inspired Spiking Neural Network.',
      bullets: [
        'Implemented Double DQN with prioritized experience replay, N-step learning, and noisy nets to master Atari Breakout — peak score 290 in 2,000 episodes.',
        'Converting DQN to stochastic LIF-based SNN for energy-efficient, spike-driven inference.',
        'Projected to cut inference energy by 40%+ while preserving DQN-level performance.',
      ],
      tags: ['PyTorch', 'DQN', 'SNN', 'Reinforcement Learning', 'Neuromorphic'],
      color: 'purple',
    },
    {
      name: 'Word For Thought',
      context: 'Brain & Cognitive Science Club, IIT Kanpur — Project Mentor',
      period: 'Dec 2024 – Jan 2025',
      description:
        'End-to-end system to classify human emotions from raw speech signals using spectrograms and deep learning.',
      bullets: [
        'Converted raw audio to spectrograms using FFT and trained a CNN for emotion classification.',
        'Led end-to-end pipeline: Preprocessing, Feature Extraction, Model Training, and Performance Evaluation.',
        'Achieved 94% classification accuracy leveraging time-frequency features.',
      ],
      tags: ['Python', 'CNN', 'FFT', 'Audio ML', 'Librosa'],
      color: 'green',
    },
    {
      name: 'The Minds Mirror',
      context: 'Brain & Cognitive Science Club, IIT Kanpur',
      period: 'May 2024 – Jul 2024',
      description:
        'Built a labeled EEG dataset and applied deep learning to classify visual stimulus-based brain signals.',
      bullets: [
        'Constructed an EEG dataset with 200 samples using PsychoPy paradigms.',
        'Applied FFT, STFT, Autocorrelation, and Welch methods for feature extraction.',
        'Attained 90% accuracy on numeric vs. non-numeric classification using 1D CNN + SMOTE.',
        'Explored BiLSTM for improved multiclass classification on EEG time-series.',
      ],
      tags: ['EEG', 'PsychoPy', '1D CNN', 'BiLSTM', 'SMOTE'],
      color: 'purple',
    },
    {
      name: 'Biobytes',
      context: 'Biosoc, IIT Kanpur',
      period: 'May 2024 – Jun 2024',
      description:
        'Robust DNA sequence classification using statistical learning and k-mer feature engineering.',
      bullets: [
        'Developed models using k-NN, Random Forest, Naive Bayes, and SVM.',
        'Transformed DNA to numerical features using K-mer decomposition and CountVectorizer.',
        'Applied Laplace Smoothing to handle zero-frequency issues on unseen data.',
      ],
      tags: ['Bioinformatics', 'Scikit-learn', 'k-mer', 'Naive Bayes', 'SVM'],
      color: 'green',
    },
    {
      name: 'Gan Forge',
      context: 'Association of Computer Activities, IIT Kanpur — Project Mentor',
      period: 'May 2025 – Present',
      description:
        'Exploring visual recognition and generation through GANs and neural network classification.',
      bullets: [
        'Trained DCGAN on 60K+ images to generate high-quality anime faces.',
        'Trained a Fully Connected NN for multi-class Iris dataset classification — 96% accuracy.',
        'Implemented CycleGAN for unpaired image translation between 800+ Van Gogh paintings and natural images.',
      ],
      tags: ['PyTorch', 'DCGAN', 'CycleGAN', 'Computer Vision', 'GANs'],
      color: 'cyan',
    },
    {
      name: 'Sumo Bot',
      context: 'Robotics Club, IIT Kanpur — Robothon Runner-up',
      period: 'Apr 2024',
      description:
        'Designed and competed with a smartphone-controlled bot for sumo-style robot combat.',
      bullets: [
        'Led a team of 5 to design, prototype, and test a durable, high-maneuverability combat bot.',
        'Achieved 2nd place by optimizing combat strategy, traction control, and collision handling.',
      ],
      tags: ['Robotics', 'Hardware', 'Team Lead', 'Embedded Systems'],
      color: 'orange',
    },
    {
      name: 'Mood Monitor',
      context: 'Brain & Cognitive Science Club, IIT Kanpur',
      period: 'Dec 2023 – Jan 2024',
      description:
        'Python-based stress detection model using NLP and logistic regression on text data.',
      bullets: [
        'Performed smart preprocessing and sentiment analysis to boost accuracy.',
        'Validated results using confusion matrix metrics.',
      ],
      tags: ['Python', 'NLP', 'Logistic Regression', 'Sentiment Analysis'],
      color: 'purple',
    },
  ],

  skills: {
    Languages: ['C', 'C++', 'Java', 'Python', 'SQL'],
    Frameworks: ['TensorFlow', 'PyTorch', 'FastAPI', 'LangChain'],
    Libraries: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'Librosa'],
    Tools: ['Git', 'AWS', 'Docker', 'Jupyter', 'Hugging Face', 'PsychoPy', 'LaTeX'],
  },

  positions: [
    {
      role: 'Secretary',
      org: 'Brain & Cognitive Science Club, IIT Kanpur',
      period: 'Jun 2023 – Mar 2024',
      bullets: [
        'Selected from 300+ applicants for a 2-tier STEM club.',
        'Conducted interactive sessions on Game Theory and ML for 100+ IITK students.',
        'Mentored 40+ students across guided research projects.',
        'Organized AI/ML lectures, workshops, and guest talks for 200+ students.',
        'Collaborated with Spheron & Innopelux (NVIDIA Inception) to conduct GPU sessions.',
      ],
    },
    {
      role: 'Secretary – Research Wing',
      org: 'AnC, IIT Kanpur',
      period: 'Jun 2024 – Mar 2025',
      bullets: [
        'Led sessions on IRS, NSRC, and international internships, including lab tours to C3i Hub.',
        'Edited blogs and coordinated senior-led sessions to guide juniors on research journeys.',
        'Maintained the Research Wing online and compiled the annual Gazette.',
      ],
    },
    {
      role: 'Research & Projects Secretary',
      org: 'Biosoc, IIT Kanpur',
      period: 'Jun 2024 – Mar 2025',
      bullets: [
        'Organized Prof. Hunt and engaged 50+ students through structured mentorship drives.',
        'Led academic events to promote interdisciplinary research and biotech awareness.',
        'Fostered student–faculty collaboration strengthening the departmental ecosystem.',
      ],
    },
  ],

  courses: [
    { name: 'Big Data Visual Analytics', tag: 'B+' },
    { name: 'Applied Probability and Statistics', tag: 'B+' },
    { name: 'Fundamentals of Computing – II', tag: 'Excellent' },
    { name: 'Neural Networks & Deep Learning', tag: 'Online' },
    { name: 'Convolutional Neural Networks', tag: 'Online' },
    { name: 'Supervised Machine Learning', tag: 'Online' },
    { name: 'Principles of Biotechnology', tag: 'B+' },
    { name: 'Bioinformatics & Computational Biology', tag: 'Excellent' },
    { name: 'Introduction to Electronics', tag: 'B+' },
    { name: 'Biochemistry', tag: 'Excellent' },
    { name: 'Organ System Physiology & Anatomy', tag: 'Excellent' },
    { name: 'Biochemical Engineering', tag: 'Excellent' },
  ],

  extracurricular: [
    {
      icon: '🥇',
      text: 'Won the Gold Medal in group dance at Inter Hall Competition (Galaxy 25\') at IIT Kanpur, 2025.',
    },
    {
      icon: '🩸',
      text: 'Actively participated in Blood Donation Camp organized by Raktarpan, IIT Kanpur in 2024 and 2025.',
    },
    {
      icon: '⚙️',
      text: 'Participated in Takneek\'24 — the Intra-IITK Science and Technology Championship.',
    },
  ],
}
