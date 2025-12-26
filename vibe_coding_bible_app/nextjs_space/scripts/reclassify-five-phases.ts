/**
 * Reclassification Script for 5-Phase Workflow
 * 
 * Categorizes all 776 prompts according to:
 * 1. Foundation - System prompts, Personas, Design standards
 * 2. Content - AIDA, Hormozi, PAS copywriting frameworks
 * 3. Build - Full builds, Layout systems, Components
 * 4. Enhance - Motion design, Visual effects, Libraries
 * 5. Refine - Mobile-friendly, Responsive design, Polish
 */

import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function reclassifyPrompts() {
  console.log('🔄 Starting 5-Phase Reclassification...');
  console.log('======================================\n');

  // Get all prompts
  const allPrompts = await prisma.customPrompt.findMany({
    select: {
      id: true,
      title: true,
      category: true,
      tags: true,
      useCase: true,
      prompt: true,
      usagePhase: true
    }
  });

  console.log(`Total prompts to process: ${allPrompts.length}\n`);

  let foundationCount = 0;
  let contentCount = 0;
  let buildCount = 0;
  let enhanceCount = 0;
  let refineCount = 0;

  for (const prompt of allPrompts) {
    const tagsText = prompt.tags ? prompt.tags.join(' ').toLowerCase() : '';
    
    const searchText = [
      prompt.title?.toLowerCase() || '',
      prompt.category?.toLowerCase() || '',
      prompt.useCase?.toLowerCase() || '',
      tagsText,
      prompt.prompt?.toLowerCase().substring(0, 200) || ''
    ].join(' ');

    let newPhase = 'build'; // default

    // Priority 1: Check category first for clear phase assignments
    // 5. REFINE - QA, CRO, Refine categories (highest priority for these)
    if (
      prompt.category === 'Refine' ||
      prompt.category === 'QA' ||
      prompt.category === 'CRO'
    ) {
      newPhase = 'refine';
      refineCount++;
    }
    // 1. FOUNDATION - System category
    else if (prompt.category === 'System') {
      newPhase = 'foundation';
      foundationCount++;
    }
    // 2. CONTENT - Content & Copywriting category
    else if (prompt.category === 'Content & Copywriting') {
      newPhase = 'content';
      contentCount++;
    }
    // 3. BUILD - Full Build, Layout, Components, Database categories
    else if (
      prompt.category === 'Full Build' ||
      prompt.category === 'Layout' ||
      prompt.category === 'Components' ||
      prompt.category === 'Database'
    ) {
      newPhase = 'build';
      buildCount++;
    }
    // 4. ENHANCE - Motion, Library, Visuals, Ultra-Luxury Design categories
    else if (
      prompt.category === 'Motion' ||
      prompt.category === 'Library' ||
      prompt.category === 'Visuals' ||
      prompt.category === 'Ultra-Luxury Design'
    ) {
      newPhase = 'enhance';
      enhanceCount++;
    }
    // Priority 2: Content-based classification for uncategorized prompts
    else if (
      searchText.includes('persona') ||
      searchText.includes('design standard') ||
      searchText.includes('design system') ||
      searchText.includes('color palette') ||
      searchText.includes('typography system') ||
      searchText.includes('spacing system') ||
      searchText.includes('brand guide') ||
      searchText.includes('style guide') ||
      searchText.includes('foundations') ||
      searchText.includes('cursor') ||
      searchText.includes('globals.css') ||
      searchText.includes('tailwind.config') ||
      searchText.includes('8-point grid') ||
      searchText.includes('visual hierarchy')
    ) {
      newPhase = 'foundation';
      foundationCount++;
    }
    else if (
      searchText.includes('aida') ||
      searchText.includes('hormozi') ||
      searchText.includes('pas formula') ||
      searchText.includes('copywriting') ||
      searchText.includes('headline') ||
      searchText.includes('value proposition') ||
      searchText.includes('call to action') ||
      searchText.includes('cta') ||
      searchText.includes('microcopy') ||
      searchText.includes('landing page copy') ||
      searchText.includes('sales copy') ||
      searchText.includes('email copy') ||
      searchText.includes('social proof copy') ||
      searchText.includes('objection handling') ||
      searchText.includes('storytelling') ||
      searchText.includes('benefit-driven')
    ) {
      newPhase = 'content';
      contentCount++;
    }
    else if (
      searchText.includes('mobile') ||
      searchText.includes('responsive') ||
      searchText.includes('polish') ||
      searchText.includes('above the fold') ||
      searchText.includes('viewport') ||
      searchText.includes('breakpoint') ||
      searchText.includes('tablet') ||
      searchText.includes('smartphone') ||
      searchText.includes('touch') ||
      searchText.includes('accessibility') ||
      searchText.includes('a11y') ||
      searchText.includes('testing') ||
      searchText.includes('qa') ||
      searchText.includes('conversion') ||
      searchText.includes('cro') ||
      searchText.includes('optimization') ||
      searchText.includes('performance') ||
      searchText.includes('seo') ||
      searchText.includes('lighthouse')
    ) {
      newPhase = 'refine';
      refineCount++;
    }
    else if (
      searchText.includes('animation') ||
      searchText.includes('motion design') ||
      searchText.includes('visual effect') ||
      searchText.includes('framer motion') ||
      searchText.includes('gsap') ||
      searchText.includes('parallax') ||
      searchText.includes('scroll animation') ||
      searchText.includes('hover effect') ||
      searchText.includes('transition') ||
      searchText.includes('library integration') ||
      searchText.includes('chart') ||
      searchText.includes('visualization') ||
      searchText.includes('3d effect') ||
      searchText.includes('glassmorphism') ||
      searchText.includes('gradient') ||
      searchText.includes('luxury') ||
      searchText.includes('premium ui') ||
      searchText.includes('micro-interaction')
    ) {
      newPhase = 'enhance';
      enhanceCount++;
    }
    else {
      // Default to build if no specific match
      newPhase = 'build';
      buildCount++;
    }

    // Update the prompt if phase changed
    if (prompt.usagePhase !== newPhase) {
      await prisma.customPrompt.update({
        where: { id: prompt.id },
        data: { usagePhase: newPhase }
      });
    }
  }

  console.log('✅ Reclassification Complete!\n');
  console.log('New Distribution:');
  console.log('==================');
  console.log(`1️⃣  Foundation: ${foundationCount} prompts`);
  console.log(`2️⃣  Content: ${contentCount} prompts`);
  console.log(`3️⃣  Build: ${buildCount} prompts`);
  console.log(`4️⃣  Enhance: ${enhanceCount} prompts`);
  console.log(`5️⃣  Refine: ${refineCount} prompts`);
  console.log(`\n📊 Total: ${foundationCount + contentCount + buildCount + enhanceCount + refineCount} prompts`);

  // Verify with database query
  console.log('\n🔍 Verifying with database query...');
  const verification = await prisma.customPrompt.groupBy({
    by: ['usagePhase'],
    _count: true
  });

  verification.sort((a, b) => {
    const order = ['foundation', 'content', 'build', 'enhance', 'refine'];
    return order.indexOf(a.usagePhase || '') - order.indexOf(b.usagePhase || '');
  });

  verification.forEach(phase => {
    console.log(`   ${phase.usagePhase}: ${phase._count}`);
  });

  await prisma.$disconnect();
}

reclassifyPrompts()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
