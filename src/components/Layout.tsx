import { useEffect, useState } from 'react'
import { Outlet, Link, useLocation, useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCoach } from '../context/CoachContext'
import { ThemeToggle } from './ThemeToggle'
import { ChatPanel } from './ChatPanel'
import { Mark } from './Mark'

const primaryNav = [
  { to: '/', label: 'Home', end: true },
  { to: '/transactions', label: 'Ledger' },
  { to: '/recurring', label: 'Recurring' },
  { to: '/budgets', label: 'Budgets' },
  { to: '/savings', label: 'Savings' },
  { to: '/loans', label: 'Loans' },
  { to: '/chatbot', label: 'Coach' },
]

const moreNav = [
  { to: '/accounts', label: 'Accounts', description: 'Link and sync banks' },
  { to: '/verify', label: 'Verify', description: 'Identity for loans' },
  { to: '/insights', label: 'Insights', description: 'Monthly spending deep dive' },
  { to: '/blockchain', label: 'Chain', description: 'On-chain attestations' },
]

function shortWallet(address?: string | null) {
  if (!address) return null
  if (address.length < 12) return address
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

export default function Layout() {
  const { user, logout } = useAuth()
  const { panelOpen, openPanel, closePanel } = useCoach()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const wallet = shortWallet(user?.walletAddress)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[#d7f56a] text-surface-900'
        : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-300 dark:hover:bg-surface-800 dark:hover:text-white'
    }`

  const navLists = (
    <>
      <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-surface-400">Money</p>
      {primaryNav.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
          {item.label}
        </NavLink>
      ))}
      <p className="px-3 pb-1 pt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-surface-400">Workspace</p>
      {moreNav.map((item) => (
        <NavLink key={item.to} to={item.to} className={linkClass} title={item.description}>
          {item.label}
        </NavLink>
      ))}
    </>
  )

  return (
    <div className="min-h-[100dvh] mesh-bg lg:flex">
      <aside className="hidden lg:flex lg:w-60 lg:shrink-0 lg:flex-col lg:sticky lg:top-0 lg:h-[100dvh] border-r border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900">
        <Link to="/" className="flex items-center gap-2.5 px-5 h-16 border-b border-surface-200 dark:border-surface-700">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-800 text-[#d7f56a]">
            <Mark className="h-4 w-4" />
          </span>
          <span className="font-display text-base font-semibold tracking-tight text-surface-900 dark:text-white">StrataFi</span>
        </Link>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5" aria-label="Main">
          {navLists}
        </nav>
        <div className="border-t border-surface-200 dark:border-surface-700 p-3 space-y-2">
          {wallet && (
            <p className="px-2 text-[11px] font-mono text-surface-500 truncate" title={user?.walletAddress ?? undefined}>
              {wallet}
            </p>
          )}
          <div className="flex items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-1">
              <ThemeToggle />
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-xs font-semibold text-primary-700 dark:text-primary-300 px-2 py-1 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950/40">
                  Admin
                </Link>
              )}
            </div>
            <button
              type="button"
              onClick={() => logout().then(() => navigate('/login'))}
              className="text-sm font-medium text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white px-2 py-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"
            >
              Log out
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="lg:hidden sticky top-0 z-30 safe-area-pt border-b border-surface-200 dark:border-surface-700 bg-white/95 dark:bg-surface-900/95">
          <div className="flex items-center gap-2 px-4 h-14">
            <button
              type="button"
              className="rounded-lg p-2 text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
            <Link to="/" className="flex items-center gap-2 min-w-0">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-800 text-[#d7f56a]">
                <Mark className="h-4 w-4" />
              </span>
              <span className="font-display font-semibold text-surface-900 dark:text-white">StrataFi</span>
            </Link>
            <div className="ml-auto flex items-center">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => logout().then(() => navigate('/login'))}
                className="text-sm font-medium text-surface-600 dark:text-surface-300 px-2 py-1"
              >
                Log out
              </button>
            </div>
          </div>
          {mobileOpen && (
            <nav className="border-t border-surface-200 dark:border-surface-700 px-3 py-3 space-y-0.5 bg-white dark:bg-surface-900" aria-label="Mobile">
              {navLists}
              {user?.role === 'admin' && (
                <Link to="/admin" className="flex rounded-lg px-3 py-2 text-sm font-medium text-primary-700 dark:text-primary-300">
                  Admin
                </Link>
              )}
            </nav>
          )}
        </header>

        <main className="relative page-shell px-4 sm:pl-6 sm:pr-24 lg:pl-10 lg:pr-28 pt-6 sm:pt-8 pb-28 min-w-0">
          <Outlet />
        </main>
      </div>

      {panelOpen && <ChatPanel onClose={closePanel} />}

      {!panelOpen && location.pathname !== '/chatbot' && (
        <button
          type="button"
          onClick={openPanel}
          className="fixed z-30 w-12 h-12 rounded-full bg-primary-800 text-[#d7f56a] shadow-[0_12px_28px_-12px_rgba(16,44,35,0.7)] flex items-center justify-center hover:bg-primary-700 transition-colors animate-fab-in right-4 sm:right-6 bottom-4 sm:bottom-6 safe-area-pb"
          aria-label="Open coach"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09z" />
          </svg>
        </button>
      )}
    </div>
  )
}
