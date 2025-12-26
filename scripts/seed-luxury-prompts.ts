
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface LuxuryPromptData {
  category: string;
  subcategory?: string;
  tool?: string;
  title: string;
  prompt: string;
  tags: string[];
  useCase: string;
  description?: string;
  usagePhase?: string;
}

// Helper function to automatically assign usage phase for luxury prompts
function getUsagePhase(category: string, subcategory: string = ''): string {
  const cat = category.toLowerCase();
  const subcat = subcategory.toLowerCase();
  
  // Foundation: Brand identity, typography systems
  if (subcat.includes('brand identity') || subcat.includes('typography')) {
    return 'foundation';
  }
  
  // Build: E-commerce, layouts, components
  if (subcat.includes('e-commerce') || subcat.includes('layout') || 
      subcat.includes('component') || subcat.includes('landing') ||
      subcat.includes('product display') || subcat.includes('content')) {
    return 'build';
  }
  
  // Enhance: Animations, effects, interactions
  if (subcat.includes('animation') || subcat.includes('effect') ||
      subcat.includes('interaction') || subcat.includes('clone')) {
    return 'enhance';
  }
  
  // Default to build for most luxury design cases
  return 'build';
}

const luxuryPrompts: LuxuryPromptData[] = [
  // ULTRA-LUXURY DESIGN PRINCIPLES
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Brand Identity',
    tool: 'Tailwind CSS',
    title: 'Black & Gold Luxury Color Palette System',
    prompt: `Create a sophisticated black and gold color palette system for an ultra-luxury brand. Use:
- Primary: Rich black (#000000, #0A0A0A, #121212)
- Accent: Multiple gold variations (#D4AF37, #FFD700, #B8860B, #DAA520)
- Neutral: Charcoal grays (#1A1A1A, #2A2A2A, #3A3A3A)
- White: Pure white for contrast (#FFFFFF, #FAFAFA)

Include CSS variables, Tailwind config, and usage guidelines. Add subtle gradients like 'from-black via-neutral-900 to-gold-900' for premium depth. Ensure WCAG AAA accessibility while maintaining luxury aesthetics.`,
    tags: ['luxury', 'color-palette', 'black-gold', 'branding', 'accessibility'],
    useCase: 'Establishing ultra-luxury brand color identity',
    description: 'Complete color system with black and gold variations for premium brands'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Typography',
    tool: 'Next.js + Google Fonts',
    title: 'Premium Serif Typography System',
    prompt: `Implement an elegant serif typography system for luxury brands using:
- Headlines: Playfair Display (900 weight), Cormorant Garamond (700)
- Body: Libre Baskerville (400, 700), Crimson Pro (300, 400, 600)
- Accent: Cinzel (for luxury product names), Bodoni Moda (for pricing)

Set up font loading with next/font/google, define type scale (xs: 12px to 9xl: 128px), letter-spacing for elegance (-0.02em to 0.05em), and line heights for readability. Include responsive font sizes and luxury-appropriate font pairings.`,
    tags: ['typography', 'luxury', 'serif-fonts', 'branding', 'readability'],
    useCase: 'Creating sophisticated typography for high-end brands',
    description: 'Complete serif font system with luxury aesthetics'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Layout',
    tool: 'Tailwind CSS',
    title: 'Generous Whitespace & Breathing Room',
    prompt: `Design a luxury layout system with generous whitespace and breathing room:
- Container max-widths: 1200px for content, 1600px for full-width
- Section padding: py-24 md:py-32 lg:py-40 (96px to 160px)
- Content spacing: space-y-16 md:space-y-24 (64px to 96px)
- Grid gaps: gap-12 md:gap-16 lg:gap-20 (48px to 80px)
- Asymmetric layouts with 60/40 or 70/30 splits

Use negative space strategically to create premium feel. Include examples of hero sections, product showcases, and editorial-style content layouts.`,
    tags: ['layout', 'whitespace', 'luxury', 'spacing', 'grid'],
    useCase: 'Creating spacious, premium layouts',
    description: 'Luxury spacing system with generous margins and padding'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Animation',
    tool: 'Framer Motion',
    title: 'Subtle Luxury Micro-Interactions',
    prompt: `Implement refined micro-interactions for luxury websites:
- Smooth hover transitions (duration: 0.6s, easing: cubic-bezier(0.4, 0, 0.2, 1))
- Elegant fade-ins with slight upward motion (y: 20 to 0)
- Product image reveals with scale effect (1.0 to 1.05)
- Text animations with staggered letter reveals
- Cursor-following gold particles or shimmer effects
- Smooth page transitions with fade and scale

Use Framer Motion variants, keep animations subtle and sophisticated (never jarring), prioritize performance. Include whileHover, whileTap, and scroll-triggered animations.`,
    tags: ['animation', 'micro-interactions', 'framer-motion', 'luxury', 'subtle'],
    useCase: 'Adding refined animations to luxury sites',
    description: 'Sophisticated micro-interactions for premium user experience'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Product Display',
    tool: 'Next.js + Image',
    title: 'High-End Product Showcase Grid',
    prompt: `Create an ultra-luxury product showcase with:
- Large, high-resolution product images (min 2000x2000px)
- Asymmetric grid layouts (Masonry or custom CSS Grid)
- Hover effects: subtle zoom (scale: 1.05), gold border reveal
- Product details overlay on hover (name, price in elegant typography)
- Black background with gold accents and dividers
- Lazy loading with blur-up placeholders
- Quick view modal with 360° product views

Use Next.js Image component, aspect-square containers, and ensure images are crisp on retina displays. Include price formatting with currency symbols.`,
    tags: ['product-display', 'luxury', 'ecommerce', 'grid-layout', 'images'],
    useCase: 'Showcasing luxury products elegantly',
    description: 'Premium product grid with sophisticated hover effects'
  },

  // FAMOUS LUXURY BRAND WEBSITE CLONES
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Brand Clones',
    tool: 'Next.js + Tailwind',
    title: 'Hermès Homepage Clone',
    prompt: `Recreate the Hermès website homepage with exact precision:
- Hero: Full-width video/image slider with minimal UI, centered logo
- Navigation: Top bar with category mega-menus, search, cart icons
- Typography: Sans-serif headlines (similar to Helvetica Neue), generous letter-spacing
- Color: Orange accent (#FF6600), black, white, beige backgrounds
- Product Grid: 3-column layout, large square images, hover zoom
- Footer: Multi-column with store locator, services, social links
- Animations: Smooth fade transitions between hero slides, subtle parallax

Use exact spacing, borders, and hover states. Include sticky header on scroll. Ensure mobile responsiveness with drawer navigation.`,
    tags: ['hermes', 'clone', 'luxury-brand', 'homepage', 'ecommerce'],
    useCase: 'Replicating Hermès website design',
    description: 'Exact replica of Hermès luxury website homepage'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Brand Clones',
    tool: 'Next.js + Framer Motion',
    title: 'Chanel Website Clone',
    prompt: `Clone the Chanel website with these signature elements:
- Hero: Full-screen cinematic video with muted autoplay, elegant overlay text
- Navigation: Clean top nav with black background, white text, category dropdowns
- Typography: Mix of bold sans-serif (Futura-like) and elegant serif
- Color: Pure black, white, with occasional gold accents
- Layout: Magazine-style editorial sections, alternating image/text blocks
- Product Cards: Minimal borders, centered product images, hover reveals details
- Animations: Fade-in on scroll, smooth transitions, video pause/play on hover
- Footer: Comprehensive services menu, newsletter signup, social icons

Match the minimalist elegance, spacing, and refined interactions. Include "Explore Collection" CTAs with gold underlines.`,
    tags: ['chanel', 'clone', 'luxury-brand', 'fashion', 'editorial'],
    useCase: 'Replicating Chanel website aesthetic',
    description: 'Precise clone of Chanel fashion website with editorial style'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Brand Clones',
    tool: 'Next.js + Swiper',
    title: 'Louis Vuitton Homepage Replica',
    prompt: `Recreate Louis Vuitton's signature website experience:
- Hero Carousel: Auto-rotating full-screen images, navigation dots, subtle transitions
- Navigation: Sticky header with logo center, categories left/right, icons (search/account/bag)
- Typography: Bold uppercase headlines, clean sans-serif body
- Color: Brown/tan signature colors (#4A3728), gold accents, white backgrounds
- Product Showcase: Horizontal scroll carousels, shadow effects, quick add
- Campaign Sections: Full-width imagery with text overlays, "Discover" CTAs
- Monogram Pattern: Subtle LV pattern backgrounds in certain sections
- Footer: Store locator, customer service, editorial links

Use Swiper.js for carousels, ensure smooth scrolling, implement bag/wishlist functionality. Match exact button styles and hover effects.`,
    tags: ['louis-vuitton', 'clone', 'luxury-brand', 'carousel', 'monogram'],
    useCase: 'Replicating Louis Vuitton website',
    description: 'Complete Louis Vuitton website clone with signature elements'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Brand Clones',
    tool: 'Next.js + Three.js',
    title: 'Rolex Website Clone with 3D',
    prompt: `Clone Rolex website with technical sophistication:
- Hero: Full-screen watch imagery, slow zoom animations, rotating 3D watch model
- Navigation: Black header, centered logo, minimal menu items, refined dropdowns
- Typography: Clean sans-serif (Helvetica/Arial), uppercase for emphasis
- Color: Green accent (#006039 Rolex green), black, white, gold details
- Watch Configurator: Interactive 3D watch builder with material/color options
- Technical Specs: Tabbed sections with precision engineering details
- Video Integration: High-quality brand videos with custom controls
- Parallax: Layered scrolling effects on landing sections

Use Three.js or Spline for 3D watch rendering, implement smooth scroll-jacking for storytelling, ensure performance optimization for heavy media.`,
    tags: ['rolex', 'clone', 'watches', '3d-model', 'technical'],
    useCase: 'Replicating Rolex luxury watch website',
    description: 'Rolex website clone with 3D watch configurator'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Brand Clones',
    tool: 'Next.js + Tailwind',
    title: 'Tiffany & Co. Website Replica',
    prompt: `Recreate Tiffany & Co.'s iconic blue luxury experience:
- Hero: Large jewelry images on signature Tiffany Blue background (#0abab5, #81D8D0)
- Navigation: White header, elegant menu, prominent search and bag icons
- Typography: Serif for headlines (Bodoni-like), sans-serif for body
- Color: Tiffany Blue, white, black, silver accents
- Product Grid: Clean white cards, jewelry on light backgrounds, hover zoom
- Gift Guide Sections: Curated collections with lifestyle imagery
- Engagement Ring Builder: Step-by-step customization flow
- Footer: Store appointments, services, gift wrap info

Implement the signature blue color accurately, use high-contrast white space, add elegant hover effects with subtle shadows. Include virtual try-on modal.`,
    tags: ['tiffany', 'clone', 'jewelry', 'tiffany-blue', 'luxury-brand'],
    useCase: 'Replicating Tiffany & Co. jewelry website',
    description: 'Tiffany & Co. website clone with signature blue branding'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Brand Clones',
    tool: 'Next.js + GSAP',
    title: 'Gucci Website Clone',
    prompt: `Clone Gucci's bold, maximalist luxury website:
- Hero: Bold campaign imagery, text overlays, video backgrounds
- Navigation: Logo left, categories center, icons right, red/green stripe accent
- Typography: Bold sans-serif headlines, mix of uppercase and sentence case
- Color: Red (#FF0000), green (#00A651), black, white, gold
- Product Display: Dense grid layouts, eclectic imagery, pattern mixing
- Editorial Content: Magazine-style articles, model photography, art direction
- Animations: Bold transitions, text reveals, image zoom on scroll
- Footer: Extensive links, sustainability info, social media

Use GSAP for dynamic animations, implement infinite scroll product grids, match Gucci's bold artistic direction. Include "Gucci Garden" interactive experience section.`,
    tags: ['gucci', 'clone', 'fashion', 'bold-design', 'maximalist'],
    useCase: 'Replicating Gucci fashion website',
    description: 'Gucci website clone with bold, artistic luxury aesthetic'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Brand Clones',
    tool: 'Next.js + Parallax',
    title: 'Cartier Website Replica',
    prompt: `Recreate Cartier's refined jewelry website:
- Hero: Elegant jewelry close-ups, soft lighting, slow-motion videos
- Navigation: Red accent (#C8102E Cartier red), white background, refined menu
- Typography: Elegant serif for headlines, clean sans-serif for body
- Color: Cartier red, black, white, platinum/silver tones
- Product Pages: Large imagery, 360° product views, detailed specs
- Heritage Section: Timeline of brand history, museum-quality imagery
- Watch Complications: Interactive diagrams of watch mechanisms
- Maison Section: Brand story, craftsmanship videos, atelier tours

Implement smooth parallax scrolling, use high-resolution jewelry photography, add zoom functionality for examining details. Include appointment booking for private viewings.`,
    tags: ['cartier', 'clone', 'jewelry', 'watches', 'heritage'],
    useCase: 'Replicating Cartier luxury jewelry website',
    description: 'Cartier website clone with refined elegance and craftsmanship focus'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Brand Clones',
    tool: 'Next.js + Video',
    title: 'Dior Website Clone',
    prompt: `Clone Dior's haute couture website experience:
- Hero: Full-screen runway video, fashion show footage, cinematic transitions
- Navigation: Gold accents, elegant menu, language/region selector
- Typography: Fashion-forward serif (Didot-like), uppercase headlines
- Color: Black, white, gold, occasional pastel accents
- Collection Pages: Large runway images, model photography, lookbook grids
- Product Detail: Multiple images, fabric descriptions, care instructions
- Fragrance Section: Bottle imagery, scent notes, ingredient storytelling
- Fashion Show Archive: Video gallery, behind-the-scenes content

Use Next.js video optimization, implement smooth fade transitions, add bag customization options (monogramming). Include virtual boutique tour.`,
    tags: ['dior', 'clone', 'fashion', 'haute-couture', 'runway'],
    useCase: 'Replicating Dior fashion house website',
    description: 'Dior website clone with haute couture elegance'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Brand Clones',
    tool: 'Next.js + WebGL',
    title: 'Rolls-Royce Website Replica',
    prompt: `Recreate Rolls-Royce Motor Cars website with automotive luxury:
- Hero: Full-screen car imagery, video tours, "Bespoke" prominence
- Navigation: Black header, minimal menu, "Build Your Rolls-Royce" CTA
- Typography: Elegant serif headlines, refined sans-serif body
- Color: Black, white, burgundy accents, chrome/metallic effects
- Car Configurator: 3D car viewer, color picker, interior customization
- Gallery: High-resolution photography, 360° studio views
- Bespoke Section: Custom craftsmanship stories, client testimonials
- Heritage: Timeline of automotive excellence, museum pieces

Use WebGL for 3D car rendering, implement smooth rotation/zoom controls, add material swatches for interior selection. Include dealer locator with appointment booking.`,
    tags: ['rolls-royce', 'clone', 'automotive', 'luxury-cars', '3d-configurator'],
    useCase: 'Replicating Rolls-Royce automotive website',
    description: 'Rolls-Royce website clone with 3D car configurator'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Brand Clones',
    tool: 'Next.js + Mapbox',
    title: 'Four Seasons Hotels Website Clone',
    prompt: `Clone Four Seasons luxury hotel website:
- Hero: Stunning property photography, "Explore Our Destinations" search
- Navigation: Gold accents, property search, offers, loyalty program
- Search: Date picker, guest selector, destination autocomplete
- Property Cards: Large images, location, starting rates, amenities icons
- Detail Pages: Photo galleries, room types, dining options, spa services
- Booking Flow: Multi-step process, room selection, add-ons, confirmation
- Map Integration: Interactive Mapbox map showing all properties
- Experiences: Curated activities, local attractions, seasonal offers

Implement date range picker, dynamic pricing, use high-quality hotel photography. Add 360° virtual tours and concierge chat widget.`,
    tags: ['four-seasons', 'clone', 'hotels', 'hospitality', 'booking'],
    useCase: 'Replicating Four Seasons hotel website',
    description: 'Four Seasons website clone with booking system'
  },

  // LUXURY UI COMPONENTS
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Components',
    tool: 'React + Tailwind',
    title: 'Premium Product Card with Gold Accents',
    prompt: `Create a luxury product card component:
- Card: Black background (bg-black), gold border on hover (border-gold-500)
- Image: aspect-square, object-cover, hover scale effect (scale-105)
- Typography: Product name in serif (Playfair Display), price in sans-serif
- Price: Gold color (#D4AF37), large font size, currency symbol
- Details: Subtle gray text for description, truncate at 2 lines
- Buttons: "Add to Cart" with gold background, "Quick View" with gold outline
- Badge: "New Arrival" or "Limited Edition" badge in gold
- Animation: Smooth transitions (duration-500), hover lift effect

Include wishlist heart icon, rating stars (gold), and stock indicator. Ensure mobile responsiveness.`,
    tags: ['component', 'product-card', 'luxury', 'ecommerce', 'gold'],
    useCase: 'Building luxury product cards',
    description: 'Premium product card with black and gold styling'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Components',
    tool: 'React + Framer Motion',
    title: 'Elegant Navigation Mega Menu',
    prompt: `Build a sophisticated mega menu for luxury brands:
- Trigger: Category links in top navigation with subtle underline on hover
- Dropdown: Full-width overlay with black background, gold accents
- Layout: Multi-column grid (3-4 columns), category sections with images
- Typography: Category headings in uppercase serif, links in sans-serif
- Images: Small product previews or lifestyle imagery for each section
- Animation: Fade-in with slide-down effect (y: -10 to 0), stagger children
- Featured: Highlighted "New Collection" or "Bestsellers" section
- CTA: "View All" links in gold at bottom of each column

Use Framer Motion for animations, implement keyboard navigation, add subtle hover effects on links. Include search bar in menu.`,
    tags: ['component', 'navigation', 'mega-menu', 'luxury', 'dropdown'],
    useCase: 'Creating luxury site navigation',
    description: 'Elegant mega menu with gold accents and animations'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Components',
    tool: 'React + Swiper',
    title: 'Luxury Hero Carousel with Video',
    prompt: `Create a premium hero carousel component:
- Slides: Full-screen height (h-screen), support for images and videos
- Video: Autoplay, muted, loop, poster image, subtle pause/play control
- Content: Centered text overlay with gradient backdrop
- Typography: Large serif headlines (text-6xl md:text-8xl), gold accent line
- Controls: Elegant navigation arrows (gold), progress dots at bottom
- Animation: Fade transitions between slides (duration-1000)
- CTA: Primary button (gold background), secondary button (gold outline)
- Autoplay: 5-second intervals, pause on hover

Use Swiper.js with pagination and navigation modules, implement lazy loading for performance. Ensure mobile-friendly controls.`,
    tags: ['component', 'carousel', 'hero', 'video', 'luxury'],
    useCase: 'Building luxury hero sections',
    description: 'Premium carousel with video support and gold accents'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Components',
    tool: 'React + React Hook Form',
    title: 'Refined Newsletter Signup Form',
    prompt: `Design an elegant newsletter signup component:
- Container: Black background, gold border (border-2), centered layout
- Headline: Serif font, "Join Our Exclusive Circle" or similar
- Input: Black background, gold border on focus, white text
- Button: Gold background, black text, hover scale effect
- Validation: Elegant error messages below input in gold/red
- Success: Thank you message with fade-in animation
- Privacy: Small link to privacy policy in gray
- Icon: Envelope icon or brand logo at top

Use React Hook Form for validation, implement email format check, add loading state with spinner. Include optional checkbox for SMS notifications.`,
    tags: ['component', 'form', 'newsletter', 'luxury', 'validation'],
    useCase: 'Creating luxury newsletter forms',
    description: 'Elegant newsletter signup with black and gold styling'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Components',
    tool: 'React + Tailwind',
    title: 'Premium Footer with Services',
    prompt: `Build a comprehensive luxury footer:
- Layout: 4-5 columns on desktop, accordion on mobile
- Sections: Shop, Services, About, Customer Care, Connect
- Typography: Column headers in uppercase serif, links in sans-serif
- Color: Black background, white text, gold hover effect on links
- Services: Store locator, personal shopping, gift wrapping, repairs
- Social: Gold icons for Instagram, Facebook, Pinterest, WeChat
- Newsletter: Inline signup form with gold button
- Bottom Bar: Copyright, payment icons, language/region selector
- Logo: Centered or left-aligned brand logo

Include "Back to Top" button (gold), legal links (Terms, Privacy), and accessibility statement. Ensure mobile-responsive with collapsible sections.`,
    tags: ['component', 'footer', 'navigation', 'luxury', 'services'],
    useCase: 'Creating comprehensive luxury footers',
    description: 'Premium footer with multi-column layout and gold accents'
  },

  // LUXURY E-COMMERCE FEATURES
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'E-Commerce',
    tool: 'Next.js + Stripe',
    title: 'High-End Shopping Cart Experience',
    prompt: `Create a luxury shopping cart with premium UX:
- Drawer: Slide-in from right, black background, gold accents
- Items: Large product images, name, variant details, quantity selector
- Price: Prominent gold pricing, subtotal, tax, shipping estimates
- Actions: Remove item (subtle icon), save for later (heart icon)
- Recommendations: "Complete the Look" suggestions at bottom
- CTA: Large "Proceed to Checkout" button in gold
- Empty State: Elegant message with "Continue Shopping" link
- Gift Options: Checkbox for gift wrap, message card input
- Promo Code: Expandable section for discount codes

Implement smooth animations for add/remove, use optimistic UI updates, integrate with Stripe for checkout. Include complimentary shipping threshold indicator.`,
    tags: ['ecommerce', 'shopping-cart', 'luxury', 'checkout', 'ux'],
    useCase: 'Building luxury shopping cart',
    description: 'Premium shopping cart with elegant UX and gold styling'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'E-Commerce',
    tool: 'Next.js + React',
    title: 'Virtual Personal Shopper Experience',
    prompt: `Build a virtual personal shopper feature:
- Quiz: Style quiz to understand preferences (formal vs. casual, colors, occasions)
- Results: Curated product recommendations based on answers
- Gallery: Grid of suggested items with "Add to Selection" buttons
- Stylist: Profile of dedicated stylist with contact option
- Appointment: Schedule video consultation or in-store visit
- Mood Board: Visual board showing curated looks and outfits
- Chat: Live chat with stylist for real-time advice
- Save: Ability to save and share curated selections

Use step-by-step flow with progress indicator, implement AI-powered recommendations, add calendar integration for appointments. Include before/after style transformation examples.`,
    tags: ['ecommerce', 'personal-shopper', 'luxury', 'curation', 'ai'],
    useCase: 'Creating virtual personal shopping experience',
    description: 'Virtual personal shopper with AI recommendations'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'E-Commerce',
    tool: 'Next.js + Three.js',
    title: 'Product Customization Studio',
    prompt: `Create a luxury product customization experience:
- 3D Viewer: Interactive 3D model of product (bag, shoe, watch)
- Material Selector: Swatches for leather types, colors, finishes
- Personalization: Monogram input, font selection, placement options
- Hardware: Options for metal finishes (gold, silver, rose gold)
- Preview: Real-time 3D updates as selections are made
- Summary: Sidebar showing selected options and price updates
- Save: Ability to save configuration and return later
- Share: Generate shareable link or image of custom design

Use Three.js or Spline for 3D rendering, implement color picker for materials, add realistic lighting and shadows. Include "Order Sample" option for high-end items.`,
    tags: ['ecommerce', 'customization', '3d-model', 'luxury', 'interactive'],
    useCase: 'Building product customization tools',
    description: '3D product customization studio with personalization'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'E-Commerce',
    tool: 'Next.js + Stripe',
    title: 'Exclusive Access & Waitlist System',
    prompt: `Implement a luxury waitlist and exclusive access feature:
- Landing: "Limited Edition" or "Coming Soon" product page
- Waitlist: Elegant form to join (email, phone, preferences)
- Confirmation: Thank you message with estimated availability
- Notifications: Email/SMS when product becomes available
- Priority Access: VIP customers get early access (tiered system)
- Timer: Countdown to next drop or restock
- Archive: Gallery of past limited editions with "sold out" labels
- Exclusivity Messaging: Emphasize scarcity and prestige

Use Stripe for payment holds or deposits, implement queue system, add social proof (X people waiting). Include style quiz to refine product fit.`,
    tags: ['ecommerce', 'waitlist', 'luxury', 'exclusivity', 'scarcity'],
    useCase: 'Creating exclusive access systems',
    description: 'Waitlist and priority access for limited edition products'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'E-Commerce',
    tool: 'Next.js + Vercel',
    title: 'Luxury Loyalty Program Dashboard',
    prompt: `Build a premium loyalty program interface:
- Dashboard: Personal overview with tier status (Silver, Gold, Platinum)
- Points: Visual display of current points, next tier requirements
- Rewards: Gallery of available rewards (products, experiences, services)
- Tier Benefits: Comparison table of benefits at each level
- Activity: Transaction history, points earned, rewards redeemed
- Exclusive Offers: Personalized offers based on purchase history
- Referral: Refer friends, earn bonus points
- Profile: Update preferences, contact info, birthday for gifts

Use progress bars for tier advancement, implement gamification elements, add "surprise and delight" bonuses. Include access to private sales and events.`,
    tags: ['ecommerce', 'loyalty-program', 'luxury', 'rewards', 'dashboard'],
    useCase: 'Building luxury loyalty programs',
    description: 'Premium loyalty program with tier system and rewards'
  },

  // LUXURY LANDING PAGES
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Landing Pages',
    tool: 'Next.js + GSAP',
    title: 'New Collection Launch Landing Page',
    prompt: `Create a dramatic new collection launch page:
- Hero: Full-screen video or image, collection name in large serif
- Teaser: Countdown timer to launch, "Notify Me" CTA
- Preview: Carousel of key pieces from collection
- Story: Brand narrative about inspiration and craftsmanship
- Lookbook: Magazine-style editorial images, model photography
- Details: Material descriptions, designer notes, sustainability info
- Pre-Order: Early access for VIP customers, deposit option
- Gallery: Masonry grid of campaign images

Use GSAP for scroll-triggered animations, implement video storytelling, add parallax effects. Include "Explore Collection" CTA with smooth scroll.`,
    tags: ['landing-page', 'collection-launch', 'luxury', 'campaign', 'animation'],
    useCase: 'Creating collection launch pages',
    description: 'Dramatic landing page for new luxury collection'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Landing Pages',
    tool: 'Next.js + Tailwind',
    title: 'Heritage & Craftsmanship Story Page',
    prompt: `Build a brand heritage and craftsmanship page:
- Hero: Atelier photography, craftspeople at work, "Since [Year]"
- Timeline: Interactive timeline of brand milestones and innovations
- Process: Step-by-step visualization of product creation
- Materials: High-quality imagery of raw materials and sourcing
- Artisans: Profiles of master craftspeople with photos and quotes
- Video: Documentary-style brand film about craftsmanship
- Museum: Virtual museum showcasing historical pieces
- Commitment: Sustainability, ethical sourcing, community impact

Use scroll-based animations to reveal timeline, implement lightbox for detailed images, add video testimonials from artisans. Include downloadable brand book or lookbook.`,
    tags: ['landing-page', 'heritage', 'craftsmanship', 'luxury', 'storytelling'],
    useCase: 'Creating brand heritage pages',
    description: 'Heritage page showcasing luxury brand craftsmanship'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Landing Pages',
    tool: 'Next.js + Three.js',
    title: 'Signature Product Feature Page',
    prompt: `Create a dedicated page for signature luxury product:
- Hero: 3D product model with 360° rotation, zoom functionality
- Variants: Color/material picker with instant 3D updates
- Features: Expandable sections highlighting unique features
- Specs: Technical specifications in elegant typography
- Gallery: Professional photography from multiple angles
- Video: Product in use, lifestyle context, detail close-ups
- Reviews: Curated testimonials from VIP customers
- Availability: Check store inventory, reserve for try-on

Use Three.js for 3D model, implement gesture controls (pinch to zoom), add hotspots on 3D model for feature callouts. Include AR try-on option.`,
    tags: ['landing-page', 'product-feature', '3d-model', 'luxury', 'interactive'],
    useCase: 'Creating signature product pages',
    description: 'Feature page for iconic luxury product with 3D model'
  },

  // LUXURY ANIMATIONS & EFFECTS
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Effects',
    tool: 'React + CSS',
    title: 'Gold Shimmer Hover Effect',
    prompt: `Create a subtle gold shimmer effect for luxury elements:
- Shimmer: Diagonal gradient sweep across element on hover
- Colors: Transparent to gold (#D4AF37 with opacity) back to transparent
- Animation: 1.5s duration, ease-in-out, optional infinite loop
- Application: Buttons, product cards, navigation links
- Performance: Use CSS transforms and will-change for GPU acceleration
- Variants: Vertical shimmer, radial shimmer from center
- Trigger: Hover, intersection observer for auto-shimmer on scroll

Implement using CSS keyframes or Framer Motion, ensure subtle and elegant (not flashy). Include optional particle trail effect.`,
    tags: ['animation', 'hover-effect', 'gold-shimmer', 'luxury', 'css'],
    useCase: 'Adding luxury shimmer effects',
    description: 'Elegant gold shimmer hover effect for luxury UI'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Effects',
    tool: 'React + Canvas',
    title: 'Luxury Cursor Trail Effect',
    prompt: `Implement a sophisticated custom cursor with trail:
- Cursor: Replace default cursor with custom design (gold ring/dot)
- Trail: Fading gold particles following cursor movement
- Hover States: Cursor expands/changes on interactive elements
- Animation: Smooth easing (cubic-bezier), particle fade-out
- Performance: Canvas-based rendering, requestAnimationFrame
- Options: Star trail, sparkle effect, or simple dot trail
- Accessibility: Disable for users who prefer reduced motion

Use Canvas API or CSS for rendering, implement pointer event listeners, optimize for 60fps. Include blend modes for glow effect.`,
    tags: ['animation', 'cursor-trail', 'luxury', 'interactive', 'canvas'],
    useCase: 'Creating luxury cursor effects',
    description: 'Custom cursor with gold particle trail effect'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Effects',
    tool: 'React + Framer Motion',
    title: 'Elegant Page Transition Animations',
    prompt: `Create smooth luxury page transitions:
- Transitions: Fade + scale, slide with fade, curtain wipe effect
- Duration: 600-800ms for elegance (not too fast)
- Easing: Custom cubic-bezier for smooth acceleration/deceleration
- Elements: Stagger child elements (images, text) for sequential reveal
- Loading: Elegant loading state (gold spinner, brand logo animation)
- Colors: Black background fades, gold accents appear
- Direction: Consider natural reading flow (top to bottom, left to right)

Use Framer Motion's AnimatePresence, implement layout animations, ensure no content flash. Include exit animations when leaving pages.`,
    tags: ['animation', 'page-transitions', 'luxury', 'framer-motion', 'smooth'],
    useCase: 'Adding luxury page transitions',
    description: 'Sophisticated page transition animations for luxury sites'
  },

  // LUXURY CONTENT SECTIONS
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Content Sections',
    tool: 'Next.js + Tailwind',
    title: 'Editorial Magazine-Style Section',
    prompt: `Design a magazine-style content section:
- Layout: Multi-column layout (2-3 columns), asymmetric grid
- Typography: Large serif headlines, drop caps for body text
- Images: Full-bleed images, portrait and landscape orientations
- Captions: Small italicized text below images
- Pull Quotes: Large serif quotes with gold accent lines
- Spacing: Generous line-height (1.8-2.0), wide paragraph margins
- Categories: Fashion, Lifestyle, Travel, Culture tags at top
- CTA: "Read More" links in gold with arrow icons

Use CSS columns or Grid for magazine layout, implement image lazy loading, add hover effects on article cards. Include date and author info.`,
    tags: ['content', 'editorial', 'magazine-layout', 'luxury', 'typography'],
    useCase: 'Creating editorial content sections',
    description: 'Magazine-style editorial section for luxury content'
  },
  {
    category: 'Ultra-Luxury Design',
    subcategory: 'Content Sections',
    tool: 'Next.js + Video',
    title: 'Brand Story Video Section',
    prompt: `Create an immersive brand story video section:
- Video: Full-width or full-screen brand film, cinematic aspect ratio
- Controls: Custom play/pause button (gold), progress bar, mute toggle
- Overlay: Text overlay with brand message, fade in/out
- Chapters: Multiple video segments with chapter navigation
- Captions: Subtitle support for accessibility
- CTA: "Explore Our Story" button appearing at end
- Background: Black or dark gradient around video
- Mobile: Responsive video player, touch controls

Use Next.js video optimization, implement custom controls styled to match brand, add poster image. Include transcript link for accessibility.`,
    tags: ['content', 'video', 'brand-story', 'luxury', 'cinematic'],
    useCase: 'Creating brand story video sections',
    description: 'Cinematic video section for luxury brand storytelling'
  },
];

async function main() {
  console.log('🌟 Starting luxury prompts seeding...');

  // Find or create test user
  const testUser = await prisma.user.findUnique({
    where: { email: 'john@doe.com' },
  });

  if (!testUser) {
    console.error('❌ Test user not found. Please run seed.ts first.');
    return;
  }

  console.log(`✅ Found user: ${testUser.email}`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const promptData of luxuryPrompts) {
    try {
      await prisma.customPrompt.create({
        data: {
          userId: testUser.id,
          title: promptData.title,
          prompt: promptData.prompt,
          category: promptData.category,
          tags: promptData.tags,
          useCase: promptData.useCase,
          toolsNeeded: promptData.tool ? [promptData.tool] : [],
          description: promptData.description || null,
          usagePhase: promptData.usagePhase || getUsagePhase(promptData.category, promptData.subcategory || ''),
        },
      });
      successCount++;
      console.log(`✅ Added: ${promptData.title}`);
    } catch (error: any) {
      if (error.code === 'P2002') {
        // Unique constraint violation - prompt already exists
        skipCount++;
        console.log(`⏭️  Skipped (already exists): ${promptData.title}`);
      } else {
        errorCount++;
        console.error(`❌ Error adding ${promptData.title}:`, error.message);
      }
    }
  }

  console.log('\n🎉 Luxury Prompts Seeding Complete!');
  console.log(`✅ Successfully added: ${successCount} prompts`);
  console.log(`⏭️  Skipped (duplicates): ${skipCount} prompts`);
  console.log(`❌ Errors: ${errorCount} prompts`);
  console.log(`📊 Total processed: ${luxuryPrompts.length} prompts`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
