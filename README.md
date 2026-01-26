## KindaGigz webapp
- This is the official KindaGigz web app, built using Next.js and Typescript.
- This repository contains the whole functionality of the frontend for the KindaGigz web app.

## File structure and Organization
kindagigz/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── app/                          # Next.js 13+ App Router
│   ├── (auth)/                   # Route group for auth pages
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   │
│   ├── (main)/                   # Route group for main pages
│   │   ├── layout.tsx            # Shared layout with Navbar/Footer
│   │   ├── page.tsx              # Homepage
│   │   ├── services/             # Services + Categories page
│   │   │   └── page.tsx
│   │   ├── professional/[id]/    # Dynamic professional profile
│   │   │   └── page.tsx
│   │   ├── dashboard/            # Service provider dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── analytics/
│   │   │   └── settings/
│   │   ├── how-it-works/
│   │   │   └── page.tsx
│   │   ├── minimum-wage-guide/
│   │   │   └── page.tsx
│   │   └── skills-boost/
│   │       └── page.tsx
│   │
│   ├── api/                      # API routes (if needed)
│   │   └── auth/
│   │       └── route.ts
│   │
│   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Global styles
│   │
├── components/
│   ├── layout/                   # Layout components
│   │   ├── Navbar/
│   │   │   ├── Navbar.tsx
│   │   │   ├── NavbarLinks.tsx
│   │   │   ├── UserMenu.tsx
│   │   │   └── ResourcesDropdown.tsx
│   │   └── Footer/
│   │       └── Footer.tsx
│   │   │
│   ├── home/                     # Homepage-specific components
│   │   ├── HeroSection.tsx
│   │   ├── WhyKindaGigz.tsx
│   │   ├── CategoriesSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── LiveMapSection.tsx
│   │   └── CTASection.tsx
│   │   │
│   ├── services/                 # Services page components
│   │   ├── FilterPanel.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── ActiveFilters.tsx
│   │   └── ResultsGrid.tsx
│   │   │
│   ├── professionals/            # Professional-related components
│   │   ├── ProfessionalCard.tsx
│   │   ├── ProfileHeader.tsx
│   │   └── ReviewsList.tsx
│   │   │
│   ├── ui/                       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   └── Tooltip.tsx
│   │   │
│   └── map/                      # Map components
│   │       ├── InteractiveMap.tsx
│   │       └── MapMarker.tsx
│   │
├── features/                     # Feature-based modules
│   │   ├── auth/
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── api/
│   │   │   └── authApi.ts
│   │   └── types.ts
│   │   │
│   ├── services/
│   │   ├── hooks/
│   │   │   ├── useServices.ts
│   │   │   └── useFilters.ts
│   │   ├── api/
│   │   │   └── servicesApi.ts
│   │   └── types.ts
│   │   │
│   │   └── professionals/
│       ├── hooks/
│       │   └── useProfessional.ts
│       ├── api/
│       │   └── professionalsApi.ts
│       └── types.ts
│   │
├── lib/                          # Utilities & configs
│   ├── api/
│   │   └── client.ts             # Axios/fetch config
│   ├── utils/
│   │   ├── cn.ts                 # Class name merger
│   │   ├── formatters.ts         # Date, price formatters
│   │   └── validators.ts
│   └── constants/
│       ├── categories.ts
│       ├── services.ts
│       └── routes.ts
│
├── hooks/                        # Global custom hooks
│   ├── useMediaQuery.ts
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
│   │
├── types/                        # Global TypeScript types
│   ├── index.ts
│   ├── api.ts
│   └── models.ts
│
└── styles/                       # Additional styles
│       └── animations.css
│
├── .env.local                        # Environment variables
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
