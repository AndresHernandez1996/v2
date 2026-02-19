export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  website: string;
  highlights: string[];
};

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    company: 'Atlantia Search',
    role: 'Front-End Developer MD',
    period: 'Sep 2022 - May 2024',
    website: 'https://shelftia.com/',
    highlights: [
      'Collaborate with designers, project managers, and developers to transform creative concepts into production-ready solutions.',
      'Partner with the CTO to lead research, development, and architectural decisions aligned with business goals.',
      'Refactor legacy code to improve maintainability, readability, and performance.',
      'Design and implement optimized algorithms to improve performance in large-scale data processing.',
    ],
  },
  {
    company: 'Interware',
    role: 'Front-End Developer',
    period: 'Oct 2021 - Sept 2022',
    website: 'https://www.interware.com.mx/iw-robot',
    highlights: [
      'Work closely with the UX team to design product flows and implement feature logic aligned with business requirements.',
      'Apply clean architecture principles to improve maintainability and enhance performance through lazy loading.',
      'Implement a role-based architecture with scalable permission management.',
      'Develop the system from scratch, from initial setup to production deployment.',
    ],
  },
  {
    company: 'Nacional Monte de Piedad',
    role: 'Front-End Developer',
    period: 'Nov 2020 - Oct 2021',
    website: 'https://www.montepiedad.com.mx/',
    highlights: [
      'Collaborate with engineers and the UX department to design the interface and workflows for a ticketing system.',
      'Implement a multi-role permission system with granular access control.',
      'Integrate microservices architecture alongside WebSocket-based real-time updates.',
      'Deliver high-quality production code following best practices and maintainability standards.',
    ],
  },
  {
    company: 'MetLife',
    role: 'Front-End Developer Jr',
    period: 'Jan 2020 - Nov 2020',
    website: 'https://www.metlife.com.mx/',
    highlights: [
      'Develop and integrate dynamic components across the application using a custom UI library built on top of Bootstrap.',
      'Generate unit and integration tests to ensure application performance and browser compatibility.',
      'Apply ARIA accessibility standards for users with disabilities.',
    ],
  },
  {
    company: 'Zurich',
    role: 'Developer',
    period: 'Oct 2019 - Jan 2020',
    website: 'https://www.zurich.com.mx/',
    highlights: [
      'Build small reusable UI components based on UX designs using CSS.',
      'Maintain responsive layouts across different screen sizes.',
      'Integrate backend services to populate dynamic data tables.',
    ],
  },
];
