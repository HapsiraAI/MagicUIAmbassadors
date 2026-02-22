"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"

export function GitHubLink({ className }: { className?: string }) {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadStars = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/magicuidesign/magicui"
        )
        const json = await response.json()
        if (!isMounted) {
          return
        }
        const starCount = Number(json.stargazers_count)
        setStars(Number.isFinite(starCount) ? starCount : 0)
      } catch {
        if (isMounted) {
          setStars(0)
        }
      }
    }

    loadStars()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild size="lg" variant="ghost" className="h-8 shadow-none">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={className}
            >
              <Icons.gitHub />
              {stars === null ? (
                <Skeleton className="h-4 w-8" />
              ) : (
                <StarsCount stars={stars} />
              )}
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>View on GitHub</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function StarsCount({ stars }: { stars: number }) {
  return (
    <span className="text-muted-foreground w-8 text-xs tabular-nums">
      <span className="hidden sm:inline">{stars.toLocaleString()}</span>
      <span className="sm:hidden">
        {stars >= 1000
          ? `${(stars / 1000).toFixed(1)}k`
          : stars.toLocaleString()}
      </span>
    </span>
  )
}
