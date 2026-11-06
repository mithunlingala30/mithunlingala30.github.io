// ============ CENTRAL CONFIGURATION — edit everything here ============
// Empty strings / arrays are handled gracefully by the UI (buttons hide or show "not added yet").

export const profile = {
  name: 'Lingala Mithun Kumar Reddy',
  headline: 'Computer Science Engineering Student',
  subtitle: 'Aspiring Software Developer',
  intro:
    'I am a Computer Science Engineering student interested in software development and in building practical technology solutions — from secure apps to full-stack platforms.',
  phone: '9989723628',
  email: 'mithunlingala30@gmail.com',
  photo: '/images/profile.jpg', // optional — falls back to a 3D visual if the file is missing
  resume: '/resume.pdf', // optional — button shows a placeholder state if the file is missing
  socials: {
    linkedin: 'https://www.linkedin.com/in/mithun-reddy-02558b285/',
    github: 'https://github.com/mithunlingala30/',
    leetcode: '', // add your real URL — the button stays hidden until then
  },
}

export const coreSkills = ['Java', 'SQL', 'Object-Oriented Programming', 'Database Management Systems']

export const skillCategories = [
  { title: 'Programming', items: ['Java'] },
  { title: 'Databases', items: ['SQL', 'DBMS'] },
  { title: 'Computer Science', items: ['Object-Oriented Programming'] },
  { title: 'Web Development', items: ['React', 'Vite'] },
  { title: 'Backend', items: ['Python', 'FastAPI'] },
  { title: 'Mobile Development', items: ['Flutter', 'Dart'] },
  { title: 'Cloud & Tools', items: ['Firebase', 'Git', 'GitHub'] },
]

export const education = {
  degree: 'B.Tech in Computer Science and Engineering',
  college: 'Saveetha School of Engineering',
  startYear: '2023',
  endYear: '2027',
  cgpa: '',
}

// Fill in details once verified. Entries with empty fields show "Details to be added".
export const certificates = [
  { title: 'Oracle DBMS Certification', issuer: '', date: '', credentialId: '', url: '' },
  { title: 'Java Certification', issuer: '', date: '', credentialId: '', url: '' },
]

export const internships = [
  {
    company: 'Corizo',
    role: 'Cyber Security Intern',
    domain: 'Cybersecurity',
    startDate: 'Aug 2025',
    endDate: 'Oct 2025',
    responsibilities: [
      'Analyzed system vulnerabilities and network traffic to identify potential security threats.',
      'Studied penetration testing workflows and defensive security best practices.',
      'Explored threat mitigation and web application security mechanisms.',
    ],
    technologies: ['Network Security', 'Vulnerability Assessment', 'Threat Analysis', 'Cybersecurity Tools'],
    tasks: [
      'Performed vulnerability assessments and security scanning on test target environments.',
      'Documented security findings, incident assessment workflows, and mitigation reports.',
    ],
    certificateUrl: '',
  },
  {
    company: 'Apex Planet',
    role: 'Full Stack Developer',
    domain: 'Full Stack Development',
    startDate: 'Oct 2025',
    endDate: 'Nov 2025',
    responsibilities: [
      'Designed and engineered responsive, dynamic full-stack web applications.',
      'Built and integrated RESTful APIs linking frontend user interfaces with database layers.',
      'Collaborated on database schemas, code optimization, and modular UI components.',
    ],
    technologies: ['React', 'JavaScript', 'Node.js', 'REST APIs', 'SQL', 'HTML5/CSS3'],
    tasks: [
      'Developed interactive, user-focused client applications with modern state management.',
      'Implemented backend endpoints, CRUD operations, and structured data handling.',
    ],
    certificateUrl: '',
  },
]

// github / live: leave '' until real links exist. image: optional screenshot path in /public.
export const projects = [
  {
    id: 'elder-shield',
    title: 'Elder Shield',
    category: 'Cybersecurity',
    accent: '#22d3ee',
    description:
      'A cybersecurity companion designed to help protect senior citizens from phishing, suspicious messages, malicious URLs, and online scams, with guardian guidance.',
    problem:
      'Senior citizens are common targets of phishing, suspicious messages, malicious URLs and online scams.',
    solution:
      'A companion app that helps identify these threats and provides guardian guidance.',
    tech: ['Flutter', 'Dart', 'Python', 'FastAPI', 'Firebase Firestore'],
    github: 'https://github.com/mithunlingala30/ELDER-SHIELD-PDD',
    live: '',
    image: '',
  },
  {
    id: 'smart-blood-connect',
    title: 'Smart Blood Connect',
    category: 'Healthcare Management',
    accent: '#ff4d5e',
    description:
      'A donor and hospital management system supporting blood-group searches, location-based donor discovery, hospital stock management, and blood requests.',
    problem:
      'Finding compatible donors nearby and tracking hospital blood stock is slow when handled manually.',
    solution:
      'A management system with blood-group search, location-based donor discovery, hospital stock management and blood requests.',
    tech: ['React', 'Vite', 'Python', 'FastAPI', 'Firebase'],
    github: 'https://github.com/mithunlingala30/Smart_Blood_Connect',
    live: '',
    image: '',
  },
  {
    id: 'strange-ai',
    title: 'Strange AI',
    category: 'Multimodal AI Assistant & Chatbot',
    accent: '#a78bfa',
    description:
      'A multimodal AI chat assistant featuring real-time streaming conversations, image vision analysis, file reasoning, guest mode, cloud chat sync, and UPI payments.',
    problem:
      'Standard AI chat tools lack multimodal flexibility, seamless guest access, document reasoning, and local payment integration in one cohesive platform.',
    solution:
      'Built a full-featured AI chat app with token-streaming inference, image and file analysis, Firebase cloud persistence, and native UPI payments.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Groq AI (Llama 3.3)', 'Vision AI', 'Firebase Auth', 'Firestore', 'UPI Integration'],
    github: 'https://github.com/mithunlingala30/Strange-Ai',
    live: '',
    image: '/images/strange-ai.jpg',
  },
  {
    id: 'cloud-vault',
    title: 'Cloud Vault',
    category: 'Secure Cloud Storage Platform',
    accent: '#38bdf8',
    description:
      'A high-performance cloud storage web application designed with seamless file management, client-side canvas compression, in-browser previews, and real-time synchronization.',
    problem:
      'Traditional file storage and sharing can create challenges involving data security, access management, file organization, and slow upload speeds.',
    solution:
      'Engineered a centralized cloud vault with client-side image compression, role-based sharing, instant in-app previews, two-stage trash lifecycle, and Firestore streaming.',
    tech: ['React 19', 'Vite', 'Tailwind CSS', 'Firebase Auth', 'Cloud Firestore', 'HTML5 Canvas'],
    github: 'https://github.com/mithunlingala30/Cloud-Vault',
    live: '',
    image: '',
  },
  {
    id: 'cloudline',
    title: 'CloudLine - Online Compiler & OS Simulator',
    category: 'Developer Tools & Operating System Simulator',
    accent: '#35d0c0',
    description:
      'A LeetCode-style online coding and operating system simulation platform that allows users to write, compile, execute programs, and explore core operating system concepts interactively.',
    problem:
      'Students often need separate environments for coding practice, program execution, and understanding operating system concepts.',
    solution:
      'Combines an online code editor, multi-language execution, CPU scheduling, memory management, process management, deadlock handling, and interactive OS visualizations.',
    tech: [
      'React.js',
      'Tailwind CSS',
      'Monaco Editor',
      'Python FastAPI',
      'Firebase Firestore',
      'Firebase Authentication',
      'REST API',
    ],
    github: 'https://github.com/mithunlingala30/Cloud-Line-OS',
    live: '',
    image: '',
  },
]

export const navLinks = [
  ['Home', 'home'], ['About', 'about'], ['Skills', 'skills'], ['Projects', 'projects'],
  ['Experience', 'experience'], ['Education', 'education'], ['Contact', 'contact'],
]
