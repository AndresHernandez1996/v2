import type { TranslationSchema } from './en';

export const es = {
  title: 'Andrés Hernández Frontend Engineer',
  subtitle:
    'Andrés is a front-end developer who focuses on building scalable, accessible, and user-centered web applications. He transforms ideas into high-performance digital experiences through modern technologies and clean, intentional design.',
  language_label: 'Idioma',
  language_current: 'Actual: {{lng}}',
  language_switch_to_english: 'Inglés',
  language_switch_to_spanish: 'Español',
  language_short_en: 'EN',
  language_short_es: 'ES',
  nav_aria_main: 'Navegación principal',
  nav_links_label: 'Enlaces de secciones',
  nav_mobile_panel_label: 'Menú de navegación móvil',
  nav_go_to_hero: 'Ir a la sección hero',
  nav_open_menu: 'Abrir menú',
  nav_close_menu: 'Cerrar menú',
  nav_about: 'Sobre mí',
  nav_experience: 'Experiencia',
  nav_work: 'Proyectos',
  nav_contact: 'Contacto',
  hero_kicker: 'Hola, mi nombre es',
  hero_title: 'Andres Hernandez.',
  hero_subtitle: 'Convirtiendo ideas en aplicaciones.',
  hero_text:
    'Soy un desarrollador front-end que disfruta construir aplicaciones web escalables y confiables, con un fuerte enfoque en UX/UI y diseño centrado en las personas.',
  hero_cta: 'Descargar CV',
  hero_cta_aria: 'Descargar currículum',
} as const satisfies TranslationSchema;
