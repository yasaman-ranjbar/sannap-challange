# Sannap - Agent Registration System

A modern web application for insurance agent registration and verification.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Hook Form + Yup
- Axios
- React Router DOM

## Project Structure

```
sannap/
├── src/
│   ├── assets/              # Images, fonts, icons
│   ├── components/
│   │   ├── common/          # Reusable components (Button, Input, Radio, LoadingSpinner)
│   │   └── login/           # Auth components (PhoneNumber, OTPCode, AgentInfo)
│   ├── constant/            # App constants (routes, toastConfig)
│   ├── layouts/             # Layout components
│   ├── pages/               # Page components
│   ├── schemas/             # Yup validation schemas
│   ├── services/            # API services and interceptors
│   ├── types/               # TypeScript types
│   ├── utils/               # Utility functions
│   ├── App.tsx
│   └── main.tsx
├── .env
├── package.json
└── vite.config.ts
```

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd sannap
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables - Create a `.env` file:

```env
# Main API endpoint for agent verification
VITE_API_BASE_URL=https://stage.api.sanaap.co/api/v2/app/DEY/agent/verification/signup

# Base API endpoint for provinces, cities, and agency codes
VITE_BASE_API_URL_BASE=https://stage.api.sanaap.co/base

# Base API URL for insurance_branch
VITE_INSURANCE_API_BASE_URL=https://stage.api.sanaap.co/api/v2/app/selection_item/insurance_branch
```

4. Start development server

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
