import type { TaskKey } from '@/lib/site-config'

/** Homepage feed sections: UI-only emphasis (all tasks still load for hero imagery). */
export const HOMEPAGE_FEED_TASK_KEYS: readonly TaskKey[] = ['sbm', 'profile']

/** Shown under “More” in nav / footer secondary column when enabled — routes unchanged. */
export const DEFERRED_NAV_TASK_KEYS: readonly TaskKey[] = [
  'listing',
  'classified',
  'article',
  'image',
  'pdf',
]

export function isDeferredNavTask(key: TaskKey) {
  return (DEFERRED_NAV_TASK_KEYS as readonly string[]).includes(key)
}
