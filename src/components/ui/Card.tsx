interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 p-5 ${className}`}
    >
      {children}
    </div>
  )
}
