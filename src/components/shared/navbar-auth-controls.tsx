'use client'

import Link from 'next/link'
import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls() {
  const { user } = useAuth()

  return (
    <Button asChild variant="ghost" size="icon" className="rounded-xl border border-[var(--border-app)] bg-white text-[var(--text-body)] hover:bg-[rgba(97,45,83,0.08)] hover:text-[var(--sbm-blue-dim)]">
      <Link href="/account" aria-label="Open account details">
        {user?.avatar ? (
          <Avatar className="h-9 w-9 border border-[var(--border-app)]">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        ) : (
          <User className="h-5 w-5" />
        )}
      </Link>
    </Button>
  )
}
