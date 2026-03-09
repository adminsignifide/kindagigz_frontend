//============================================
// APPLICATION ROUTES CONSTANTS
// ============================================
import { NavLink } from "@/types";

export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  PROFESSIONAL: (id: string) => `/professional/${id}`,
  DASHBOARD: '/dashboard',
  DASHBOARD_ANALYTICS: '/dashboard/analytics',
  DASHBOARD_SETTINGS: '/dashboard/settings',
  HOW_IT_WORKS: '/how-it-works',
  MINIMUM_WAGE: '/minimum-wage-guide',
  SKILLS_BOOST: '/skills-boost',
  LOGIN: '/login',
  SIGNUP: '/signup',
  UPGRADE_TO_SERVICE_PROVIDER: '/upgrade-to-service-provider',             
} as const;

// Navigation links configuration
export const NAV_LINKS: NavLink[] = [
  {
    label: 'Find Talent',
    href: ROUTES.SERVICES,
    public: true,
  },
  {
    label: 'Resources',
    href: '#',
    public: true,
    hasDropdown: true,
    dropdownItems: [
      { label: 'How It Works', href: ROUTES.HOW_IT_WORKS },
      { label: 'Minimum Wage Guide', href: ROUTES.MINIMUM_WAGE },
    ],
  },
  {
    label: 'Skills Boost',
    href: ROUTES.SKILLS_BOOST,
    public: true,
  },
] as const;

export const SOCIALS = {
  FACEBOOK: 'https://www.facebook.com/share/18b29zaizi/?mibextid=wwXIfr',
  TWITTER: 'https://x.com/__kinda_?s=11&t=dj9QV_j076ekCceMsMF0XQ',
  TIKTOK: 'https://www.tiktok.com/@__kinda._?_t=ZM-8t8VxoUt13V&_r=1',
  LINKEDIN: 'https://www.linkedin.com/company/signifide-group-international/',
  INSTAGRAM: 'https://www.instagram.com/__.kinda_/',              
} as const;