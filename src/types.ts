export type Link = { label: string; href: string }

export type ProjectVisual =
  | { kind: 'cafecraaft' }
  | { kind: 'chain' }
  | { kind: 'zoroto' }
  | { kind: 'image'; src: string; alt: string; width: number; height: number }

export type Project = {
  id: string
  title: string
  category: string
  /** One or two sentences for the project panel. */
  summary: string
  goal: string
  approach: string
  /** Short role label for the project panel. */
  role: string
  contribution: string
  highlights: string[]
  /** Honest list of what would come next. Optional. */
  nextSteps?: string[]
  stack: string[]
  status: string
  /** Only verified, working URLs. Empty array = no links shown. */
  links: Link[]
  visual: ProjectVisual
  /** Shown under the visual when it is an illustration rather than a real screenshot. */
  visualNote?: string
  /** Extra context shown in the case study (credits, scope notes). */
  note?: string
  /** Label of the button that opens the case study. */
  caseStudyLabel: string
  /** Optional call to action that jumps to the contact form. */
  contactCta?: string
  featured: boolean
}

export type Service = { title: string; outcome: string; includes: string[] }

export type SkillGroup = { label: string; items: { name: string; usedIn?: string }[] }

export type Entry = { title: string; org: string; dates?: string; detail?: string }

export type ContactPath = 'project' | 'opportunity'
