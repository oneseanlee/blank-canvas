
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function checkPhases() {
  // Get sample prompts from each phase
  const phases = ['foundation', 'content', 'build', 'enhance', 'refine'];
  
  for (const phase of phases) {
    console.log(`\n========== ${phase.toUpperCase()} PHASE ==========`);
    const prompts = await prisma.customPrompt.findMany({
      where: { usagePhase: phase },
      take: 5,
      select: { title: true, category: true, useCase: true }
    });
    
    const count = await prisma.customPrompt.count({ where: { usagePhase: phase } });
    console.log(`Total: ${count} prompts`);
    prompts.forEach(p => {
      console.log(`  - ${p.title}`);
      console.log(`    Category: ${p.category}, Use Case: ${p.useCase}`);
    });
  }
  
  // Check for prompts that might belong to foundation but aren't
  console.log(`\n========== POTENTIAL FOUNDATION PROMPTS ==========`);
  const potentialFoundation = await prisma.customPrompt.findMany({
    where: {
      OR: [
        { category: { contains: 'System', mode: 'insensitive' } },
        { useCase: { contains: 'Persona', mode: 'insensitive' } },
        { useCase: { contains: 'Brand Identity', mode: 'insensitive' } },
        { category: { contains: 'Ultra-Luxury Design', mode: 'insensitive' } },
        { useCase: { contains: 'Typography', mode: 'insensitive' } }
      ],
      usagePhase: { not: 'foundation' }
    },
    select: { title: true, category: true, useCase: true, usagePhase: true }
  });
  
  console.log(`Found ${potentialFoundation.length} prompts that might belong to Foundation:`);
  potentialFoundation.slice(0, 15).forEach(p => {
    console.log(`  - ${p.title}`);
    console.log(`    Category: ${p.category}, Use Case: ${p.useCase}, Current Phase: ${p.usagePhase}`);
  });
  
  await prisma.$disconnect();
}

checkPhases().catch(console.error);
