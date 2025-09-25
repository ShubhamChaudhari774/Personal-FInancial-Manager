import { useState } from 'react'
import { post } from '../utils/api'

export default function Transactions() {
  const [form, setForm] = useState({ category: '', amount: '', date: '', description: '' })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await post('/api/transactions', {
        category: form.category,
        amount: Number(form.amount),
        date: form.date,
        description: form.description,
      })
      setForm({ category: '', amount: '', date: '', description: '' })
    } catch (err: any) {
      setError(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add Transaction</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input className="w-full border rounded p-2" placeholder="Amount" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        <input className="w-full border rounded p-2" placeholder="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <textarea className="w-full border rounded p-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded">{saving ? 'Saving...' : 'Save'}</button>
      </form>
    </div>
  )
}

