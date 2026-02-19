export const en = {
  title: 'Andrés Hernández Frontend Engineer',
  subtitle:
    'Andrés is a front-end developer who focuses on building scalable, accessible, and user-centered web applications. He transforms ideas into high-performance digital experiences through modern technologies and clean, intentional design.',
  language_label: 'Language',
  language_current: 'Current: {{lng}}',
  language_switch_to_english: 'English',
  language_switch_to_spanish: 'Spanish',
  language_short_en: 'EN',
  language_short_es: 'ES',
  nav_aria_main: 'Main navigation',
  nav_links_label: 'Section links',
  nav_mobile_panel_label: 'Mobile navigation menu',
  nav_go_to_hero: 'Go to hero section',
  nav_open_menu: 'Open menu',
  nav_close_menu: 'Close menu',
  nav_about: 'About',
  nav_experience: 'Experience',
  nav_work: 'Work',
  nav_contact: 'Contact',
  hero_kicker: 'Hello, my name is',
  hero_title: 'Andrés Hernández.',
  hero_subtitle: 'Turning ideas into apps.',
  hero_text:
    "I'm a front-end developer who enjoys building scalable and reliable web applications with a strong focus on UX/UI and user-centered design.",
  hero_cta: 'Download Resume',
  hero_cta_aria: 'Download resume',
  about_title: 'About me',
  about_p1:
    "Hi! I'm Andrés Hernández. I enjoy building management applications from scratch. My passion for development began in 2019 after experimenting with my browser developer tools and discovering how the web actually works behind the scenes.",
  about_p2_prefix: "I've had the opportunity to work with a ",
  about_p2_highlight_1: 'start-up, large companies',
  about_p2_middle: ', and a ',
  about_p2_highlight_2: 'consulting firm',
  about_p2_suffix: ', collaborating with cross-functional teams on ',
  about_p2_highlight_3: 'international projects.',
  about_p3_prefix: 'My goal is to ',
  about_p3_highlight: 'grow into a software engineer',
  about_p3_suffix:
    ' capable of designing and building applications with robust architecture, scalability, and clean system design.',
  about_tech_label: 'Some technologies I work with:',
  about_tech_aria: 'Technologies',
  about_image_alt: 'Andrés Hernández portrait',
} as const;

export type TranslationSchema = {
  [K in keyof typeof en]: string;
};
