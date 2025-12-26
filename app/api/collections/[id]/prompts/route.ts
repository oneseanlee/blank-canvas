
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

// POST to add a prompt to a collection
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const collectionId = params.id
    const { promptId, isCustom } = await request.json()

    if (!promptId) {
      return NextResponse.json(
        { error: 'Prompt ID is required' },
        { status: 400 }
      )
    }

    // Verify ownership of collection
    const collection = await prisma.collection.findUnique({
      where: { id: collectionId },
    })

    if (!collection || collection.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Collection not found or unauthorized' },
        { status: 404 }
      )
    }

    // Get the next order number
    const lastItem = await prisma.collectionPrompt.findFirst({
      where: { collectionId },
      orderBy: { order: 'desc' },
    })

    const order = (lastItem?.order || 0) + 1

    const collectionPrompt = await prisma.collectionPrompt.create({
      data: {
        collectionId,
        promptId,
        isCustom: isCustom || false,
        order,
      },
    })

    return NextResponse.json({ success: true, collectionPrompt }, { status: 201 })
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'Prompt already in collection' },
        { status: 400 }
      )
    }
    console.error('Error adding prompt to collection:', error)
    return NextResponse.json(
      { error: 'Failed to add prompt to collection' },
      { status: 500 }
    )
  }
}

// DELETE to remove a prompt from a collection
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const collectionId = params.id
    const { promptId } = await request.json()

    if (!promptId) {
      return NextResponse.json(
        { error: 'Prompt ID is required' },
        { status: 400 }
      )
    }

    // Verify ownership of collection
    const collection = await prisma.collection.findUnique({
      where: { id: collectionId },
    })

    if (!collection || collection.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Collection not found or unauthorized' },
        { status: 404 }
      )
    }

    await prisma.collectionPrompt.deleteMany({
      where: {
        collectionId,
        promptId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing prompt from collection:', error)
    return NextResponse.json(
      { error: 'Failed to remove prompt from collection' },
      { status: 500 }
    )
  }
}
