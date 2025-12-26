import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkCounts() {
  try {
    const totalPrompts = await prisma.customPrompt.count();
    const promptsByCategory = await prisma.customPrompt.groupBy({
      by: ['category'],
      _count: true
    });
    
    console.log(`\n=== DATABASE STATS ===`);
    console.log(`Total prompts in database: ${totalPrompts}`);
    console.log(`\nPrompts by category:`);
    promptsByCategory.forEach((item: any) => {
      console.log(`  ${item.category}: ${item._count}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCounts();
