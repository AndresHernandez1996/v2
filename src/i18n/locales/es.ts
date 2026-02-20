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
  hero_title: 'Andrés Hernández.',
  hero_subtitle: 'Convirtiendo ideas en aplicaciones.',
  hero_text:
    'Soy un desarrollador front-end que disfruta construir aplicaciones web escalables y confiables, con un fuerte enfoque en UX/UI y diseño centrado en las personas.',
  hero_cta: 'Descargar CV',
  hero_cta_aria: 'Descargar currículum',
  about_title: 'Sobre mí',
  about_p1:
    '¡Hola! Soy Andrés Hernández. Disfruto construir aplicaciones de gestión desde cero. Mi pasión por el desarrollo comenzó en 2019 después de experimentar con las herramientas de desarrollador del navegador y descubrir cómo funciona realmente la web detrás de escena.',
  about_p2_prefix: 'He tenido la oportunidad de trabajar en una ',
  about_p2_highlight_1: 'start-up y grandes empresas',
  about_p2_middle: ', además de una ',
  about_p2_highlight_2: 'firma de consultoría',
  about_p2_suffix: ', colaborando con equipos multidisciplinarios en ',
  about_p2_highlight_3: 'proyectos internacionales.',
  about_p3_prefix: 'Mi objetivo es ',
  about_p3_highlight: 'crecer como ingeniero de software',
  about_p3_suffix:
    ' capaz de diseñar y construir aplicaciones con arquitectura robusta, escalabilidad y diseño de sistemas limpio.',
  about_tech_label: 'Algunas tecnologías con las que trabajo:',
  about_tech_aria: 'Tecnologías',
  about_image_alt: 'Retrato de Andrés Hernández',
  experience_title: 'Experiencia',
  experience_tablist_aria: 'Empresas',
  experience_tab_aria: 'Mostrar experiencia de {{company}}',
  experience_panel_aria: 'Detalles de experiencia de {{company}}',
  experience_company_link_aria: 'Abrir sitio web de {{company}}',
  experience_company_atlantia: 'Atlantia Search',
  experience_role_atlantia: 'Front-End Developer MD',
  experience_period_atlantia: 'Sep 2022 - May 2024',
  experience_highlight_atlantia_1:
    'Colaborar con diseñadores, project managers y desarrolladores para transformar ideas creativas en soluciones listas para producción.',
  experience_highlight_atlantia_2:
    'Trabajar junto al CTO para liderar investigación, desarrollo y decisiones de arquitectura alineadas con objetivos de negocio.',
  experience_highlight_atlantia_3:
    'Refactorizar código legacy para mejorar mantenibilidad, legibilidad y rendimiento.',
  experience_highlight_atlantia_4:
    'Diseñar e implementar algoritmos optimizados para mejorar el desempeño en procesamiento de datos a gran escala.',
  experience_company_interware: 'Interware',
  experience_role_interware: 'Front-End Developer',
  experience_period_interware: 'Oct 2021 - Sept 2022',
  experience_highlight_interware_1:
    'Trabajar de cerca con el equipo de UX para diseñar flujos de producto e implementar lógica de funcionalidades alineada con requerimientos de negocio.',
  experience_highlight_interware_2:
    'Aplicar principios de arquitectura limpia para mejorar mantenibilidad y rendimiento mediante lazy loading.',
  experience_highlight_interware_3:
    'Implementar una arquitectura basada en roles con gestión de permisos escalable.',
  experience_highlight_interware_4:
    'Desarrollar el sistema desde cero, desde la configuración inicial hasta el despliegue en producción.',
  experience_company_monte: 'Nacional Monte de Piedad',
  experience_role_monte: 'Front-End Developer',
  experience_period_monte: 'Nov 2020 - Oct 2021',
  experience_highlight_monte_1:
    'Colaborar con ingeniería y UX para diseñar la interfaz y los flujos de un sistema de tickets.',
  experience_highlight_monte_2:
    'Implementar un sistema multirol con control de acceso granular.',
  experience_highlight_monte_3:
    'Integrar una arquitectura de microservicios junto con actualizaciones en tiempo real mediante WebSockets.',
  experience_highlight_monte_4:
    'Entregar código de producción de alta calidad siguiendo buenas prácticas y estándares de mantenibilidad.',
  experience_company_metlife: 'MetLife',
  experience_role_metlife: 'Front-End Developer Jr',
  experience_period_metlife: 'Jan 2020 - Nov 2020',
  experience_highlight_metlife_1:
    'Desarrollar e integrar componentes dinámicos en la aplicación usando una librería UI personalizada basada en Bootstrap.',
  experience_highlight_metlife_2:
    'Generar pruebas unitarias y de integración para asegurar rendimiento y compatibilidad entre navegadores.',
  experience_highlight_metlife_3:
    'Aplicar estándares de accesibilidad ARIA para usuarios con discapacidad.',
  experience_company_zurich: 'Zurich',
  experience_role_zurich: 'Developer',
  experience_period_zurich: 'Oct 2019 - Jan 2020',
  experience_highlight_zurich_1:
    'Construir componentes UI pequeños y reutilizables basados en diseños UX usando CSS.',
  experience_highlight_zurich_2:
    'Mantener layouts responsivos en distintos tamaños de pantalla.',
  experience_highlight_zurich_3:
    'Integrar servicios backend para poblar tablas dinámicas de datos.',
  work_title: 'Proyectos en los que he trabajado',
  work_list_aria: 'Proyectos en los que he trabajado',
  work_featured_label: 'Proyecto destacado',
  work_capstone_label: 'Proyecto Final',
  work_project_link_aria: 'Abrir proyecto {{project}}',
  work_project_1_title: 'Shelftia',
  work_project_1_description:
    'Plataforma web de gestión de inventario que ayuda a las empresas a organizar, rastrear y monitorear productos en tiempo real. Incluye dashboards dinámicos, control de acceso por roles y arquitectura escalable para operaciones eficientes y visibilidad de datos.',
  work_project_1_stack:
    'ReactJs | Hooks | NextJS | AntDesign | NextAuth | E-Charts',
  work_project_1_image_alt:
    'Dashboard de Shelftia con analítica de promociones y visualización de líneas',
  work_project_2_title: 'IW Robot',
  work_project_2_description:
    'Plataforma avanzada de automatización y monitoreo que simula tareas manuales y semiautomatizadas para optimizar operaciones de negocio. Crea una fuerza de trabajo virtual para automatizar procesos, activar alertas en tiempo real y generar reportes de desempeño con insights accionables.',
  work_project_2_stack: 'ReactJs | Redux | Bootstrap | Auth0 | NodeJS',
  work_project_2_image_alt:
    'Landing page de IW Robot con funcionalidades de valuación automatizada',
  work_project_3_title: 'Estimador en línea',
  work_project_3_description:
    'Estimador en línea que ayuda a los usuarios a calcular el valor de sus artículos antes de empeñarlos o venderlos. Ofrece estimaciones rápidas y transparentes según categoría y condición del artículo, facilitando decisiones informadas con resultados de valuación en tiempo real.',
  work_project_3_stack: 'ReactJs | Context API | Vulma | Styled Components',
  work_project_3_image_alt:
    'Pantalla de marca de Nacional Monte de Piedad usada en el acceso de la plataforma',
  work_project_4_title: 'Curso profesional de Meta',
  work_project_4_description:
    'Mi proyecto capstone: un sistema de reservaciones totalmente responsivo construido desde cero. El proyecto incluyó investigación UX, wireframing y prototipado, destacando una arquitectura front-end moderna, buenas prácticas de accesibilidad y principios de diseño centrado en el usuario.',
  work_project_4_stack: 'ReactJs | Hooks | CSS | Vercel | Figma',
  work_project_4_image_alt:
    'Interfaz de reservaciones de Little Lemon del proyecto capstone del curso de Meta',
  contact_kicker: 'Construyamos algo con propósito',
  contact_title: 'Ponte en contacto',
  contact_text:
    'Ya sea una idea de producto, una colaboración o simplemente una conversación sobre tecnología, siempre estoy abierto a conectar.',
  contact_cta: 'Iniciar una conversación',
  contact_cta_aria: 'Iniciar una conversación por correo',
  contact_footnote:
    'Desarrollado completamente por Yayo, agradecimiento especial a @bchiang7',
  contact_back_to_top: 'Quieres volver en el tiempo?',
  contact_section_aria: 'Seccion de contacto',
  contact_overlay_aria: 'Enlaces del pie de contacto',
  contact_credit_aria: 'Abrir perfil de GitHub de @bchiang7',
  contact_v1_aria: 'Abrir portafolio versión 1',
} as const satisfies TranslationSchema;
