import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mark } from '../components/Mark'
import { ThemeToggle } from '../components/ThemeToggle'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useAuth } from '../context/AuthContext'

const DEMO_EMAIL = 'demo@stratafi.test'
const DEMO_PASSWORD = 'demo1234'

export default function Login() {
  const navigate = useNavigate()
  const { loginWithEmail } = useAuth()
  const [email, setEmail] = useState(DEMO_EMAIL)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await loginWithEmail(email.trim(), password)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-[100dvh] grid lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] bg-white dark:bg-surface-900">
      <section className="relative hidden lg:flex flex-col justify-between bg-primary-800 text-white p-12 xl:p-16 overflow-hidden">
        <div className="pointer-events-none absolute -right-16 top-24 h-64 w-64 rounded-full bg-[#d7f56a]/15" aria-hidden="true" />
        <div className="relative flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d7f56a] text-primary-900">
            <Mark className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">StrataFi</span>
        </div>
        <div className="relative max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d7f56a]">Hiring exercise</p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-[-0.04em]">
            A ledger for the money you already have.
          </h1>
          <p className="mt-5 text-base text-white/75 leading-relaxed">
            Sign in with the demo account. Balances, budgets, and the activity list all run in the browser.
          </p>
        </div>
        <p className="relative text-sm text-white/60">
          {DEMO_EMAIL} · {DEMO_PASSWORD}
        </p>
      </section>

      <section className="relative flex flex-col min-h-[100dvh] mesh-bg">
        <header className="flex items-center justify-between px-5 sm:px-8 pt-5">
          <div className="flex items-center gap-2 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-800 text-[#d7f56a]">
              <Mark className="h-[18px] w-[18px]" />
            </span>
            <span className="font-display font-semibold text-surface-900 dark:text-white">StrataFi</span>
          </div>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-5 sm:px-10 py-10">
          <div className="w-full max-w-sm">
            <p className="page-eyebrow lg:hidden">Hiring exercise</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-surface-900 dark:text-white">Sign in</h2>
            <p className="mt-2 text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
              Use the demo user. Nothing leaves this browser.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <Input
                label="Email"
                name="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={setEmail}
                required
              />
              <Input
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={setPassword}
                required
              />
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                  {error}
                </p>
              )}
              <Button type="submit" fullWidth disabled={submitting}>
                {submitting ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>

            <p className="mt-6 text-xs text-surface-500 leading-relaxed">
              Demo: <span className="font-mono">{DEMO_EMAIL}</span> / <span className="font-mono">{DEMO_PASSWORD}</span>
              <br />
              Admin: <span className="font-mono">admin@stratafi.test</span> / <span className="font-mono">admin1234</span>
            </p>
          </div>
        </main>
      </section>
    </div>
  )
}
