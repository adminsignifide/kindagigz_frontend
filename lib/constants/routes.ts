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
} as const;

// Navigation links configuration
export const NAV_LINKS: NavLink[] = [
  {
    label: 'Find Talent',
    href: ROUTES.SERVICES,
    public: true,
  },
  {
    label: 'Become a Pro',
    href: ROUTES.SIGNUP,
    public: true,
    requiresAuth: false,
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