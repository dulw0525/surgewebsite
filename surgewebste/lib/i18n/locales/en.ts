import type { Translations } from './zh-CN'

export const en: Translations = {
  // Brand
  brand: {
    name: 'Juliu',
    shortName: 'JL',
  },

  // Navigation
  nav: {
    features: 'Features',
    subscription: 'Pricing',
    team: 'About Us',
    contact: 'Contact',
    getStarted: 'Get Started',
    language: 'Language',
    theme: 'Theme',
    lightMode: 'Light',
    darkMode: 'Dark',
  },

  // Hero Section
  hero: {
    badge: 'AI-Native Community Platform',
    title1: 'AI Empowerment',
    title2: 'For Finance & Insurance',
    subtitle: 'Transform from "human wave tactics" to "AI empowerment". Personalized AI assistant, intelligent knowledge base, and community operation center help you become a super individual.',
    cta: 'Start Free',
    learnMore: 'Learn More',
    stats: {
      users: 'Active Users',
      satisfaction: 'Satisfaction',
      service: 'AI Service',
    },
  },

  // Features Section
  features: {
    badge: 'Features',
    title: 'For Finance & Insurance',
    subtitle: 'A Comprehensive AI Empowerment Platform',
    coreCapability: 'Core Capabilities',
    aiWorkflowTitle: 'AI-Driven Intelligent Workflow',
    aiWorkflowDesc: 'From client communication to solution design, from compliance checks to data analysis. Juliu AI runs through your entire workflow, exponentially enhancing your professional capabilities.',
    userCount: '10,000+ users are using',
    items: [
      {
        tag: 'AI Assistant',
        title: 'Personalized AI Assistant',
        description: 'Automatically generate marketing scripts, client insight reports, and compliance self-check suggestions. Let AI be your dedicated assistant.',
      },
      {
        tag: 'Knowledge Base',
        title: 'Smart Knowledge Base',
        description: 'Accumulate industry materials and product comparisons, solve fragmented knowledge acquisition pain points, access professional knowledge anytime.',
      },
      {
        tag: 'Community',
        title: 'Community Operation Center',
        description: 'Build a mutual-aid knowledge network, achieve growth through sharing, and learn from peers.',
      },
      {
        tag: 'Efficiency',
        title: 'Smart Efficiency Boost',
        description: 'AI-driven workflow automation significantly improves daily work efficiency.',
      },
      {
        tag: 'Compliance',
        title: 'Compliance & Security',
        description: 'Built-in compliance check mechanism ensures business operations meet regulatory requirements.',
      },
      {
        tag: 'Insights',
        title: 'Data Insights & Analytics',
        description: 'In-depth customer profile analysis to accurately capture business opportunities.',
      },
    ],
    aiDemo: {
      title: 'AI Assistant',
      analyzing: 'Analyzing client needs...',
      generating: 'Generating proposal',
      completed: 'Proposal completed',
      content: {
        customerProfile: {
          title: '[Customer Profile Analysis]',
          age: 'Age: 35, career on the rise',
          family: 'Family: Married, one child (5 years old)',
          income: 'Annual income: ~450,000 RMB',
          insurance: 'Existing coverage: Basic social insurance only, no commercial insurance',
        },
        riskAssessment: {
          title: '[Risk Assessment]',
          desc: 'This client is a typical family pillar with "elderly above and children below", requiring focus on:',
          points: [
            'Critical illness risk - Recommended coverage: 500,000+ RMB',
            'Accident risk - Need to cover mortgage balance',
            'Children\'s education fund - Recommend early planning',
          ],
        },
        recommendation: {
          title: '[Product Configuration Recommendations]',
          criticalCare: {
            title: '1. Critical Illness Insurance',
            product: 'Recommended: Multi-payout critical illness insurance',
            coverage: 'Coverage: 500,000 RMB (covers 3-5 years income loss)',
            payment: 'Payment: 30-year term, ~8,500 RMB/year',
          },
          medical: {
            title: '2. Medical Insurance',
            product: 'Recommended: Million-yuan medical + mid-tier medical insurance',
            coverage: 'Coverage: Hospitalization, outpatient surgery, special outpatient',
            payment: 'Premium: ~1,200 RMB/year',
          },
          accident: {
            title: '3. Accident Insurance',
            product: 'Recommended: Comprehensive accident insurance',
            coverage: 'Coverage: 1M death/disability + 50K medical',
            payment: 'Premium: ~300 RMB/year',
          },
          life: {
            title: '4. Term Life Insurance',
            product: 'Recommended: Term life insurance (until age 60)',
            coverage: 'Coverage: 2M RMB (covers mortgage + family expenses)',
            payment: 'Premium: ~2,000 RMB/year',
          },
        },
        summary: {
          title: '[Budget Summary]',
          total: 'Total annual premium: ~12,000 RMB',
          ratio: 'Percentage of income: 2.7% (healthy range)',
        },
        script: {
          title: '[Communication Script Suggestions]',
          opening: 'Opening: "Mr. Zhang, based on your family situation, I\'ve customized a protection plan that controls risks without burdening your family."',
          closing: 'Closing: "This plan costs only 33 RMB per day, about the price of a cup of coffee, yet provides comprehensive protection for your entire family."',
        },
        notes: {
          title: '[Important Notes]',
          points: [
            'Confirm health declaration status before purchasing',
            'Recommend prioritizing protection products before investment-type products',
            'Coverage can be adjusted based on client\'s actual budget',
          ],
        },
      },
    },
    customerLeads: {
      badge: 'Customer Leads',
      title: 'Smart Customer Relationship Network',
      description: 'Visualize customer relationship chains, intelligently identify high-value customers and potential referral opportunities. Support customer sharing and recommendations to easily expand your network.',
      features: ['Relationship Visualization', 'Smart Classification & Tags', 'One-Click Share & Recommend', 'Referral Tracking Analytics'],
      legend: {
        title: 'Legend',
        vip: 'VIP Clients',
        potential: 'Potential Clients',
        referral: 'Referral Sources',
        new: 'New Clients',
        inactive: 'Inactive',
      },
    },
  },

  // Subscription Section
  subscription: {
    badge: 'Pricing',
    title: 'Flexible Pricing Plans',
    subtitle: 'SaaS subscription model, choose as needed, cost-effective digital transformation solution',
    recommended: 'Recommended',
    paymentNote: 'Supports Alipay / WeChat Pay / AlipayHK / Credit Cards and more',
    plans: [
      {
        name: 'Basic',
        price: 'Free',
        period: '',
        description: 'For first-time users',
        features: [
          'Unlimited AI conversations',
          'Advanced marketing scripts',
          'Client insight reports',
          'Compliance self-check',
          'Full knowledge base access',
          'Community operation tools',
        ],
        cta: 'Start Free',
      },
      {
        name: 'Professional',
        price: '¥168',
        period: '/year',
        description: 'For individual practitioners',
        features: [
          'All Basic features',
          'Personal knowledge base',
          'Smart product proposals',
          'Smart product comparison',
        ],
        cta: 'Subscribe Now',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        description: 'For large teams and enterprises',
        features: [
          'All Professional features',
          'Team collaboration',
          'Analytics dashboard',
          'API access',
          'Dedicated account manager',
          'Custom deployment',
        ],
        cta: 'Contact Us',
      },
    ],
  },

  // Team Section
  team: {
    badge: 'About Us',
    title: 'Professional Team',
    subtitle: 'Focused on AI Empowerment for Finance & Insurance',
    companyName: 'Shanghai Xiaoye Technology Co., Ltd.',
    stats: [
      { value: '10+', label: 'Years Experience' },
      { value: 'AI', label: 'Tech Driven' },
      { value: '100%', label: 'Data Security' },
      { value: '10K+', label: 'Active Users' },
    ],
    highlights: [
      {
        title: 'Diverse Background Team',
        description: 'Headquartered in Shanghai, our core team has over 10 years of experience in AI, finance, and community operations.',
      },
      {
        title: 'Technical Innovation',
        description: 'Continuous investment in AI technology R&D to create industry-leading intelligent solutions.',
      },
      {
        title: 'Compliance & Security',
        description: 'Strictly follow data security and industry regulatory requirements to protect user information.',
      },
    ],
  },

  // Contact Section
  contact: {
    badge: 'Contact Us',
    title: 'Start Your Digital Transformation',
    subtitle: 'Whether you have questions or partnership intentions, we look forward to connecting with you',
    contactMethods: 'Contact Methods',
    email: 'Email',
    phone: 'Phone',
    workingHours: 'Working Hours',
    workingHoursValue: 'Mon-Fri 9:00 - 18:00',
    responseNote: 'After submitting, our team will contact you within 24 hours. For urgent inquiries, please call our hotline directly.',
    form: {
      name: 'Name',
      namePlaceholder: 'Enter your name',
      phone: 'Phone Number',
      phonePlaceholder: 'Enter your phone number',
      email: 'Email',
      emailPlaceholder: 'Enter your email address',
      company: 'Company',
      companyPlaceholder: 'Enter your company name',
      message: 'Message',
      messagePlaceholder: 'Describe your needs or questions...',
      required: '*',
      submit: 'Submit',
      submitting: 'Submitting...',
      successTitle: 'Submitted Successfully',
      successMessage: 'Thank you for your message, we will contact you soon',
      privacyNote: 'By submitting, you agree to our Privacy Policy and Terms of Service',
    },
  },

  // Footer Section
  footer: {
    downloadTitle: 'Start Using Juliu Now',
    downloadSubtitle: 'Scan the QR code to download the App and begin your AI empowerment journey',
    ios: 'iOS',
    android: 'Android',
    brandDesc: 'AI-native community driving digital growth for finance & insurance professionals.',
    links: {
      product: {
        title: 'Product',
        features: 'Features',
        subscription: 'Pricing',
        download: 'Download App',
      },
      company: {
        title: 'Company',
        about: 'About Us',
        contact: 'Contact Us',
        careers: 'Careers',
      },
      support: {
        title: 'Support',
        help: 'Help Center',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
      },
    },
    copyright: 'Shanghai Xiaoye Technology Co., Ltd.',
    disclaimer: 'The content on this platform is for reference only and does not constitute investment advice',
  },
}
