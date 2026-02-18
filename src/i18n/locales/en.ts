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
  hero_title: 'Andres Hernandez.',
  hero_subtitle: 'Turning ideas into apps.',
  hero_text:
    "I'm a front-end developer who enjoys building scalable and reliable web applications with a strong focus on UX/UI and user-centered design.",
  hero_cta: 'Download Resume',
  hero_cta_aria: 'Download resume',
} as const;

export type TranslationSchema = {
  [K in keyof typeof en]: string;
};
