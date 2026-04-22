"use client"

import { useState } from "react"

export function DigitalPurchaseSuccessClient({
  sessionId,
}: {
  sessionId?: string
}) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (!sessionId) {
    return (
      <p className="text-sm text-amber-400">
        Missing checkout session. Open the link from your Stripe confirmation
        email or return to the product page.
      </p>
    )
  }

  const download = async () => {
    setError(null)
    setLoading(true)
    try {
      const r = await fetch(
        `/api/digital/download?session_id=${encodeURIComponent(sessionId)}`,
        { headers: { Accept: "application/json" } }
      )
      const j = (await r.json()) as { url?: string; error?: string }
      if (!r.ok || !j.url) {
        throw new Error(j.error || "Download failed")
      }
      window.open(j.url, "_blank", "noopener,noreferrer")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Download failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        disabled={loading}
        onClick={() => void download()}
        className="w-full border border-blue-500/40 bg-blue-950/30 py-3 text-sm font-mono uppercase tracking-widest text-blue-100 hover:bg-blue-900/40 disabled:opacity-40"
      >
        {loading ? "Preparing…" : "Download image"}
      </button>
      {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
    </div>
  )
}
