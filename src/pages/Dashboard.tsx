import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { SpendingDonut, TrendBars } from '../components/charts/OverviewCharts'

interface Account {
  id: string
  institutionName?: string
  accountName?: string
  currentBalance?: number
}

interface InsightCategory {
  category: string
  spent: number
  budget: number | null
}

interface MonthlyTrend {
  month: string
  spent: number
  credits: number
}

interface InsightsData {
  totalSpent: number
  totalBudgeted: number
  byCategory: InsightCategory[]
  monthlyTrend?: MonthlyTrend[]
}

interface Eligibility {
  riskScore: number
  decision: string
  recommendedLimit?: number
}

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`rounded-xl skeleton-shimmer ${className}`} />
}

export default function Dashboard() {
  const { user } = useAuth()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [insights, setInsights] = useState<InsightsData | null>(null)
  const [eligibility, setEligibility] = useState<Eligibility | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([
      api.get<Account[]>('/accounts').catch(() => [] as Account[]),
      api.get<InsightsData>('/insights/monthly').catch(() => null),
      api.get<Eligibility>('/loans/eligibility').catch(() => null),
    ])
      .then(([accs, insightData, elig]) => {
        setAccounts(accs)
        setInsights(insightData)
        setEligibility(elig)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load.')
      })
      .finally(() => setLoading(false))
  }, [])

  const totalBalance = accounts.reduce((s, a) => s + Number(a.currentBalance ?? 0), 0)
  const spent = Number(insights?.totalSpent ?? 0)
  const budgeted = Number(insights?.totalBudgeted ?? 0)
  const budgetPct = budgeted > 0 ? Math.min(100, Math.round((spent / budgeted) * 100)) : 0
  const pie =
    insights?.byCategory?.filter((c) => c.spent > 0).map((c) => ({ name: c.category || 'Other', value: c.spent })) ?? []
  const trend = insights?.monthlyTrend ?? []
  const hasAccounts = accounts.length > 0
  const walletShort = user?.walletAddress
    ? `${user.walletAddress.slice(0, 6)}…${user.walletAddress.slice(-4)}`
    : null

  const firstName = user?.firstName || 'there'

  if (loading) {
    return (
      <div className="space-y-6 min-w-0 animate-fade-in">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-16 w-64" />
        <div className="grid grid-cols-3 gap-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <Skeleton className="h-56 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4">
        <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
      </div>
    )
  }

  if (!hasAccounts) {
    return (
      <div className="space-y-8 min-w-0">
        <header>
          <p className="page-eyebrow">Home</p>
          <h1 className="page-title mt-2">Link an account</h1>
          <p className="page-lede mt-3">Balances, spending, and the ledger stay empty until a bank is connected. Sample institutions are fine.</p>
        </header>
        <Link
          to="/accounts"
          className="inline-flex items-center rounded-xl bg-primary-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          Link a bank account
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8 min-w-0">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="page-eyebrow">Home</p>
          <h1 className="page-title mt-2">Hello, {firstName}</h1>
        </div>
        {walletShort && (
          <p className="text-[11px] font-mono text-surface-500 truncate" title={user?.walletAddress ?? undefined}>
            {walletShort}
          </p>
        )}
      </header>

      <section className="flex flex-wrap items-end justify-between gap-4 border-b border-surface-200 dark:border-surface-700 pb-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-surface-500">Cash across accounts</p>
          <p className="mt-2 font-display text-4xl sm:text-5xl font-semibold tabular-nums tracking-[-0.04em] text-surface-900 dark:text-white">
            {money(totalBalance)}
          </p>
        </div>
        <Link to="/accounts" className="text-sm font-semibold text-primary-700 dark:text-primary-300 hover:underline">
          {accounts.length} account{accounts.length === 1 ? '' : 's'} →
        </Link>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-surface-200 dark:divide-surface-700 rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800">
        <Link to="/budgets" className="p-5 min-w-0 hover:bg-surface-50 dark:hover:bg-surface-700/40">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-surface-500">Spent this month</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-surface-900 dark:text-white">{money(spent)}</p>
          {budgeted > 0 && <p className="mt-1 text-xs text-surface-500">of {money(budgeted)} budgeted</p>}
        </Link>
        <Link to="/budgets" className="p-5 min-w-0 hover:bg-surface-50 dark:hover:bg-surface-700/40">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-surface-500">Budget used</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-surface-900 dark:text-white">{budgeted > 0 ? `${budgetPct}%` : '—'}</p>
          <div className="mt-3 h-1.5 rounded-full bg-surface-100 dark:bg-surface-700 overflow-hidden">
            <div className="h-full rounded-full bg-[#d7f56a]" style={{ width: `${budgetPct}%` }} />
          </div>
        </Link>
        <Link to="/loans" className="p-5 min-w-0 hover:bg-surface-50 dark:hover:bg-surface-700/40">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-surface-500">Loan score</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-surface-900 dark:text-white">
            {eligibility ? eligibility.riskScore : '—'}
            <span className="text-sm font-normal text-surface-400"> / 100</span>
          </p>
          <p className="mt-1 text-xs text-surface-500 capitalize">{eligibility?.decision ?? 'Not scored'}</p>
        </Link>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 p-5 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h2 className="text-sm font-semibold text-surface-900 dark:text-white">Where it went</h2>
            {pie.length > 0 && (
              <Link to="/insights" className="text-sm font-medium text-primary-700 dark:text-primary-300 hover:underline">
                Insights
              </Link>
            )}
          </div>
          {pie.length > 0 ? (
            <SpendingDonut data={pie} total={spent} />
          ) : (
            <p className="text-sm text-surface-500 py-8 text-center">No spending in this period yet.</p>
          )}
        </div>
        <div className="rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 p-5 min-w-0">
          <h2 className="text-sm font-semibold text-surface-900 dark:text-white mb-3">Last 3 months</h2>
          {trend.length > 0 ? (
            <TrendBars data={trend} />
          ) : (
            <p className="text-sm text-surface-500 py-8 text-center">Trends appear after a few months of activity.</p>
          )}
        </div>
      </section>

      <section className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
        <Link to="/transactions" className="text-primary-800 dark:text-primary-300 hover:underline">Open ledger →</Link>
        <Link to="/savings" className="text-primary-800 dark:text-primary-300 hover:underline">Savings goals →</Link>
        <Link to="/verify" className="text-primary-800 dark:text-primary-300 hover:underline">Verify identity →</Link>
      </section>
    </div>
  )
}
