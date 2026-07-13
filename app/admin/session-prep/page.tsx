'use client'

import React, { useState, useEffect } from 'react'
import AdminSessionPrepDashboard from '@/components/AdminSessionPrepDashboard'

export default function AdminSessionPrepPage() {
  const [adminToken, setAdminToken] = useState<string | null>(null)
  const [inputToken, setInputToken] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Check if already authenticated via session storage
  useEffect(() => {
    const stored = sessionStorage.getItem('admin_session_prep_token')
    if (stored) {
      setAdminToken(stored)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputToken) {
      setError('Please enter admin token')
      return
    }

    // Store token and authenticate
    sessionStorage.setItem('admin_session_prep_token', inputToken)
    setAdminToken(inputToken)
    setError(null)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_session_prep_token')
    setAdminToken(null)
    setInputToken('')
  }

  if (!adminToken) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ivory via-charcoal/2 to-ivory flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h1 className="font-serif text-3xl text-charcoal mb-2 text-center">
            Admin Access
          </h1>
          <p className="text-center text-smoke mb-8">Session Prep Dashboard</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="token" className="block text-sm font-medium text-charcoal mb-2">
                Admin Token
              </label>
              <input
                id="token"
                type="password"
                value={inputToken}
                onChange={(e) => {
                  setInputToken(e.target.value)
                  setError(null)
                }}
                placeholder="Enter admin token"
                className={`w-full px-4 py-3 border rounded-lg font-body text-charcoal placeholder-smoke/50 transition-all ${
                  error
                    ? 'border-rose bg-rose/5 focus:border-rose focus:ring-rose/20'
                    : 'border-smoke/30 bg-charcoal/2 focus:border-champagne focus:ring-champagne/20'
                } focus:outline-none focus:ring-4`}
              />
              {error && <p className="text-rose text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg font-body font-semibold text-ivory bg-gradient-to-r from-champagne to-rose hover:shadow-glow transition-all"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-8 p-4 bg-charcoal/5 rounded-lg">
            <p className="text-xs text-smoke">
              💡 <strong>Tip:</strong> The admin token is available in your environment variables as{' '}
              <code>SESSION_PREP_ADMIN_TOKEN</code>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-charcoal to-espresso text-ivory p-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Admin Panel</h2>
          <p className="text-sm text-ivory/70">Session Prep Management</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-ivory/20 hover:bg-ivory/30 rounded-lg transition-colors text-sm font-medium"
        >
          Logout
        </button>
      </div>

      {/* Dashboard */}
      <AdminSessionPrepDashboard adminToken={adminToken} />
    </div>
  )
}
