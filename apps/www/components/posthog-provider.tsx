"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"

if (typeof window !== "undefined") {
  const posthogApiKey = process.env.NEXT_PUBLIC_POSTHOG_API_KEY
  if (posthogApiKey && posthogApiKey.trim().length > 0) {
    posthog.init(posthogApiKey, {
      api_host: "https://app.posthog.com",
      capture_pageview: true,
      session_recording: {
        maskAllInputs: false,
      },
      // Enable debug mode in development
      loaded: (posthogInstance) => {
        if (process.env.NODE_ENV === "development") {
          posthogInstance.debug()
        }
      },
    })
  }
}

export function PostHogPageview(): React.ReactNode {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture("$pageview", {
        $current_url: url,
      })
    }
  }, [pathname, searchParams])

  return <></>
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
