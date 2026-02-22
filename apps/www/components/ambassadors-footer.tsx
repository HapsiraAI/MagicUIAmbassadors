import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin } from "lucide-react"

import { siteConfig } from "@/config/site"

const ambassadorFooterFeatures = [
  { label: "Components", href: "/components" },
  { label: "Templates", href: "https://pro.magicui.design" },
  { label: "Showcase", href: "/showcase" },
  { label: "Ambassadors", href: "/ambassadors" },
  { label: "Docs", href: "/docs" },
] as const

const ambassadorFooterCompany = [
  { label: "About Magic UI", href: "/docs/story" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "https://github.com/magicuidesign/magicui" },
  { label: "Contact", href: siteConfig.links.discord },
] as const

export function AmbassadorsFooter() {
  return (
    <section className="relative mx-3 mt-6 overflow-hidden rounded-t-[34px] rounded-b-none bg-black text-white md:mx-4 md:mt-8">
      <footer>
        <div className="container py-24 md:py-28">
          <div className="grid grid-cols-1 gap-24 md:grid-cols-12 md:gap-28">
            <div className="md:col-span-5">
              <Link href="/" className="inline-flex items-center gap-5">
                <Image
                  src="/icon.png"
                  alt="Magic UI logo"
                  width={56}
                  height={56}
                  className="rounded-xl"
                />
                <span className="text-3xl font-semibold tracking-tight text-white">
                  Magic UI
                </span>
              </Link>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/78 md:text-[1.12rem]">
                Magic UI Ambassadors grow local design communities. Apply to the
                program, our team reviews every submission, and selected
                ambassadors are contacted to lead workshops, represent Magic UI
                design, and support builders on campus.
              </p>
              <div className="mt-11 space-y-4 text-sm text-white/70 md:text-base">
                <p className="inline-flex items-center gap-2">
                  <Mail className="size-4" />
                  ambassadors@magicui.design
                </p>
                <p className="inline-flex items-center gap-2">
                  <MapPin className="size-4" />
                  Global program, community-led
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:col-span-7">
              <div>
                <p className="text-sm font-medium text-white/55">Features</p>
                <nav className="mt-8 flex flex-col gap-5">
                  {ambassadorFooterFeatures.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-[1.05rem] text-white/90 transition-colors duration-200 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div>
                <p className="text-sm font-medium text-white/55">Company</p>
                <nav className="mt-8 flex flex-col gap-5">
                  {ambassadorFooterCompany.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-[1.05rem] text-white/90 transition-colors duration-200 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="pb-6">
        <div className="container border-t border-white/15 pt-5 text-sm text-white/70">
          <p>
            Built by{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-white underline underline-offset-4"
            >
              dillion
            </a>
            . The source code is available on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-white underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
