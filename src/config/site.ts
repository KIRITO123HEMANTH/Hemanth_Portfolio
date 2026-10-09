/**
 * All portfolio content lives here. Components only read from this file.
 *
 * Rules this file follows:
 * - Every URL below was checked. Leave a value empty ('') to hide its UI. Never add a link you haven't opened.
 * - Empty lists (experience, certifications, achievements) hide their section.
 */
import type { Entry, Project, Service, SkillGroup } from '../types'

export const siteConfig = {
  url: import.meta.env.VITE_SITE_URL as string,
  /** Shown in the hero. Set show: false when you are not taking on work. */
  availability: { show: true, label: 'Taking on new projects' },
  /** Path to a real PDF in /public, e.g. '/resume.pdf'. Empty hides every résumé button. */
  resumeUrl: '',
}

export const profile = {
  fullName: 'Hemanth Sai Kumar Karimisetty',
  name: 'Hemanth Sai Kumar',
  firstName: 'Hemanth',
  initials: 'HS',
  roles: ['Full-Stack Developer', 'Creative Developer', 'Blockchain Enthusiast'],
  location: 'India',
  portrait: {
    src: '/images/portrait.webp',
    srcSmall: '/images/portrait-sm.webp',
    alt: 'Portrait of Hemanth Sai Kumar outdoors, wearing sunglasses and a white sweatshirt',
  },
  interests: ['Reading science books', 'Listening to music', 'Cooking'],
  focus: [
    'Full-stack web development',
    'Creative frontend engineering',
    'Interactive 3D on the web',
    'Blockchain applications',
    'Performance & UI engineering',
    'AI and automation',
  ],
}

export const socialLinks = {
  email: 'hemanthsaikumar551@gmail.com',
  github: 'https://github.com/KIRITO123HEMANTH',
  linkedin: 'https://www.linkedin.com/in/hemanthkirito2723/',
  /** e.g. a Café Craaft business profile. Empty hides it. */
  instagram: '',
}

export const contactConfig = {
  /** JSON POST endpoint (Formspree-compatible). Configure in .env, never put secrets here. */
  endpoint: (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) ?? '',
  projectTypes: [
    'Business website',
    'Café or restaurant website',
    'Web application',
    'Landing page',
    'Website improvements',
    'Blockchain project',
    'Something else',
  ],
  opportunityTypes: ['Full-time role', 'Internship', 'Contract role', 'Collaboration'],
  budgets: ['Not sure yet', 'Under ₹25,000', '₹25,000 – ₹75,000', '₹75,000 – ₹2,00,000', 'Above ₹2,00,000'],
}

export const education: Entry[] = [
  {
    title: 'Bachelor of Engineering, Computer Science Engineering',
    org: 'Sathyabama Institute of Science & Technology',
    detail: 'Specialization in Blockchain Technology',
    dates: '', // e.g. '2022 – 2026'
  },
]

/** Add verified roles here, newest first. The section stays hidden while empty. */
export const experience: Entry[] = []
/** e.g. { title: 'Blockchain Security', org: 'Coursera', dates: '2024' } */
export const certifications: Entry[] = []
export const achievements: Entry[] = []

export const skills: SkillGroup[] = [
  {
    label: 'Languages',
    items: [{ name: 'JavaScript (ES6+)', usedIn: 'Zoroto, Weather' }, { name: 'Java' }, { name: 'HTML5' }, { name: 'CSS3' }, { name: 'Solidity', usedIn: 'Healthcare fund system' }],
  },
  {
    label: 'Frontend',
    items: [{ name: 'React.js', usedIn: 'Zoroto, Portfolio v1' }, { name: 'Responsive layout' }, { name: 'jQuery', usedIn: 'Weather' }],
  },
  {
    label: 'Backend',
    items: [{ name: 'Node.js', usedIn: 'Zoroto' }, { name: 'Express.js', usedIn: 'Zoroto' }, { name: 'REST APIs', usedIn: 'Zoroto' }, { name: 'JWT authentication', usedIn: 'Zoroto' }],
  },
  {
    label: 'Databases',
    items: [{ name: 'MongoDB', usedIn: 'Zoroto' }, { name: 'MySQL' }],
  },
  {
    label: 'Blockchain',
    items: [{ name: 'Solidity', usedIn: 'Healthcare fund system' }, { name: 'Smart contracts', usedIn: 'Healthcare fund system' }, { name: 'Web3.js' }, { name: 'IPFS', usedIn: 'Healthcare fund system' }],
  },
  {
    label: 'Tools',
    items: [{ name: 'Git' }, { name: 'GitHub' }, { name: 'Visual Studio Code' }, { name: 'Postman' }],
  },
]

export const services: Service[] = [
  {
    title: 'Business websites',
    outcome: 'A clear, fast website that explains what you do and makes it easy for people to get in touch.',
    includes: ['Responsive design', 'Contact & inquiry forms', 'Search-friendly structure'],
  },
  {
    title: 'Café & restaurant websites',
    outcome: 'A site that feels like your place, with your menu, location, hours and a simple way to reach you.',
    includes: ['Menu presentation', 'Location & timings', 'Inquiry flow'],
  },
  {
    title: 'Full-stack web applications',
    outcome: 'Working products with accounts, data and an admin side, built to be maintained, not just demoed.',
    includes: ['React frontends', 'Node.js & Express APIs', 'MongoDB / MySQL'],
  },
  {
    title: 'Landing pages',
    outcome: 'One focused page for a product, campaign or launch, with a single clear next step for visitors.',
    includes: ['Visual hierarchy', 'Responsive build', 'Clear call to action'],
  },
  {
    title: 'Website improvements',
    outcome: 'Fixes for the site you already have: broken layouts on phones, confusing pages, slow loading, bugs.',
    includes: ['Responsive fixes', 'UI clean-up', 'Performance checks'],
  },
  {
    title: 'Blockchain applications',
    outcome: 'Exploratory and project-based work on smart contracts and decentralized application concepts.',
    includes: ['Solidity contracts', 'Web3 integration', 'IPFS storage'],
  },
]

export const projects: Project[] = [
  {
    id: 'cafe-craaft',
    title: 'Café Craaft',
    category: 'Freelance web development · Digital experiences',
    summary:
      'A web studio for cafés, restaurants and food businesses. I designed and built its website, plus the 3D menu and launch-reel experiments that show what a hospitality brand can look like online.',
    goal: 'Help hospitality businesses present their brand professionally online and make it easier for customers to find their menu, location and contact details.',
    approach:
      'A multi-page studio site in Next.js and TypeScript with typed content files, so services, packages and case studies are edited as data rather than layout. Alongside it: a real-time 3D dish model built in Blender and shown with model-viewer for an interactive menu concept, and a launch reel rendered entirely from code.',
    // Change to 'Founder' or 'Co-founder' if that is how you want to present it.
    role: 'Design & development',
    contribution: 'Design & development',
    highlights: [
      'Server-side contact form route with validation (React Hook Form + Zod)',
      'Sitemap, robots and structured data generated from the same content files',
      'Concept work is labelled as concept, so the site never presents mock-ups as client results',
      '3D biryani model exported to glTF for an interactive web menu',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Blender'],
    status: 'Live',
    links: [
      { label: 'Visit live site', href: 'https://cafe-craaft.vercel.app' },
      { label: 'Source code', href: 'https://github.com/KIRITO123HEMANTH/cafe-craaft' },
    ],
    visual: { kind: 'cafecraaft' },
    caseStudyLabel: 'Read the case study',
    contactCta: 'Discuss a website for your business',
    featured: true,
  },
  {
    id: 'healthcare-fund',
    title: 'Decentralized Healthcare Fund Management',
    category: 'Blockchain · Full-stack · Research',
    summary:
      'A blockchain-based system for transparent, secure management of medical funds. Donations, doctor approvals and withdrawals are recorded on-chain, and medical certificates are stored on IPFS.',
    goal: 'Medical donations and insurance funds pass through many intermediaries, which makes it hard to see where money goes. The aim: make every step traceable and enforce who can do what with code instead of trust.',
    approach:
      'A Solidity contract holds patients, doctors, donations, insurance balances and withdrawal history, with role checks through OpenZeppelin Ownable. Certificates go to IPFS and only their hashes go on-chain, which keeps gas costs low. A Django application talks to the contract through Web3.py and turns on-chain state into dashboards, with readable timestamps and wei amounts.',
    role: 'Co-author & developer',
    contribution:
      'Co-authored the research paper and worked on the system with my teammate under faculty guidance: contract workflows, IPFS integration and the Web3 application layer.',
    highlights: [
      'Admin registers patients and uploads certificates to IPFS',
      'Doctors sign a patient’s condition and can then withdraw insurance funds for that patient',
      'Anyone with an Ethereum account can donate to a patient',
      'Donations become withdrawable only after the contract owner transfers them to insurance funds',
      'Every donation and withdrawal is timestamped and auditable',
    ],
    nextSteps: ['Multi-signature approval for large withdrawals (explored, not implemented)', 'Deployment to a public test network'],
    stack: ['Solidity', 'OpenZeppelin', 'Truffle', 'Ganache', 'Web3.py', 'Django', 'IPFS'],
    status: 'Academic research project · tested on a local Ganache network',
    links: [],
    visual: { kind: 'chain' },
    note: 'Built on the open-source MediCare Chain DApp (MIT licence), extended for this research. Not deployed to a public network and not used with real patient data.',
    caseStudyLabel: 'Explore the project',
    featured: true,
  },
  {
    id: 'zoroto',
    title: 'Zoroto',
    category: 'Full-stack web application',
    summary:
      'A food-ordering application in three parts: a customer storefront, an admin panel for the menu and orders, and an Express API backed by MongoDB.',
    goal: 'Let customers browse a menu, build a cart and place an order, and give the business one place to manage dishes and order status.',
    approach:
      'Three separate apps share one REST API. The customer app (React, Context for cart state) handles browsing, cart, checkout and order history. The admin app adds dishes with image upload, lists the menu and updates order status. The Express API uses JWT middleware on protected routes and Mongoose models for users, food and orders.',
    role: 'Full-stack developer',
    contribution: 'Designed and built the frontend, admin panel and API.',
    highlights: [
      'JWT-protected cart and order routes',
      'Menu filtering by category, persistent per-user cart',
      'Admin: add dishes with image upload, list and remove items, update order status',
      'Checkout creates a Stripe Checkout session; cancelled payments remove the pending order',
    ],
    nextSteps: [
      'Confirm payments with Stripe webhooks instead of the redirect result',
      'Put the admin routes behind authentication and roles',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'REST API', 'Stripe Checkout'],
    status: 'Source code available · runs locally',
    links: [{ label: 'Source code', href: 'https://github.com/KIRITO123HEMANTH/Zoroto---Food-Delivery-website' }],
    visual: { kind: 'zoroto' },
    visualNote: 'Illustration of the app’s flow, not a screenshot',
    caseStudyLabel: 'View case study',
    featured: true,
  },
  {
    id: 'portfolio-v1',
    title: 'Portfolio v1',
    category: 'Frontend development',
    summary: 'My first React portfolio: a responsive single-page site with a typed hero, project gallery and contact section.',
    goal: 'Present my profile and projects in one responsive page.',
    approach: 'A React + TypeScript single-page app built with Vite and styled with Tailwind CSS, with section-based navigation.',
    role: 'Design & development',
    contribution: 'Design & development',
    highlights: ['Responsive layout from phone to desktop', 'Section navigation with active states'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    status: 'Live',
    links: [
      { label: 'Visit live site', href: 'https://hemanthportfoliohsk.netlify.app' },
      { label: 'Source code', href: 'https://github.com/KIRITO123HEMANTH/Portfolio' },
    ],
    visual: { kind: 'image', src: '/images/portfolio-v1.webp', alt: 'Screenshot of the Portfolio v1 home screen', width: 1000, height: 625 },
    caseStudyLabel: 'Details',
    featured: false,
  },
  {
    id: 'weather',
    title: 'Weather Forecast',
    category: 'Frontend development',
    summary: 'A 7-day forecast for thousands of cities, with instant city search as you type, built on the free Open-Meteo API.',
    goal: 'Give a quick weekly overview of temperatures for any city without signing up or using an API key.',
    approach:
      'City search runs in the browser over a bundled city list and suggests matches after three letters. The selected city’s coordinates go to Open-Meteo, and the app works out each day’s high and low from the hourly temperatures.',
    role: 'Design & development',
    contribution: 'Design & development',
    highlights: ['Real-time search suggestions', 'Daily highs and lows computed from hourly data', 'No API key required'],
    stack: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Open-Meteo API'],
    status: 'Source code available',
    links: [{ label: 'Source code', href: 'https://github.com/KIRITO123HEMANTH/WeatherForecast' }],
    visual: { kind: 'image', src: '/images/weather.webp', alt: 'Screenshot of the Weather Forecast app showing a 7-day forecast for Chennai', width: 1000, height: 625 },
    caseStudyLabel: 'Details',
    featured: false,
  },
  {
    id: 'fitfusion',
    title: 'FitFusion',
    category: 'Web design · Frontend development',
    summary: 'A landing page for a gym concept, with a strong typographic hero, program cards and a pricing table.',
    goal: 'Practise visual hierarchy and responsive layout on a page that needs to sell one thing: joining.',
    approach: 'Hand-written HTML and CSS: a large outlined headline, image-led sections and a three-tier pricing table.',
    role: 'Design & development',
    contribution: 'Design & development (concept project, no client)',
    highlights: ['Outlined display type for the hero', 'Program, class and pricing sections'],
    stack: ['HTML', 'CSS'],
    status: 'Concept · source code available',
    links: [{ label: 'Source code', href: 'https://github.com/KIRITO123HEMANTH/fitfusionlandingpage' }],
    visual: { kind: 'image', src: '/images/fitfusion.webp', alt: 'Screenshot of the FitFusion landing page hero', width: 1000, height: 625 },
    caseStudyLabel: 'Details',
    featured: false,
  },
]
