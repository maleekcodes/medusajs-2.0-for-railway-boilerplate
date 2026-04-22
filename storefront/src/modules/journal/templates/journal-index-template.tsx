"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, BookOpen, Camera } from "lucide-react"

import { Container } from "@modules/common/components/xyz/Container"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Shape } from "@modules/common/components/xyz/Shape"
import type { JournalEntry } from "@/types/xyz"

import { asShapeType } from "../lib/shape-type"

export type JournalIndexTemplateProps = {
  editorials: JournalEntry[]
  lookbooks: JournalEntry[]
  fetchError: boolean
  sanityConfigured: boolean
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date
    .toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    })
    .toUpperCase()
}

function JournalErrorState() {
  return (
    <div className="text-center py-24 max-w-lg mx-auto">
      <div className="inline-block mb-8">
        <Shape
          type="hexagon"
          className="w-24 h-24 bg-red-50 border-2 border-red-200"
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-red-900">
        Connection Error
      </h1>
      <p className="text-lg text-neutral-600 mb-4">
        Unable to load journal entries from CMS.
      </p>
      <p className="text-sm text-neutral-400 mb-8">
        Please check your connection and try again.
      </p>
      <LocalizedClientLink
        href="/"
        className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest bg-deepBlack text-white px-6 py-3 hover:bg-neutral-800 transition-colors"
      >
        Return Home
      </LocalizedClientLink>
    </div>
  )
}

function JournalEmptyState({ cmsHint }: { cmsHint: boolean }) {
  return (
    <div className="text-center py-24 max-w-lg mx-auto">
      <div className="inline-block mb-8">
        <Shape
          type="circle"
          className="w-24 h-24 bg-concrete border border-neutral-200"
        />
      </div>
      <h2 className="text-3xl font-bold tracking-tight mb-4">
        No Journal Entries Yet
      </h2>
      <p className="text-lg text-neutral-500 mb-4">
        {cmsHint
          ? "Set NEXT_PUBLIC_SANITY_PROJECT_ID (and optional dataset) to connect your Sanity project and load entries."
          : "Content will appear here once published. Check back soon for articles, lookbooks, and more."}
      </p>
      <div className="flex justify-center gap-3">
        <Shape type="circle" className="w-3 h-3 bg-neutral-300" />
        <Shape type="square" className="w-3 h-3 bg-neutral-300" />
        <Shape type="triangle" className="w-3 h-3 bg-neutral-300" />
      </div>
    </div>
  )
}

function EditorialCard({ entry }: { entry: JournalEntry }) {
  const shape = asShapeType(entry.shape, "circle")
  return (
    <LocalizedClientLink
      href={`/journal/${entry.slug}`}
      aria-label={`Read article: ${entry.title}`}
    >
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative bg-concrete aspect-square md:aspect-[4/3] p-6 md:p-8 flex flex-col justify-between cursor-pointer overflow-hidden
          border border-neutral-200
          hover:border-deepBlack
          focus-within:ring-2 focus-within:ring-deepBlack focus-within:ring-offset-2
          transition-all duration-300 ease-out"
      >
        <div className="relative z-10 flex justify-between items-start gap-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-neutral-200 group-hover:bg-deepBlack group-hover:text-white group-hover:border-deepBlack transition-all duration-300">
            {entry.category}
          </span>
          <time
            dateTime={entry.date}
            className="text-[10px] font-mono text-neutral-400 mt-1"
          >
            {formatDate(entry.date)}
          </time>
        </div>

        <div className="relative z-10 flex items-center justify-center py-4">
          <Shape
            type={shape}
            className="w-14 h-14 md:w-20 md:h-20 bg-white border border-neutral-200 opacity-40 group-hover:opacity-70 group-hover:scale-110 group-hover:rotate-12 transition-all duration-400"
          />
        </div>

        <div className="relative z-10">
          <h3 className="text-lg md:text-xl font-bold tracking-tight text-deepBlack leading-tight mb-2 flex items-start gap-2">
            <span className="line-clamp-2 group-hover:underline underline-offset-4 decoration-2">
              {entry.title}
            </span>
            <ArrowUpRight
              size={18}
              className="flex-shrink-0 mt-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              strokeWidth={2}
            />
          </h3>
          {entry.excerpt ? (
            <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed group-hover:text-neutral-600 transition-colors">
              {entry.excerpt}
            </p>
          ) : null}
        </div>

        <div className="absolute top-0 bottom-0 left-0 w-1 bg-deepBlack transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
      </motion.article>
    </LocalizedClientLink>
  )
}

function LookbookCard({ entry }: { entry: JournalEntry }) {
  const shape = asShapeType(entry.shape, "rhombus")
  return (
    <LocalizedClientLink
      href={`/journal/${entry.slug}`}
      aria-label={`View lookbook: ${entry.title}`}
    >
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="group relative bg-deepBlack aspect-[3/4] p-8 md:p-10 flex flex-col justify-between cursor-pointer overflow-hidden
          hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.15)]
          transition-all duration-500 ease-out"
      >
        <div
          className="absolute inset-0 bg-gradient-to-t from-deepBlack via-deepBlack/90 to-neutral-800 group-hover:via-deepBlack/70 group-hover:to-neutral-700 transition-all duration-500"
        />
        <div
          className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-500"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex justify-between items-start gap-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/60 border border-white/20 px-3 py-1.5 rounded-full group-hover:bg-white group-hover:text-deepBlack group-hover:border-white transition-all duration-300">
            {entry.category}
          </span>
          <time
            dateTime={entry.date}
            className="text-[10px] font-mono text-white/40 mt-1"
          >
            {formatDate(entry.date)}
          </time>
        </div>

        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 blur-3xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Shape
              type={shape}
              className="relative w-28 h-28 md:w-36 md:h-36 bg-white/5 border border-white/20 opacity-50 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-white/10 transition-all duration-500"
            />
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mb-3">
              {entry.title}
            </h3>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-white transition-all duration-300">
              <ArrowUpRight
                size={18}
                className="text-white group-hover:text-deepBlack transition-colors"
                strokeWidth={2}
              />
            </div>
          </div>
          {entry.excerpt ? (
            <p className="text-sm text-white/50 line-clamp-2 leading-relaxed group-hover:text-white/70 transition-colors">
              {entry.excerpt}
            </p>
          ) : null}
        </div>
      </motion.article>
    </LocalizedClientLink>
  )
}

export default function JournalIndexTemplate({
  editorials,
  lookbooks,
  fetchError,
  sanityConfigured,
}: JournalIndexTemplateProps) {
  if (fetchError) {
    return (
      <div className="pt-32 pb-24 bg-white min-h-screen">
        <Container>
          <JournalErrorState />
        </Container>
      </div>
    )
  }

  const hasNoEntries = editorials.length === 0 && lookbooks.length === 0

  return (
    <div className="pt-32 pb-24 bg-white text-deepBlack min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 md:mb-32"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-[0.2em]">
              Index / Archive
            </span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-center leading-[0.85]">
            JOURNAL
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light text-neutral-500 text-center mt-8 leading-relaxed">
            The narrative of form. A visual archive of our process, inspiration,
            and the dialogue between physical and digital spaces.
          </p>
        </motion.div>

        {hasNoEntries ? (
          <JournalEmptyState cmsHint={!sanityConfigured} />
        ) : (
          <>
            {editorials.length > 0 ? (
              <section className="mb-32" aria-labelledby="editorial-heading">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex items-end justify-between border-b border-neutral-200 pb-6 mb-12"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-concrete border border-neutral-200 flex items-center justify-center">
                      <BookOpen
                        size={18}
                        strokeWidth={1.5}
                        className="text-deepBlack"
                        aria-hidden
                      />
                    </div>
                    <div>
                      <h2
                        id="editorial-heading"
                        className="text-2xl md:text-3xl font-bold tracking-tight"
                      >
                        Editorial
                      </h2>
                      <p className="text-sm text-neutral-500 mt-1">
                        Theory, process & dialogue
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-neutral-400 bg-concrete px-3 py-1.5 rounded-full">
                    {editorials.length}{" "}
                    {editorials.length === 1 ? "Article" : "Articles"}
                  </span>
                </motion.div>

                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                  role="list"
                  aria-label="Editorial articles"
                >
                  {editorials.map((item) => (
                    <div key={item.id} role="listitem">
                      <EditorialCard entry={item} />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {lookbooks.length > 0 ? (
              <section className="mb-24" aria-labelledby="lookbook-heading">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex items-end justify-between border-b border-neutral-200 pb-6 mb-12"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-deepBlack border border-neutral-700 flex items-center justify-center">
                      <Camera
                        size={18}
                        strokeWidth={1.5}
                        className="text-white"
                        aria-hidden
                      />
                    </div>
                    <div>
                      <h2
                        id="lookbook-heading"
                        className="text-2xl md:text-3xl font-bold tracking-tight"
                      >
                        Lookbook
                      </h2>
                      <p className="text-sm text-neutral-500 mt-1">
                        Visual collections & campaigns
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-white bg-deepBlack px-3 py-1.5 rounded-full">
                    {lookbooks.length}{" "}
                    {lookbooks.length === 1 ? "Collection" : "Collections"}
                  </span>
                </motion.div>

                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
                  role="list"
                  aria-label="Lookbook collections"
                >
                  {lookbooks.map((item) => (
                    <div key={item.id} role="listitem">
                      <LookbookCard entry={item} />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-20 mt-12 border-t border-neutral-100"
        >
          <div className="max-w-md mx-auto">
            <div className="flex justify-center gap-4 mb-6">
              <Shape type="circle" className="w-4 h-4 bg-neutral-200" />
              <Shape type="square" className="w-4 h-4 bg-neutral-300" />
              <Shape type="triangle" className="w-4 h-4 bg-neutral-200" />
            </div>
            <p className="text-sm font-mono text-neutral-400 uppercase tracking-[0.15em]">
              More content coming soon
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
