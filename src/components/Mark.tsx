export function Mark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="10" y="10" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}
