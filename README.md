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
   git clone <repository-url>
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
