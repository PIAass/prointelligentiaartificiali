# Pro Intelligentia Artificiali (PIA) - Institutional Website

## Overview

This is an institutional showcase website for "Pro Intelligentia Artificiali" (PIA), a Swiss non-profit public utility association based in Ticino. The organization focuses on AI education, digital autonomy, and workforce development. The site serves as an information hub for their mission, events, courses, and consulting services, with a strong emphasis on privacy, local AI solutions, and ethical technology use.

The application is a full-stack TypeScript project with a React frontend and Express backend, using a file-based CMS (Markdown with frontmatter) for content management rather than a traditional database for most content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing with multi-language support (/:lang/* pattern)
- **State Management**: TanStack Query (React Query) for server state and data fetching
- **Styling**: TailwindCSS with shadcn/ui component library (New York style variant)
- **Internationalization**: Custom hook-based solution with JSON translation files supporting Italian (primary), German, French, and English
- **Design System**: Minimal "Swiss" aesthetic with accessibility focus, mobile-first approach, and custom CSS variables for theming

### Backend Architecture
- **Framework**: Express.js running on Node.js with TypeScript
- **Content System**: File-based CMS using Markdown/MDX files with YAML frontmatter stored in `/content/{lang}/{type}/` directories
- **API Design**: RESTful endpoints under `/api/` prefix for content retrieval and form submissions
- **Build Process**: Custom build script using esbuild for server bundling and Vite for client build

### Data Storage Solutions
- **Content Storage**: Markdown files organized by language and content type (blog, events, courses, projects, pages)
- **Database**: PostgreSQL with Drizzle ORM configured but minimally used in MVP (primarily for contact form submissions)
- **Session Storage**: In-memory storage for contact submissions with optional PostgreSQL persistence

### Key Design Patterns
- **Shared Types**: Common TypeScript types and Zod schemas in `/shared/` directory used by both frontend and backend
- **Path Aliases**: `@/` for client source, `@shared/` for shared code, `@assets/` for static assets
- **Component Architecture**: Reusable UI components from shadcn/ui with custom wrapper components (Card, Section, NeuralBackground)

## External Dependencies

### Core Dependencies
- **Database**: PostgreSQL (via `pg` driver) with Drizzle ORM for schema management and queries
- **Validation**: Zod for runtime type validation, integrated with Drizzle via `drizzle-zod`
- **Form Handling**: React Hook Form with `@hookform/resolvers` for Zod integration

### UI Framework
- **Component Library**: shadcn/ui built on Radix UI primitives (dialog, dropdown, tabs, toast, etc.)
- **Styling**: TailwindCSS with `class-variance-authority` for component variants
- **Icons**: Lucide React for system icons, react-icons for social media icons
- **Animations**: CSS-based animations, optional Framer Motion (noted in requirements)

### Content Rendering
- **Markdown**: `front-matter` package for parsing YAML frontmatter, `react-markdown` for rendering
- **Date Formatting**: date-fns library

### Development Tools
- **Bundling**: Vite for frontend, esbuild for backend production builds
- **TypeScript**: Strict mode enabled with bundler module resolution
- **Replit Integration**: Custom Vite plugins for error overlay, cartographer, and dev banner

### Environment Requirements
- `DATABASE_URL`: PostgreSQL connection string (required for database features)
- Node.js with ES modules support (`"type": "module"` in package.json)