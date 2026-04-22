"use client"

import { PortableText } from "@portabletext/react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { Container } from "@modules/common/components/xyz/Container"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Shape } from "@modules/common/components/xyz/Shape"
import type { JournalEntry } from "@/types/xyz"

import { journalPortableTextComponents } from "../lib/journal-portable-text"
import { asShapeType } from "../lib/shape-type"

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function isLookbook(category: string): boolean {
  return category === "Lookbook" || category === "Campaign"
}

function EditorialLayout({ post }: { post: JournalEntry }) {
  const shape = asShapeType(post.shape, "circle")
  return (
    <article
      className="pt-32 pb-24 bg-white text-deepBlack min-h-screen"
      aria-labelledby="article-title"
    >
      <a
        href="#article-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-deepBlack focus:text-white focus:rounded"
      >
        Skip to article content
      </a>

      <Container>
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          aria-label="Breadcrumb"
        >
          <LocalizedClientLink
            href="/journal"
            className="group inline-flex items-center gap-3 text-sm font-mono text-neutral-400 uppercase tracking-widest hover:text-deepBlack transition-colors mb-16 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-deepBlack focus-visible:ring-offset-4 rounded"
          >
            <span className="w-8 h-8 rounded-full bg-concrete flex items-center justify-center group-hover:bg-deepBlack transition-colors">
              <ArrowLeft
                size={14}
                className="group-hover:text-white transition-colors"
              />
            </span>
            <span>Journal</span>
          </LocalizedClientLink>
        </motion.nav>

        <header className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
          >
            <div
              className="order-2 md:order-1 flex-shrink-0"
              aria-hidden
            >
              <Shape
                type={shape}
                className="w-20 h-20 md:w-32 md:h-32 bg-concrete border border-neutral-200"
              />
            </div>

            <div className="order-1 md:order-2 flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-deepBlack bg-concrete px-4 py-2 rounded-full">
                  {post.category}
                </span>
                <time
                  dateTime={post.date}
                  className="text-xs font-mono text-neutral-400"
                >
                  {formatDate(post.date)}
                </time>
              </div>
              <h1
                id="article-title"
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9]"
              >
                {post.title}
              </h1>
            </div>
          </motion.div>

          {post.excerpt ? (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-12 text-xl md:text-2xl font-light text-neutral-600 max-w-3xl leading-relaxed border-l-4 border-deepBlack pl-6"
            >
              {post.excerpt}
            </motion.p>
          ) : null}
        </header>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-gradient-to-r from-deepBlack via-neutral-300 to-transparent mb-16 origin-left"
          role="separator"
        />

        {post.featuredImage ? (
          <motion.figure
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-16 md:mb-24 -mx-4 md:-mx-8 lg:-mx-16 border border-neutral-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.featuredImage}
              alt={`Featured image for ${post.title}`}
              className="w-full h-auto"
              loading="eager"
            />
          </motion.figure>
        ) : null}

        <motion.div
          id="article-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="max-w-3xl mx-auto prose-lg"
          role="main"
        >
          {post.body && post.body.length > 0 ? (
            <PortableText
              value={post.body}
              components={journalPortableTextComponents}
            />
          ) : (
            <div className="py-16 text-center" role="status" aria-label="Content">
              <p className="text-sm font-mono uppercase tracking-widest text-neutral-400">
                Content coming soon
              </p>
            </div>
          )}
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-24 pt-12 border-t border-neutral-200"
          role="contentinfo"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <LocalizedClientLink
              href="/journal"
              className="group inline-flex items-center gap-3 text-sm font-mono uppercase tracking-widest hover:opacity-80 transition-all py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-deepBlack focus-visible:ring-offset-4 rounded"
            >
              <span className="w-10 h-10 rounded-full bg-concrete flex items-center justify-center group-hover:bg-deepBlack transition-colors">
                <ArrowLeft
                  size={16}
                  className="group-hover:text-white transition-colors"
                />
              </span>
              <span>Back to Journal</span>
            </LocalizedClientLink>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-neutral-400">Share</span>
              <div className="flex gap-2">
                <span
                  className="w-10 h-10 rounded-full bg-concrete flex items-center justify-center text-deepBlack"
                  aria-hidden
                >
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
          </div>
        </motion.footer>
      </Container>
    </article>
  )
}

function LookbookLayout({ post }: { post: JournalEntry }) {
  const shape = asShapeType(post.shape, "trapezoid")
  return (
    <article
      className="min-h-screen bg-deepBlack text-white"
      aria-labelledby="lookbook-title"
    >
      <a
        href="#lookbook-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-deepBlack focus:rounded"
      >
        Skip to content
      </a>

      <div className="relative min-h-screen flex items-end">
        {post.featuredImage ? (
          <motion.div
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.featuredImage}
              alt={`${post.title} hero image`}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deepBlack via-deepBlack/40 to-deepBlack/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-deepBlack/30 to-transparent" />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-deepBlack to-neutral-800 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              aria-hidden
            >
              <Shape
                type={shape}
                className="w-48 h-48 md:w-64 md:h-64 bg-white/10 border border-white/20"
              />
            </motion.div>
          </div>
        )}

        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute top-32 left-0 right-0 z-20"
          aria-label="Breadcrumb"
        >
          <Container>
            <LocalizedClientLink
              href="/journal"
              className="group inline-flex items-center gap-3 text-sm font-mono text-white/70 uppercase tracking-widest hover:text-white transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-transparent rounded"
            >
              <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white transition-colors">
                <ArrowLeft
                  size={16}
                  className="group-hover:text-deepBlack transition-colors"
                />
              </span>
              <span className="backdrop-blur-sm">Journal</span>
            </LocalizedClientLink>
          </Container>
        </motion.nav>

        <Container className="relative z-10 pb-20 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-white bg-white/10 border border-white/20 px-4 py-2 rounded-full">
                {post.category}
              </span>
              <time
                dateTime={post.date}
                className="text-xs font-mono text-white/50"
              >
                {formatDate(post.date)}
              </time>
            </div>

            <h1
              id="lookbook-title"
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.85] mb-8 max-w-4xl"
            >
              {post.title}
            </h1>

            {post.excerpt ? (
              <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-light">
                {post.excerpt}
              </p>
            ) : null}
          </motion.div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </Container>
      </div>

      <div
        id="lookbook-content"
        className="py-24 md:py-32 bg-white text-deepBlack"
        role="main"
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {post.body && post.body.length > 0 ? (
              <PortableText
                value={post.body}
                components={journalPortableTextComponents}
              />
            ) : (
              <div className="py-24 text-center" role="status">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <Shape
                    type={asShapeType(post.shape, "rhombus")}
                    className="w-20 h-20 bg-concrete"
                  />
                </motion.div>
                <p className="mt-8 text-sm font-mono uppercase tracking-widest text-neutral-400">
                  Visual content coming soon
                </p>
              </div>
            )}
          </motion.div>

          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24 pt-12 border-t border-neutral-200"
            role="contentinfo"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <LocalizedClientLink
                href="/journal"
                className="group inline-flex items-center gap-3 text-sm font-mono uppercase tracking-widest hover:opacity-80 transition-all py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-deepBlack focus-visible:ring-offset-4 rounded"
              >
                <span className="w-10 h-10 rounded-full bg-concrete flex items-center justify-center group-hover:bg-deepBlack transition-colors">
                  <ArrowLeft
                    size={16}
                    className="group-hover:text-white transition-colors"
                  />
                </span>
                <span>Back to Journal</span>
              </LocalizedClientLink>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-neutral-400">Share</span>
                <span
                  className="w-10 h-10 rounded-full bg-concrete flex items-center justify-center"
                  aria-hidden
                >
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
          </motion.footer>
        </Container>
      </div>
    </article>
  )
}

export default function JournalPostTemplate({ post }: { post: JournalEntry }) {
  if (isLookbook(post.category)) {
    return <LookbookLayout post={post} />
  }
  return <EditorialLayout post={post} />
}
