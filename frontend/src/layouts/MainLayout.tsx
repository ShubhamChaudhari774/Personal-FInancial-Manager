import Nav from '../components/Nav'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="py-4">{children}</main>
    </div>
  )
}

