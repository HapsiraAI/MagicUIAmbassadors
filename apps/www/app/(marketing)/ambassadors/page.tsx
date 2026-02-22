"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Gift,
  Globe2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"
import { AmbassadorsFooter } from "@/components/ambassadors-footer"

import arghyaImage from "./profilesimgs/4423945785312783.jpg"
import edisImage from "./profilesimgs/24321343583528723853.jpg"
import randomMaleImage from "./profilesimgs/52432454565756576333.png"
import dillImage from "./profilesimgs/43178938927543957849358.jpg"
import julianImage from "./profilesimgs/43218903254890534829083259012.jpg"
import hanaImage from "./profilesimgs/a51db845f438f1605bdc44a5ac0f19b9.jpg"
import slideImageD from "./slideshow/53235235423452.png"
import slideImageB from "./slideshow/3553225353425434532.png"
import slideImageC from "./slideshow/4321432124335423525.png"
import slideImageG from "./slideshow/5342753428532482532.jpg"
import slideImageA from "./slideshow/35253235263464353453.png"
import slideImageX from "./slideshow/cxS3pdE2Am67jSPeaOJc4e6co.avif"

const slides = [
  {
    src: slideImageA,
    alt: "Ambassador event moment with presentation backdrop",
  },
  {
    src: slideImageA,
    alt: "Ambassador event moment with presentation backdrop",
  },
  {
    src: slideImageG,
    alt: "Ambassador community gathered in an event hall",
  },
  {
    src: slideImageC,
    alt: "Design ambassadors supporting students in class",
  },
  {
    src: slideImageX,
    alt: "Ambassador community session with a large audience",
  },
] as const

const slideDurationMs = 7500
const testimonialDurationMs = 5200
const applicationFormHref = "/docs"
const ambassadorRegions = [
  "United States",
  "United Kingdom",
  "Europe",
  "Asia",
] as const
const ambassadorTestimonials = [
  {
    region: "United States",
    quote:
      "Our student club in San Francisco hosted a rapid UI sprint with Magic UI, and teams left with real prototypes, not just slides.",
    ambassadorName: "Maya Carter",
    ambassadorRole: "Campus Ambassador, California Student Club",
    location: "California, United States",
    image: slideImageB,
    imageAlt: "United States campus meetup session",
  },
  {
    region: "United States",
    quote:
      "In Austin, our ambassador meetup helped early teams structure better interfaces and ship a complete landing page in one session.",
    ambassadorName: "Noah Rivera",
    ambassadorRole: "Campus Ambassador, Austin Build Circle",
    location: "Texas, United States",
    image: slideImageG,
    imageAlt: "Texas student meetup powered by Magic UI",
  },
  {
    region: "United States",
    quote:
      "Our New York student chapter hosted hands-on design reviews, and founders left with clearer systems and stronger product storytelling.",
    ambassadorName: "Sofia Bennett",
    ambassadorRole: "Campus Ambassador, NYC Product Club",
    location: "New York, United States",
    image: slideImageD,
    imageAlt: "New York student design chapter event",
  },
  {
    region: "United Kingdom",
    quote:
      "In London, we ran a design-to-build workshop where students turned concept boards into production-ready landing sections.",
    ambassadorName: "Aiden Clarke",
    ambassadorRole: "Campus Ambassador, London Design Society",
    location: "London, United Kingdom",
    image: slideImageC,
    imageAlt: "United Kingdom ambassador workshop",
  },
  {
    region: "Europe",
    quote:
      "Across Europe, ambassadors co-hosted campus sessions that helped teams collaborate across schools and ship stronger portfolio work.",
    ambassadorName: "Elena Novak",
    ambassadorRole: "Regional Ambassador, European Campus Network",
    location: "European Campuses",
    image: slideImageD,
    imageAlt: "Europe ambassador meetup event",
  },
  {
    region: "Asia",
    quote:
      "Our Asia meetup series proved how quickly student founders can move from idea to interface when they host consistently with Magic UI.",
    ambassadorName: "Jun Park",
    ambassadorRole: "Regional Ambassador, Asia Builder Community",
    location: "Asia Campuses",
    image: slideImageG,
    imageAlt: "Asia ambassador gathering and demo",
  },
] as const
const ambassadorBenefits = [
  {
    title: "Community Leadership",
    description:
      "Expand local design communities and represent Magic UI globally across campuses.",
  },
  {
    title: "Magic UI Pro Access",
    description:
      "Get access to essential Magic UI tools and resources for faster product execution.",
  },
  {
    title: "Accessibility First",
    description:
      "Learn and apply accessibility-first standards in student projects and workshops.",
  },
  {
    title: "Global Ambassador Network",
    description:
      "Chat and collaborate with ambassadors and developers from different countries.",
  },
  {
    title: "Meetups and Workshops",
    description:
      "Host meetups, product sessions, and practical build events in your student club.",
  },
  {
    title: "Perks and Community Kits",
    description:
      "Unlock ambassador perks including swag, hoodies, and support materials for events.",
  },
] as const
const benefitLayouts = [
  "md:col-span-4",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-2",
] as const
const benefitImages = [
  slideImageB,
  hanaImage,
  dillImage,
  slideImageG,
  julianImage,
  slideImageC,
] as const
const benefitIcons = [
  Users,
  ShieldCheck,
  Sparkles,
  Globe2,
  CalendarDays,
  Gift,
] as const
const ambassadorProfiles = [
  {
    name: "Dill",
    role: "Ambassador, Canada & UK",
    image: dillImage,
    imageAlt: "Dill, ambassador for Canada and the United Kingdom",
  },
  {
    name: "Arghya Das",
    role: "Ambassador, India",
    image: arghyaImage,
    imageAlt: "Arghya Das, ambassador in India",
  },
  {
    name: "Hana",
    role: "Ambassador, France",
    image: hanaImage,
    imageAlt: "Hana, ambassador in France",
  },
  {
    name: "Edis",
    role: "Head of Ambassadors, Albania",
    image: edisImage,
    imageAlt: "Edis, head of ambassadors in Albania",
  },
  {
    name: "Julian",
    role: "Ambassador, Vienna, Austria",
    image: julianImage,
    imageAlt: "Julian, ambassador in Vienna, Austria",
  },
  {
    name: "Luca Marin",
    role: "Ambassador, Milan, Italy",
    image: randomMaleImage,
    imageAlt: "Male ambassador portrait for program profile",
  },
] as const
export default function AmbassadorsPage() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeRegion, setActiveRegion] =
    useState<(typeof ambassadorRegions)[number]>("United States")
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [email, setEmail] = useState("")
  const regionTestimonials = ambassadorTestimonials.filter(
    (testimonial) => testimonial.region === activeRegion
  )
  const selectedTestimonial =
    regionTestimonials[activeTestimonial] ?? regionTestimonials[0]
  const { scrollYProgress } = useScroll()
  const heroParallaxY = useSpring(
    useTransform(scrollYProgress, [0, 0.28], [0, 56]),
    {
      damping: 26,
      stiffness: 130,
      mass: 0.45,
    }
  )

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, slideDurationMs)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    setActiveTestimonial(0)
  }, [activeRegion])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % regionTestimonials.length)
    }, testimonialDurationMs)

    return () => {
      window.clearInterval(timer)
    }
  }, [regionTestimonials.length])

  const handleApply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextHref = email
      ? `${applicationFormHref}?email=${encodeURIComponent(email)}`
      : applicationFormHref
    router.push(nextHref)
  }

  const goToPrevTestimonial = () => {
    setActiveTestimonial(
      (prev) =>
        (prev - 1 + regionTestimonials.length) % regionTestimonials.length
    )
  }

  const goToNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % regionTestimonials.length)
  }

  return (
    <div className="relative isolate overflow-hidden">
      <section className="relative px-3 pt-2 md:px-4">
        <div className="relative min-h-[calc(82svh-var(--header-height))] overflow-hidden rounded-[34px]">
          <AnimatePresence mode="sync">
            <motion.div
              className="absolute inset-0"
              style={{ y: heroParallaxY }}
            >
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1.1 }}
                exit={{ opacity: 0, scale: 1.14 }}
                transition={{
                  opacity: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 8.4, ease: [0.22, 1, 0.36, 1] },
                }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[currentSlide].src}
                  alt={slides[currentSlide].alt}
                  fill
                  priority
                  className="object-cover object-[52%_42%] will-change-transform"
                  sizes="100vw"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.18),rgba(255,255,255,0.04)_42%,rgba(255,255,255,0)_72%)] dark:bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.08),rgba(0,0,0,0)_56%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/8 via-black/12 to-black/30 dark:from-black/18 dark:via-black/26 dark:to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/56 via-black/26 via-22% to-transparent dark:from-black/84 dark:via-black/50 dark:via-24% dark:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/16 via-34% to-transparent dark:from-black/60 dark:via-black/30 dark:via-34% dark:to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_64%,rgba(0,0,0,0.1),rgba(0,0,0,0.05)_40%,rgba(0,0,0,0)_72%)] dark:bg-[radial-gradient(ellipse_at_28%_64%,rgba(0,0,0,0.2),rgba(0,0,0,0.1)_40%,rgba(0,0,0,0)_72%)]" />

          <div className="relative container flex min-h-[calc(82svh-var(--header-height))] items-end pt-10 pb-12 md:pt-12 md:pb-16">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
              <div className="mb-5 inline-flex items-center gap-2 text-xl font-medium tracking-[0.01em] text-white/72">
                <Image
                  src="/icon.png"
                  alt="Magic UI logo"
                  width={32}
                  height={32}
                  className="size-8 rounded-md"
                />
                <span className="text-lg md:text-xl">
                  Magic UI Community Program
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                className="max-w-4xl text-5xl leading-[0.92] font-medium tracking-tight text-white drop-shadow-none sm:text-6xl md:text-7xl dark:drop-shadow-lg"
              >
                Become a Magic UI Campus Ambassador
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
                className="mt-5 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg"
              >
                We represent design across the globe, support students on
                campus, host workshops, and help builders launch better products
                together.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.35 }}
                className="mt-7 flex w-full max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
              >
                <form onSubmit={handleApply} className="w-full max-w-xl">
                  <div className="w-full rounded-full border border-white/45 bg-white/92 p-[7px] backdrop-blur-xl transition-all duration-500 ease-out focus-within:-translate-y-px focus-within:border-white/80 dark:border-white/20 dark:bg-black/45 dark:focus-within:border-white/50">
                    <div className="flex items-center gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email address to apply now"
                        className="h-[54px] w-full rounded-full bg-transparent px-5 text-[17px] text-black transition-all duration-500 ease-out outline-none placeholder:text-black/55 focus:pl-6 dark:text-white dark:placeholder:text-white/55"
                        aria-label="Email address"
                        autoComplete="email"
                        required
                      />
                      <button
                        type="submit"
                        className="relative h-[54px] shrink-0 rounded-full bg-black px-7 text-[17px] font-semibold text-white transition-all duration-300 ease-out will-change-transform before:absolute before:-inset-[4px] before:scale-[1.025] before:rounded-full before:border before:border-black/75 before:opacity-0 before:transition-all before:duration-300 before:ease-out before:content-[''] hover:bg-black/90 hover:before:scale-100 hover:before:opacity-100 active:scale-[0.985] active:before:opacity-80 dark:bg-white dark:text-black dark:before:border-white/85 dark:hover:bg-white/95"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </form>
                <Link
                  href="/showcase"
                  className={cn(
                    "group relative inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-white px-9 text-[17px] font-medium text-black shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all duration-200 ease-out will-change-transform before:absolute before:-inset-[4px] before:scale-[1.02] before:rounded-full before:border before:border-white/85 before:opacity-0 before:transition-all before:duration-200 before:ease-out before:content-[''] hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-[0_10px_24px_rgba(0,0,0,0.26)] hover:before:scale-100 hover:before:opacity-100 active:translate-y-0 active:scale-[0.99] active:before:opacity-80 sm:w-auto"
                  )}
                >
                  <span>Ambassador Benefits</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background relative py-20 md:py-28">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="text-foreground max-w-3xl text-5xl leading-[0.92] font-semibold tracking-tight sm:text-6xl md:text-7xl"
          >
            Ambassadors scaling design communities globally
          </motion.h2>

          <div className="bg-card/70 border-border/50 mt-10 overflow-hidden rounded-3xl border">
            <AnimatePresence mode="wait">
              <motion.article
                key={`${activeRegion}-${activeTestimonial}-${selectedTestimonial.ambassadorName}`}
                initial={{ opacity: 0, x: 18, scale: 0.995 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -18, scale: 0.995 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="grid min-h-[440px] grid-cols-1 md:grid-cols-2"
              >
                <div className="flex flex-col justify-between p-8 md:p-10">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium tracking-[0.01em]">
                      Ambassador Testimonial
                    </p>
                    <p className="text-foreground mt-8 max-w-xl text-2xl leading-[1.14] font-medium tracking-[-0.01em] md:text-[2.15rem]">
                      {selectedTestimonial.quote}
                    </p>
                  </div>

                  <div className="mt-10 flex items-center gap-4">
                    <div className="border-border relative size-16 overflow-hidden rounded-full border">
                      <Image
                        src={selectedTestimonial.image}
                        alt={selectedTestimonial.ambassadorName}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <p className="text-foreground text-lg font-semibold">
                        {selectedTestimonial.ambassadorName}
                      </p>
                      <p className="text-muted-foreground text-base">
                        {selectedTestimonial.ambassadorRole}
                      </p>
                      <p className="text-muted-foreground/90 text-sm">
                        {selectedTestimonial.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[320px] md:min-h-full">
                  <Image
                    src={selectedTestimonial.image}
                    alt={selectedTestimonial.imageAlt}
                    fill
                    className="object-cover transition-transform duration-[1400ms] ease-out"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="inline-flex flex-wrap items-center gap-2">
              {ambassadorRegions.map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => setActiveRegion(region)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    region === activeRegion
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                >
                  {region}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goToPrevTestimonial}
                className="border-border text-foreground hover:bg-muted inline-flex size-10 items-center justify-center rounded-full border transition-colors duration-300"
                aria-label="Previous ambassador testimonial"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={goToNextTestimonial}
                className="border-border text-foreground hover:bg-muted inline-flex size-10 items-center justify-center rounded-full border transition-colors duration-300"
                aria-label="Next ambassador testimonial"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background relative pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="text-foreground max-w-3xl text-left text-5xl leading-[0.92] font-medium tracking-tight sm:text-6xl md:text-7xl"
          >
            Scale without switching tools
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.08,
            }}
            className="text-muted-foreground mt-4 max-w-3xl text-left text-base leading-relaxed md:text-lg"
          >
            Ambassador benefits built to grow communities, run meetups, and ship
            better products with Magic UI.
          </motion.p>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6">
            {ambassadorBenefits.map((benefit, index) => {
              const BenefitIcon = benefitIcons[index]
              return (
                <motion.article
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-90px" }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.06,
                  }}
                  className={cn(
                    "group relative min-h-[270px] overflow-hidden rounded-2xl border border-black/10 bg-black/60 dark:border-white/12",
                    benefitLayouts[index]
                  )}
                >
                  <Image
                    src={benefitImages[index]}
                    alt={benefit.title}
                    fill
                    className="object-cover opacity-70 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/58 via-34% to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/8 via-transparent to-black/42" />
                  <div className="absolute right-0 bottom-0 left-0 p-5 md:p-6">
                    <div className="mb-3 inline-flex size-8 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white/90 backdrop-blur-sm">
                      <BenefitIcon className="size-4" />
                    </div>
                    <p className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                      {benefit.title}
                    </p>
                    <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-white/80 md:text-base">
                      {benefit.description}
                    </p>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-background relative py-20 md:py-28">
        <div className="container">
          <div className="mb-8 max-w-4xl text-left md:mb-10">
            <h2 className="text-foreground max-w-4xl text-5xl leading-[0.92] font-medium tracking-tight sm:text-6xl md:text-7xl">
              Meet Some of Our Ambassadors
            </h2>
            <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-relaxed md:text-lg">
              Builders in our program leading communities, workshops, and
              product sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ambassadorProfiles.map((profile, index) => (
              <motion.article
                key={profile.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: index * 0.06,
                }}
                className="group relative overflow-hidden rounded-3xl border border-black/10 bg-black/70 shadow-[0_10px_30px_rgba(0,0,0,0.35)] dark:border-white/15"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={profile.image}
                    alt={profile.imageAlt}
                    fill
                    draggable={false}
                    onContextMenu={(event) => event.preventDefault()}
                    className="pointer-events-none object-cover opacity-62 transition-[filter] duration-300 ease-out select-none group-hover:blur-[1.5px]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/44 to-transparent dark:from-black/94 dark:via-black/55 dark:to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/6 via-transparent to-black/44 dark:from-black/10 dark:to-black/52" />
                  <div className="absolute right-0 bottom-0 left-0 p-5">
                    <p className="text-2xl font-semibold tracking-tight text-white md:text-[1.7rem]">
                      {profile.name}
                    </p>
                    <p className="mt-1 text-sm text-white/75">{profile.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <AmbassadorsFooter />
    </div>
  )
}
