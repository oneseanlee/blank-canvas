
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function checkRefinePhase() {
  console.log('\n========== REFINE PHASE PROMPTS ==========\n');
  
  const refinePrompts = await prisma.customPrompt.findMany({
    where: { usagePhase: 'refine' },
    select: { title: true, category: true, useCase: true },
    take: 25
  });
  
  const count = await prisma.customPrompt.count({ where: { usagePhase: 'refine' } });
  console.log(`Total Refine prompts: ${count}\n`);
  console.log('Sample prompts (first 25):\n');
  
  refinePrompts.forEach((p, i) => {
    console.log(`${i + 1}. ${p.title}`);
    console.log(`   Category: ${p.category}`);
    console.log(`   Use Case: ${p.useCase}\n`);
  });
  
  await prisma.$disconnect();
}

checkRefinePhase().catch(console.error);
