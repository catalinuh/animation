// components/ClippyWrapper.tsx
'use client'

import { useEffect } from 'react'

export default function ClippyWrapper() {
  useEffect(() => {
    // Only runs in the browser, never on the server
    async function loadClipy() {
      const { initAgent } = await import('clippyjs')
      const { Clippy } = await import('clippyjs/agents')

      const agent = await initAgent(Clippy)
      agent.show(true)
    }

    loadClipy()
  }, [])

  return null // Clippy injects itself into the DOM directly
}
