'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setMessage('')
        setLoading(true)

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/update-password`
        })

        setLoading(false)

        if (error) {
            setError(error.message)
            return
        }

        setMessage('Un email de réinitialisation vient de vous être envoyé.')
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-md space-y-6">
                <h1 className="text-2xl font-bold">Réinitialiser votre mot de passe</h1>

                {message && (
                    <p className="text-green-600 text-sm">{message}</p>
                )}

                {error && (
                    <p className="text-red-600 text-sm">{error}</p>
                )}

                <form onSubmit={handleReset} className="space-y-4">
                    <input
                        type="email"
                        className="w-full border rounded-md px-4 py-2"
                        placeholder="Votre adresse email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-60"
                    >
                        {loading ? 'Envoi…' : 'Réinitialiser'}
                    </button>
                </form>
            </div>
        </div>
    )
}