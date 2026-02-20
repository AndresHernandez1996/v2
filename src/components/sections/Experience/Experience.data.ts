import type { TranslationSchema } from '@/i18n/locales/en';
import { EXPERIENCE_COMPANY_LINKS } from '@/utils/links';

type ExperienceTranslationKey = keyof TranslationSchema;

export type ExperienceItem = {
  companyKey: ExperienceTranslationKey;
  roleKey: ExperienceTranslationKey;
  periodKey: ExperienceTranslationKey;
  website: string;
  highlightsKeys: ExperienceTranslationKey[];
};

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    companyKey: 'experience_company_atlantia',
    roleKey: 'experience_role_atlantia',
    periodKey: 'experience_period_atlantia',
    website: EXPERIENCE_COMPANY_LINKS.atlantia,
    highlightsKeys: [
      'experience_highlight_atlantia_1',
      'experience_highlight_atlantia_2',
      'experience_highlight_atlantia_3',
      'experience_highlight_atlantia_4',
    ],
  },
  {
    companyKey: 'experience_company_interware',
    roleKey: 'experience_role_interware',
    periodKey: 'experience_period_interware',
    website: EXPERIENCE_COMPANY_LINKS.interware,
    highlightsKeys: [
      'experience_highlight_interware_1',
      'experience_highlight_interware_2',
      'experience_highlight_interware_3',
      'experience_highlight_interware_4',
    ],
  },
  {
    companyKey: 'experience_company_monte',
    roleKey: 'experience_role_monte',
    periodKey: 'experience_period_monte',
    website: EXPERIENCE_COMPANY_LINKS.montepiedad,
    highlightsKeys: [
      'experience_highlight_monte_1',
      'experience_highlight_monte_2',
      'experience_highlight_monte_3',
      'experience_highlight_monte_4',
    ],
  },
  {
    companyKey: 'experience_company_metlife',
    roleKey: 'experience_role_metlife',
    periodKey: 'experience_period_metlife',
    website: EXPERIENCE_COMPANY_LINKS.metlife,
    highlightsKeys: [
      'experience_highlight_metlife_1',
      'experience_highlight_metlife_2',
      'experience_highlight_metlife_3',
    ],
  },
  {
    companyKey: 'experience_company_zurich',
    roleKey: 'experience_role_zurich',
    periodKey: 'experience_period_zurich',
    website: EXPERIENCE_COMPANY_LINKS.zurich,
    highlightsKeys: [
      'experience_highlight_zurich_1',
      'experience_highlight_zurich_2',
      'experience_highlight_zurich_3',
    ],
  },
];
