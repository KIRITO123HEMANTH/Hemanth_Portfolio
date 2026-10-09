/** The one icon on the site. Direction via CSS rotation. */
export default function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`arrow ${className}`} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path d="M3 11 11 3M5 3h6v6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}
