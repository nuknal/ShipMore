# ShipMore - Next.js Application Template

A comprehensive Next.js application template that helps developers build modern web applications faster. Includes user authentication, payment integration, multi-language support, theme switching, and other essential features for modern applications, allowing you to focus on business logic rather than infrastructure.

## ✨ Features

- 🔐 **User Authentication** - Based on NextAuth.js, supports multiple login methods
- 💳 **Payment Integration** - Complete subscription and payment system
- 🌍 **Internationalization** - Multi-language support based on next-intl
- 🎨 **Theme Switching** - Dark/light mode toggle
- 📊 **Database** - Using Drizzle ORM and PostgreSQL
- 🎯 **Modern UI** - Tailwind CSS + Shadcn UI
- 📱 **Responsive Design** - Perfect adaptation to various devices
- 🚀 **Performance Optimization** - Next.js 15 best practices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL + Drizzle ORM
- **Payment**: Stripe
- **Internationalization**: next-intl
- **Deployment**: Vercel

## 📦 Quick Start

### 1. Clone the Project

```bash
git clone <your-repo-url>
cd shipmore
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Copy `.env.example` to `.env.local` and configure environment variables:

```bash
cp .env.example .env.local
```

Configure the following environment variables:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"
GOOGLE_CLIENT_ID="your-google-id"
GOOGLE_CLIENT_SECRET="your-google-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Other Services
RESEND_API_KEY="your-resend-key"
CLOUDFLARE_R2_ACCESS_KEY_ID="your-r2-key"
CLOUDFLARE_R2_SECRET_ACCESS_KEY="your-r2-secret"
```

### 4. Database Setup

```bash
# Generate database migrations
pnpm db:generate

# Push to database
pnpm db:push

# Run seed data (optional)
pnpm db:seed
```

### 5. Start Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Multi-language routing
│   │   ├── (auth)/        # Authenticated pages
│   │   └── (unauth)/      # Public pages
│   └── api/               # API routes
├── components/            # React components
│   ├── auth/             # Authentication related components
│   ├── landing/          # Landing page components
│   ├── settings/         # Settings related components
│   ├── subscription/     # Subscription related components
│   └── ui/               # Base UI components
├── db/                   # Database configuration and schema
├── hooks/                # Custom React Hooks
├── i18n/                 # Internationalization configuration
├── lib/                  # Utility libraries and configuration
├── locales/              # Translation files
├── services/             # API services
├── styles/               # Style files
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🔧 Core Features

### User Authentication

- Email/password login support
- Social login (GitHub, Google, Apple)
- Email verification
- Session management

### Payment System

- Creem integration
- Subscription management
- Billing history
- Usage statistics

### Internationalization

- Chinese/English support
- Dynamic language switching
- Localized routing

### Theme System

- Dark/light mode
- System theme detection
- Persistent settings

## 📝 Development Guide

### Adding New Pages

1. Create pages in `src/app/[locale]/(auth)` or `src/app/[locale]/(unauth)`
2. Add corresponding translations to `src/locales/`
3. Add to sidebar navigation if needed

### Adding New Components

1. Create components in `src/components/`
2. Use TypeScript and Tailwind CSS
3. Follow project naming conventions

### Database Operations

```bash
# Generate new migrations
pnpm db:generate

# Push to database
pnpm db:push

# View database
pnpm db:studio
```

## 🚀 Deployment

### Vercel Deployment

1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy

### Other Platforms

The project supports deployment to any platform that supports Next.js, such as Netlify, Railway, Render, etc.

## 📄 Script Commands

```bash
# Development
pnpm dev

# Build
pnpm build

# Start production server
pnpm start

# Code linting
pnpm lint

# Type checking
pnpm type-check

# Database related
pnpm db:generate    # Generate migrations
pnpm db:push        # Push to database
pnpm db:studio      # Open database management interface
pnpm db:seed        # Run seed data
```

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📄 License

[MIT License](LICENSE)

## 🔗 Related Links

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Drizzle ORM Documentation](https://orm.drizzle.team)

## 📞 Support

If you have any questions or need support, please contact us at [support@shipmore.xyz](mailto:support@shipmore.xyz).
