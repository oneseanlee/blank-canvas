import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function removeDuplicates() {
  try {
    console.log('🔍 Finding and removing duplicate prompts...\n')
    
    const allPrompts = await prisma.customPrompt.findMany({
      orderBy: [
        { createdAt: 'asc' },  // Keep the oldest one
        { title: 'asc' }
      ]
    })

    console.log(`Total prompts before cleanup: ${allPrompts.length}`)

    // Group by title (case-insensitive)
    const titleGroups = allPrompts.reduce((acc, p) => {
      const key = p.title.trim().toLowerCase()
      if (!acc[key]) acc[key] = []
      acc[key].push(p)
      return acc
    }, {} as Record<string, typeof allPrompts>)

    let deletedCount = 0
    let keptCount = 0

    // For each group, keep the first (oldest) and delete the rest
    for (const [title, prompts] of Object.entries(titleGroups)) {
      if (prompts.length > 1) {
        const [keep, ...deleteList] = prompts
        
        console.log(`\n📝 "${keep.title}":`)
        console.log(`   Keeping: ${keep.id} (created ${keep.createdAt.toISOString().split('T')[0]})`)
        console.log(`   Deleting ${deleteList.length} duplicates...`)
        
        // Delete duplicates
        for (const dup of deleteList) {
          await prisma.customPrompt.delete({ where: { id: dup.id } })
          deletedCount++
        }
        keptCount++
      } else {
        keptCount++
      }
    }

    console.log(`\n\n✅ Cleanup complete!`)
    console.log(`   Unique prompts kept: ${keptCount}`)
    console.log(`   Duplicates removed: ${deletedCount}`)
    console.log(`   Total prompts now: ${keptCount}`)

    // Verify final count
    const finalCount = await prisma.customPrompt.count()
    console.log(`\n✓ Database verification: ${finalCount} prompts`)

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

removeDuplicates()
