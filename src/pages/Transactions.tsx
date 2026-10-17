import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { DataState } from '../components/ui/DataState'

interface Transaction {
  id: string
  name?: string
  merchantName?: string
  amount: number
  date: string
  category?: string
}

/**
 * Live exercise (10–15 min) — see ASSIGNMENT.md
 *
 * The ledger already loads. Add:
 * 1. A search box that filters by merchant or name
 * 2. Category filter (one or more)
 * 3. Empty state when nothing matches
 */
export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    api
      .get<Transaction[]>('/transactions?limit=200')
      .then(setTransactions)
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load transactions'))
      .finally(() => setLoading(false))
  }, [])

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const label = (t: Transaction) => t.merchantName || t.name || 'Other'

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="page-eyebrow">Ledger</p>
          <h1 className="page-title mt-1">Activity</h1>
        </div>
        {!loading && !error && (
          <p className="text-sm text-surface-500 tabular-nums">{transactions.length} rows</p>
        )}
      </div>

      <DataState
        loading={loading}
        error={error}
        empty={!loading && !error && transactions.length === 0}
        emptyMessage="No transactions yet."
      >
        <div className="overflow-hidden rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-200 dark:border-surface-700 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-surface-500">
                <th className="px-4 py-3 font-semibold">Merchant</th>
                <th className="px-4 py-3 font-semibold hidden sm:table-cell">Category</th>
                <th className="px-4 py-3 font-semibold hidden md:table-cell">Date</th>
                <th className="px-4 py-3 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-surface-100 last:border-0 dark:border-surface-700/80">
                  <td className="px-4 py-3.5 min-w-0">
                    <p className="font-medium text-surface-900 dark:text-white truncate">{label(t)}</p>
                    <p className="text-xs text-surface-500 mt-0.5 sm:hidden">
                      {t.category || 'Uncategorized'} · {fmtDate(t.date)}
                    </p>
                    <p className="text-xs text-surface-500 mt-0.5 hidden sm:block md:hidden">{fmtDate(t.date)}</p>
                  </td>
                  <td className="px-4 py-3.5 text-surface-600 dark:text-surface-300 hidden sm:table-cell">
                    {t.category || '—'}
                  </td>
                  <td className="px-4 py-3.5 text-surface-500 hidden md:table-cell whitespace-nowrap">{fmtDate(t.date)}</td>
                  <td className={`px-4 py-3.5 text-right font-semibold tabular-nums whitespace-nowrap ${Number(t.amount) < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {Number(t.amount) < 0 ? '−' : '+'}${Math.abs(Number(t.amount)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataState>
    </div>
  )
}
