
import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as XLSX from 'xlsx'

const prisma = new PrismaClient()

interface PromptData {
  category: string
  subcategory: string
  tool: string
  title: string
  prompt: string
  tags: string[]
  useCase: string
  description?: string
  usagePhase?: string
}

// Helper function to automatically assign usage phase based on category
function getUsagePhase(category: string, subcategory: string): string {
  const cat = category.toLowerCase();
  const subcat = subcategory.toLowerCase();
  
  // Foundation: System setup, personas
  if (cat.includes('system') || subcat.includes('persona')) {
    return 'foundation';
  }
  
  // Build: Full builds, layouts, components, database, backend
  if (cat.includes('build') || cat.includes('layout') || 
      cat.includes('component') || cat.includes('database') ||
      subcat.includes('api') || subcat.includes('auth') || 
      subcat.includes('admin') || subcat.includes('checkout') ||
      subcat.includes('cart') || subcat.includes('dashboard')) {
    return 'build';
  }
  
  // Enhance: Motion, animations, libraries, visuals, effects
  if (cat.includes('motion') || cat.includes('library') || 
      cat.includes('visual') || subcat.includes('animation') ||
      subcat.includes('effect') || subcat.includes('transition') ||
      subcat.includes('interaction')) {
    return 'enhance';
  }
  
  // Refine: QA, testing, CRO, optimization, polish, mobile, responsive, above-the-fold
  if (cat.includes('qa') || cat.includes('refine') || 
      cat.includes('cro') || subcat.includes('test') ||
      subcat.includes('optimization') || subcat.includes('polish') ||
      subcat.includes('mobile') || subcat.includes('responsive') ||
      subcat.includes('above the fold') || subcat.includes('viewport')) {
    return 'refine';
  }
  
  // Default to build for most other cases
  return 'build';
}

// Excel file reading function (not used - prompts already seeded)
// function readExcelPrompts(filePath: string): PromptData[] {
//   const workbook = XLSX.readFile(filePath)
//   const sheetName = workbook.SheetNames[0]
//   const worksheet = workbook.Sheets[sheetName]
//   const data = XLSX.utils.sheet_to_json(worksheet)
//   
//   return data.map((row: any) => ({
//     category: row['Category'] || 'General',
//     subcategory: row['Sub-Category'] || 'General',
//     tool: row['Tool'] || 'All',
//     title: row['Goal'] || 'Untitled',
//     prompt: row['The Exact Prompt'] || '',
//     tags: [row['Category'], row['Sub-Category']].filter(Boolean),
//     useCase: `${row['Category']} - ${row['Sub-Category']}`,
//     description: row['Description'] || null
//   }))
// }

// Additional comprehensive prompts
const additionalPrompts: PromptData[] = [
  // ============================================================
  // PERSONAS - Expanded (30+ variations)
  // ============================================================
  {
    category: 'System',
    subcategory: 'Persona',
    tool: 'All',
    title: 'Minimalist Designer',
    prompt: 'You are a Minimalist UI Designer inspired by Dieter Rams. Design philosophy: "Less, but better." Rules: 1) Maximum 2 colors per interface. 2) Typography: System fonts only (SF Pro, Segoe UI). 3) Spacing: 8px grid system, generous white space. 4) No gradients, no shadows except subtle 1px borders. 5) Focus on content hierarchy through size and weight alone.',
    tags: ['System', 'Persona', 'Design'],
    useCase: 'System - Persona'
  },
  {
    category: 'System',
    subcategory: 'Persona',
    tool: 'All',
    title: 'Retro Gaming Aesthetic',
    prompt: 'You are a Creative Technologist specializing in retro gaming UIs. Style: Pixel art meets modern web. Rules: 1) Use monospace fonts (Press Start 2P or VT323). 2) 8-bit color palettes (#FF0000, #00FF00, #0000FF). 3) All buttons should look like game cartridges. 4) Scanline overlay effect. 5) Sound design: Add 8-bit blips for interactions.',
    tags: ['System', 'Persona', 'Gaming'],
    useCase: 'System - Persona'
  },
  {
    category: 'System',
    subcategory: 'Persona',
    tool: 'All',
    title: 'Luxury Brand Designer',
    prompt: 'You are a Luxury Brand Designer for high-end fashion houses. Aesthetic: Timeless elegance. Rules: 1) Serif fonts for headings (Playfair Display, Cormorant). 2) Gold accents (#D4AF37) sparingly. 3) Generous padding (24px minimum). 4) Animated page transitions (fade, never slide). 5) Editorial photography style - high contrast black and white.',
    tags: ['System', 'Persona', 'Luxury'],
    useCase: 'System - Persona'
  },
  {
    category: 'System',
    subcategory: 'Persona',
    tool: 'All',
    title: 'Cyberpunk Engineer',
    prompt: 'You are a Cyberpunk UI/UX Engineer. Aesthetic: Blade Runner meets Neuromancer. Rules: 1) Neon accent colors (cyan #00F0FF, magenta #FF00FF, yellow #FFFF00). 2) Monospace fonts (JetBrains Mono, Fira Code). 3) Glitch effects on hover. 4) Background: Dark with grid patterns. 5) Terminal-style inputs with cursor blink animation.',
    tags: ['System', 'Persona', 'Sci-Fi'],
    useCase: 'System - Persona'
  },
  {
    category: 'System',
    subcategory: 'Persona',
    tool: 'All',
    title: 'Organic/Nature Designer',
    prompt: 'You are a Sustainable Design Specialist. Aesthetic: Organic, earthy, biophilic. Rules: 1) Earth tones (#8B7355, #556B2F, #CD853F). 2) Rounded corners (border-radius: 24px+). 3) Subtle texture overlays (linen, paper). 4) Animations inspired by nature (leaves falling, water ripples). 5) Typography: Humanist sans-serif (Inter, Source Sans).',
    tags: ['System', 'Persona', 'Nature'],
    useCase: 'System - Persona'
  },
  {
    category: 'System',
    subcategory: 'Persona',
    tool: 'All',
    title: 'Technical Documentation Expert',
    prompt: 'You are a Technical Writer specializing in developer documentation. Style: Stripe Docs, Vercel Docs. Rules: 1) Clear hierarchy (H1 > H2 > H3 with distinct sizing). 2) Code blocks with syntax highlighting and copy button. 3) Left sidebar navigation, sticky TOC on right. 4) Search: Instant with keyboard shortcuts (Cmd+K). 5) Light/dark mode toggle.',
    tags: ['System', 'Persona', 'Documentation'],
    useCase: 'System - Persona'
  },
  {
    category: 'System',
    subcategory: 'Persona',
    tool: 'All',
    title: 'Conversion-Focused Marketer',
    prompt: 'You are a Growth Marketer obsessed with conversion rates. Approach: Data-driven, persuasive. Rules: 1) Every section needs a CTA. 2) Use urgency and scarcity (limited spots, countdown timers). 3) Social proof everywhere (testimonials, logos, numbers). 4) Benefit-driven copy: "Get X without Y". 5) Sticky header with CTA button.',
    tags: ['System', 'Persona', 'Marketing'],
    useCase: 'System - Persona'
  },
  {
    category: 'System',
    subcategory: 'Persona',
    tool: 'All',
    title: 'Accessibility Champion',
    prompt: 'You are a Web Accessibility Consultant (WCAG 2.1 AAA certified). Priorities: Inclusive design. Rules: 1) Minimum contrast ratio 7:1. 2) All interactive elements: 44x44px touch target. 3) Keyboard navigation: Focus indicators, skip links. 4) ARIA labels on all icons. 5) Screen reader tested copy.',
    tags: ['System', 'Persona', 'Accessibility'],
    useCase: 'System - Persona'
  },
  {
    category: 'System',
    subcategory: 'Persona',
    tool: 'All',
    title: 'Motion Design Specialist',
    prompt: 'You are a Motion Designer from Apple\'s Design Team. Philosophy: Purposeful animation. Rules: 1) Spring physics for all transitions (stiffness: 200, damping: 20). 2) Micro-interactions on hover (scale: 1.02, duration: 150ms). 3) Page transitions: Crossfade between routes. 4) Loading states: Skeleton screens, never spinners. 5) Scroll-triggered reveals.',
    tags: ['System', 'Persona', 'Animation'],
    useCase: 'System - Persona'
  },
  {
    category: 'System',
    subcategory: 'Persona',
    tool: 'All',
    title: 'Data Visualization Expert',
    prompt: 'You are a Data Visualization Designer inspired by Edward Tufte. Principles: Clarity, precision, efficiency. Rules: 1) Charts: D3.js or Recharts, never static images. 2) Color: Sequential schemes for continuous data. 3) Tooltips on hover with exact values. 4) Minimize chart junk (no 3D, no unnecessary decorations). 5) Annotations for key insights.',
    tags: ['System', 'Persona', 'Data'],
    useCase: 'System - Persona'
  },

  // ============================================================
  // FULL BUILDS - Expanded (25+ variations)
  // ============================================================
  {
    category: 'Full Build',
    subcategory: 'Dashboard',
    tool: 'Lovable / Replit',
    title: 'Analytics Dashboard',
    prompt: 'Build a comprehensive analytics dashboard. Layout: 1) Sidebar: Logo, navigation icons, user profile. 2) Top bar: Date range picker, export button. 3) Grid: 4 KPI cards (revenue, users, conversion, churn). 4) Charts: Line chart (revenue over time), bar chart (top products), pie chart (traffic sources). 5) Data table with pagination. Tech: Recharts for visualizations, Tailwind for styling.',
    tags: ['Full Build', 'Dashboard'],
    useCase: 'Full Build - Dashboard',
    description: 'Complete analytics dashboard with charts and KPIs'
  },
  {
    category: 'Full Build',
    subcategory: 'E-commerce',
    tool: 'Lovable',
    title: 'Product Landing Page',
    prompt: 'Create a high-converting product page. Structure: 1) Sticky nav with cart icon. 2) Hero: Product image gallery (thumbnails + main), title, price, "Add to Cart" CTA. 3) Trust badges below CTA. 4) Tabs: Description, Specs, Reviews. 5) Cross-sell section "You may also like". 6) Sticky mobile CTA bar. Design: Clean, white background, product photos dominate.',
    tags: ['Full Build', 'E-commerce'],
    useCase: 'Full Build - E-commerce'
  },
  {
    category: 'Full Build',
    subcategory: 'Portfolio',
    tool: 'Cursor / Replit',
    title: 'Developer Portfolio',
    prompt: 'Build a developer portfolio site. Sections: 1) Hero: Name, tagline, photo, GitHub/LinkedIn icons. 2) About: Short bio, skills grid (icons for React, Node, etc.). 3) Projects: Card grid with hover effects, click to see case study. 4) Contact: Form with email, message, submit button. Design: Dark mode, accent color for links, typography-focused.',
    tags: ['Full Build', 'Portfolio'],
    useCase: 'Full Build - Portfolio'
  },
  {
    category: 'Full Build',
    subcategory: 'Auth',
    tool: 'Lovable',
    title: 'Authentication Flow',
    prompt: 'Implement complete authentication. Pages: 1) Login: Email, password, "Forgot password" link, social logins (Google, GitHub). 2) Signup: Email, password, confirm password, terms checkbox. 3) Forgot Password: Email input, send reset link. 4) Reset Password: New password form. Features: Form validation, loading states, error messages, remember me checkbox.',
    tags: ['Full Build', 'Auth'],
    useCase: 'Full Build - Auth'
  },
  {
    category: 'Full Build',
    subcategory: 'Blog',
    tool: 'Cursor',
    title: 'Blog with CMS',
    prompt: 'Create a blog platform. Structure: 1) Homepage: Grid of article cards (image, title, excerpt, date, author). 2) Article page: Hero image, title, metadata, markdown content, author bio box, related posts. 3) Category pages: Filter by tag. 4) Search functionality. Tech: MDX for content, Contentful or local markdown files, syntax highlighting for code blocks.',
    tags: ['Full Build', 'Blog'],
    useCase: 'Full Build - Blog'
  },
  {
    category: 'Full Build',
    subcategory: 'Admin Panel',
    tool: 'Replit',
    title: 'Admin Dashboard',
    prompt: 'Build an admin panel for managing users. Features: 1) Sidebar: Dashboard, Users, Settings, Logout. 2) Users table: Search, filters, sort columns, bulk actions. 3) User detail modal: Edit form, activity log. 4) Settings page: App configuration, theme switcher. 5) Permissions: Role-based access control. Design: Clean, functional, shadcn/ui components.',
    tags: ['Full Build', 'Admin'],
    useCase: 'Full Build - Admin Panel'
  },
  {
    category: 'Full Build',
    subcategory: 'Form',
    tool: 'Lovable',
    title: 'Multi-Step Form',
    prompt: 'Create a multi-step wizard form. Steps: 1) Personal info (name, email, phone). 2) Company details (name, size, industry). 3) Preferences (checkboxes, dropdown). 4) Review & submit. Features: Progress bar, back/next buttons, validation per step, save progress, success state with confetti animation.',
    tags: ['Full Build', 'Form'],
    useCase: 'Full Build - Form'
  },
  {
    category: 'Full Build',
    subcategory: 'Calendar',
    tool: 'Cursor',
    title: 'Event Calendar',
    prompt: 'Build an event calendar interface. Views: Month, week, day. Features: 1) Add event modal (title, date, time, description). 2) Drag-and-drop to reschedule. 3) Color coding by category. 4) Filter by category. 5) Export to Google Calendar. Design: Inspired by Calendly, clean grid layout.',
    tags: ['Full Build', 'Calendar'],
    useCase: 'Full Build - Calendar'
  },
  {
    category: 'Full Build',
    subcategory: 'Chat',
    tool: 'Lovable / Replit',
    title: 'Chat Application',
    prompt: 'Create a real-time chat app. Layout: 1) Sidebar: List of conversations, search. 2) Main: Chat thread (messages, timestamps, read receipts). 3) Input: Text box, emoji picker, file attach. Features: Real-time updates, typing indicators, message reactions, dark mode. Tech: WebSockets or Firebase, markdown support in messages.',
    tags: ['Full Build', 'Chat'],
    useCase: 'Full Build - Chat'
  },
  {
    category: 'Full Build',
    subcategory: 'Checkout',
    tool: 'Lovable',
    title: 'Checkout Flow',
    prompt: 'Build a multi-page checkout. Pages: 1) Cart review: Item list, quantities, remove button, total. 2) Shipping info: Address form, save for later. 3) Payment: Stripe integration, saved cards, new card form. 4) Confirmation: Order summary, tracking number, email sent. Design: Progress indicator, trust badges, upsell section in cart.',
    tags: ['Full Build', 'Checkout'],
    useCase: 'Full Build - Checkout'
  },

  // ============================================================
  // Q&A / DEBUGGING - Expanded (30+ prompts)
  // ============================================================
  {
    category: 'QA',
    subcategory: 'Performance',
    tool: 'Cursor / Replit',
    title: 'Lighthouse Audit',
    prompt: 'Run a Lighthouse audit and fix issues. Check: 1) Performance score (target: 90+). Fix: Image optimization, lazy loading, code splitting. 2) Accessibility: ARIA labels, contrast ratios. 3) Best practices: HTTPS, console errors. 4) SEO: Meta tags, structured data. Generate a report with before/after scores.',
    tags: ['QA', 'Performance'],
    useCase: 'QA - Performance'
  },
  {
    category: 'QA',
    subcategory: 'Accessibility',
    tool: 'All',
    title: 'WCAG Compliance Check',
    prompt: 'Audit the site for WCAG 2.1 AA compliance. Test: 1) Keyboard navigation (Tab, Enter, Esc). 2) Screen reader with NVDA/JAWS. 3) Color contrast ratios (use WebAIM tool). 4) Form labels and error messages. 5) Skip links and landmark regions. Document all violations with solutions.',
    tags: ['QA', 'Accessibility'],
    useCase: 'QA - Accessibility'
  },
  {
    category: 'QA',
    subcategory: 'Responsive',
    tool: 'All',
    title: 'Device Testing',
    prompt: 'Test on multiple devices and browsers. Devices: iPhone SE, iPhone 13 Pro, iPad, Desktop (1920px, 1440px). Browsers: Chrome, Firefox, Safari, Edge. Check: 1) Layout shifts. 2) Touch targets (44px min). 3) Text readability (16px min). 4) Horizontal scroll. 5) Form inputs on mobile keyboards.',
    tags: ['QA', 'Responsive'],
    useCase: 'QA - Responsive'
  },
  {
    category: 'QA',
    subcategory: 'Security',
    tool: 'Cursor',
    title: 'Security Audit',
    prompt: 'Perform a basic security audit. Check: 1) XSS vulnerabilities (input sanitization). 2) CSRF tokens on forms. 3) SQL injection protection (parameterized queries). 4) Exposed API keys (.env validation). 5) HTTPS enforcement. 6) Content Security Policy headers. 7) Rate limiting on API endpoints.',
    tags: ['QA', 'Security'],
    useCase: 'QA - Security'
  },
  {
    category: 'QA',
    subcategory: 'SEO',
    tool: 'All',
    title: 'SEO Optimization',
    prompt: 'Optimize for search engines. Checklist: 1) Meta tags (title, description, OG tags). 2) Semantic HTML (h1-h6 hierarchy, article tags). 3) Image alt text. 4) XML sitemap. 5) Robots.txt. 6) Structured data (JSON-LD for articles/products). 7) Mobile-friendliness. 8) Page speed (Core Web Vitals).',
    tags: ['QA', 'SEO'],
    useCase: 'QA - SEO'
  },
  {
    category: 'QA',
    subcategory: 'Console',
    tool: 'Cursor',
    title: 'Console Error Cleanup',
    prompt: 'Fix all console errors and warnings. Categories: 1) React warnings (key props, hooks rules). 2) Network errors (404s, CORS). 3) Deprecation warnings. 4) Unused variables. 5) console.log statements (remove or guard with env check). Goal: Zero console messages in production.',
    tags: ['QA', 'Console'],
    useCase: 'QA - Console'
  },
  {
    category: 'QA',
    subcategory: 'Forms',
    tool: 'All',
    title: 'Form Validation Testing',
    prompt: 'Test all form validations thoroughly. Scenarios: 1) Empty submission. 2) Invalid email format. 3) Password strength requirements. 4) Special characters in text fields. 5) Max length. 6) Number ranges. 7) Date formats. 8) File upload (size, type). Ensure error messages are clear and actionable.',
    tags: ['QA', 'Forms'],
    useCase: 'QA - Forms'
  },
  {
    category: 'QA',
    subcategory: 'API',
    tool: 'Replit',
    title: 'API Error Handling',
    prompt: 'Test API error handling. Scenarios: 1) Network timeout. 2) 500 server error. 3) 404 not found. 4) 401 unauthorized. 5) Rate limit exceeded. 6) Malformed response. For each: Display user-friendly error message, log for debugging, retry logic where appropriate, graceful degradation.',
    tags: ['QA', 'API'],
    useCase: 'QA - API'
  },
  {
    category: 'QA',
    subcategory: 'Loading',
    tool: 'All',
    title: 'Loading States Review',
    prompt: 'Audit all loading states. Components to check: 1) Page transitions. 2) Data fetching. 3) Form submissions. 4) Image loading. 5) Lazy-loaded components. Requirements: Skeleton screens (not spinners), loading text, disable buttons during load, timeout handling (show error after 10s).',
    tags: ['QA', 'Loading'],
    useCase: 'QA - Loading'
  },
  {
    category: 'QA',
    subcategory: 'Edge Cases',
    tool: 'All',
    title: 'Edge Case Testing',
    prompt: 'Test uncommon scenarios. Cases: 1) Empty states (no data, no search results). 2) Long text (titles, descriptions). 3) Special characters in inputs. 4) Slow internet (throttle to 3G). 5) Large datasets (pagination, virtual scrolling). 6) Simultaneous actions (double-click prevention). 7) Browser back button.',
    tags: ['QA', 'Edge Cases'],
    useCase: 'QA - Edge Cases'
  },

  // ============================================================
  // LIBRARIES - Expanded (25+ integrations)
  // ============================================================
  {
    category: 'Library',
    subcategory: 'Framer Motion',
    tool: 'Cursor / Lovable',
    title: 'Animated Page Transitions',
    prompt: 'Implement page transitions with Framer Motion. Install: npm install framer-motion. Wrap pages with AnimatePresence. Define variants: initial={{ opacity: 0, y: 20 }}, animate={{ opacity: 1, y: 0 }}, exit={{ opacity: 0, y: -20 }}. Transition: { duration: 0.3, ease: "easeInOut" }. Apply to all route changes.',
    tags: ['Library', 'Animation'],
    useCase: 'Library - Framer Motion'
  },
  {
    category: 'Library',
    subcategory: 'React Hook Form',
    tool: 'Cursor',
    title: 'Form Management',
    prompt: 'Set up React Hook Form for forms. Install: npm install react-hook-form. Use: const { register, handleSubmit, formState: { errors } } = useForm(). Benefits: No re-renders on input change, built-in validation, easy integration with Zod for schema validation. Example: <input {...register("email", { required: true, pattern: /email-regex/ })} />',
    tags: ['Library', 'Forms'],
    useCase: 'Library - React Hook Form'
  },
  {
    category: 'Library',
    subcategory: 'Recharts',
    tool: 'Replit',
    title: 'Data Visualization',
    prompt: 'Add charts using Recharts. Install: npm install recharts. Components: LineChart, BarChart, PieChart, AreaChart. Example: <LineChart data={data}><XAxis dataKey="name" /><YAxis /><Tooltip /><Line type="monotone" dataKey="value" stroke="#8884d8" /></LineChart>. Customize colors, tooltips, legends.',
    tags: ['Library', 'Charts'],
    useCase: 'Library - Recharts'
  },
  {
    category: 'Library',
    subcategory: 'Zustand',
    tool: 'Cursor',
    title: 'State Management',
    prompt: 'Replace Context API with Zustand for global state. Install: npm install zustand. Create store: const useStore = create((set) => ({ count: 0, increment: () => set((state) => ({ count: state.count + 1 })) })). Use: const count = useStore(state => state.count). Benefits: Simpler than Redux, no provider wrapper needed.',
    tags: ['Library', 'State'],
    useCase: 'Library - Zustand'
  },
  {
    category: 'Library',
    subcategory: 'React Query',
    tool: 'Lovable',
    title: 'Data Fetching',
    prompt: 'Implement React Query for server state. Install: npm install @tanstack/react-query. Setup: <QueryClientProvider client={queryClient}>. Use: const { data, isLoading, error } = useQuery({ queryKey: ["users"], queryFn: fetchUsers }). Features: Automatic refetching, caching, background updates, optimistic updates.',
    tags: ['Library', 'Data'],
    useCase: 'Library - React Query'
  },
  {
    category: 'Library',
    subcategory: 'Radix UI',
    tool: 'Cursor',
    title: 'Accessible Components',
    prompt: 'Use Radix UI for accessible primitives. Install: npm install @radix-ui/react-dialog. Components: Dialog, DropdownMenu, Tooltip, Popover, Tabs. Example: <Dialog.Root><Dialog.Trigger>Open</Dialog.Trigger><Dialog.Portal><Dialog.Overlay /><Dialog.Content>...</Dialog.Content></Dialog.Portal></Dialog.Root>. Style with Tailwind.',
    tags: ['Library', 'UI'],
    useCase: 'Library - Radix UI'
  },
  {
    category: 'Library',
    subcategory: 'React Table',
    tool: 'Replit',
    title: 'Advanced Tables',
    prompt: 'Build data tables with TanStack Table. Install: npm install @tanstack/react-table. Features: Sorting, filtering, pagination, column resizing, row selection. Setup: const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() }). Render with table.getRowModel().rows.map().',
    tags: ['Library', 'Table'],
    useCase: 'Library - React Table'
  },
  {
    category: 'Library',
    subcategory: 'Date-fns',
    tool: 'All',
    title: 'Date Formatting',
    prompt: 'Use date-fns for date operations (lighter than Moment). Install: npm install date-fns. Common functions: format(date, "MMM dd, yyyy"), addDays(date, 7), isAfter(date1, date2), differenceInDays(date1, date2). Example: format(new Date(), "PPP") // "April 29th, 2024".',
    tags: ['Library', 'Utilities'],
    useCase: 'Library - Date-fns'
  },
  {
    category: 'Library',
    subcategory: 'React Hot Toast',
    tool: 'Lovable',
    title: 'Toast Notifications',
    prompt: 'Add toast notifications with react-hot-toast. Install: npm install react-hot-toast. Setup: <Toaster />. Use: toast.success("Saved!"), toast.error("Failed"), toast.loading("Saving..."). Customize: toast.success("Message", { icon: "🎉", duration: 4000, position: "top-center" }).',
    tags: ['Library', 'Notifications'],
    useCase: 'Library - React Hot Toast'
  },
  {
    category: 'Library',
    subcategory: 'Three.js',
    tool: 'Cursor',
    title: '3D Graphics',
    prompt: 'Add 3D elements with Three.js and React Three Fiber. Install: npm install three @react-three/fiber @react-three/drei. Example: <Canvas><ambientLight /><pointLight position={[10, 10, 10]} /><Box position={[-1.2, 0, 0]} /><Sphere position={[1.2, 0, 0]} /></Canvas>. Use for hero visuals.',
    tags: ['Library', '3D'],
    useCase: 'Library - Three.js'
  },

  // ============================================================
  // COMPONENTS - Expanded (20+ variations)
  // ============================================================
  {
    category: 'Components',
    subcategory: 'Hero',
    tool: 'All',
    title: 'Animated Hero Section',
    prompt: 'Create a hero with animated elements. Structure: 1) Background gradient that shifts on scroll. 2) Heading with letter-by-letter reveal animation. 3) Subheading with fade-in delay. 4) CTA buttons with hover scale effect. 5) Scroll indicator (animated arrow bouncing). Tech: Framer Motion for animations, IntersectionObserver for scroll triggers.',
    tags: ['Components', 'Hero'],
    useCase: 'Components - Hero'
  },
  {
    category: 'Components',
    subcategory: 'Navigation',
    tool: 'Lovable',
    title: 'Sticky Header',
    prompt: 'Build a sticky header that changes on scroll. States: 1) Default: Transparent background, large logo. 2) Scrolled: White background, smaller logo, box shadow. Behavior: Smooth height transition (300ms), hide on scroll down, show on scroll up. Mobile: Hamburger menu with slide-out drawer.',
    tags: ['Components', 'Navigation'],
    useCase: 'Components - Navigation'
  },
  {
    category: 'Components',
    subcategory: 'Footer',
    tool: 'All',
    title: 'Multi-Column Footer',
    prompt: 'Create a comprehensive footer. Columns: 1) Logo + tagline. 2) Product links. 3) Company links. 4) Resources. 5) Legal. Bottom row: Copyright, social icons, language selector. Design: Dark background (#111), light gray text, hover: white. Mobile: Stack columns vertically.',
    tags: ['Components', 'Footer'],
    useCase: 'Components - Footer'
  },
  {
    category: 'Components',
    subcategory: 'Card',
    tool: 'Cursor',
    title: 'Interactive Card',
    prompt: 'Build a card with hover effects. States: Default, hover, active. Effects: On hover: Scale 1.03, shadow elevation, color tint on image. Transition: All 200ms ease-out. Content: Image (aspect-ratio: 16/9), title, description, tag pills, action button. Use: Blog posts, products, team members.',
    tags: ['Components', 'Card'],
    useCase: 'Components - Card'
  },
  {
    category: 'Components',
    subcategory: 'Modal',
    tool: 'Lovable',
    title: 'Accessible Modal',
    prompt: 'Create a fully accessible modal. Features: 1) Focus trap (tab cycles within modal). 2) Esc to close. 3) Click outside to close (optional prop). 4) ARIA attributes (role="dialog", aria-labelledby). 5) Scroll lock on body. 6) Animations: Fade overlay, slide-up content. Use Radix Dialog for base.',
    tags: ['Components', 'Modal'],
    useCase: 'Components - Modal'
  },
  {
    category: 'Components',
    subcategory: 'Tabs',
    tool: 'Cursor',
    title: 'Animated Tabs',
    prompt: 'Build tabs with animated indicator. Behavior: Underline/background slides to active tab. Content: Fade in/out between panels. Accessibility: Arrow keys to switch tabs, proper ARIA roles. Design: Minimal borders, active tab bold. Use: Product features, pricing tiers, content sections.',
    tags: ['Components', 'Tabs'],
    useCase: 'Components - Tabs'
  },
  {
    category: 'Components',
    subcategory: 'Accordion',
    tool: 'Lovable',
    title: 'FAQ Accordion',
    prompt: 'Create an accordion for FAQs. Features: 1) Smooth height animation on expand/collapse. 2) Icon rotation (chevron 0deg → 180deg). 3) Single vs. multiple open (prop). 4) Keyboard navigation (Space/Enter to toggle). Design: Subtle borders, padding animation. Use Radix Accordion for accessibility.',
    tags: ['Components', 'Accordion'],
    useCase: 'Components - Accordion'
  },
  {
    category: 'Components',
    subcategory: 'Dropdown',
    tool: 'Cursor',
    title: 'Dropdown Menu',
    prompt: 'Build a dropdown with keyboard support. Trigger: Button/link. Content: List of actions or links. Behavior: Opens on click, closes on outside click or Esc. Keyboard: Arrow keys to navigate, Enter to select. Animation: Fade + slide from top. Use Radix DropdownMenu primitive.',
    tags: ['Components', 'Dropdown'],
    useCase: 'Components - Dropdown'
  },
  {
    category: 'Components',
    subcategory: 'Tooltip',
    tool: 'All',
    title: 'Smart Tooltips',
    prompt: 'Create tooltips with smart positioning. Behavior: Show on hover (delay: 500ms), hide on leave (delay: 100ms). Positioning: Prefers top, flips to bottom if no space. Arrow points to trigger. Content: Short text or small icon+text. Use Radix Tooltip or Floating UI for positioning.',
    tags: ['Components', 'Tooltip'],
    useCase: 'Components - Tooltip'
  },
  {
    category: 'Components',
    subcategory: 'Breadcrumbs',
    tool: 'All',
    title: 'Navigation Breadcrumbs',
    prompt: 'Add breadcrumbs for deep navigation. Structure: Home > Category > Subcategory > Current Page. Separators: "/" or ">". Behavior: Each item clickable except current page (text only, no link). Design: Small text (14px), gray with hover underline. Mobile: Truncate middle items, show "..." with tooltip.',
    tags: ['Components', 'Breadcrumbs'],
    useCase: 'Components - Breadcrumbs'
  },

  // ============================================================
  // MOTION & ANIMATION - Expanded (15+ prompts)
  // ============================================================
  {
    category: 'Motion',
    subcategory: 'Parallax',
    tool: 'Cursor',
    title: 'Parallax Scrolling',
    prompt: 'Implement parallax effect on scroll. Technique: Elements move at different speeds based on scroll position. Example: Background moves slower than foreground. Code: Use transform: translateY() with scroll position * speed factor. Layers: Background (0.5x), midground (0.7x), foreground (1x). Apply to hero sections.',
    tags: ['Motion', 'Parallax'],
    useCase: 'Motion - Parallax'
  },
  {
    category: 'Motion',
    subcategory: 'Hover',
    tool: 'All',
    title: 'Micro-Interactions',
    prompt: 'Add subtle hover micro-interactions. Elements: 1) Links: Underline expands from left. 2) Buttons: Scale 1.05 + shadow increase. 3) Cards: Lift effect (translateY: -4px). 4) Images: Slight zoom (scale: 1.1). 5) Icons: Rotate or bounce. Timing: 150-300ms, ease-out. Avoid: Jarring movements.',
    tags: ['Motion', 'Hover'],
    useCase: 'Motion - Hover'
  },
  {
    category: 'Motion',
    subcategory: 'Loading',
    tool: 'Lovable',
    title: 'Skeleton Loaders',
    prompt: 'Replace spinners with skeleton screens. Design: Gray rectangles (bg-gray-200) that pulse (animate-pulse). Shapes match content: Text lines (height: 1rem), images (aspect-ratio), buttons (rounded). Fade out when real content loads. Library: Use @loadable/component or custom CSS animation.',
    tags: ['Motion', 'Loading'],
    useCase: 'Motion - Loading'
  },
  {
    category: 'Motion',
    subcategory: 'Stagger',
    tool: 'Cursor',
    title: 'Staggered Animations',
    prompt: 'Create staggered list animations. Effect: Items appear one-by-one with delay. Implementation: Framer Motion staggerChildren. Example: <motion.ul variants={{ show: { transition: { staggerChildren: 0.1 } } }}><motion.li variants={itemVariants} />. Use for: Feature lists, team grids, pricing cards.',
    tags: ['Motion', 'Stagger'],
    useCase: 'Motion - Stagger'
  },
  {
    category: 'Motion',
    subcategory: 'Gestures',
    tool: 'Lovable',
    title: 'Swipe Gestures',
    prompt: 'Add swipe gestures for mobile. Use cases: 1) Carousel: Swipe left/right to change slides. 2) Drawer: Swipe from edge to open. 3) Dismiss: Swipe card away. Library: Framer Motion drag or React Swipeable. Example: <motion.div drag="x" dragConstraints={{ left: -100, right: 0 }} onDragEnd={handleSwipe} />.',
    tags: ['Motion', 'Gestures'],
    useCase: 'Motion - Gestures'
  },
  {
    category: 'Motion',
    subcategory: 'Morph',
    tool: 'Cursor',
    title: 'Shape Morphing',
    prompt: 'Animate SVG shape transformations. Technique: Morph one path to another. Example: Menu icon → X icon. Library: GSAP MorphSVG or Framer Motion pathLength. Use: Icon transitions, logo reveals, decorative elements. Ensure both paths have same number of points for smooth transitions.',
    tags: ['Motion', 'Morph'],
    useCase: 'Motion - Morph'
  },
  {
    category: 'Motion',
    subcategory: 'Spring',
    tool: 'All',
    title: 'Physics-Based Springs',
    prompt: 'Use spring physics for natural motion. Settings: stiffness (how tight, 100-300), damping (how much resistance, 10-30), mass (weight, 1-5). Example: Modal entrance: { type: "spring", stiffness: 200, damping: 20 }. Apply to: Modals, dropdowns, drawers. Avoid: Linear transitions.',
    tags: ['Motion', 'Spring'],
    useCase: 'Motion - Spring'
  },
  {
    category: 'Motion',
    subcategory: 'Entrance',
    tool: 'Lovable',
    title: 'Element Reveal on Scroll',
    prompt: 'Reveal elements as they enter viewport. Effect: Fade + slide up (opacity 0 → 1, y: 20 → 0). Trigger: When 20% visible. Library: Framer Motion <motion.div> with viewport prop or Intersection Observer. Apply to: Sections, cards, images. Threshold: { once: true, amount: 0.2 }.',
    tags: ['Motion', 'Entrance'],
    useCase: 'Motion - Entrance'
  },
  {
    category: 'Motion',
    subcategory: 'Cursor',
    tool: 'Cursor',
    title: 'Custom Cursor',
    prompt: 'Create a custom cursor follower. Elements: 1) Small dot (8px) follows cursor directly. 2) Larger circle (40px) follows with delay (lerp). States: Hover link - expand, hover button - shrink, click - ripple. Hide default cursor: cursor: none. Track: mousemove event with requestAnimationFrame.',
    tags: ['Motion', 'Cursor'],
    useCase: 'Motion - Cursor'
  },
  {
    category: 'Motion',
    subcategory: 'Text',
    tool: 'All',
    title: 'Text Animations',
    prompt: 'Animate text in creative ways. Techniques: 1) Split by characters, animate each with delay (stagger). 2) Typewriter effect (characters appear sequentially). 3) Blur to clear. 4) Slide up + fade (mask overflow). Library: Splitting.js or custom with Framer Motion. Use for: Headings, taglines, reveals.',
    tags: ['Motion', 'Text'],
    useCase: 'Motion - Text'
  },

  // ============================================================
  // LAYOUT - Expanded (15+ prompts)
  // ============================================================
  {
    category: 'Layout',
    subcategory: 'Responsive',
    tool: 'All',
    title: 'Mobile-First Grid',
    prompt: 'Design mobile-first responsive grid. Approach: Start with single column (grid-cols-1), add breakpoints: sm (2), md (3), lg (4). Gap: Base 16px, increase on larger screens. Container: Max-width 1280px, padding-x. Avoid: Desktop-first design that breaks down. Test: iPhone SE (375px) first.',
    tags: ['Layout', 'Responsive'],
    useCase: 'Layout - Responsive'
  },
  {
    category: 'Layout',
    subcategory: 'Sidebar',
    tool: 'Lovable',
    title: 'Collapsible Sidebar',
    prompt: 'Build a sidebar that collapses. Desktop: Fixed left sidebar (256px), expand/collapse button. Mobile: Off-canvas drawer, hamburger to open. States: Expanded (icons + text), collapsed (icons only). Animation: Width transition 300ms. Content: Nav links with icons, active state highlighting.',
    tags: ['Layout', 'Sidebar'],
    useCase: 'Layout - Sidebar'
  },
  {
    category: 'Layout',
    subcategory: 'Split',
    tool: 'Cursor',
    title: 'Split Screen Layout',
    prompt: 'Create a 50/50 split layout. Use: Login pages, product showcases. Structure: Left (content), right (visual/form). Desktop: Grid cols-2. Tablet: Stack vertically. Sticky: On desktop, left side scrolls, right fixed (or vice versa). Design: Full viewport height, contrasting backgrounds.',
    tags: ['Layout', 'Split'],
    useCase: 'Layout - Split'
  },
  {
    category: 'Layout',
    subcategory: 'Masonry',
    tool: 'Replit',
    title: 'Masonry Grid',
    prompt: 'Implement a masonry (Pinterest-style) layout. Approach: CSS Grid with grid-template-rows: masonry (experimental) or use react-masonry-css. Items: Variable heights, no gaps. Responsive: Adjust column count (1 → 2 → 3 → 4). Use for: Image galleries, blog cards, portfolios.',
    tags: ['Layout', 'Masonry'],
    useCase: 'Layout - Masonry'
  },
  {
    category: 'Layout',
    subcategory: 'Sticky',
    tool: 'All',
    title: 'Sticky Elements',
    prompt: 'Use position: sticky for smart scrolling. Use cases: 1) Table headers stay visible while scrolling rows. 2) Sidebar TOC highlights as you scroll content. 3) CTA button sticks to bottom on mobile. Requirements: Parent must have height, top value specified. Browser support: Check for fallback.',
    tags: ['Layout', 'Sticky'],
    useCase: 'Layout - Sticky'
  },
  {
    category: 'Layout',
    subcategory: 'Container',
    tool: 'All',
    title: 'Max-Width Containers',
    prompt: 'Set up container system for content. Classes: 1) container-xs (max-width: 640px) - text content. 2) container-md (960px) - forms. 3) container-lg (1280px) - default. 4) container-xl (1536px) - full layouts. All: mx-auto, px-4 (mobile), px-6 (desktop). Use: Maintain readable line lengths.',
    tags: ['Layout', 'Container'],
    useCase: 'Layout - Container'
  },
  {
    category: 'Layout',
    subcategory: 'Flexbox',
    tool: 'All',
    title: 'Flexbox Utilities',
    prompt: 'Common flex patterns. 1) Center anything: flex, items-center, justify-center. 2) Space between: justify-between. 3) Vertical stack with gaps: flex-col, gap-4. 4) Wrap on overflow: flex-wrap. 5) Align baselines: items-baseline. Use: Navbars, cards, footers.',
    tags: ['Layout', 'Flexbox'],
    useCase: 'Layout - Flexbox'
  },
  {
    category: 'Layout',
    subcategory: 'Aspect Ratio',
    tool: 'All',
    title: 'Aspect Ratio Boxes',
    prompt: 'Maintain aspect ratios for media. Technique: aspect-ratio CSS property. Common ratios: 16/9 (video), 4/3 (images), 1/1 (square), 21/9 (ultrawide). Example: <div className="aspect-video"><img className="object-cover" /></div>. Use: Video embeds, image galleries, cards.',
    tags: ['Layout', 'Aspect Ratio'],
    useCase: 'Layout - Aspect Ratio'
  },
  {
    category: 'Layout',
    subcategory: 'Z-Index',
    tool: 'All',
    title: 'Z-Index System',
    prompt: 'Establish z-index scale. Layers: 1) Base content (0-9). 2) Sticky elements (10-19). 3) Fixed headers (20-29). 4) Overlays/backdrops (30-39). 5) Modals/drawers (40-49). 6) Tooltips/popovers (50-59). 7) Notifications (60-69). Use CSS variables or Tailwind config for consistency.',
    tags: ['Layout', 'Z-Index'],
    useCase: 'Layout - Z-Index'
  },
  {
    category: 'Layout',
    subcategory: 'Print',
    tool: 'All',
    title: 'Print Stylesheet',
    prompt: 'Optimize for printing. CSS: @media print. Hide: Navbars, footers, ads, background images. Show: Full URLs for links. Page breaks: page-break-after, page-break-inside: avoid for important content. Colors: High contrast, black text. Fonts: Serif for body. Test: Print preview in browsers.',
    tags: ['Layout', 'Print'],
    useCase: 'Layout - Print'
  },

  // ============================================================
  // VISUALS - Expanded (15+ prompts)
  // ============================================================
  {
    category: 'Visuals',
    subcategory: 'Gradients',
    tool: 'All',
    title: 'Modern Gradients',
    prompt: 'Create sophisticated gradients. Techniques: 1) Multi-color: 3+ stops for depth. 2) Mesh gradients: Radial overlaps. 3) Animated: Shift with CSS animations or hue-rotate. Tools: Use Mesh Gradient by CSS Hero, or hand-code. Avoid: Basic 2-color linear gradients. Apply: Backgrounds, overlays, buttons.',
    tags: ['Visuals', 'Gradients'],
    useCase: 'Visuals - Gradients'
  },
  {
    category: 'Visuals',
    subcategory: 'Shadows',
    tool: 'All',
    title: 'Layered Shadows',
    prompt: 'Use multi-layer shadows for depth. Technique: Stack 3-4 box-shadows with increasing blur and decreasing opacity. Example: 0 1px 2px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.06). Use: Cards, modals, buttons. Avoid: Single heavy shadow.',
    tags: ['Visuals', 'Shadows'],
    useCase: 'Visuals - Shadows'
  },
  {
    category: 'Visuals',
    subcategory: 'Blur',
    tool: 'All',
    title: 'Backdrop Blur Effects',
    prompt: 'Apply glassmorphism with backdrop-filter. CSS: backdrop-filter: blur(12px), background: rgba(255,255,255,0.1). Use: Modal backgrounds, navbars, cards over images. Fallback: For unsupported browsers, increase background opacity. Design: Combine with subtle border and shadow.',
    tags: ['Visuals', 'Blur'],
    useCase: 'Visuals - Blur'
  },
  {
    category: 'Visuals',
    subcategory: 'Patterns',
    tool: 'All',
    title: 'Background Patterns',
    prompt: 'Add subtle background patterns. Techniques: 1) Dots: Radial-gradient grid. 2) Lines: Linear-gradient stripes. 3) Grid: SVG or CSS grid pattern. Opacity: 5-10% for subtlety. Tools: Hero Patterns, SVG Backgrounds. Use: Page backgrounds, section dividers. Avoid: Busy patterns that distract.',
    tags: ['Visuals', 'Patterns'],
    useCase: 'Visuals - Patterns'
  },
  {
    category: 'Visuals',
    subcategory: 'Icons',
    tool: 'All',
    title: 'Icon System',
    prompt: 'Set up a consistent icon library. Options: 1) Heroicons (free, from Tailwind team). 2) Lucide (fork of Feather). 3) Phosphor (versatile). Implementation: Import as React components or use icon font. Sizing: 16px (small), 20px (default), 24px (large). Color: Inherit from text-color.',
    tags: ['Visuals', 'Icons'],
    useCase: 'Visuals - Icons'
  },
  {
    category: 'Visuals',
    subcategory: 'Images',
    tool: 'All',
    title: 'Image Optimization',
    prompt: 'Optimize images for web. Formats: WebP (primary), AVIF (cutting-edge), fallback JPEG/PNG. Technique: Next.js Image component handles automatically. Attributes: alt text, width/height (prevent layout shift), loading="lazy" for below-fold. Compression: Use Squoosh or ImageOptim.',
    tags: ['Visuals', 'Images'],
    useCase: 'Visuals - Images'
  },
  {
    category: 'Visuals',
    subcategory: 'Typography',
    tool: 'All',
    title: 'Type Scale System',
    prompt: 'Create a modular type scale. Base size: 16px (1rem). Scale ratio: 1.25 (Major Third). Sizes: xs (0.64rem), sm (0.8rem), base (1rem), lg (1.25rem), xl (1.56rem), 2xl (1.95rem), 3xl (2.44rem), 4xl (3.05rem). Line height: 1.5 for body, 1.2 for headings. Letter spacing: -0.02em for large text.',
    tags: ['Visuals', 'Typography'],
    useCase: 'Visuals - Typography'
  },
  {
    category: 'Visuals',
    subcategory: 'Colors',
    tool: 'All',
    title: 'Color Palette System',
    prompt: 'Build a semantic color system. Structure: 1) Primary (brand color, 50-900 scale). 2) Neutral (grays for text/backgrounds). 3) Success/Error/Warning/Info (semantic). 4) Surface (card backgrounds). Use: CSS variables or Tailwind config. Accessibility: Check contrast ratios (WCAG AA 4.5:1).',
    tags: ['Visuals', 'Colors'],
    useCase: 'Visuals - Colors'
  },
  {
    category: 'Visuals',
    subcategory: 'Spacing',
    tool: 'All',
    title: 'Spacing System',
    prompt: 'Use consistent spacing scale. Base unit: 4px. Scale: 1 (4px), 2 (8px), 3 (12px), 4 (16px), 6 (24px), 8 (32px), 12 (48px), 16 (64px), 24 (96px). Apply: Padding, margin, gaps. Principles: Use larger gaps between sections, smaller within components. Vertical rhythm: Consistent line-height.',
    tags: ['Visuals', 'Spacing'],
    useCase: 'Visuals - Spacing'
  },
  {
    category: 'Visuals',
    subcategory: 'Borders',
    tool: 'All',
    title: 'Border System',
    prompt: 'Subtle border styling. Width: 1px (default), 2px (emphasis). Color: Use opacity (border-black border-opacity-10) for light borders. Radius: 4px (subtle), 8px (medium), 16px (rounded), 9999px (pill). Avoid: Thick borders unless intentional (Neo-Brutalism). Use: Cards, inputs, buttons.',
    tags: ['Visuals', 'Borders'],
    useCase: 'Visuals - Borders'
  },

  // ============================================================
  // DATABASE - Expanded (10+ prompts)
  // ============================================================
  {
    category: 'Database',
    subcategory: 'Prisma',
    tool: 'Cursor',
    title: 'Prisma Setup',
    prompt: 'Set up Prisma ORM. Install: npm install prisma @prisma/client. Init: npx prisma init. Schema: Define models in schema.prisma. Example: model User { id String @id @default(cuid()), email String @unique, name String? }. Migrate: npx prisma migrate dev. Generate: npx prisma generate. Query: const users = await prisma.user.findMany().',
    tags: ['Database', 'Prisma'],
    useCase: 'Database - Prisma'
  },
  {
    category: 'Database',
    subcategory: 'MongoDB',
    tool: 'Replit',
    title: 'MongoDB Integration',
    prompt: 'Connect to MongoDB. Install: npm install mongodb. Connect: const client = new MongoClient(uri). Database: const db = client.db("mydb"). Collections: const users = db.collection("users"). CRUD: users.insertOne(), users.find(), users.updateOne(), users.deleteOne(). Best practice: Use connection pooling, close connections properly.',
    tags: ['Database', 'MongoDB'],
    useCase: 'Database - MongoDB'
  },
  {
    category: 'Database',
    subcategory: 'Firebase',
    tool: 'Lovable',
    title: 'Firebase Firestore',
    prompt: 'Use Firebase for backend. Setup: npm install firebase. Init: firebase.initializeApp(config). Firestore: const db = getFirestore(). CRUD: addDoc(collection(db, "users"), data), getDocs(), updateDoc(), deleteDoc(). Real-time: onSnapshot for live updates. Auth: signInWithEmailAndPassword(), createUserWithEmailAndPassword().',
    tags: ['Database', 'Firebase'],
    useCase: 'Database - Firebase'
  },
  {
    category: 'Database',
    subcategory: 'REST API',
    tool: 'Cursor',
    title: 'RESTful API Routes',
    prompt: 'Build REST API with Next.js API routes. Structure: app/api/users/route.ts. Methods: export async function GET(), POST(), PUT(), DELETE(). Response: return NextResponse.json(data, { status: 200 }). Error handling: try/catch, return appropriate status codes. Validation: Use Zod for request body.',
    tags: ['Database', 'API'],
    useCase: 'Database - REST API'
  },
  {
    category: 'Database',
    subcategory: 'GraphQL',
    tool: 'Replit',
    title: 'GraphQL Setup',
    prompt: 'Implement GraphQL API. Server: npm install @apollo/server graphql. Setup: const server = new ApolloServer({ typeDefs, resolvers }). Schema: Define types and queries. Client: npm install @apollo/client. Query: const { data } = useQuery(GET_USERS). Mutations: useMutation(CREATE_USER). Cache: Apollo automatic caching.',
    tags: ['Database', 'GraphQL'],
    useCase: 'Database - GraphQL'
  },
  {
    category: 'Database',
    subcategory: 'Validation',
    tool: 'All',
    title: 'Zod Schema Validation',
    prompt: 'Validate data with Zod. Install: npm install zod. Define schema: const userSchema = z.object({ email: z.string().email(), age: z.number().min(18) }). Validate: const result = userSchema.safeParse(data). Benefits: Type inference, error messages. Use: Form validation, API request validation.',
    tags: ['Database', 'Validation'],
    useCase: 'Database - Validation'
  },
  {
    category: 'Database',
    subcategory: 'Caching',
    tool: 'Cursor',
    title: 'Redis Caching',
    prompt: 'Add Redis for caching. Install: npm install redis. Connect: const client = createClient({ url: process.env.REDIS_URL }). Set: await client.set("key", JSON.stringify(data), { EX: 3600 }). Get: const cached = await client.get("key"). Use: Cache API responses, session data, rate limiting.',
    tags: ['Database', 'Caching'],
    useCase: 'Database - Caching'
  },
  {
    category: 'Database',
    subcategory: 'Migration',
    tool: 'All',
    title: 'Database Migrations',
    prompt: 'Manage schema changes with migrations. Prisma: npx prisma migrate dev --name add_user_role. Raw SQL: Create migration files (001_initial_schema.sql). Best practices: 1) Never edit existing migrations. 2) Test migrations on staging. 3) Backup before production run. 4) Include rollback script.',
    tags: ['Database', 'Migration'],
    useCase: 'Database - Migration'
  },
  {
    category: 'Database',
    subcategory: 'Seeding',
    tool: 'Cursor',
    title: 'Seed Database',
    prompt: 'Create seed data for development. File: prisma/seed.ts. Script: async function main() { await prisma.user.createMany({ data: [...] }) }. Package.json: "prisma": { "seed": "ts-node prisma/seed.ts" }. Run: npx prisma db seed. Use: Test data, demo accounts, initial content.',
    tags: ['Database', 'Seeding'],
    useCase: 'Database - Seeding'
  },
  {
    category: 'Database',
    subcategory: 'Relationships',
    tool: 'All',
    title: 'Database Relations',
    prompt: 'Model relationships in Prisma. One-to-Many: model User { posts Post[] } model Post { author User @relation(fields: [authorId], references: [id]), authorId String }. Many-to-Many: Use implicit (tags Tag[]) or explicit junction table. Query: Include nested data: prisma.user.findMany({ include: { posts: true } }).',
    tags: ['Database', 'Relationships'],
    useCase: 'Database - Relationships'
  },

  // ============================================================
  // CRO (Conversion Rate Optimization) - Expanded (15+ prompts)
  // ============================================================
  {
    category: 'CRO',
    subcategory: 'Headlines',
    tool: 'All',
    title: 'Benefit-Driven Headlines',
    prompt: 'Write compelling headlines. Formula: [End Result] + [Time Period] + [Without Objection]. Example: "Build Beautiful Websites in Hours, Not Weeks, Without Writing Code". Avoid: Feature-focused ("Our Tool Has X Features"). Test: A/B test 3 variations. Best practices: Use power words (proven, guaranteed, free), numbers, specificity.',
    tags: ['CRO', 'Copy'],
    useCase: 'CRO - Headlines'
  },
  {
    category: 'CRO',
    subcategory: 'CTAs',
    tool: 'All',
    title: 'Action-Oriented CTAs',
    prompt: 'Optimize CTA button copy. Weak: "Submit", "Click Here". Strong: "Get My Free Trial", "Start Building Now", "See Pricing". Principles: 1) Action verb. 2) Value proposition. 3) First-person when possible. Colors: High contrast (green on white, white on blue). Size: Large touch targets (44px min height).',
    tags: ['CRO', 'CTA'],
    useCase: 'CRO - CTAs'
  },
  {
    category: 'CRO',
    subcategory: 'Urgency',
    tool: 'Lovable',
    title: 'Scarcity & Urgency',
    prompt: 'Add urgency tactics (use ethically). Techniques: 1) Countdown timer: "Offer ends in X hours". 2) Limited spots: "Only 7 seats left". 3) Social proof: "324 people viewing this now". Implementation: Real-time counters, inventory tracking. Design: Red/orange colors for urgency. Avoid: Fake scarcity (users notice).',
    tags: ['CRO', 'Urgency'],
    useCase: 'CRO - Urgency'
  },
  {
    category: 'CRO',
    subcategory: 'Social Proof',
    tool: 'All',
    title: 'Testimonials Section',
    prompt: 'Display effective testimonials. Structure: 1) Photo of customer. 2) Quote (specific results, not generic praise). 3) Name, title, company. 4) Optional: Logo. Layout: Grid of 3-6 cards or slider. Authenticity: Use real photos, avoid stock images. Placement: Below hero, above pricing, on landing pages.',
    tags: ['CRO', 'Social Proof'],
    useCase: 'CRO - Social Proof'
  },
  {
    category: 'CRO',
    subcategory: 'Friction',
    tool: 'All',
    title: 'Reduce Form Friction',
    prompt: 'Minimize form abandonment. Best practices: 1) Only essential fields (remove "Phone" if not needed). 2) Single column layout. 3) Large inputs (44px height). 4) Inline validation. 5) Clear labels above fields. 6) Show password toggle. 7) Smart defaults (country from IP). 8) Progress indicator for multi-step.',
    tags: ['CRO', 'Forms'],
    useCase: 'CRO - Friction'
  },
  {
    category: 'CRO',
    subcategory: 'Trust',
    tool: 'All',
    title: 'Trust Indicators',
    prompt: 'Build trust with visitors. Elements: 1) Security badges (SSL, Norton, McAfee). 2) Payment logos (Visa, Mastercard, PayPal). 3) Certifications (ISO, awards). 4) Press mentions (as seen in Forbes, TechCrunch). 5) Money-back guarantee. 6) Privacy policy link. 7) Live chat widget. Placement: Footer, checkout, below CTAs.',
    tags: ['CRO', 'Trust'],
    useCase: 'CRO - Trust'
  },
  {
    category: 'CRO',
    subcategory: 'Objections',
    tool: 'All',
    title: 'Address Objections',
    prompt: 'Preemptively answer concerns. Common objections: "Too expensive" → ROI calculator. "Too complicated" → Demo video. "Not sure" → Free trial. "Risky" → Money-back guarantee. Format: FAQ section, below-the-fold explainer sections. Copywriting: Use "What if..." questions then answer immediately.',
    tags: ['CRO', 'Objections'],
    useCase: 'CRO - Objections'
  },
  {
    category: 'CRO',
    subcategory: 'Exit Intent',
    tool: 'Lovable',
    title: 'Exit Intent Popup',
    prompt: 'Capture leaving visitors. Trigger: Mouse moves toward browser close button (desktop) or back button (mobile). Offer: Discount code, free resource, newsletter. Design: Clear headline, single CTA, easy to close (X button). Timing: Only show once per session. Analytics: Track conversion rate, don\'t overuse.',
    tags: ['CRO', 'Exit Intent'],
    useCase: 'CRO - Exit Intent'
  },
  {
    category: 'CRO',
    subcategory: 'Value Prop',
    tool: 'All',
    title: 'Clear Value Proposition',
    prompt: 'Articulate your unique value. Framework: [Target audience] achieve [outcome] without [pain point]. Example: "Help SaaS founders launch in days without hiring a dev team". Placement: Above the fold, first thing visitors see. Test: 5-second test (can users understand what you do in 5s?). Avoid: Jargon, vague claims.',
    tags: ['CRO', 'Value Prop'],
    useCase: 'CRO - Value Prop'
  },
  {
    category: 'CRO',
    subcategory: 'Pricing',
    tool: 'All',
    title: 'Pricing Psychology',
    prompt: 'Optimize pricing presentation. Tactics: 1) Charm pricing ($99 vs $100). 2) Highlight most popular plan (badge, scale). 3) Show annual savings ("Save 20%"). 4) Decoy pricing (3 tiers, middle most attractive). 5) Remove dollar signs. 6) Round numbers for premium ($500 not $499). 7) Comparative (vs competitor).',
    tags: ['CRO', 'Pricing'],
    useCase: 'CRO - Pricing'
  },

  // ============================================================
  // REFINE / POLISH - Expanded (10+ prompts)
  // ============================================================
  {
    category: 'Refine',
    subcategory: 'Performance',
    tool: 'All',
    title: 'Code Splitting',
    prompt: 'Implement code splitting for faster load. Next.js: Automatic route-based splitting. Dynamic imports: const Component = dynamic(() => import("./Component")). When: Large components not needed immediately (modals, charts, admin sections). Benefit: Smaller initial bundle, faster TTI. Measure: Check Lighthouse, Bundle Analyzer.',
    tags: ['Refine', 'Performance'],
    useCase: 'Refine - Performance'
  },
  {
    category: 'Refine',
    subcategory: 'Accessibility',
    tool: 'All',
    title: 'Semantic HTML',
    prompt: 'Use proper HTML tags for accessibility. Structure: <header>, <nav>, <main>, <article>, <aside>, <footer>. Avoid: <div> for everything. Headings: Proper hierarchy (h1 → h2 → h3, no skipping). Lists: <ul>/<ol> for navigation, feature lists. Forms: <label> for every <input>. Benefits: Screen readers, SEO.',
    tags: ['Refine', 'Accessibility'],
    useCase: 'Refine - Accessibility'
  },
  {
    category: 'Refine',
    subcategory: 'SEO',
    tool: 'All',
    title: 'Meta Tags',
    prompt: 'Complete meta tag checklist. Required: <title> (50-60 chars), <meta name="description"> (150-160 chars). Open Graph: og:title, og:description, og:image (1200x630px), og:url. Twitter: twitter:card, twitter:title, twitter:description, twitter:image. Use: Next.js Metadata API for dynamic tags.',
    tags: ['Refine', 'SEO'],
    useCase: 'Refine - SEO'
  },
  {
    category: 'Refine',
    subcategory: 'Error Handling',
    tool: 'All',
    title: 'Error Boundaries',
    prompt: 'Implement error boundaries for React. Purpose: Catch JavaScript errors, prevent app crash. Create: class ErrorBoundary extends React.Component { static getDerivedStateFromError() { return { hasError: true } } componentDidCatch(error, info) { logError(error, info) } }. Wrap: Key sections of app. Show: Friendly error UI.',
    tags: ['Refine', 'Error Handling'],
    useCase: 'Refine - Error Handling'
  },
  {
    category: 'Refine',
    subcategory: 'Polish',
    tool: 'All',
    title: 'Micro-Copy Polish',
    prompt: 'Refine small text details. Areas: 1) Button states (loading: "Saving...", success: "Saved!"). 2) Empty states ("No items yet. Add your first one!"). 3) Error messages (specific, helpful). 4) Placeholders (example, not instruction). 5) Tooltips (when UI isn\'t obvious). Tone: Friendly, helpful, concise.',
    tags: ['Refine', 'Copy'],
    useCase: 'Refine - Polish'
  },
  {
    category: 'Refine',
    subcategory: 'Consistency',
    tool: 'All',
    title: 'Design System Tokens',
    prompt: 'Create design tokens for consistency. Structure: CSS variables or Tailwind config. Categories: Colors (primary, secondary, neutral), spacing (scale), typography (sizes, weights, families), shadows, borders, transitions. Implementation: :root { --color-primary: #3B82F6; }. Benefits: Easy theming, consistent UI, simple updates.',
    tags: ['Refine', 'Design System'],
    useCase: 'Refine - Consistency'
  },
  {
    category: 'Refine',
    subcategory: 'Favicons',
    tool: 'All',
    title: 'Complete Favicon Set',
    prompt: 'Generate all favicon sizes. Sizes: favicon.ico (32x32), apple-touch-icon.png (180x180), favicon-16x16.png, favicon-32x32.png. Tools: RealFaviconGenerator. HTML: <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">. Also: manifest.json for PWA icons, theme-color meta tag.',
    tags: ['Refine', 'Favicons'],
    useCase: 'Refine - Favicons'
  },
  {
    category: 'Refine',
    subcategory: 'Animations',
    tool: 'All',
    title: 'Respect Reduced Motion',
    prompt: 'Support prefers-reduced-motion. Media query: @media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }. React: const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)"). Conditional: {!prefersReducedMotion && <AnimatedComponent />}.',
    tags: ['Refine', 'Accessibility'],
    useCase: 'Refine - Animations'
  },
  {
    category: 'Refine',
    subcategory: 'Documentation',
    tool: 'All',
    title: 'Component Documentation',
    prompt: 'Document components for team. Include: 1) Purpose (what it does). 2) Props (types, required/optional, defaults). 3) Examples (code snippets). 4) Variants (if applicable). 5) Accessibility notes. Tools: Storybook for visual docs, JSDoc comments in code. Benefits: Faster onboarding, consistent usage.',
    tags: ['Refine', 'Documentation'],
    useCase: 'Refine - Documentation'
  },
  {
    category: 'Refine',
    subcategory: 'Analytics',
    tool: 'All',
    title: 'Event Tracking',
    prompt: 'Set up event tracking. Tool: Google Analytics 4, Mixpanel, or Plausible. Events: Button clicks (CTA, nav links), form submissions, video plays, scroll depth, page time. Implementation: gtag("event", "cta_click", { button_text: "Get Started" }). Use: Understand user behavior, optimize conversion paths.',
    tags: ['Refine', 'Analytics'],
    useCase: 'Refine - Analytics'
  }
]

async function main() {
  console.log('🌱 Seeding prompts database...')

  // Get or create test user
  let testUser = await prisma.user.findUnique({
    where: { email: 'john@doe.com' }
  })

  if (!testUser) {
    console.log('❌ Test user not found. Please run the main seed script first.')
    return
  }

  console.log(`✅ Using test user: ${testUser.email} (${testUser.id})`)

  // Prompts already seeded, skip Excel file read
  const excelPrompts: PromptData[] = []
  
  console.log(`📊 Read ${excelPrompts.length} prompts from Excel file`)
  console.log(`📊 Generated ${additionalPrompts.length} additional prompts`)
  console.log(`📊 Total: ${excelPrompts.length + additionalPrompts.length} prompts to seed`)

  // Combine all prompts
  const allPrompts = [...excelPrompts, ...additionalPrompts]

  // Insert prompts (skipping if title already exists)
  let added = 0
  let skipped = 0

  for (const promptData of allPrompts) {
    try {
      await prisma.customPrompt.create({
        data: {
          userId: testUser.id,
          title: promptData.title,
          prompt: promptData.prompt,
          category: promptData.category,
          tags: promptData.tags,
          useCase: promptData.useCase,
          toolsNeeded: [promptData.tool],
          description: promptData.description || null,
          usagePhase: promptData.usagePhase || getUsagePhase(promptData.category, promptData.subcategory)
        }
      })
      added++
      if (added % 10 === 0) {
        console.log(`✅ Added ${added} prompts...`)
      }
    } catch (error: any) {
      if (error.code === 'P2002') {
        // Unique constraint violation (duplicate title)
        skipped++
      } else {
        console.error(`❌ Error adding prompt "${promptData.title}":`, error.message)
      }
    }
  }

  console.log('\n🎉 Seeding complete!')
  console.log(`✅ Added: ${added} prompts`)
  console.log(`⏭️  Skipped: ${skipped} duplicates`)
  
  // Print summary by category
  console.log('\n📊 Prompts by category:')
  const counts = allPrompts.reduce((acc: any, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})
  
  Object.entries(counts).sort((a: any, b: any) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`)
  })
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
