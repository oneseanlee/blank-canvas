
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CopywritingPromptData {
  category: string;
  subcategory: string;
  tool: string;
  title: string;
  prompt: string;
  tags: string[];
  useCase: string;
  description: string;
  usagePhase: string;
}

const copywritingPrompts: CopywritingPromptData[] = [
  // AIDA Framework
  {
    category: 'Content & Copywriting',
    subcategory: 'AIDA Framework',
    tool: 'React',
    title: 'AIDA Landing Page Hero Section',
    prompt: `Create a hero section using the AIDA framework (Attention, Interest, Desire, Action):

**ATTENTION**: Bold headline with power words, contrasting colors, and visual hierarchy
**INTEREST**: Subheadline explaining the unique value proposition
**DESIRE**: 3-point benefit list with icons showing transformation
**ACTION**: Prominent CTA button with urgency trigger

Use Tailwind CSS with gradient backgrounds, smooth animations, and social proof elements (trust badges, testimonials preview). Make it responsive and conversion-optimized.`,
    tags: ['AIDA', 'conversion', 'landing-page', 'hero-section', 'copywriting'],
    useCase: 'Perfect for high-converting landing pages that need to capture attention and drive immediate action',
    description: 'AIDA (Attention, Interest, Desire, Action) is a classic copywriting framework that guides visitors through a psychological journey from awareness to conversion.',
    usagePhase: 'content',
  },
  {
    category: 'Content & Copywriting',
    subcategory: 'AIDA Framework',
    tool: 'Next.js',
    title: 'AIDA Product Page Layout',
    prompt: `Build a complete product page using AIDA framework:

1. **Attention**: Eye-catching product images with zoom functionality
2. **Interest**: Detailed feature breakdown with interactive tabs
3. **Desire**: Before/after comparisons, customer testimonials, guarantee badges
4. **Action**: Sticky buy button, limited-time offer countdown, free shipping banner

Include: Image gallery, specifications accordion, review section, FAQ, and trust indicators. Use Framer Motion for scroll-triggered animations.`,
    tags: ['AIDA', 'ecommerce', 'product-page', 'conversion', 'animations'],
    useCase: 'Ideal for e-commerce product pages that need to maximize conversion rates',
    description: 'Comprehensive product page implementation following AIDA principles to systematically build buyer confidence.',
    usagePhase: 'content',
  },

  // Hormozi Framework
  {
    category: 'Content & Copywriting',
    subcategory: 'Hormozi Framework',
    tool: 'React',
    title: 'Hormozi Value Ladder Sales Page',
    prompt: `Create a sales page using Alex Hormozi's framework (Pain → Dream → Solution → Proof → Offer):

**PAIN**: Dark section with emotional trigger questions highlighting current struggles
**DREAM**: Bright transformation section showing the ideal outcome
**SOLUTION**: Step-by-step methodology breakdown with visual diagrams
**PROOF**: Case studies carousel with real numbers and testimonials
**OFFER**: Irresistible offer breakdown with bonuses, guarantee, and scarcity

Use bold typography, contrasting sections, progress indicators, and persuasive micro-copy. Include pricing comparison table and risk-reversal guarantee.`,
    tags: ['hormozi', 'sales-page', 'high-ticket', 'conversion', 'value-ladder'],
    useCase: 'Best for high-ticket offers, courses, coaching programs, and premium services',
    description: 'Alex Hormozi\'s proven framework for creating irresistible offers that emphasize value over price.',
    usagePhase: 'content',
  },
  {
    category: 'Content & Copywriting',
    subcategory: 'Hormozi Framework',
    tool: 'Next.js',
    title: 'Hormozi Offer Stack Component',
    prompt: `Build an offer stack component following Hormozi's "Value Stacking" principle:

- Main offer with strikethrough original price
- Stack of bonuses with individual value indicators
- Running total calculator that updates as you scroll
- Scarcity timer showing offer expiration
- Guarantee badge with detailed terms
- Total value vs. actual price comparison
- Urgency-driven CTA with button animation

Use Intersection Observer for scroll animations, add confetti effect on CTA click, include social proof numbers (students enrolled, success rate).`,
    tags: ['hormozi', 'offer-stack', 'pricing', 'scarcity', 'value'],
    useCase: 'Perfect for maximizing perceived value and justifying premium pricing',
    description: 'Visual representation of Alex Hormozi\'s value stacking technique to make offers feel like no-brainer decisions.',
    usagePhase: 'content',
  },

  // PAS Framework
  {
    category: 'Content & Copywriting',
    subcategory: 'PAS Framework',
    tool: 'React',
    title: 'PAS Email Capture Section',
    prompt: `Create an email capture section using PAS (Problem, Agitate, Solution):

**PROBLEM**: Headline stating the core pain point clearly
**AGITATE**: 3-4 bullet points amplifying the problem's consequences
**SOLUTION**: Promise of the lead magnet/newsletter value

Include: Email input with inline validation, privacy assurance text, instant access badge, and a compelling CTA button. Use gradient backgrounds and subtle animations. Add social proof (subscriber count or testimonial).`,
    tags: ['PAS', 'email-capture', 'lead-generation', 'problem-solution', 'opt-in'],
    useCase: 'Ideal for lead magnets, newsletter signups, and waitlist captures',
    description: 'PAS (Problem, Agitate, Solution) framework that intensifies pain before offering relief.',
    usagePhase: 'content',
  },
  {
    category: 'Content & Copywriting',
    subcategory: 'PAS Framework',
    tool: 'Next.js',
    title: 'PAS Video Sales Letter Layout',
    prompt: `Build a Video Sales Letter (VSL) page using PAS structure:

1. **Problem Section**: Empathetic headline + relatable scenario
2. **Agitate Section**: Statistics, failed solutions, mounting frustration
3. **Solution Section**: Video player centered, transformation promise below

Below video: CTA button, bullet-point benefits, FAQ accordion addressing objections, trust indicators, and testimonials. Disable right-click on video, add auto-pause CTA overlay at key moments.`,
    tags: ['PAS', 'VSL', 'video-sales-letter', 'webinar', 'conversion'],
    useCase: 'Best for webinar replays, course sales, and complex product explanations',
    description: 'Full VSL implementation that uses PAS to create emotional urgency before presenting the solution.',
    usagePhase: 'content',
  },

  // BAB Framework
  {
    category: 'Content & Copywriting',
    subcategory: 'BAB Framework',
    tool: 'React',
    title: 'BAB Transformation Showcase',
    prompt: `Create a transformation showcase using BAB (Before, After, Bridge):

**BEFORE**: Left panel showing current state (grayscale, chaotic, problems listed)
**AFTER**: Right panel showing desired state (colorful, organized, benefits listed)
**BRIDGE**: Center section with arrow/path graphic explaining the methodology

Include: Interactive slider to compare before/after, timeline component showing the journey, testimonials emphasizing transformation. Use Framer Motion for reveal animations.`,
    tags: ['BAB', 'transformation', 'before-after', 'comparison', 'results'],
    useCase: 'Perfect for fitness, education, business coaching, or any transformation-based offer',
    description: 'BAB (Before, After, Bridge) framework that visually demonstrates the transformation journey.',
    usagePhase: 'content',
  },
  {
    category: 'Content & Copywriting',
    subcategory: 'BAB Framework',
    tool: 'Next.js',
    title: 'BAB Case Study Template',
    prompt: `Build a case study page template using BAB structure:

**BEFORE**: Client background, challenges faced, pain points with icons
**AFTER**: Results achieved with big numbers, percentage improvements, visual charts
**BRIDGE**: Detailed methodology in timeline format, tools used, key strategies

Add: Client logo, industry tags, problem/solution matrix, pullquotes from client testimonial, results visualization with Chart.js, downloadable PDF version, related case studies carousel.`,
    tags: ['BAB', 'case-study', 'social-proof', 'results', 'testimonials'],
    useCase: 'Ideal for showcasing client success stories and building credibility',
    description: 'Structured case study layout that clearly demonstrates your process and proven results.',
    usagePhase: 'content',
  },

  // 4 Ps Framework
  {
    category: 'Content & Copywriting',
    subcategory: '4 Ps Framework',
    tool: 'React',
    title: '4 Ps Sales Funnel Page',
    prompt: `Create a sales funnel page using the 4 Ps (Picture, Promise, Prove, Push):

**PICTURE**: Hero with vivid imagery showing the ideal outcome/lifestyle
**PROMISE**: Bold guarantee statement with specific, measurable outcomes
**PROVE**: Social proof grid (testimonials, case studies, media logos, stats)
**PUSH**: Strong CTA with urgency (limited spots, bonus expiring, price increase)

Include: Video background in hero, animated counter for stats, testimonial carousel with photos, trust badges, FAQ section, exit-intent popup with special offer.`,
    tags: ['4Ps', 'sales-funnel', 'picture-promise-prove-push', 'conversion', 'persuasion'],
    useCase: 'Excellent for consultants, coaches, and service-based businesses',
    description: 'The 4 Ps framework creates a logical persuasion sequence from visualization to action.',
    usagePhase: 'content',
  },

  // StoryBrand Framework
  {
    category: 'Content & Copywriting',
    subcategory: 'StoryBrand Framework',
    tool: 'React',
    title: 'StoryBrand Homepage Hero',
    prompt: `Create a hero section using StoryBrand framework (Character → Problem → Guide → Plan → Call to Action):

**CHARACTER**: "You" language addressing the visitor directly
**PROBLEM**: External problem headline + internal problem subtext + philosophical stake
**GUIDE**: Brief authority statement with empathy (we understand, we've helped others)
**PLAN**: Simple 3-step process with icons
**CALL TO ACTION**: Primary CTA (Buy Now/Sign Up) + Secondary CTA (Learn More)

Use clear hierarchy, customer-focused copy (not company-focused), problem-solution contrast, and trust indicators.`,
    tags: ['storybrand', 'hero-section', 'customer-focused', 'framework', 'narrative'],
    useCase: 'Perfect for clarifying your message and positioning customers as the hero',
    description: 'Donald Miller\'s StoryBrand framework positions your brand as the guide in the customer\'s journey.',
    usagePhase: 'content',
  },
  {
    category: 'Content & Copywriting',
    subcategory: 'StoryBrand Framework',
    tool: 'Next.js',
    title: 'StoryBrand About Page',
    prompt: `Build an About page using StoryBrand principles (focus on customer, not company):

1. Open with the problem you solve (not your founding story)
2. Show empathy for customer's struggle
3. Demonstrate authority and competence
4. Present your plan/methodology
5. Call them to action
6. Paint picture of success (what's at stake)
7. Help them avoid failure (what to avoid)

Include: Founder story (brief, focused on why we help), team photos, company values related to customer success, customer success stories, process visualization, dual CTAs.`,
    tags: ['storybrand', 'about-page', 'brand-story', 'customer-centric', 'empathy'],
    useCase: 'Best for creating about pages that actually drive conversions',
    description: 'Customer-centric about page that builds authority while keeping focus on the customer\'s journey.',
    usagePhase: 'content',
  },

  // Feature-Advantage-Benefit
  {
    category: 'Content & Copywriting',
    subcategory: 'FAB Framework',
    tool: 'React',
    title: 'FAB Feature Grid Component',
    prompt: `Create a features section using FAB (Feature → Advantage → Benefit):

For each feature:
- **FEATURE**: What it is (technical description with icon)
- **ADVANTAGE**: What it does (capability)
- **BENEFIT**: What it means for them (emotional outcome)

Design: 3-column grid on desktop, accordion on mobile. Each card has icon, feature name, expandable advantage text, benefit statement in bold. Use Lucide icons, subtle hover effects, and gradient borders.`,
    tags: ['FAB', 'features', 'benefits', 'product-marketing', 'grid'],
    useCase: 'Ideal for SaaS products, tools, and technical solutions that need clear value explanation',
    description: 'FAB framework translates technical features into emotional benefits customers actually care about.',
    usagePhase: 'content',
  },

  // Long-form Sales Copy
  {
    category: 'Content & Copywriting',
    subcategory: 'Long-form Sales Copy',
    tool: 'Next.js',
    title: 'Long-form Sales Page Template',
    prompt: `Build a comprehensive long-form sales page with:

1. Attention-grabbing headline with subhead
2. Problem identification section
3. Solution introduction (your product)
4. How it works (step-by-step)
5. Features & benefits breakdown
6. Social proof (testimonials, case studies)
7. Pricing options with comparison table
8. FAQ section addressing objections
9. Risk reversal (guarantee)
10. Final CTA with scarcity

Include: Sticky CTA bar, progress indicator, back-to-top button, exit-intent popup, section navigation menu. Use varied content blocks (text, images, videos, pullquotes) to maintain engagement.`,
    tags: ['long-form', 'sales-copy', 'conversion', 'comprehensive', 'persuasion'],
    useCase: 'Best for high-consideration purchases, complex products, and premium offers',
    description: 'Complete long-form sales page that addresses every objection and builds overwhelming evidence.',
    usagePhase: 'content',
  },

  // Emotional Triggers
  {
    category: 'Content & Copywriting',
    subcategory: 'Emotional Copywriting',
    tool: 'React',
    title: 'Emotional Trigger Headlines Collection',
    prompt: `Create a headline testing component with emotional triggers:

**FEAR**: "Stop Losing Money to [Problem]..."
**GREED**: "Finally, A Way to [Desired Outcome] Without [Pain]"
**CURIOSITY**: "The [Number] [Thing] That [Unexpected Result]"
**PRIDE**: "Join [Number] [Type of Person] Who [Achievement]"
**INSTANT GRATIFICATION**: "Get [Result] in Just [Short Time]"

Build a component that rotates through different headline variations with A/B testing functionality. Include emotion indicators, power words highlighter, and conversion tracking.`,
    tags: ['emotional-copywriting', 'headlines', 'psychology', 'triggers', 'ab-testing'],
    useCase: 'Perfect for optimizing headlines and CTAs for maximum emotional impact',
    description: 'Collection of psychologically-proven headline formulas that tap into core human emotions.',
    usagePhase: 'content',
  },

  // Objection Handling
  {
    category: 'Content & Copywriting',
    subcategory: 'Objection Handling',
    tool: 'React',
    title: 'Objection-Crushing FAQ Section',
    prompt: `Create an FAQ section specifically designed to handle objections:

Common objections to address:
- "Too expensive" → ROI calculator, payment plans, cost of inaction
- "Don't have time" → Time-saving testimonials, quick-start guide
- "Won't work for me" → Success stories from similar situations, guarantee
- "Need to think about it" → Scarcity timer, bonus expiring soon
- "Not sure I need it" → Problem amplification, missed opportunity

Use accordion UI with search functionality, categorized objections (price, results, fit, timing), and each answer includes proof element (testimonial, stat, guarantee). Add "Still have questions?" live chat widget.`,
    tags: ['objection-handling', 'faq', 'conversion-optimization', 'persuasion', 'trust'],
    useCase: 'Essential for overcoming purchase hesitation and closing more sales',
    description: 'Strategic FAQ section that proactively addresses and resolves common buying objections.',
    usagePhase: 'refine',
  },

  // Urgency & Scarcity
  {
    category: 'Content & Copywriting',
    subcategory: 'Urgency & Scarcity',
    tool: 'React',
    title: 'Scarcity & Urgency Components Collection',
    prompt: `Build a collection of urgency/scarcity components:

1. **Countdown Timer**: Evergreen or deadline-based with dynamic copy
2. **Limited Spots**: Real-time availability counter with "X spots left"
3. **Social Proof Popup**: "John from NYC just purchased..."
4. **Price Increase Warning**: "Price increases in [time]"
5. **Bonus Expiration**: Crossed-out bonus with timer
6. **Seasonal Offer**: "Black Friday ends in..."

Each component should be reusable, customizable, and include animations (shake, pulse, color change). Add sound effects option for timer milestones. Include A/B testing variations.`,
    tags: ['urgency', 'scarcity', 'countdown', 'fomo', 'conversion'],
    useCase: 'Powerful for increasing conversion rates through psychological triggers',
    description: 'Collection of urgency and scarcity elements proven to drive immediate action.',
    usagePhase: 'enhance',
  },

  // Microcopy & UX Writing
  {
    category: 'Content & Copywriting',
    subcategory: 'UX Writing',
    tool: 'React',
    title: 'Conversion-Optimized Microcopy System',
    prompt: `Create a comprehensive microcopy system for:

**Form Fields**:
- Labels with inline help text
- Error messages that guide (not just warn)
- Success messages with next step
- Placeholder text that educates

**CTA Buttons**:
- Action-oriented (Get, Start, Claim vs. Submit)
- Value-focused ("Get My Free Guide")
- Urgency-driven ("Claim Your Spot Now")

**Trust Elements**:
- "No credit card required"
- "Cancel anytime"
- "Your data is secure 🔒"

Include: Toast notifications, loading states copy, empty states, confirmation dialogs. Make all copy benefit-focused and anxiety-reducing.`,
    tags: ['microcopy', 'ux-writing', 'conversion', 'forms', 'cta'],
    useCase: 'Critical for reducing friction and increasing form completion rates',
    description: 'Small copy changes that have massive impact on user experience and conversions.',
    usagePhase: 'refine',
  },

  // Social Proof
  {
    category: 'Content & Copywriting',
    subcategory: 'Social Proof',
    tool: 'Next.js',
    title: 'Social Proof Sections Collection',
    prompt: `Build multiple social proof section variations:

1. **Testimonial Wall**: Masonry grid with photos, quotes, names, companies
2. **Video Testimonials**: Embedded videos with thumbnail overlays
3. **Case Study Cards**: Before/after metrics with client logos
4. **Trust Badges**: Payment security, certifications, media features
5. **User Counter**: "Join 10,000+ happy customers" with animated numbers
6. **Rating Display**: Star ratings from multiple platforms (G2, Trustpilot)
7. **Live Activity**: "Sarah just signed up from California"

Include filtering by industry/use case, carousel navigation, "Read Full Story" links, schema markup for SEO.`,
    tags: ['social-proof', 'testimonials', 'trust', 'credibility', 'reviews'],
    useCase: 'Essential for building trust and credibility with potential customers',
    description: 'Comprehensive social proof implementation that addresses trust from multiple angles.',
    usagePhase: 'enhance',
  },

  // Email Copywriting
  {
    category: 'Content & Copywriting',
    subcategory: 'Email Marketing',
    tool: 'React',
    title: 'Email Sequence Templates',
    prompt: `Create email-style components for different sequence types:

**WELCOME SEQUENCE**:
1. Thank you + set expectations
2. Quick win / valuable content
3. Product education
4. Social proof
5. Soft offer

**NURTURE SEQUENCE**:
- Problem-focused content
- Solution frameworks
- Case studies
- Tool recommendations
- Product as solution

**SALES SEQUENCE**:
- Problem agitation
- Offer introduction
- Objection handling
- Urgency/scarcity
- Last chance

Each template includes: subject line formula, preview text, body structure, CTA placement, P.S. section. Design as React Email templates with responsive HTML.`,
    tags: ['email-marketing', 'sequences', 'automation', 'nurture', 'conversion'],
    useCase: 'Perfect for building automated email sequences that convert subscribers to customers',
    description: 'Proven email sequence templates optimized for engagement and conversion.',
    usagePhase: 'content',
  },

  // Value Proposition
  {
    category: 'Content & Copywriting',
    subcategory: 'Value Proposition',
    tool: 'React',
    title: 'Value Proposition Statement Builder',
    prompt: `Create a value proposition testing component using the formula:

"We help [TARGET AUDIENCE] [ACHIEVE GOAL] by [UNIQUE MECHANISM] without [COMMON PAIN]"

Examples:
- "We help busy founders get 10+ qualified leads/week through done-for-you LinkedIn outreach without hiring a sales team"
- "We help e-commerce stores increase AOV by 30% through AI-powered product recommendations without complex setup"

Build an interactive form that:
- Helps users fill in each section
- Generates multiple variations
- A/B tests different formulations
- Scores clarity and impact
- Provides before/after examples

Include power words library, common mistakes checker, competitor differentiation tips.`,
    tags: ['value-proposition', 'positioning', 'messaging', 'clarity', 'differentiation'],
    useCase: 'Crucial for clarifying your unique value and standing out in the market',
    description: 'Systematic approach to crafting clear, compelling value propositions that resonate with ideal customers.',
    usagePhase: 'foundation',
  },

  // Landing Page Copy Blocks
  {
    category: 'Content & Copywriting',
    subcategory: 'Landing Page Copy',
    tool: 'React',
    title: 'Landing Page Copy Block Library',
    prompt: `Build a library of reusable landing page copy blocks:

1. **Hero**: 10 headline formulas + subhead structures
2. **Problem/Solution**: Problem amplification + solution tease
3. **How It Works**: 3-step process with icons
4. **Features/Benefits**: Feature grid with FAB framework
5. **Social Proof**: Testimonial layouts (quotes, ratings, logos)
6. **Pricing**: Table with feature comparison + recommended badge
7. **FAQ**: Objection-handling accordion
8. **Guarantee**: Risk-reversal statement with badge
9. **Final CTA**: Urgency-driven call to action

Each block includes multiple copy variations, best practices tooltip, conversion optimization tips. Make them drag-and-drop customizable with live preview.`,
    tags: ['landing-page', 'copy-blocks', 'templates', 'conversion', 'modular'],
    useCase: 'Accelerates landing page creation with proven, high-converting copy structures',
    description: 'Modular copy block library for building high-converting landing pages quickly.',
    usagePhase: 'build',
  },

  // CTA Optimization
  {
    category: 'Content & Copywriting',
    subcategory: 'CTA Optimization',
    tool: 'React',
    title: 'CTA Button Copy Generator',
    prompt: `Create a CTA button copy generator and A/B testing component:

**CTA Formulas**:
- Action + Benefit: "Get My Free Template"
- Action + Urgency: "Claim Your Spot Now"
- Action + Value: "Start Saving Money Today"
- Question + Action: "Ready to Grow? Let's Talk"
- First Person: "Yes, I Want Access"

**Button Styles**:
- Primary (high contrast, large)
- Secondary (outlined, subtle)
- Ghost (text-only, minimal)

Generator features:
- Input: offer details
- Output: 10+ CTA variations
- A/B testing framework
- Click-through rate tracking
- Heatmap integration
- Mobile vs desktop optimization

Include: Icon options, arrow animations, hover states, loading states, success states.`,
    tags: ['cta', 'buttons', 'conversion', 'ab-testing', 'optimization'],
    useCase: 'Essential for maximizing click-through rates on calls to action',
    description: 'Scientific approach to crafting and testing CTA button copy for maximum conversions.',
    usagePhase: 'refine',
  },

  // Headline Swipe File
  {
    category: 'Content & Copywriting',
    subcategory: 'Headlines',
    tool: 'Next.js',
    title: 'Headline Swipe File with 50+ Formulas',
    prompt: `Build an interactive headline swipe file database with categories:

**How-To**: "How to [Achieve Desired Outcome] Without [Common Objection]"
**Number**: "The [Number] [Thing] That Will [Benefit]"
**Question**: "What If You Could [Dream Outcome]?"
**Negative**: "Stop [Doing This Wrong Thing]"
**Testimonial**: "[Quote from Customer] - Name, Title"
**Challenge**: "Can You [Achieve Goal] in [Timeframe]?"
**Secret**: "The Secret to [Desired Outcome] That [Authority] Doesn't Want You to Know"

Features:
- Searchable by industry, emotion, goal
- Fill-in-the-blank templates
- Real examples from major brands
- A/B test results data
- Headline analyzer score
- Export to Google Docs

Include filters: B2B vs B2C, short vs long-form, emotional vs logical.`,
    tags: ['headlines', 'swipe-file', 'templates', 'copywriting', 'formulas'],
    useCase: 'Perfect for overcoming writer\'s block and creating attention-grabbing headlines',
    description: 'Comprehensive collection of proven headline formulas with real-world examples.',
    usagePhase: 'content',
  },

  // Conversion Copy Audit
  {
    category: 'Content & Copywriting',
    subcategory: 'Copy Auditing',
    tool: 'React',
    title: 'Landing Page Copy Audit Checklist',
    prompt: `Create an interactive copy audit tool that checks:

**CLARITY**:
- [ ] Headline clearly states what you offer
- [ ] Value proposition is specific (not vague)
- [ ] Jargon-free language
- [ ] Scannability (headers, bullets, white space)

**PERSUASION**:
- [ ] Benefits > Features
- [ ] Social proof included
- [ ] Risk reversal (guarantee)
- [ ] Urgency/scarcity elements
- [ ] Objections addressed

**CONVERSION**:
- [ ] Single, clear CTA
- [ ] Above-the-fold CTA
- [ ] Mobile-optimized copy
- [ ] Loading speed optimized

Build as a scoring system (0-100) with detailed recommendations for each failed check. Include before/after examples and competitor analysis.`,
    tags: ['audit', 'optimization', 'checklist', 'quality-assurance', 'conversion'],
    useCase: 'Critical for identifying and fixing conversion leaks in existing copy',
    description: 'Systematic audit process to evaluate and improve landing page copy effectiveness.',
    usagePhase: 'refine',
  },

  // Persona-Based Copywriting
  {
    category: 'Content & Copywriting',
    subcategory: 'Persona Targeting',
    tool: 'React',
    title: 'Dynamic Persona-Based Copy System',
    prompt: `Build a system that adapts copy based on user persona/segment:

**PERSONA PROFILES**:
1. **Price-Sensitive**: Emphasize ROI, payment plans, money-back guarantee
2. **Quality-Focused**: Highlight premium features, awards, exclusivity
3. **Time-Starved**: Quick results, automation, "done-for-you"
4. **Risk-Averse**: Social proof, guarantees, trial periods
5. **Early Adopter**: Innovation, cutting-edge, beta access

System features:
- Quiz to identify visitor persona
- Dynamic headline/copy replacement
- Personalized CTA buttons
- Relevant case studies
- Targeted objection handling
- A/B testing by segment

Use localStorage to remember persona, integrate with analytics to track conversion by segment.`,
    tags: ['personalization', 'persona', 'segmentation', 'dynamic-content', 'targeting'],
    useCase: 'Powerful for increasing relevance and conversion through personalized messaging',
    description: 'Advanced personalization system that shows different copy based on visitor psychographics.',
    usagePhase: 'enhance',
  },

  // Storytelling Framework
  {
    category: 'Content & Copywriting',
    subcategory: 'Storytelling',
    tool: 'Next.js',
    title: 'Story-Driven About Page Template',
    prompt: `Create an About page using the Hero's Journey storytelling framework:

1. **Ordinary World**: Where you/founder started
2. **Call to Adventure**: The problem that sparked the mission
3. **Challenges**: Obstacles faced, lessons learned
4. **Transformation**: How you overcame and grew
5. **Return with Elixir**: The solution you now offer customers

Design elements:
- Timeline component with key milestones
- Founder photo with authentic, personal story
- Mission/vision/values section
- Team photos with individual stories
- Customer impact metrics
- "Join Our Story" CTA

Use scroll-triggered animations, parallax effects, and emotional imagery. Keep focus on how your story relates to customer success.`,
    tags: ['storytelling', 'about-page', 'brand-narrative', 'hero-journey', 'emotional'],
    useCase: 'Ideal for building emotional connection and brand loyalty',
    description: 'Narrative-driven about page that uses classic storytelling to create resonance and trust.',
    usagePhase: 'content',
  },
];

async function seedCopywritingPrompts() {
  console.log('🚀 Starting copywriting prompts seeding...\n');

  // Find test user
  const testUser = await prisma.user.findUnique({
    where: { email: 'john@doe.com' },
  });

  if (!testUser) {
    console.log('❌ Test user john@doe.com not found!');
    console.log('Please run the main seed script first: yarn prisma db seed');
    return;
  }

  console.log(`👤 Found test user: ${testUser.email} (ID: ${testUser.id})\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const promptData of copywritingPrompts) {
    try {
      const customPrompt = await prisma.customPrompt.create({
        data: {
          userId: testUser.id,
          title: promptData.title,
          prompt: promptData.prompt,
          category: promptData.category,
          tags: promptData.tags,
          useCase: promptData.useCase,
          toolsNeeded: [promptData.tool],
          description: promptData.description,
          usagePhase: promptData.usagePhase,
        },
      });

      console.log(`✅ Created: ${customPrompt.title}`);
      successCount++;
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.log(`⏭️  Skipped (duplicate): ${promptData.title}`);
        skipCount++;
      } else {
        console.log(`❌ Error creating "${promptData.title}": ${error.message}`);
        errorCount++;
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✨ Copywriting Prompts Seeding Complete!');
  console.log('='.repeat(60));
  console.log(`✅ Successfully created: ${successCount} prompts`);
  console.log(`⏭️  Skipped (duplicates): ${skipCount} prompts`);
  console.log(`❌ Errors: ${errorCount} prompts`);
  console.log('='.repeat(60) + '\n');

  // Show breakdown by subcategory
  const subcategories = [...new Set(copywritingPrompts.map(p => p.subcategory))];
  console.log('📊 Breakdown by Framework:\n');
  subcategories.forEach(subcat => {
    const count = copywritingPrompts.filter(p => p.subcategory === subcat).length;
    console.log(`  ${subcat}: ${count} prompts`);
  });
  console.log('');
}

seedCopywritingPrompts()
  .catch((e) => {
    console.error('Error seeding copywriting prompts:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
