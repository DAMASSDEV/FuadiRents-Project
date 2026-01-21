<<<<<<< HEAD
# 🚗 FuaDI Rents - Car Rental Platform

Professional car rental web application built with React, TypeScript, and Tailwind CSS. Platform modern untuk sewa mobil dengan fitur lengkap.

## ✨ Fitur Utama

- 🎯 **Responsive Design** - Mobile-first approach
- 🔐 **Authentication** - Login dengan Supabase
- 🚗 **Car Catalog** - Browse & search mobil
- 📅 **Booking System** - Calendar-based booking
- 💳 **Payment Gateway** - Integration ready
- 📍 **Real-time Tracker** - Track booking status
- 👨‍💼 **Admin Dashboard** - Complete management
- 📧 **Contact Form** - Email submission (NEW)
- 📊 **Stats Counter** - Animated statistics (NEW)
- 🌙 **Dark Mode** - Theme toggle support
- ♿ **Accessibility** - WCAG 2.1 Level AA

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ & npm
- Git

### Installation

```bash
# 1. Clone repository
git clone <YOUR_GIT_URL>
cd drive-go

# 2. Install dependencies
npm install

# 3. Setup environment (jika menggunakan Supabase)
cp .env.example .env.local
# Edit .env.local dengan credentials Anda

# 4. Start development server
npm run dev

# 5. Buka di browser
# http://localhost:5173
```

## 📋 Available Commands

```bash
npm run dev          # Start dev server (dengan hot reload)
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## 📚 Documentation

**Start here**: [docs/README.md](./docs/README.md) untuk akses semua dokumentasi

### Key Docs
- **[DEVELOPER_GUIDE.md](./docs/README.md)** ⭐ - Start untuk new developers
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Folder structure & conventions
- **[docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)** - Best practices & standards
- **[docs/COMPONENTS.md](./docs/COMPONENTS.md)** - UI component reference
- **[docs/EMAIL_SETUP.md](./docs/EMAIL_SETUP.md)** - Contact form setup

## 🛠️ Tech Stack

### Frontend
```
Core:
├── React 18.3.1
├── TypeScript 5.8.3
├── React Router 6.30.1
└── Vite 7.3.0

Styling:
├── Tailwind CSS 3.4.17
├── Shadcn UI (35+ components)
└── Lucide React (icons)

Forms & Validation:
├── React Hook Form 7.61.1
└── Zod 3.25.76

State Management:
├── React Context (Auth)
├── TanStack Query 5.83.0
└── Local useState

Services:
├── Supabase (DB + Auth)
├── Formspree (Email)
└── Mapbox (Maps - optional)
```

## 📱 Pages & Routes

| Route | Page | Status | Description |
|-------|------|--------|-------------|
| `/` | Homepage | ✅ | Hero, populer cars, testimonials |
| `/about` | About | ✅ NEW | Company story + Stats Counter |
| `/contact` | Contact | ✨ NEW | Contact form + email submission |
| `/catalog` | Catalog | ✅ | Browse & search cars |
| `/car/:id` | Car Detail | ✅ | Single car info & booking |
| `/signin` | Sign In | ✅ | User login |
| `/signup` | Sign Up | ✅ | New user registration |
| `/choose-driver` | Driver Selection | ✅ | Select driver untuk booking |
| `/track/:id` | Track Booking | ✅ | Real-time booking tracker |
| `/payment` | Payment | ✅ | Payment processing |
| `/confirmation/:id` | Confirmation | ✅ | Order confirmation |
| `/admin/*` | Admin Panel | ✅ | Management dashboard |
| `*` | Not Found | ✅ | 404 page |

## ✨ Fitur Baru (January 2026)

### 1. 📧 Contact Form dengan Email
**Location**: `src/pages/Contact.tsx`  
**Route**: `/contact`

Features:
- ✅ Form validation lengkap (React Hook Form + Zod)
- ✅ Email submission ke: `damassdev@gmail.com`
- ✅ Contact info cards (phone, email, address)
- ✅ FAQ section
- ✅ Loading & error states
- ✅ Success notification
- ✅ Responsive design

**Setup**: Lihat [docs/EMAIL_SETUP.md](./docs/EMAIL_SETUP.md)

### 2. 📊 Stats Counter dengan Animasi
**Location**: `src/components/home/StatsCounter.tsx`  
**Used in**: About page

Displays:
- 5000+ Happy Customers
- 250+ Active Vehicles
- 50+ Service Areas
- 98% Customer Satisfaction

**Customize**: Edit `STATS` array di component

## 🔧 Configuration

### Environment Variables

```env
# Supabase (required jika gunakan auth/database)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Optional
VITE_MAPBOX_TOKEN=your_mapbox_token
```

### Tailwind CSS

Customize di `tailwind.config.ts`:
- Colors
- Fonts
- Spacing
- Breakpoints
- Extensions

## 📁 Project Structure

```
drive-go/
├── src/
│   ├── components/          # Reusable components
│   │   ├── layout/          # Header, Footer
│   │   ├── home/            # Homepage components
│   │   ├── ui/              # Shadcn UI components
│   │   └── ...
│   │
│   ├── pages/               # Page components
│   │   ├── Index.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx      # (NEW)
│   │   ├── Catalog.tsx
│   │   ├── admin/
│   │   └── ...
│   │
│   ├── contexts/            # React Context
│   │   └── AuthContext.tsx
│   │
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilities
│   ├── api/                 # API calls
│   ├── data/                # Static data
│   ├── integrations/        # External services
│   │
│   ├── App.tsx              # Main component (routing)
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles
│   └── vite-env.d.ts
│
├── docs/                    # Documentation
│   ├── README.md            # Doc index
│   ├── DEVELOPER_GUIDE.md   # Development guide
│   ├── DEVELOPMENT.md       # Best practices
│   ├── COMPONENTS.md        # Components reference
│   └── EMAIL_SETUP.md       # Email form setup
│
├── public/                  # Static files
├── supabase/                # Supabase config
├── .env.example             # Env template
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # Tailwind config
├── vite.config.ts           # Vite config
├── package.json             # Dependencies
└── README.md                # This file
```

Untuk detail lengkap, lihat [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

## 💻 Development Workflow

### Before Starting
1. Read [docs/README.md](./docs/README.md)
2. Read [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
3. Explore folder structure

### During Development
1. Follow [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)
2. Use [docs/COMPONENTS.md](./docs/COMPONENTS.md) untuk reference
3. Check code examples

### Before Submitting PR
- [ ] Code follows conventions
- [ ] No console errors/warnings
- [ ] TypeScript types complete
- [ ] Responsive design tested
- [ ] ESLint passing: `npm run lint`
- [ ] Build successful: `npm run build`
- [ ] Update relevant documentation

## 🧪 Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 🚀 Deployment

### Build Production

```bash
npm run build

# Output di: dist/
```

### Deploy ke Vercel (Recommended)

```bash
npm install -g vercel
vercel
# Follow prompts
```

### Deploy ke Netlify

```bash
npm run build
# Upload dist/ folder ke Netlify
```

### Self-hosted

```bash
npm run build
# Deploy dist/ ke server Anda (nginx, apache, etc)
```

## 📱 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## ♿ Accessibility

Project ini memenuhi:
- ✅ WCAG 2.1 Level AA
- ✅ Semantic HTML
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast (4.5:1 minimum)
- ✅ Focus indicators

## 🐛 Troubleshooting

### Common Issues

**Q: Cannot find module '@/...'**
- A: Restart dev server, check tsconfig.json paths

**Q: Styles tidak apply**
- A: Gunakan Tailwind classes, bukan CSS files

**Q: Email form tidak bekerja**
- A: Setup Formspree di [docs/EMAIL_SETUP.md](./docs/EMAIL_SETUP.md)

**Q: Build fails**
- A: Check TypeScript errors, verify imports, `npm install`

Lebih banyak? Lihat [docs/DEVELOPER_GUIDE.md](./docs/README.md#-common-issues--solutions)

## 📚 Learning Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Shadcn UI](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)

## 🎓 New Developer Checklist

- [ ] Clone repository & setup
- [ ] Read documentation
- [ ] Explore project structure
- [ ] Run `npm run dev`
- [ ] Create feature branch
- [ ] Make changes
- [ ] Test locally
- [ ] Submit PR

## 📞 Support & Questions

- **📖 Docs**: [docs/README.md](./docs/README.md)
- **✉️ Email**: damassdev@gmail.com
- **🐛 Issues**: Create GitHub issue
- **💬 Chat**: [Your team chat/Slack]

## 📄 License

[Add your license here - MIT, Apache, etc]

## 👥 Team

**Project Lead**: Development Team  
**Maintainers**: Team Members  
**Contributors**: [Team members]

---

## 📊 Project Stats

- **Total Files**: 100+
- **Components**: 35+
- **Pages**: 18
- **Documentation Pages**: 5
- **Lines of Code**: 10,000+
- **Accessibility Score**: 90+
- **Last Updated**: 21 January 2026
- **Version**: 1.0
- **Status**: ✅ Production Ready

---

**Happy Coding! 🚀**

For more information, visit the [documentation](./docs/README.md)
=======
# FuadiRents-Project
Tugas Kelompok Pemrograman Website Kuliah
>>>>>>> 08438df4b87ad0c5916bbb96bf8f043f4593e9d8
