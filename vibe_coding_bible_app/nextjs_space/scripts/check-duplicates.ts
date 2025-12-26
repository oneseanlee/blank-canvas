import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function checkDuplicates() {
  try {
    console.log('🔍 Checking for duplicate prompts...\n')
    
    const allPrompts = await prisma.customPrompt.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        prompt: true,
        createdAt: true
      },
      orderBy: { title: 'asc' }
    })

    console.log(`Total prompts in database: ${allPrompts.length}\n`)

    // Group by title to find duplicates
    const titleGroups = allPrompts.reduce((acc, p) => {
      const key = p.title.trim().toLowerCase()
      if (!acc[key]) acc[key] = []
      acc[key].push(p)
      return acc
    }, {} as Record<string, typeof allPrompts>)

    const duplicates = Object.entries(titleGroups).filter(([_, prompts]) => prompts.length > 1)

    if (duplicates.length === 0) {
      console.log('✅ No duplicate titles found!')
    } else {
      console.log(`⚠️  Found ${duplicates.length} titles with duplicates:\n`)
      
      duplicates.forEach(([title, prompts]) => {
        console.log(`\n📝 "${title}" (${prompts.length} copies):`)
        prompts.forEach((p, idx) => {
          console.log(`   ${idx + 1}. ID: ${p.id} | Category: ${p.category} | Created: ${p.createdAt.toISOString().split('T')[0]}`)
        })
      })

      console.log(`\n\n📊 Summary:`)
      console.log(`   Total unique titles: ${Object.keys(titleGroups).length}`)
      console.log(`   Total prompts: ${allPrompts.length}`)
      console.log(`   Duplicate entries: ${allPrompts.length - Object.keys(titleGroups).length}`)
    }

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDuplicates()
