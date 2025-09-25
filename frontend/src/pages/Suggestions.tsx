import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { fetchSuggestions } from '../slices/dataSlice'

export default function Suggestions() {
  const dispatch = useAppDispatch()
  const suggestions = useAppSelector((s) => s.data.suggestions)

  useEffect(() => {
    dispatch(fetchSuggestions())
  }, [dispatch])

  return (
    <div className="p-4 max-w-4xl mx-auto grid gap-3 md:grid-cols-2">
      {suggestions.map((s, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-4">
          <div className="font-semibold">{s.category}</div>
          <div className="text-gray-700 text-sm mt-1">{s.suggestion}</div>
          <div className="text-green-600 mt-2">Estimated savings: ${s.estimated_savings.toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
}

