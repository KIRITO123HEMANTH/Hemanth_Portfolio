mport { useEffect, useRef, useState, type FormEvent } from 'react'
import { contactConfig, socialLinks } from '../config/site'
import { useContactIntent } from '../contactIntent'
import type { ContactPath } from '../types'
import { EMPTY, validate, type Errors, type Fields } from '../lib/validate'

type Status = { state: 'idle' | 'sending' | 'sent' | 'mailto' | 'error'; message?: string }

function mailtoHref(path: ContactPath, f: Fields) {
  const subject = `${path === 'project' ? 'Project' : 'Opportunity'}: ${f.type}`
  const header = [`Name: ${f.name}`, `Email: ${f.email}`, f.company && `Company: ${f.company}`, f.budget && `Budget: ${f.budget}`]
  const body = `${header.filter(Boolean).join('\n')}\n\n${f.details}`
  return `mailto:${socialLinks.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function ContactForm() {
  const { intent } = useContactIntent()
  const [path, setPath] = useState<ContactPath>('project')
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [status, setStatus] = useState<Status>({ state: 'idle' })
  const startedAt = useRef(Date.now())
  const formRef = useRef<HTMLFormElement>(null)

  // A CTA elsewhere on the page picked a path (and maybe a type).
  useEffect(() => {
    if (!intent.nonce) return
    setPath(intent.path)
    setFields((f) => ({ ...f, type: intent.type ?? '' }))
  }, [intent])

  const types = path === 'project' ? contactConfig.projectTypes : contactConfig.opportunityTypes

  const set = (k: keyof Fields, v: string) => {
    const next = { ...fields, [k]: v }
    setFields(next)
    if (touched[k]) setErrors(validate(next))
  }
  const blur = (k: keyof Fields) => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors(validate(fields))
  }
  const switchPath = (p: ContactPath) => {
    setPath(p)
    setFields((f) => ({ ...f, type: '', budget: p === 'project' ? f.budget : '' }))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errs = validate(fields)
    setErrors(errs)
    setTouched({ name: true, email: true, type: true, details: true })
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    // Spam checks: a hidden honeypot field and a minimum time on the form.
    const honeypot = (e.currentTarget.elements.namedItem('website') as HTMLInputElement).value
    if (honeypot || Date.now() - startedAt.current < 2500) {
      setStatus({ state: 'error', message: 'That was a little too fast. Please wait a moment and try again.' })
      return
    }

    if (!contactConfig.endpoint) {
      window.location.href = mailtoHref(path, fields)
      setStatus({ state: 'mailto' })
      return
    }

    setStatus({ state: 'sending' })
    try {
      const res = await fetch(contactConfig.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...fields, path, _subject: `${path === 'project' ? 'Project' : 'Opportunity'}: ${fields.type}` }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus({ state: 'sent' })
      setFields(EMPTY)
      setTouched({})
    } catch {
      setStatus({ state: 'error', message: 'Your message could not be sent. Nothing was lost: you can try again, or send it by email instead.' })
    }
  }

  if (status.state === 'sent') {
    return (
      <div className="form-done" role="status">
        <p className="form-done__title">Thank you, your message has been sent.</p>
        <p>I read every message myself and will reply to the email you gave.</p>
        <button type="button" className="link" onClick={() => setStatus({ state: 'idle' })}>
          Send another message
        </button>
      </div>
    )
  }

  const field = (k: keyof Fields) => ({
    id: `f-${k}`,
    name: k,
    value: fields[k],
    'aria-invalid': errors[k] && touched[k] ? true : undefined,
    'aria-describedby': errors[k] && touched[k] ? `f-${k}-error` : undefined,
    onBlur: () => blur(k),
  })
  const error = (k: keyof Fields) =>
    errors[k] && touched[k] ? (
      <p className="field__error" id={`f-${k}-error`}>
        {errors[k]}
      </p>
    ) : null

  return (
    <form ref={formRef} className="form" noValidate onSubmit={onSubmit} aria-labelledby="form-title">
      <h3 id="form-title" className="visually-hidden">
        Contact form
      </h3>
      <fieldset className="paths">
        <legend className="visually-hidden">What brings you here?</legend>
        {(['project', 'opportunity'] as const).map((p) => (
          <label key={p} className="paths__opt">
            <input type="radio" name="path" value={p} checked={path === p} onChange={() => switchPath(p)} />
            <span>{p === 'project' ? 'A freelance project' : 'A professional opportunity'}</span>
          </label>
        ))}
      </fieldset>

      <div className="form__grid">
        <div className="field">
          <label htmlFor="f-name">Name</label>
          <input {...field('name')} type="text" autoComplete="name" required onChange={(e) => set('name', e.target.value)} />
          {error('name')}
        </div>
        <div className="field">
          <label htmlFor="f-email">Email</label>
          <input {...field('email')} type="email" autoComplete="email" inputMode="email" required onChange={(e) => set('email', e.target.value)} />
          {error('email')}
        </div>
        <div className="field">
          <label htmlFor="f-company">
            {path === 'project' ? 'Business name' : 'Company'} <span className="optional">(optional)</span>
          </label>
          <input {...field('company')} type="text" autoComplete="organization" onChange={(e) => set('company', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="f-type">{path === 'project' ? 'Project type' : 'Opportunity type'}</label>
          <select {...field('type')} required onChange={(e) => set('type', e.target.value)}>
            <option value="">Choose one</option>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {error('type')}
        </div>
        {path === 'project' && (
          <div className="field field--wide">
            <label htmlFor="f-budget">
              Budget range <span className="optional">(optional)</span>
            </label>
            <select {...field('budget')} onChange={(e) => set('budget', e.target.value)}>
              <option value="">Prefer not to say</option>
              {contactConfig.budgets.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
        )}
        <div className="field field--wide">
          <label htmlFor="f-details">{path === 'project' ? 'Project details' : 'About the role'}</label>
          <textarea
            {...field('details')}
            rows={5}
            required
            placeholder={path === 'project' ? 'What are you building, who is it for, and when do you need it?' : 'The team, the role, and a link to the job description if there is one.'}
            onChange={(e) => set('details', e.target.value)}
          />
          {error('details')}
        </div>
        {/* Honeypot: invisible to people, tempting to bots. */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="f-website">Website</label>
          <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div className="form__foot">
        <button type="submit" className="btn btn--accent btn--big" disabled={status.state === 'sending'}>
          {status.state === 'sending' ? 'Sending…' : path === 'project' ? 'Send project details' : 'Send message'}
        </button>
        <p className="form__hint">
          {contactConfig.endpoint ? 'Your message goes straight to my inbox.' : 'This opens your email app with the message ready to send.'}
        </p>
      </div>

      <div aria-live="polite" className="form__status">
        {status.state === 'mailto' && (
          <p>
            Your email app should have opened with the message ready. If it didn’t, write to{' '}
            <a className="link" href={`mailto:${socialLinks.email}`}>
              {socialLinks.email}
            </a>
            .
          </p>
        )}
        {status.state === 'error' && (
          <p className="field__error">
            {status.message}{' '}
            <a className="link" href={mailtoHref(path, fields)}>
              Send by email
            </a>
          </p>
        )}
      </div>
    </form>
  )
}
