
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

// GET all prompts (shared library - all users see all prompts)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Return ALL prompts from the database (shared library)
    const customPrompts = await prisma.customPrompt.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ customPrompts })
  } catch (error) {
    console.error('Error fetching custom prompts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch custom prompts' },
      { status: 500 }
    )
  }
}

// POST to create a new custom prompt
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, prompt, category, tags, useCase, toolsNeeded, description } = await request.json()

    if (!title || !prompt) {
      return NextResponse.json(
        { error: 'Title and prompt are required' },
        { status: 400 }
      )
    }

    const customPrompt = await prisma.customPrompt.create({
      data: {
        userId: session.user.id,
        title,
        prompt,
        category: category || null,
        tags: tags || [],
        useCase: useCase || null,
        toolsNeeded: toolsNeeded || [],
        description: description || null,
      },
    })

    return NextResponse.json({ success: true, customPrompt }, { status: 201 })
  } catch (error) {
    console.error('Error creating custom prompt:', error)
    return NextResponse.json(
      { error: 'Failed to create custom prompt' },
      { status: 500 }
    )
  }
}

// DELETE to remove a custom prompt
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Prompt ID is required' },
        { status: 400 }
      )
    }

    // Verify ownership before deleting
    const customPrompt = await prisma.customPrompt.findUnique({
      where: { id },
    })

    if (!customPrompt || customPrompt.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Prompt not found or unauthorized' },
        { status: 404 }
      )
    }

    await prisma.customPrompt.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting custom prompt:', error)
    return NextResponse.json(
      { error: 'Failed to delete custom prompt' },
      { status: 500 }
    )
  }
}
