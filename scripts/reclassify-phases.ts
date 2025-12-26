
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function reclassifyPhases() {
  console.log('🔄 Starting phase reclassification...\n');

  try {
    let totalUpdated = 0;

    // 1. FOUNDATION: System/Persona prompts
    console.log('📦 Reclassifying System/Persona prompts to Foundation...');
    const systemResult = await prisma.customPrompt.updateMany({
      where: {
        OR: [
          { category: { contains: 'System', mode: 'insensitive' } },
          { useCase: { contains: 'Persona', mode: 'insensitive' } }
        ],
        usagePhase: { not: 'foundation' }
      },
      data: { usagePhase: 'foundation' }
    });
    console.log(`  ✅ Updated ${systemResult.count} System/Persona prompts\n`);
    totalUpdated += systemResult.count;

    // 2. FOUNDATION: Brand Identity & Typography (from Ultra-Luxury Design)
    console.log('📦 Reclassifying Brand Identity & Typography to Foundation...');
    const brandResult = await prisma.customPrompt.updateMany({
      where: {
        category: { contains: 'Ultra-Luxury Design', mode: 'insensitive' },
        OR: [
          { useCase: { contains: 'brand identity', mode: 'insensitive' } },
          { useCase: { contains: 'typography', mode: 'insensitive' } },
          { useCase: { contains: 'color identity', mode: 'insensitive' } },
          { useCase: { contains: 'brand aesthetic', mode: 'insensitive' } },
          { title: { contains: 'Color Palette', mode: 'insensitive' } },
          { title: { contains: 'Typography', mode: 'insensitive' } },
          { title: { contains: 'Brand Identity', mode: 'insensitive' } }
        ],
        usagePhase: { not: 'foundation' }
      },
      data: { usagePhase: 'foundation' }
    });
    console.log(`  ✅ Updated ${brandResult.count} Brand/Typography prompts\n`);
    totalUpdated += brandResult.count;

    // 3. FOUNDATION: Typography from Visuals category
    console.log('📦 Reclassifying Typography (Visuals) to Foundation...');
    const typographyResult = await prisma.customPrompt.updateMany({
      where: {
        category: { contains: 'Visuals', mode: 'insensitive' },
        useCase: { contains: 'Typography', mode: 'insensitive' },
        usagePhase: { not: 'foundation' }
      },
      data: { usagePhase: 'foundation' }
    });
    console.log(`  ✅ Updated ${typographyResult.count} Typography prompts\n`);
    totalUpdated += typographyResult.count;

    // 4. ENHANCE: Keep luxury animations and effects where they are
    console.log('✨ Verifying Luxury animations stay in Enhance...');
    const animationResult = await prisma.customPrompt.updateMany({
      where: {
        category: { contains: 'Ultra-Luxury Design', mode: 'insensitive' },
        OR: [
          { useCase: { contains: 'animation', mode: 'insensitive' } },
          { useCase: { contains: 'interaction', mode: 'insensitive' } },
          { useCase: { contains: 'effect', mode: 'insensitive' } },
          { title: { contains: 'Animation', mode: 'insensitive' } },
          { title: { contains: 'Effect', mode: 'insensitive' } },
          { title: { contains: 'Shimmer', mode: 'insensitive' } },
          { title: { contains: 'Parallax', mode: 'insensitive' } }
        ],
        usagePhase: { not: 'enhance' }
      },
      data: { usagePhase: 'enhance' }
    });
    console.log(`  ✅ Updated ${animationResult.count} Animation/Effect prompts\n`);
    totalUpdated += animationResult.count;

    // 5. BUILD: E-commerce and layout from Ultra-Luxury Design
    console.log('🏗️  Reclassifying E-commerce & Layouts to Build...');
    const ecommerceResult = await prisma.customPrompt.updateMany({
      where: {
        category: { contains: 'Ultra-Luxury Design', mode: 'insensitive' },
        OR: [
          { useCase: { contains: 'e-commerce', mode: 'insensitive' } },
          { useCase: { contains: 'shopping', mode: 'insensitive' } },
          { useCase: { contains: 'product display', mode: 'insensitive' } },
          { useCase: { contains: 'checkout', mode: 'insensitive' } },
          { useCase: { contains: 'cart', mode: 'insensitive' } },
          { useCase: { contains: 'layout', mode: 'insensitive' } },
          { useCase: { contains: 'landing page', mode: 'insensitive' } },
          { title: { contains: 'E-Commerce', mode: 'insensitive' } },
          { title: { contains: 'Shopping', mode: 'insensitive' } },
          { title: { contains: 'Product Grid', mode: 'insensitive' } },
          { title: { contains: 'Checkout', mode: 'insensitive' } }
        ],
        usagePhase: { not: 'build' }
      },
      data: { usagePhase: 'build' }
    });
    console.log(`  ✅ Updated ${ecommerceResult.count} E-commerce/Layout prompts\n`);
    totalUpdated += ecommerceResult.count;

    // 6. REFINE: Polish, mobile, responsive, above-the-fold prompts
    console.log('✨ Reclassifying Polish, Mobile, and Responsive prompts to Refine...');
    const refineResult = await prisma.customPrompt.updateMany({
      where: {
        OR: [
          // Polish and refinement
          { category: { contains: 'Refine', mode: 'insensitive' } },
          { category: { contains: 'QA', mode: 'insensitive' } },
          { category: { contains: 'CRO', mode: 'insensitive' } },
          { useCase: { contains: 'polish', mode: 'insensitive' } },
          { useCase: { contains: 'refine', mode: 'insensitive' } },
          { useCase: { contains: 'optimization', mode: 'insensitive' } },
          { useCase: { contains: 'optimize', mode: 'insensitive' } },
          { title: { contains: 'polish', mode: 'insensitive' } },
          { title: { contains: 'refine', mode: 'insensitive' } },
          { title: { contains: 'optimize', mode: 'insensitive' } },
          // Mobile and responsive
          { useCase: { contains: 'mobile', mode: 'insensitive' } },
          { useCase: { contains: 'responsive', mode: 'insensitive' } },
          { title: { contains: 'mobile', mode: 'insensitive' } },
          { title: { contains: 'responsive', mode: 'insensitive' } },
          { prompt: { contains: 'mobile-friendly', mode: 'insensitive' } },
          { prompt: { contains: 'responsive design', mode: 'insensitive' } },
          // Above the fold and viewport
          { useCase: { contains: 'above the fold', mode: 'insensitive' } },
          { useCase: { contains: 'viewport', mode: 'insensitive' } },
          { title: { contains: 'above the fold', mode: 'insensitive' } },
          { title: { contains: 'viewport', mode: 'insensitive' } },
          { prompt: { contains: 'above the fold', mode: 'insensitive' } },
          // Testing and QA
          { useCase: { contains: 'testing', mode: 'insensitive' } },
          { useCase: { contains: 'qa', mode: 'insensitive' } },
          { title: { contains: 'testing', mode: 'insensitive' } },
          { title: { contains: 'qa', mode: 'insensitive' } },
          // CRO and conversion
          { useCase: { contains: 'cro', mode: 'insensitive' } },
          { useCase: { contains: 'conversion', mode: 'insensitive' } },
          { title: { contains: 'cro', mode: 'insensitive' } },
          { title: { contains: 'conversion', mode: 'insensitive' } }
        ],
        usagePhase: { not: 'refine' }
      },
      data: { usagePhase: 'refine' }
    });
    console.log(`  ✅ Updated ${refineResult.count} Polish/Mobile/Responsive prompts\n`);
    totalUpdated += refineResult.count;

    console.log(`\n✨ Reclassification complete!`);
    console.log(`✅ Total updated: ${totalUpdated} prompts\n`);

    // Show new distribution
    const distribution = await prisma.customPrompt.groupBy({
      by: ['usagePhase'],
      _count: true
    });

    console.log(`📊 New distribution by phase:`);
    const phaseOrder = ['foundation', 'content', 'build', 'enhance', 'refine'];
    phaseOrder.forEach(phase => {
      const entry = distribution.find(d => d.usagePhase === phase);
      if (entry) {
        console.log(`   ${phase}: ${entry._count} prompts`);
      }
    });

  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the reclassification
reclassifyPhases()
  .then(() => {
    console.log('\n🎉 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Reclassification failed:', error);
    process.exit(1);
  });
