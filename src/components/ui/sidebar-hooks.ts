import type { SidebarContextValue } from '@/components/ui/sidebar-context'
import * as React from 'react'
import { SidebarContext } from '@/components/ui/sidebar-context'

export function useSidebar(): SidebarContextValue {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }

  return context
}
