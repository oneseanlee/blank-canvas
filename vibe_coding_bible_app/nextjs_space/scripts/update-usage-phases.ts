
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

// Helper function to assign usage phase based on category and subcategory
function getUsagePhase(category: string, useCase: string, tags: string[]): string {
  const cat = category.toLowerCase();
  const uc = useCase.toLowerCase();
  const allTags = tags.map(t => t.toLowerCase()).join(' ');
  
  // Foundation: System setup, personas, brand identity, typography
  if (cat.includes('system') || 
      uc.includes('persona') || 
      uc.includes('brand identity') ||
      uc.includes('typography') ||
      allTags.includes('persona') ||
      allTags.includes('brand identity')) {
    return 'foundation';
  }
  
  // Content: Copywriting, messaging, content strategy
  if (cat.includes('content') || 
      cat.includes('copy') ||
      uc.includes('copywriting') ||
      uc.includes('messaging') ||
      allTags.includes('copywriting') ||
      allTags.includes('aida') ||
      allTags.includes('hormozi')) {
    return 'content';
  }
  
  // Build: Full builds, layouts, components, database, backend, e-commerce
  if (cat.includes('build') || 
      cat.includes('layout') || 
      cat.includes('component') || 
      cat.includes('database') ||
      cat.includes('e-commerce') ||
      uc.includes('api') || 
      uc.includes('auth') || 
      uc.includes('admin') || 
      uc.includes('checkout') ||
      uc.includes('cart') || 
      uc.includes('dashboard') ||
      uc.includes('landing') ||
      uc.includes('product display')) {
    return 'build';
  }
  
  // Enhance: Motion, animations, libraries, visuals, effects
  if (cat.includes('motion') || 
      cat.includes('library') || 
      cat.includes('visual') || 
      uc.includes('animation') ||
      uc.includes('effect') || 
      uc.includes('transition') ||
      uc.includes('interaction') ||
      allTags.includes('animation') ||
      allTags.includes('effect')) {
    return 'enhance';
  }
  
  // Refine: QA, testing, CRO, optimization, polish, mobile, responsive, above-the-fold
  if (cat.includes('qa') || 
      cat.includes('refine') || 
      cat.includes('cro') || 
      uc.includes('test') ||
      uc.includes('optimization') || 
      uc.includes('polish') ||
      uc.includes('mobile') ||
      uc.includes('responsive') ||
      uc.includes('above the fold') ||
      uc.includes('viewport') ||
      allTags.includes('testing') ||
      allTags.includes('cro') ||
      allTags.includes('mobile') ||
      allTags.includes('responsive')) {
    return 'refine';
  }
  
  // Default to build for most other cases
  return 'build';
}

async function updateUsagePhases() {
  console.log('🔄 Starting usage phase update...\n');

  try {
    // Fetch all prompts without usagePhase
    const prompts = await prisma.customPrompt.findMany({
      where: {
        OR: [
          { usagePhase: null },
          { usagePhase: '' }
        ]
      }
    });

    console.log(`📊 Found ${prompts.length} prompts to update\n`);

    let updated = 0;
    let errors = 0;

    for (const prompt of prompts) {
      try {
        const phase = getUsagePhase(
          prompt.category || '', 
          prompt.useCase || '', 
          prompt.tags || []
        );

        await prisma.customPrompt.update({
          where: { id: prompt.id },
          data: { usagePhase: phase }
        });

        updated++;
        if (updated % 10 === 0) {
          console.log(`✅ Updated ${updated} prompts...`);
        }
      } catch (error) {
        errors++;
        console.error(`❌ Error updating prompt "${prompt.title}":`, error);
      }
    }

    console.log(`\n✨ Update complete!`);
    console.log(`✅ Successfully updated: ${updated} prompts`);
    if (errors > 0) {
      console.log(`❌ Errors: ${errors} prompts`);
    }

    // Show distribution by phase
    const distribution = await prisma.customPrompt.groupBy({
      by: ['usagePhase'],
      _count: true
    });

    console.log(`\n📊 Distribution by phase:`);
    distribution.forEach(d => {
      console.log(`   ${d.usagePhase || 'null'}: ${d._count} prompts`);
    });

  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the update
updateUsagePhases()
  .then(() => {
    console.log('\n🎉 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Update failed:', error);
    process.exit(1);
  });
