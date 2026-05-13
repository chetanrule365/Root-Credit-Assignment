# Onboarding Flow Application

A modern, multi-step onboarding flow built with React, featuring form validation, animations, and a responsive design. This application guides users through account creation with steps for account type selection, phone number verification, personal details, and password setup.

## Features

- **Multi-Step Onboarding**: Seamless navigation through account type, phone verification, personal details, and password creation.
- **Form Validation**: Robust validation using Zod schemas with real-time error feedback.
- **Shared Form State**: Centralized form management using React Hook Form and a custom context provider.
- **Responsive Design**: Built with Tailwind CSS for a mobile-first, adaptive UI.
- **Animations**: Smooth transitions and interactions powered by Framer Motion.
- **TypeScript**: Fully typed for better development experience and reliability.
- **Security Messaging**: Includes bank-grade security assurances in the final confirmation modal.

## Tech Stack

- **Frontend Framework**: React 19.2.6
- **Routing**: React Router 7.15.0
- **Styling**: Tailwind CSS 4.2.2
- **Animations**: Framer Motion 11.18.2
- **Form Management**: React Hook Form 7.50.0 with Zod 4.4.3 for validation
- **Build Tool**: Vite
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/chetanrule365/Root-Credit-Assignment.git
   cd assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
assignment/
├── app/
│   ├── components/
│   │   ├── Layout.tsx          # Main layout wrapper with background
│   │   ├── ProgressBar.tsx     # Step progress indicator
│   │   └── SummaryDialog.tsx   # Final confirmation modal
│   ├── context/
│   │   └── FormContext.tsx     # Shared form state and validation schemas
│   ├── routes/
│   │   ├── account-type.tsx    # Account type selection page
│   │   ├── phone-number.tsx    # Phone number input page
│   │   ├── verify-phone-number.tsx  # OTP verification page
│   │   ├── personal-details.tsx     # Name input page
│   │   └── create-password.tsx      # Password creation and final modal
│   ├── app.css                # Global styles
│   ├── root.tsx               # Root component
│   └── routes.ts              # Route definitions
├── public/                    # Static assets
├── Dockerfile                 # Docker configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
└── README.md                  # This file
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

1. **Account Type Selection**: Choose between personal or business account.
2. **Phone Number**: Enter and validate phone number with country code.
3. **OTP Verification**: Input 4-digit verification code.
4. **Personal Details**: Provide first and last name.
5. **Create Password**: Set a secure password and confirm.
6. **Confirmation**: Review details in the summary modal and proceed to dashboard.

The application uses shared form context to maintain state across steps, with validation ensuring data integrity.

## Architecture

### Overall Structure

The application follows a **component-based architecture** with clear separation of concerns:

- **Routes**: Each step of the onboarding flow is a separate route component, promoting modularity and easy navigation.
- **Components**: Reusable UI components (Layout, ProgressBar, SummaryDialog) that can be shared across routes.
- **Context**: Centralized state management for form data using React Context API.
- **Validation**: Schema-based validation using Zod for type safety and runtime validation.

### State Management

- **FormContext**: Provides a shared form state across all onboarding steps using React Hook Form.
- **Zod Schemas**: Define validation rules and TypeScript types in one place, ensuring consistency.
- **Page-Specific Validation**: Each route validates only its relevant fields to prevent cross-page validation errors.

### Routing Strategy

- **React Router 7**: File-based routing with nested routes for better organization.
- **Navigation Flow**: Linear progression through steps with back navigation support.
- **Route Guards**: Implicit validation ensures users complete steps before proceeding.

### Component Design

- **Layout Component**: Wraps all routes with consistent background and structure.
- **ProgressBar**: Visual indicator of current step in the onboarding process.
- **SummaryDialog**: Modal component for final confirmation, separated for reusability.

## Decisions

### Technology Choices

- **React 19**: Latest version for modern React features and performance improvements.
- **React Router 7**: Chosen for its file-based routing and modern React integration.
- **Tailwind CSS 4**: Utility-first CSS framework for rapid UI development and consistency.
- **Framer Motion**: Declarative animations that integrate seamlessly with React.
- **React Hook Form + Zod**: Powerful combination for form management and validation with excellent TypeScript support.

### Design Decisions

- **Multi-Step Flow**: Breaking down complex forms into digestible steps improves user experience and reduces cognitive load.
- **Shared Form State**: Maintains user input across navigation, preventing data loss and improving UX.
- **Real-Time Validation**: Immediate feedback on form errors without waiting for submission.
- **Responsive Design**: Mobile-first approach ensures accessibility across all devices.
- **Accessibility**: Proper ARIA labels, keyboard navigation, and semantic HTML.

### Development Decisions

- **TypeScript**: Provides type safety, better IDE support, and reduces runtime errors.
- **Component Separation**: Extracted reusable components (EyeIcon, SummaryDialog) to avoid duplication.
- **Context over Redux**: Simpler state management for this use case without over-engineering.
- **Vite**: Fast development server and optimized production builds.

## Enhancements

### Potential Features

- **Email Verification**: Add email input and verification step alongside phone.
- **Profile Picture Upload**: Allow users to upload avatar during personal details step.
- **Two-Factor Authentication**: Enhanced security with 2FA setup.
- **Account Recovery**: Password reset and account recovery flows.
- **Internationalization**: Multi-language support for global users.
- **Theme Customization**: Dark/light mode toggle.

### Technical Improvements

- **Error Boundaries**: Add React error boundaries for better error handling.
- **Testing**: Unit tests for components and integration tests for flows.
- **Performance**: Code splitting and lazy loading for better bundle sizes.
- **Analytics**: User flow tracking and conversion metrics.
- **API Integration**: Backend integration for user registration and verification.
- **Progressive Web App**: Service workers for offline functionality.
- **Accessibility Audit**: Comprehensive WCAG compliance testing.

### UI/UX Enhancements

- **Loading States**: Skeleton screens and loading indicators during async operations.
- **Error Handling**: User-friendly error messages and retry mechanisms.
- **Animation Refinements**: More sophisticated micro-interactions and transitions.
- **Form Auto-Save**: Persist form data locally to prevent accidental data loss.
- **Step Navigation**: Allow users to jump between completed steps.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
