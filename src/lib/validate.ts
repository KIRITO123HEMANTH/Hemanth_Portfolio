export type Fields = { name: string; email: string; company: string; type: string; budget: string; details: string }
export type Errors = Partial<Record<keyof Fields, string>>

export const EMPTY: Fields = { name: '', email: '', company: '', type: '', budget: '', details: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Please tell me your name.'
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address, like name@example.com.'
  if (!f.type) e.type = 'Please choose what this is about.'
  if (f.details.trim().length < 20) e.details = 'A few more details would help: at least 20 characters.'
  else if (f.details.length > 5000) e.details = 'Please keep it under 5,000 characters.'
  return e
}
