
'use client'

import { useSession, signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { LogOut, User } from 'lucide-react'

export function UserHeader() {
  const { data: session } = useSession() || {}

  if (!session?.user) {
    return null
  }

  return (
    <div className="flex items-center justify-between bg-black/95 border-b-2 border-green-500/30 px-6 py-3">
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-green-500" />
        <span className="text-white font-medium">
          {session.user.name || session.user.email}
        </span>
      </div>
      
      <Button
        onClick={() => signOut({ callbackUrl: '/auth/login' })}
        variant="outline"
        size="sm"
        className="border-green-500/30 bg-black/50 text-gray-300 hover:bg-green-900/20 hover:text-white"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </div>
  )
}
