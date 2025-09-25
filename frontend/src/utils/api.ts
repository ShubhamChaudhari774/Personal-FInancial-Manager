const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export function authHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function get(path: string) {
  const res = await fetch(`${API_BASE}${path}`, { headers: { ...authHeaders() } })
  if (!res.ok) throw new Error(`GET ${path} failed`)
  return res.json()
}

export async function post(path: string, body: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`POST ${path} failed`)
  return res.json()
}

