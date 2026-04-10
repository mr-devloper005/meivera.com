'use client'

import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'

export default function AccountPage() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <PageShell title="Account" description="Simple profile and login details.">
      <Card className="border-[var(--border-app)] bg-white">
        <CardContent className="p-6 sm:p-8">
          {isAuthenticated && user ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border border-[var(--border-app)]">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold text-[var(--text-heading)]">{user.name}</p>
                  <p className="text-sm text-[var(--text-body)]">{user.email}</p>
                </div>
              </div>

              <div className="grid gap-3 rounded-xl border border-[var(--border-app)] bg-[var(--surface-muted)] p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-[var(--text-heading)]">Logged in</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">User ID</span>
                  <span className="font-medium text-[var(--text-heading)]">{user.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Joined</span>
                  <span className="font-medium text-[var(--text-heading)]">{user.joinedDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="destructive" onClick={logout} className="rounded-xl">
                  Sign out
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-[var(--text-body)]">You are not logged in right now.</p>
              <div className="flex gap-3">
                <Button asChild className="rounded-xl bg-[var(--sbm-blue-dim)] hover:bg-[var(--sbm-blue)]">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button variant="outline" asChild className="rounded-xl border-[var(--border-app)]">
                  <Link href="/register">Create account</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </PageShell>
  )
}
