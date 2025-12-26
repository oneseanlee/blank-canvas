import { PrismaClient } from '@prisma/client'
import * as XLSX from 'xlsx'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const prisma = new PrismaClient()

interface ExportPrompt {
  id: string
  title: string
  prompt: string
  category: string
  usagePhase: string
  tags: string
  useCase?: string
  toolsNeeded: string
  description?: string
  createdAt: string
  userId: string
}

async function exportDatabaseToExcel() {
  try {
    console.log('🔍 Fetching all prompts from database...')
    
    // Fetch all prompts
    const prompts = await prisma.customPrompt.findMany({
      orderBy: [
        { usagePhase: 'asc' },
        { category: 'asc' },
        { title: 'asc' }
      ]
    })

    console.log(`✅ Found ${prompts.length} prompts`)

    // Transform data for Excel export
    const exportData: ExportPrompt[] = prompts.map(prompt => ({
      id: prompt.id,
      title: prompt.title,
      prompt: prompt.prompt,
      category: prompt.category || 'Uncategorized',
      usagePhase: prompt.usagePhase || 'N/A',
      tags: Array.isArray(prompt.tags) ? prompt.tags.join(', ') : '',
      useCase: prompt.useCase || '',
      toolsNeeded: Array.isArray(prompt.toolsNeeded) ? prompt.toolsNeeded.join(', ') : '',
      description: prompt.description || '',
      createdAt: prompt.createdAt.toISOString(),
      userId: prompt.userId
    }))

    // Create workbook
    const wb = XLSX.utils.book_new()

    // Create main prompts sheet
    const ws = XLSX.utils.json_to_sheet(exportData, {
      header: [
        'id',
        'title',
        'prompt',
        'category',
        'usagePhase',
        'tags',
        'useCase',
        'toolsNeeded',
        'description',
        'createdAt',
        'userId'
      ]
    })

    // Set column widths for better readability
    ws['!cols'] = [
      { wch: 30 },  // id
      { wch: 40 },  // title
      { wch: 80 },  // prompt
      { wch: 25 },  // category
      { wch: 15 },  // usagePhase
      { wch: 30 },  // tags
      { wch: 40 },  // useCase
      { wch: 25 },  // toolsNeeded
      { wch: 50 },  // description
      { wch: 20 },  // createdAt
      { wch: 30 }   // userId
    ]

    XLSX.utils.book_append_sheet(wb, ws, 'All Prompts')

    // Create summary sheet with stats
    const stats = [
      { Metric: 'Total Prompts', Value: prompts.length },
      { Metric: '', Value: '' },
      { Metric: '=== By Usage Phase ===', Value: '' },
    ]

    // Count by usage phase
    const phaseGroups = prompts.reduce((acc, p) => {
      const phase = p.usagePhase || 'N/A'
      acc[phase] = (acc[phase] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    Object.entries(phaseGroups)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([phase, count]) => {
        stats.push({ Metric: `  ${phase}`, Value: count })
      })

    stats.push({ Metric: '', Value: '' })
    stats.push({ Metric: '=== By Category ===', Value: '' })

    // Count by category
    const categoryGroups = prompts.reduce((acc, p) => {
      const cat = p.category || 'Uncategorized'
      acc[cat] = (acc[cat] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    Object.entries(categoryGroups)
      .sort(([, a], [, b]) => b - a)
      .forEach(([category, count]) => {
        stats.push({ Metric: `  ${category}`, Value: count })
      })

    const statsWs = XLSX.utils.json_to_sheet(stats)
    statsWs['!cols'] = [
      { wch: 35 },  // Metric
      { wch: 15 }   // Value
    ]
    XLSX.utils.book_append_sheet(wb, statsWs, 'Summary')

    // Write to file (inside project directory)
    const outputPath = path.join(__dirname, '..', 'public', 'database_export.xlsx')
    XLSX.writeFile(wb, outputPath)

    console.log('\n✅ Excel export completed successfully!')
    console.log(`📁 File saved to: ${outputPath}`)
    console.log('\n📊 Summary:')
    console.log(`   Total Prompts: ${prompts.length}`)
    console.log('\n   By Usage Phase:')
    Object.entries(phaseGroups)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([phase, count]) => {
        console.log(`     ${phase}: ${count}`)
      })
    console.log('\n   By Category (Top 5):')
    Object.entries(categoryGroups)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .forEach(([category, count]) => {
        console.log(`     ${category}: ${count}`)
      })

  } catch (error) {
    console.error('❌ Error exporting database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the export
exportDatabaseToExcel()
  .then(() => {
    console.log('\n✨ Export process completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Export failed:', error)
    process.exit(1)
  })
