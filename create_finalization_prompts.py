import pandas as pd
from openpyxl import load_workbook
from openpyxl.styles import Font, PatternFill, Alignment
import json

print("=" * 80)
print("CREATING PROJECT FINALIZATION & POLISH PROMPTS")
print("=" * 80)

# Create comprehensive finalization prompts
finalization_prompts = [
    # Mobile Optimization (5 prompts)
    {
        'Use Case': 'Comprehensive mobile responsiveness audit and fixes',
        'Prompt': '''Perform a complete mobile responsiveness audit and fix all issues:

1. Test all pages at breakpoints: 320px, 375px, 390px, 428px, 768px, 1024px
2. Check and fix:
   - Text readability (font sizes 16px minimum on mobile)
   - Touch targets (44x44px minimum)
   - Horizontal scrolling issues
   - Image scaling and aspect ratios
   - Navigation menu functionality
   - Form field usability on small screens
   - Table responsiveness (scroll or stack)
   - Modal/popup mobile behavior
3. Test portrait and landscape orientations
4. Verify tap/click events work on mobile
5. Check mobile browser compatibility (Safari, Chrome Mobile)
6. Fix any overlapping elements or z-index issues

Provide specific fixes for each issue found with code examples.''',
        'Category': 'Mobile Optimization',
        'Tool Compatibility': 'Lovable, Replit, Cursor, Bolt, Windsurf',
        'Prompt Type': 'Training Wheels',
        'Description/Notes': 'Comprehensive mobile audit for final polish. Test on actual devices if possible. Mobile accounts for 50%+ of traffic for most sites.'
    },
    {
        'Use Case': 'Mobile menu and navigation optimization',
        'Prompt': '''Optimize mobile navigation for final polish:

1. Hamburger menu improvements:
   - Smooth animation (300ms)
   - Close on link click or outside tap
   - Accessible close button with clear label
   - Prevent body scroll when menu is open
2. Touch-friendly navigation:
   - Larger tap targets (minimum 44x44px)
   - Visual feedback on tap/touch
   - Smooth transitions between states
3. Mobile-specific features:
   - Sticky header that hides on scroll down, shows on scroll up
   - Simplified menu structure (collapse nested items)
   - Call-to-action buttons prominently placed
4. Test and fix:
   - Submenu functionality on mobile
   - Touch gestures (swipe to close if applicable)
   - Deep linking to sections

Make navigation effortless on mobile devices.''',
        'Category': 'Mobile Optimization',
        'Tool Compatibility': 'Lovable, Replit, Cursor, v0, Bolt',
        'Prompt Type': 'Design',
        'Description/Notes': 'Mobile navigation is critical for user experience. Poor mobile nav is a top reason for high bounce rates.'
    },
    {
        'Use Case': 'Mobile performance optimization final checks',
        'Prompt': '''Optimize mobile performance for production:

1. Image optimization for mobile:
   - Serve smaller images on mobile breakpoints
   - Implement lazy loading for all images
   - Use WebP format with fallbacks
   - Compress images (aim for <200KB each)
2. Code optimization:
   - Minimize JavaScript bundles
   - Remove unused CSS
   - Defer non-critical JavaScript
   - Inline critical CSS
3. Mobile-specific optimizations:
   - Reduce server response time (<200ms)
   - Enable compression (gzip/brotli)
   - Implement service worker for offline access
   - Minimize redirects
4. Test mobile PageSpeed score (aim for 90+)

Provide specific optimizations with before/after metrics.''',
        'Category': 'Mobile Optimization & Performance',
        'Tool Compatibility': 'Replit, Cursor, Windsurf, Bolt',
        'Prompt Type': 'Training Wheels',
        'Description/Notes': 'Mobile performance directly impacts conversions. 1-second delay can reduce conversions by 7%.'
    },
    {
        'Use Case': 'Mobile form usability enhancement',
        'Prompt': '''Optimize all forms for mobile completion:

1. Input field improvements:
   - Appropriate input types (tel, email, number)
   - Autocomplete attributes for faster filling
   - Larger input fields (minimum 44px height)
   - Clear, visible labels
   - Helpful placeholder text
2. Mobile keyboard optimization:
   - Correct keyboard opens for each field type
   - Next/Submit button on keyboard
   - Proper tab order through fields
3. Error handling:
   - Inline validation with clear error messages
   - Error messages visible without scrolling
   - Success confirmation clear and prominent
4. Form UX:
   - Multi-step forms with progress indicator
   - Minimize required fields
   - Save progress option for long forms
   - One-click social autofill if applicable

Test form completion on actual mobile devices.''',
        'Category': 'Mobile Optimization & Forms',
        'Tool Compatibility': 'Lovable, Replit, Cursor, Bolt',
        'Prompt Type': 'Design',
        'Description/Notes': 'Mobile form completion rates can be 50% lower than desktop. Optimize aggressively for mobile.'
    },
    {
        'Use Case': 'Mobile touch interactions and gestures',
        'Prompt': '''Enhance mobile touch interactions throughout the site:

1. Touch target optimization:
   - Ensure all clickable elements are minimum 44x44px
   - Add adequate spacing between touch targets (8px minimum)
   - Make entire card/row clickable, not just text
2. Touch feedback:
   - Visual feedback on touch (highlight, scale, color change)
   - Haptic feedback for important actions (if supported)
   - Loading states for buttons after tap
3. Gesture support:
   - Swipe gestures for carousels/galleries
   - Pull-to-refresh where appropriate
   - Pinch-to-zoom for images
   - Long-press for additional options (if needed)
4. Prevent common issues:
   - Disable accidental double-tap zoom
   - Prevent text selection on buttons
   - Fix touch delay (use touch-action CSS)

Make touch interactions feel native and responsive.''',
        'Category': 'Mobile Optimization & Interactivity',
        'Tool Compatibility': 'Lovable, Replit, Cursor, Bolt',
        'Prompt Type': 'Design',
        'Description/Notes': 'Good touch interactions make mobile experience feel polished and professional.'
    },
    
    # Functionality Testing (5 prompts)
    {
        'Use Case': 'Comprehensive button and link functionality audit',
        'Prompt': '''Test every button and link on the site for functionality:

1. Audit checklist:
   - Test every button on every page (click and verify action)
   - Test all navigation links (internal and external)
   - Verify external links open in new tab with rel="noopener"
   - Check all form submit buttons work correctly
   - Test CTA buttons trigger correct actions
   - Verify download links work and file downloads
   - Test anchor links scroll to correct sections smoothly
2. Check for broken functionality:
   - Dead links (404 errors)
   - Buttons with no onClick handlers
   - Links pointing to wrong destinations
   - Disabled buttons that should be enabled
3. Verify states:
   - Hover states work on desktop
   - Active/pressed states visible
   - Disabled state styled appropriately
   - Loading states show when processing
4. Test edge cases:
   - Rapid clicking (prevent double submissions)
   - Button behavior when offline
   - Link behavior with browser back button

Create a spreadsheet of all interactive elements tested.''',
        'Category': 'Functionality Testing',
        'Tool Compatibility': 'All tools',
        'Prompt Type': 'Training Wheels',
        'Description/Notes': 'Broken buttons/links destroy credibility and conversions. Test everything before launch.'
    },
    {
        'Use Case': 'Form validation and submission testing',
        'Prompt': '''Thoroughly test all form functionality:

1. Validation testing:
   - Test each required field (try to submit without filling)
   - Test format validation (email, phone, URL, etc.)
   - Test character limits and minimum lengths
   - Verify error messages are clear and helpful
   - Test that errors show inline near fields
2. Submission testing:
   - Verify form submits successfully with valid data
   - Check submission confirmation (message, redirect, or email)
   - Test that form data reaches destination (email, database, CRM)
   - Verify form can't be submitted twice (disable after first submit)
3. Edge case testing:
   - Submit with special characters in fields
   - Test with very long input values
   - Try SQL injection attempts (security)
   - Test file uploads (size limits, file types)
4. User experience:
   - Test autofill functionality
   - Verify tab order through fields is logical
   - Check that success message is clear
   - Test form reset/clear functionality

Document all test cases and results.''',
        'Category': 'Functionality Testing & Forms',
        'Tool Compatibility': 'All tools',
        'Prompt Type': 'Training Wheels',
        'Description/Notes': 'Forms are critical conversion points. A broken form = lost leads/sales. Test exhaustively.'
    },
    {
        'Use Case': 'Interactive element functionality testing',
        'Prompt': '''Test all interactive elements for proper functionality:

1. Dropdowns and selects:
   - All options selectable
   - Selected value displays correctly
   - Can be cleared/reset if applicable
   - Works on mobile devices
2. Modals and popups:
   - Open/close correctly
   - Close on outside click or ESC key
   - Content displays properly
   - Scroll locked on body when modal open
   - Accessible (focus trap, keyboard nav)
3. Tabs and accordions:
   - All tabs/sections accessible
   - Content displays correctly when selected
   - Only one section open at a time (if accordion)
   - Active state clearly visible
4. Sliders and carousels:
   - Navigation arrows work (previous/next)
   - Dot indicators work
   - Auto-play functions correctly (with pause on hover)
   - Swipe gestures work on mobile
   - Images load properly
5. Other interactive elements:
   - Search functionality works
   - Filters apply correctly
   - Sort options function properly
   - Pagination works

Test across different browsers and devices.''',
        'Category': 'Functionality Testing',
        'Tool Compatibility': 'All tools',
        'Prompt Type': 'Training Wheels',
        'Description/Notes': 'Interactive elements engage users. Broken interactions frustrate users and increase bounce rates.'
    },
    {
        'Use Case': 'Cross-browser functionality testing',
        'Prompt': '''Test site functionality across major browsers:

1. Browser testing matrix:
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest, Mac and iOS)
   - Edge (latest)
   - Mobile browsers (Chrome Mobile, Safari iOS)
2. Test for each browser:
   - All buttons and links work
   - Forms submit correctly
   - CSS renders properly
   - JavaScript functions execute
   - Animations play smoothly
   - Media (images, videos) load correctly
3. Document browser-specific issues:
   - Layout differences
   - Feature support gaps
   - Performance variations
   - Console errors unique to browser
4. Implement fixes:
   - Add browser-specific CSS prefixes
   - Provide fallbacks for unsupported features
   - Use polyfills where needed
   - Test fixes in all browsers

Aim for consistent experience across all browsers.''',
        'Category': 'Functionality Testing & Compatibility',
        'Tool Compatibility': 'All tools',
        'Prompt Type': 'Training Wheels',
        'Description/Notes': 'Different browsers render differently. Safari especially requires thorough testing. Test on real devices.'
    },
    {
        'Use Case': 'User flow and navigation testing',
        'Prompt': '''Test complete user journeys through the site:

1. Map critical user flows:
   - Homepage → Product/Service → Contact/Purchase
   - Blog post → Related content → Newsletter signup
   - Landing page → Lead capture → Thank you page
2. Test each flow end-to-end:
   - All links work along the path
   - Navigation is intuitive
   - No dead ends or confusing redirects
   - Back button works properly
   - Progress is saved if applicable
3. Test from different entry points:
   - Direct URL entry
   - Search engine landing
   - Social media links
   - Email campaign links
4. Verify conversion points:
   - CTAs are visible and working
   - Forms submit successfully
   - Payment processing works (if e-commerce)
   - Confirmation/thank you pages display
5. Test error scenarios:
   - 404 page has helpful navigation
   - Error messages guide users back on track
   - Failed form submissions show clear instructions

Document the complete user experience.''',
        'Category': 'Functionality Testing & UX',
        'Tool Compatibility': 'All tools',
        'Prompt Type': 'Strategy',
        'Description/Notes': 'User flow testing ensures visitors can complete goals. Map and test all critical conversion paths.'
    },
    
    # Design Enhancement (5 prompts)
    {
        'Use Case': 'Visual design polish and refinement',
        'Prompt': '''Refine visual design for award-winning polish:

1. Visual hierarchy enhancement:
   - Ensure clear focal points on each section
   - Improve heading size contrast (H1 significantly larger than H2, etc.)
   - Add strategic white space around important elements
   - Guide eye flow with visual cues (arrows, colors, spacing)
2. Color refinement:
   - Ensure sufficient contrast ratios (WCAG AA: 4.5:1 for text)
   - Create cohesive color palette with brand colors
   - Use color strategically for CTAs (high contrast)
   - Ensure consistency across all pages
3. Typography polish:
   - Optimize line-height (1.5-1.7 for body text)
   - Perfect letter-spacing for headings
   - Ensure readable font sizes (16px minimum for body)
   - Limit to 2-3 font families maximum
4. Visual consistency:
   - Consistent button styles throughout
   - Uniform spacing system (8px or 4px grid)
   - Consistent border radius values
   - Aligned elements (use grid/flexbox)
5. Micro-improvements:
   - Add subtle shadows for depth
   - Smooth rounded corners on appropriate elements
   - Consistent icon style (all outline or all filled)

Make every pixel intentional.''',
        'Category': 'Design Enhancement',
        'Tool Compatibility': 'Lovable, Replit, Figma, v0, Cursor',
        'Prompt Type': 'Design',
        'Description/Notes': 'Visual polish separates good from great. Small details create perception of quality and professionalism.'
    },
    {
        'Use Case': 'Modern design trends implementation',
        'Prompt': '''Modernize the design with current 2025 trends:

1. Contemporary design elements:
   - Glassmorphism effects on cards/sections (subtle blur + transparency)
   - Smooth gradient backgrounds (not harsh gradients)
   - Organic shapes and blob backgrounds
   - Micro-animations on scroll and hover
   - Dark mode support (toggle or system preference)
2. Layout modernization:
   - Generous white space (don't cram content)
   - Asymmetric layouts for visual interest
   - Overlapping elements for depth
   - Large, bold typography for headings
   - Grid-based layouts with creative breaks
3. Interactive elements:
   - Smooth scroll animations (fade in, slide in)
   - Hover effects on cards (lift, glow, scale)
   - Cursor-following elements (subtle)
   - Parallax scrolling on hero sections
   - Loading states with skeleton screens
4. Visual effects:
   - Subtle gradient overlays on images
   - Soft box shadows (avoid harsh shadows)
   - Smooth transitions (300-400ms)
   - Backdrop filters for depth
5. Keep it tasteful:
   - Don't overdo animations
   - Maintain fast performance
   - Ensure accessibility isn't compromised

Make the design feel current and premium.''',
        'Category': 'Design Enhancement & Modernization',
        'Tool Compatibility': 'Lovable, Replit, Cursor, v0, Bolt',
        'Prompt Type': 'Design',
        'Description/Notes': 'Modern design creates trust and positions brand as current. Balance trends with timeless principles.'
    },
    {
        'Use Case': 'Award-winning design element suggestions',
        'Prompt': '''Suggest and implement award-winning design enhancements:

1. Hero section upgrades:
   - Large, impactful headline with motion blur or split-text animation
   - High-quality hero image or video background
   - Subtle particle effects or animated gradients
   - Strong CTA with hover animation
   - Scroll indicator with smooth animation
2. Visual storytelling:
   - Add data visualization for statistics
   - Implement scroll-triggered number counters
   - Create timeline for company story or process
   - Add before/after comparisons (slider)
   - Use case studies with compelling visuals
3. Interactive elements:
   - Hover reveal for additional information
   - Animated icons that respond to scroll
   - Interactive comparison tools
   - 3D product viewers or mockups
   - Video testimonials with play on hover
4. Unique design touches:
   - Custom illustrations matching brand
   - Animated SVG icons
   - Morphing shapes between sections
   - Creative section transitions
   - Signature brand element repeated tastefully
5. Awwwards-inspired features:
   - Smooth page transitions
   - Creative cursor effects (only where it enhances)
   - Horizontal scroll sections (use sparingly)
   - Parallax depth effects
   - Cinematic spacing and pacing

Reference specific award-winning sites for inspiration.''',
        'Category': 'Design Enhancement & Excellence',
        'Tool Compatibility': 'Lovable, Replit, ChatGPT, Figma, Cursor',
        'Prompt Type': 'Design',
        'Description/Notes': 'Award-winning elements create memorable experiences. Balance creativity with usability and performance.'
    },
    {
        'Use Case': 'Image and media optimization for visual impact',
        'Prompt': '''Optimize all images and media for maximum visual impact:

1. Image quality enhancement:
   - Use high-resolution images (2x for retina displays)
   - Ensure images are properly cropped and framed
   - Apply subtle filters for consistency
   - Compress without visible quality loss (<200KB ideally)
   - Use WebP format with JPG fallback
2. Image presentation:
   - Add subtle hover effects (zoom, overlay)
   - Implement lazy loading for performance
   - Use proper aspect ratios (no stretching)
   - Add image captions where helpful
   - Implement lightbox for galleries
3. Hero images/videos:
   - Optimize hero images for fast loading
   - Compress videos heavily (aim for <5MB)
   - Add poster frame for videos
   - Implement autoplay with mute (if appropriate)
   - Provide pause/play controls
4. Background images:
   - Optimize large background images
   - Use CSS background-size: cover properly
   - Add overlay for text readability
   - Implement parallax tastefully
5. Icons and graphics:
   - Use SVG for icons (scalable, smaller size)
   - Ensure consistent icon style
   - Add meaningful alt text for accessibility
   - Optimize icon sizes for performance

Make every image purposeful and optimized.''',
        'Category': 'Design Enhancement & Media',
        'Tool Compatibility': 'Lovable, Replit, Cursor, Figma',
        'Prompt Type': 'Design',
        'Description/Notes': 'Images are powerful but often the heaviest assets. Optimize for both impact and performance.'
    },
    {
        'Use Case': 'Spacing and layout consistency refinement',
        'Prompt': '''Perfect spacing and layout consistency across the site:

1. Implement spacing system:
   - Use consistent spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
   - Apply spacing system to margins and padding
   - Use CSS custom properties for spacing values
   - Ensure consistent section spacing
2. Layout alignment:
   - Align all text to baseline grid where possible
   - Center-align elements properly
   - Ensure buttons align horizontally
   - Verify images align with grid
3. Container widths:
   - Consistent max-width for content (1280px typical)
   - Proper padding on mobile (16px minimum)
   - Symmetric padding on larger screens
   - Breakpoint consistency
4. Visual rhythm:
   - Consistent heading spacing (margin-top larger than margin-bottom)
   - Paragraph spacing optimal for readability
   - Section spacing creates clear separation
   - List item spacing consistent
5. Grid system:
   - Use CSS Grid or Flexbox consistently
   - Ensure responsive behavior is predictable
   - Verify no layout shifts on load
   - Test all breakpoints for layout consistency

Create visual harmony through consistent spacing.''',
        'Category': 'Design Enhancement & Consistency',
        'Tool Compatibility': 'Lovable, Replit, Cursor, v0, Bolt',
        'Prompt Type': 'Design',
        'Description/Notes': 'Consistent spacing is the foundation of professional design. Use a spacing system religiously.'
    },
    
    # Conversion Optimization (4 prompts)
    {
        'Use Case': 'Conversion rate optimization audit and improvements',
        'Prompt': '''Analyze and optimize for maximum conversions:

1. CTA optimization:
   - Make primary CTAs highly visible (contrasting colors)
   - Use action-oriented text ("Get Started Free" vs "Submit")
   - Ensure CTAs above the fold on key pages
   - Add urgency where appropriate (limited time, spots)
   - Test multiple CTA placements
2. Reduce friction:
   - Minimize form fields (ask only essential info)
   - Remove unnecessary navigation from landing pages
   - Add trust signals near CTAs (security badges, testimonials)
   - Simplify checkout process
   - Offer guest checkout (if e-commerce)
3. Build trust:
   - Add prominent testimonials with photos
   - Show client logos prominently
   - Display security badges on forms
   - Add guarantee/return policy clearly
   - Show real-time social proof (if available)
4. Improve value proposition:
   - Make benefits crystal clear in headline
   - Use bullet points for key features/benefits
   - Add comparison table if appropriate
   - Highlight unique selling points
   - Show pricing/value upfront (no hidden costs)
5. Address objections:
   - Add FAQ section near CTAs
   - Provide live chat or easy contact
   - Show money-back guarantee
   - Offer free trial or demo
   - Display return/cancellation policy

Implement A/B testing for key changes.''',
        'Category': 'Conversion Optimization',
        'Tool Compatibility': 'Lovable, Replit, ChatGPT, Figma',
        'Prompt Type': 'Strategy',
        'Description/Notes': 'Small CRO improvements can have massive impact. Even 1% improvement compounds over time.'
    },
    {
        'Use Case': 'Landing page conversion optimization',
        'Prompt': '''Optimize landing page for maximum conversions:

1. Above-the-fold optimization:
   - Clear, benefit-driven headline (what's in it for them)
   - Supporting subheadline explaining value
   - Prominent, contrasting CTA button
   - Hero image/video showing product in use
   - Trust signals immediately visible
2. Social proof placement:
   - Testimonials with faces near CTAs
   - Client logos prominently displayed
   - Real numbers (customers, reviews, etc.)
   - Case study results highlighted
   - Awards/certifications shown
3. Lead capture optimization:
   - Minimal form fields (name + email often enough)
   - Clear privacy statement
   - Compelling lead magnet offer
   - Show form value ("Get Your Free...")
   - Confirmation that's worth sharing
4. Scarcity and urgency:
   - Limited-time offer with countdown timer
   - Limited spots available (if true)
   - Seasonal/event-based urgency
   - Early-bird pricing
5. Remove distractions:
   - Simplified navigation or remove it entirely
   - Remove footer links on lead gen pages
   - Single conversion goal per page
   - Focused content supporting one action

Test variations with A/B testing.''',
        'Category': 'Conversion Optimization & Landing Pages',
        'Tool Compatibility': 'Lovable, Replit, ChatGPT, Unbounce',
        'Prompt Type': 'Strategy',
        'Description/Notes': 'Landing pages have one job: convert. Remove everything that doesn\'t support the goal.'
    },
    {
        'Use Case': 'Checkout and sign-up flow optimization',
        'Prompt': '''Optimize checkout/signup process for completion:

1. Simplify the flow:
   - Reduce steps (multi-step can be good, but not too many)
   - Show progress indicator clearly
   - Allow going back without losing data
   - Save progress for later completion
   - Offer guest checkout option
2. Form optimization:
   - Minimize required fields
   - Use smart defaults where possible
   - Implement autofill and autocomplete
   - Show inline validation (green checks for correct)
   - Clear, helpful error messages
3. Build confidence:
   - Display security badges prominently
   - Show accepted payment methods
   - Clear refund/return policy link
   - No hidden costs (show total upfront)
   - Add testimonials on checkout page
4. Reduce cart abandonment:
   - Exit-intent popup with incentive
   - Send abandoned cart emails
   - Allow saving cart for later
   - One-click checkout for returning users
   - Multiple payment options
5. Confirmation optimization:
   - Clear success message
   - Email confirmation immediately
   - Next steps clearly explained
   - Encourage social sharing
   - Provide easy contact for issues

Track abandonment rate at each step.''',
        'Category': 'Conversion Optimization & E-commerce',
        'Tool Compatibility': 'Replit, Cursor, Shopify, WooCommerce',
        'Prompt Type': 'Strategy',
        'Description/Notes': 'Average cart abandonment rate is 70%. Every friction point removed increases completions significantly.'
    },
    {
        'Use Case': 'Mobile conversion optimization',
        'Prompt': '''Optimize specifically for mobile conversions:

1. Mobile CTA optimization:
   - Large, thumb-friendly CTAs (minimum 48px tall)
   - CTAs always visible (sticky button at bottom)
   - Use action verbs clearly visible
   - High contrast colors for CTAs
   - Loading states prevent double-taps
2. Mobile form optimization:
   - Minimal fields (cut in half for mobile if possible)
   - One field per row for easy completion
   - Large input fields (16px font minimum)
   - Appropriate keyboards for each field type
   - Avoid dropdowns when possible (use buttons/radio)
3. Mobile trust signals:
   - Show trust badges prominently
   - Keep testimonials visible
   - Add click-to-call button prominently
   - Display security features clearly
   - Show mobile-optimized reviews
4. Reduce mobile friction:
   - One-tap autofill options (Apple/Google Pay)
   - Minimize typing required
   - Use device features (camera for ID, location)
   - Save payment info for next time
   - Offer SMS confirmation
5. Mobile-specific optimizations:
   - Fast load time (under 3 seconds)
   - No accidental clicks (proper spacing)
   - Easy back navigation
   - Clear error recovery
   - Offline form saving

Mobile conversion rates are lower - optimize aggressively.''',
        'Category': 'Conversion Optimization & Mobile',
        'Tool Compatibility': 'Lovable, Replit, Cursor, Bolt',
        'Prompt Type': 'Strategy',
        'Description/Notes': 'Mobile conversions lag desktop by 30-50%. Mobile-specific CRO can close this gap significantly.'
    },
    
    # Accessibility & Performance (4 prompts)
    {
        'Use Case': 'Comprehensive accessibility audit and fixes',
        'Prompt': '''Ensure WCAG 2.1 AA compliance for accessibility:

1. Semantic HTML audit:
   - Use proper heading hierarchy (H1 → H2 → H3)
   - Add semantic HTML5 tags (nav, main, article, aside, footer)
   - Ensure forms use proper labels
   - Use button elements for buttons (not divs)
   - Add ARIA labels where needed
2. Keyboard accessibility:
   - All interactive elements accessible via Tab
   - Visible focus indicators (outline or highlight)
   - Logical tab order through page
   - ESC key closes modals
   - Skip to main content link
3. Screen reader optimization:
   - Alt text on all images (descriptive, not "image")
   - ARIA labels on icon buttons
   - Form error messages associated with fields
   - Status messages announced
   - Hidden content properly marked (aria-hidden)
4. Visual accessibility:
   - Color contrast ratios meet WCAG AA (4.5:1 for text, 3:1 for UI)
   - Don't rely on color alone to convey meaning
   - Text resizable up to 200% without loss of function
   - No flashing content (seizure risk)
5. Test with tools:
   - WAVE browser extension
   - Lighthouse accessibility audit
   - Screen reader testing (NVDA, VoiceOver)
   - Keyboard-only navigation test

Accessibility benefits everyone, not just disabled users.''',
        'Category': 'Accessibility',
        'Tool Compatibility': 'All tools',
        'Prompt Type': 'Training Wheels',
        'Description/Notes': 'Accessibility is legal requirement in many places and improves UX for everyone. 15% of population has some disability.'
    },
    {
        'Use Case': 'Performance optimization for production',
        'Prompt': '''Optimize site performance for fast loading:

1. Image optimization:
   - Compress all images (TinyPNG, ImageOptim)
   - Convert to WebP with fallbacks
   - Implement lazy loading for below-fold images
   - Use responsive images (srcset)
   - Serve properly sized images per breakpoint
2. Code optimization:
   - Minify CSS, JavaScript, HTML
   - Remove unused CSS (PurgeCSS)
   - Tree-shake JavaScript dependencies
   - Split code into smaller chunks
   - Defer non-critical JavaScript
3. Loading optimization:
   - Implement critical CSS inline
   - Preload critical fonts
   - Use font-display: swap for web fonts
   - Implement CDN for static assets
   - Enable browser caching
4. Performance best practices:
   - Reduce third-party scripts
   - Lazy load YouTube embeds
   - Minimize redirects
   - Use HTTP/2 or HTTP/3
   - Implement service worker for caching
5. Measure and monitor:
   - Test with PageSpeed Insights (aim for 90+ score)
   - Check Lighthouse performance
   - Monitor Core Web Vitals (LCP, FID, CLS)
   - Test on slow 3G network

Fast sites convert better and rank higher in search.''',
        'Category': 'Performance Optimization',
        'Tool Compatibility': 'All tools',
        'Prompt Type': 'Training Wheels',
        'Description/Notes': 'Speed is a feature. 1-second delay = 7% reduction in conversions. Amazon loses $1.6B for each second of delay.'
    },
    {
        'Use Case': 'SEO optimization final checks',
        'Prompt': '''Perform final SEO optimization before launch:

1. On-page SEO:
   - Unique, descriptive title tags (50-60 chars)
   - Compelling meta descriptions (150-160 chars)
   - Proper heading hierarchy (one H1 per page)
   - Keyword optimization (natural, not stuffed)
   - Internal linking between related pages
2. Technical SEO:
   - XML sitemap generated and submitted
   - Robots.txt configured correctly
   - Canonical tags for duplicate content
   - 301 redirects for old URLs
   - 404 page with helpful navigation
3. Schema markup:
   - Organization schema
   - Product schema (if e-commerce)
   - Article schema (for blog posts)
   - FAQ schema where applicable
   - Review schema for testimonials
4. Social meta tags:
   - Open Graph tags for Facebook
   - Twitter Card tags
   - Social share images (1200x630px)
   - Accurate titles and descriptions
5. SEO tools audit:
   - Google Search Console setup
   - Test with Screaming Frog
   - Check mobile-friendliness
   - Verify page speed
   - Test rich results

SEO is long-term investment - get it right from launch.''',
        'Category': 'SEO Optimization',
        'Tool Compatibility': 'All tools',
        'Prompt Type': 'Training Wheels',
        'Description/Notes': 'SEO brings sustainable, free traffic. Getting technical SEO right at launch prevents issues later.'
    },
    {
        'Use Case': 'Final quality assurance and polish',
        'Prompt': '''Perform comprehensive final QA before launch:

1. Content review:
   - Spell check all text content
   - Grammar check with tools (Grammarly)
   - Verify all links work (no 404s)
   - Check contact information accuracy
   - Verify dates are current
2. Visual consistency:
   - Consistent font usage throughout
   - Color scheme consistent across pages
   - Button styles uniform
   - Spacing consistent (use spacing system)
   - Images properly sized and aligned
3. Functionality testing:
   - Test all forms submit correctly
   - Verify emails are received
   - Test all buttons and links
   - Check search functionality
   - Verify filters and sorting work
4. Cross-browser/device testing:
   - Test on Chrome, Firefox, Safari, Edge
   - Test on iOS and Android mobile
   - Test on tablet breakpoint
   - Verify all features work on each
5. Final checks:
   - Remove console errors and warnings
   - Remove "lorem ipsum" placeholder text
   - Update copyright year
   - Test contact forms deliver to correct email
   - Verify analytics tracking works
   - Check favicon displays correctly
   - Test social sharing

Create comprehensive QA checklist document.''',
        'Category': 'Quality Assurance & Finalization',
        'Tool Compatibility': 'All tools',
        'Prompt Type': 'Training Wheels',
        'Description/Notes': 'Final QA catches embarrassing mistakes before customers see them. Take time to be thorough.'
    },
    
    # Overall Polish & UX (7 prompts)
    {
        'Use Case': 'Animation and interaction polish',
        'Prompt': '''Add subtle animations and interactions for polish:

1. Micro-interactions:
   - Hover effects on buttons (subtle scale or color change)
   - Loading animations (not just spinners)
   - Success animations (checkmarks, confetti)
   - Form field focus animations
   - Menu open/close animations
2. Scroll animations:
   - Fade in elements as they scroll into view
   - Slide in from sides (use sparingly)
   - Parallax effects on background images
   - Reveal animations on sections
   - Sticky navigation that appears on scroll up
3. Page transitions:
   - Smooth navigation between pages
   - Loading states between routes
   - Modal enter/exit animations
   - Tab switching animations
4. Animation best practices:
   - Keep animations subtle and fast (200-400ms)
   - Use easing functions (ease-out for most)
   - Respect user's motion preferences (prefers-reduced-motion)
   - Don't animate too many elements at once
   - Ensure animations don't impact performance
5. Testing:
   - Test animations on various devices
   - Verify performance on mobile
   - Check that animations enhance, not distract
   - Ensure accessibility isn't compromised

Polish with purpose - every animation should enhance UX.''',
        'Category': 'UX Enhancement & Polish',
        'Tool Compatibility': 'Lovable, Replit, Cursor, v0, Bolt',
        'Prompt Type': 'Design',
        'Description/Notes': 'Micro-animations make experiences feel polished and professional. Use to provide feedback and delight.'
    },
    {
        'Use Case': 'Loading states and skeleton screens',
        'Prompt': '''Implement proper loading states for better UX:

1. Skeleton screens:
   - Replace loading spinners with skeleton screens
   - Mimic layout of actual content
   - Animate shimmer effect across skeletons
   - Show progressive loading (header first, then content)
2. Button loading states:
   - Disable button during processing
   - Show loading spinner or text change
   - Prevent double-click submissions
   - Show success state after completion
   - Revert to original state if error
3. Image loading:
   - Use blur-up technique (tiny blurred preview)
   - Show placeholder while loading
   - Lazy load images below the fold
   - Handle loading failures gracefully
4. Page transitions:
   - Show loading bar at top of page
   - Indicate when content is loading
   - Provide cancel option for long operations
   - Avoid jarring content shifts (CLS)
5. Optimistic UI:
   - Update UI immediately, sync in background
   - Show user action succeeded instantly
   - Handle failures gracefully with retry
   - Provide feedback for all interactions

Never leave users wondering if something is happening.''',
        'Category': 'UX Enhancement & Polish',
        'Tool Compatibility': 'Lovable, Replit, Cursor, Bolt',
        'Prompt Type': 'Design',
        'Description/Notes': 'Loading states manage expectations and reduce perceived wait time. Users tolerate loading better when informed.'
    },
    {
        'Use Case': 'Error handling and empty states polish',
        'Prompt': '''Design helpful error and empty states:

1. Error messages:
   - Clear, friendly language (not technical jargon)
   - Explain what went wrong
   - Provide specific fix instructions
   - Add contact option for persistent errors
   - Use appropriate tone (serious for serious errors)
2. Empty states:
   - Design beautiful empty states (not just "No items found")
   - Explain why it's empty
   - Provide clear action to populate
   - Add illustration or icon
   - Use opportunity to educate or onboard
3. 404 page:
   - Fun, on-brand design
   - Clear message that page doesn't exist
   - Search functionality to find what they need
   - Links to popular pages
   - Contact option if they believe it's an error
4. Form validation errors:
   - Show errors inline near fields
   - Use clear icons (red X or warning)
   - Explain requirements clearly
   - Show valid state (green check) when correct
   - Summarize errors at top for accessibility
5. Network errors:
   - Offline detection with helpful message
   - Retry button for failed requests
   - Save work locally to prevent loss
   - Clear indication when back online

Turn frustrating moments into helpful experiences.''',
        'Category': 'UX Enhancement & Polish',
        'Tool Compatibility': 'Lovable, Replit, Cursor, v0',
        'Prompt Type': 'Design',
        'Description/Notes': 'Error and empty states are often overlooked but critically important. They define your brand during frustration.'
    },
    {
        'Use Case': 'Typography and readability optimization',
        'Prompt': '''Perfect typography for maximum readability:

1. Font selection:
   - Use web-safe or properly loaded fonts
   - Limit to 2-3 font families maximum
   - Ensure fonts load quickly (subset, preload)
   - Provide fallback fonts
2. Sizing and hierarchy:
   - Minimum 16px for body text (18px ideal)
   - Clear size hierarchy (H1 > H2 > H3 by significant margin)
   - Scale headings appropriately for mobile
   - Consistent sizing across similar elements
3. Line height and spacing:
   - Line height 1.5-1.7 for body text
   - Tighter line height for headings (1.2-1.3)
   - Adequate letter-spacing for uppercase text
   - Comfortable paragraph spacing
4. Line length:
   - Optimal 50-75 characters per line
   - Max 90 characters for readability
   - Use max-width on text containers
   - Ensure readable on all screen sizes
5. Color and contrast:
   - High contrast for body text (dark on light or vice versa)
   - Avoid pure black (#000) - use dark gray
   - Ensure WCAG AA contrast ratios (4.5:1 minimum)
   - Use color for emphasis, not primary distinction

Typography is the foundation of good design.''',
        'Category': 'UX Enhancement & Typography',
        'Tool Compatibility': 'Lovable, Replit, Cursor, v0, Figma',
        'Prompt Type': 'Design',
        'Description/Notes': '95% of web design is typography. Get this right and design already looks professional.'
    },
    {
        'Use Case': 'Footer optimization and polish',
        'Prompt': '''Create comprehensive, polished footer:

1. Essential footer elements:
   - Logo or brand name
   - Brief company description
   - Contact information (email, phone, address)
   - Social media links
   - Copyright notice with current year
2. Navigation organization:
   - Organized into logical columns (Products, Company, Resources, Legal)
   - Links to all important pages
   - Sitemap-like structure
   - Consistent with header navigation
3. Legal and compliance:
   - Privacy Policy link
   - Terms of Service link
   - Cookie policy (if applicable)
   - GDPR compliance statement (if EU traffic)
   - Accessibility statement
4. Value-added elements:
   - Newsletter signup form
   - Language selector (if multi-language)
   - Region selector (if multi-region)
   - Trust badges (payment, security, certifications)
   - Awards or recognition
5. Design polish:
   - Subtle background color or gradient
   - Adequate padding and spacing
   - Responsive design (stack columns on mobile)
   - Hover effects on links
   - Mobile-friendly touch targets

Footer is often last thing users see - make it count.''',
        'Category': 'UX Enhancement & Completeness',
        'Tool Compatibility': 'Lovable, Replit, Cursor, v0, Bolt',
        'Prompt Type': 'Design',
        'Description/Notes': 'Footer provides important navigation and trust signals. Users often scroll to footer to verify legitimacy.'
    },
    {
        'Use Case': 'Call-to-action optimization and placement',
        'Prompt': '''Optimize CTAs for maximum visibility and action:

1. CTA design:
   - High contrast with surrounding elements
   - Large enough to be prominent (not overwhelming)
   - Rounded corners feel more friendly
   - Subtle shadow or gradient for depth
   - Clear hover state (darken, lift, scale)
2. CTA copy optimization:
   - Start with strong action verb ("Get," "Start," "Claim," "Join")
   - Be specific ("Get My Free Trial" vs "Submit")
   - Create urgency when appropriate ("Start Today," "Claim Now")
   - Keep it short (2-5 words ideal)
   - First-person often converts better ("Start My Trial")
3. Strategic placement:
   - Above the fold on key pages
   - After every major benefit/feature
   - At end of compelling content
   - Sticky CTA on mobile (bottom of screen)
   - In header navigation
4. Supporting elements:
   - Add micro-copy below CTA (risk reversal, no credit card, free forever)
   - Place trust signals near CTAs
   - Use arrows or directional cues
   - Add social proof near CTAs
5. Multiple CTAs:
   - Primary CTA highly visible
   - Secondary CTA less prominent (outline button)
   - Repeat primary CTA strategically through page
   - Ensure CTAs don't compete with each other

CTAs drive conversions - optimize relentlessly.''',
        'Category': 'UX Enhancement & Conversion',
        'Tool Compatibility': 'Lovable, Replit, ChatGPT, Figma',
        'Prompt Type': 'Design',
        'Description/Notes': 'CTA optimization can improve conversions by 200%+. Test copy, color, placement, and design variations.'
    },
    {
        'Use Case': 'Final user experience walkthrough and polish',
        'Prompt': '''Conduct final UX review as a new user:

1. First-time user experience:
   - Clear what the site/product is about immediately
   - Value proposition obvious within 5 seconds
   - Easy to understand what to do next
   - No confusing jargon or technical terms
   - Intuitive navigation without needing instructions
2. User journey optimization:
   - Map and test critical user flows
   - Remove friction points
   - Minimize steps to conversion
   - Provide clear progress indicators
   - Easy to undo or go back
3. Feedback and communication:
   - Immediate feedback for all actions
   - Loading states for anything taking >200ms
   - Success confirmations clearly visible
   - Error messages helpful and actionable
   - Tooltips for complex features
4. Delight factors:
   - Add subtle animations that feel good
   - Easter eggs for engaged users (optional)
   - Personalization where possible
   - Anticipate user needs
   - Surprise and delight moments
5. Final polish items:
   - No lorem ipsum or placeholder content
   - All images have proper alt text
   - No broken links or images
   - Consistent voice and tone in copy
   - Professional, polished feel throughout

Experience your site as a first-time user would.''',
        'Category': 'UX Enhancement & Final Polish',
        'Tool Compatibility': 'All tools',
        'Prompt Type': 'Strategy',
        'Description/Notes': 'You can\'t optimize what you don\'t measure. Walk through as a new user and document every friction point.'
    },
]

print(f"\n✓ Created {len(finalization_prompts)} comprehensive finalization prompts")
print(f"  Categories covered:")
categories = {}
for p in finalization_prompts:
    cat = p['Category']
    categories[cat] = categories.get(cat, 0) + 1

for cat, count in sorted(categories.items(), key=lambda x: -x[1]):
    print(f"    • {cat}: {count} prompts")

# Save as JSON for reference
with open('/home/ubuntu/finalization_prompts.json', 'w') as f:
    json.dump(finalization_prompts, f, indent=2)

print(f"\n✓ Saved to ~/finalization_prompts.json")

