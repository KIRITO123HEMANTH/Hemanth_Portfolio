import { createContext, useContext } from 'react'
import type { ContactPath } from './types'

export type ContactIntent = { path: ContactPath; type?: string; nonce: number }

/** Lets any CTA on the page preselect the contact form path ("Start a project" vs "Discuss an opportunity"). */
export const ContactIntentContext = createContext<{
  intent: ContactIntent
  requestContact: (path: ContactPath, type?: string) => void
}>({ intent: { path: 'project', nonce: 0 }, requestContact: () => {} })

export const useContactIntent = () => useContext(ContactIntentContext)
