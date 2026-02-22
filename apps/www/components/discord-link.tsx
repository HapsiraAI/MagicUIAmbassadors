"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"
import { PingDot } from "@/components/ping-dot"

export function DiscordLink({ className }: { className?: string }) {
  const [members, setMembers] = useState<number | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadMembers = async () => {
      try {
        const response = await fetch(
          "https://discord.com/api/guilds/1151315619246002176/widget.json"
        )
        const json = await response.json()
        if (!isMounted) {
          return
        }
        const count = Number(json.presence_count)
        setMembers(Number.isFinite(count) ? count : 0)
      } catch {
        if (isMounted) {
          setMembers(0)
        }
      }
    }

    loadMembers()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "shadow-none transition-colors",
            className
          )}
          href={siteConfig.links.discord}
          target="_blank"
          rel="noreferrer"
        >
          <Icons.discord />
          {members === null ? (
            <Skeleton className="h-4 w-8" />
          ) : (
            <ActiveMembersCount
              className="text-muted-foreground"
              members={members}
            />
          )}
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        {members === null ? (
          <Skeleton className="h-4 w-8" />
        ) : (
          <span>
            <ActiveMembersCount className="text-background" members={members} />{" "}
            members online in our Discord community
          </span>
        )}
      </TooltipContent>
    </Tooltip>
  )
}

export function ActiveMembersCount({
  className,
  members,
}: {
  className?: string
  members: number
}) {
  return (
    <div className={cn("ml-2 inline-flex items-center gap-1", className)}>
      <PingDot />
      <span className="min-w-[2rem] text-xs font-medium tabular-nums">
        {members >= 1000
          ? `${(members / 1000).toFixed(1)}k`
          : members.toLocaleString()}
      </span>
    </div>
  )
}
