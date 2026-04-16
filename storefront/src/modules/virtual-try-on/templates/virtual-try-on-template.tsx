"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  Camera,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react"

import { Container } from "@modules/common/components/xyz/Container"
import { Shape } from "@modules/common/components/xyz/Shape"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type { ShapeType } from "@/types/xyz"

const steps = [
  {
    id: "01",
    title: "Upload a photo",
    description:
      "On any product where try-on is available—physical garments or digital expressions—choose a clear, well-lit picture of yourself.",
    shape: "circle" as ShapeType,
    icon: Camera,
  },
  {
    id: "02",
    title: "Get a composite preview",
    description:
      "Our partner service renders the piece onto your image so you can judge proportion, silhouette, and overall feel—not a perfect mirror, but a useful reference next to flat product shots.",
    shape: "hexagon" as ShapeType,
    icon: Sparkles,
  },
  {
    id: "03",
    title: "Decide with more context",
    description:
      "Use what you see to shortlist, compare, or move forward: add a physical piece to your bag, or complete checkout on a digital work knowing you had a clearer preview than imagery alone.",
    shape: "rhombus" as ShapeType,
    icon: ShoppingBag,
  },
]

export default function VirtualTryOnTemplate() {
  return (
    <div className="pt-32 pb-24 bg-white text-deepBlack min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            Try-on
          </span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mt-4 mb-8">
            SEE IT ON <br className="hidden md:block" />
            YOU FIRST.
          </h1>
          <p className="max-w-2xl text-xl font-light text-neutral-600 mb-6">
            Try-on is our way to bring you closer to a piece before you commit.
            Whether you&apos;re shopping{" "}
            <span className="text-deepBlack font-normal">physical garments</span>{" "}
            or exploring{" "}
            <span className="text-deepBlack font-normal">
              digital expressions
            </span>
            , the idea is the same: upload a photo, get a composite preview of
            the work on you, and use that context to decide—not instead of your
            own judgment, but with less guesswork than catalog photos alone.
          </p>
          <p className="max-w-2xl text-base font-light text-neutral-500 mb-12">
            Availability depends on the product and region; look for the try-on
            entry point on the product page when it&apos;s offered.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <LocalizedClientLink
                href="/store"
                className="bg-deepBlack text-white px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors inline-flex items-center gap-3"
              >
                <span>Physical collection</span>
                <ArrowRight size={16} />
              </LocalizedClientLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <LocalizedClientLink
                href="/digital"
                className="border border-deepBlack bg-white text-deepBlack px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-50 transition-colors inline-flex items-center gap-3"
              >
                <span>Digital expressions</span>
                <ArrowRight size={16} />
              </LocalizedClientLink>
            </motion.div>
          </div>
        </motion.div>

        <section className="mb-24 border-t border-neutral-100 pt-12">
          <h2 className="text-3xl font-light tracking-tight leading-tight mb-10">
            What try-on does for you
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Less abstraction
              </p>
              <p className="text-neutral-600 font-light leading-relaxed">
                You see the piece on{" "}
                <span className="text-deepBlack font-medium">your</span> frame,
                not only on a model—helpful when every body reads a garment
                differently.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                One workflow
              </p>
              <p className="text-neutral-600 font-light leading-relaxed">
                The same upload-and-preview flow applies across channels: use it
                on eligible physical PDPs (often beside the price) and on
                digital expression pages where we&apos;ve enabled it.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Clearer decisions
              </p>
              <p className="text-neutral-600 font-light leading-relaxed">
                Use the preview to compare options, shortlist, or feel more
                confident at checkout—especially when you can&apos;t visit a
                space in person first.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-32 border-t border-neutral-100 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-light tracking-tight leading-tight mb-6">
                How it fits into XYZ London
              </h2>
            </div>
            <div className="text-neutral-500 font-light leading-relaxed space-y-6">
              <p>
                We care about form, proportion, and how identity shows up in
                what you wear—whether that&apos;s a physical garment or a digital
                expression. Try-on doesn&apos;t replace trying something on in
                real life or studying the artwork in full resolution, but it
                closes some of the gap between &quot;looks great on the site&quot;
                and &quot;how might it feel on me?&quot;
              </p>
              <p>
                For <span className="text-deepBlack font-medium">physical</span>{" "}
                pieces, use try-on when you want a directional sense of fit and
                presence before you add to bag. For{" "}
                <span className="text-deepBlack font-medium">digital</span>{" "}
                works, it helps you preview the expression on your likeness
                before purchase or download—where the feature is available.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-32">
          <div className="flex items-end justify-between border-b border-deepBlack pb-4 mb-12">
            <h2 className="text-3xl font-light tracking-tight">How it works</h2>
            <span className="font-mono text-xs">01 — 03</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group bg-concrete p-8 flex flex-col justify-between min-h-[400px] border border-transparent hover:border-neutral-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-widest font-mono border border-neutral-300 rounded-full px-2 py-0.5 bg-white/50">
                    {step.id}
                  </span>
                  <step.icon
                    size={20}
                    className="text-neutral-400 group-hover:text-deepBlack transition-colors"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="flex-grow flex items-center justify-center py-8">
                  <Shape
                    type={step.shape}
                    className="w-40 bg-white shadow-sm border border-neutral-100 text-neutral-200 group-hover:scale-105 transition-transform duration-500"
                  >
                    <div className="w-1/2 h-px bg-current" />
                  </Shape>
                </div>

                <div>
                  <h3 className="text-lg font-bold tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-500">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-12 border-t border-neutral-100 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2 text-green-600 bg-green-50 px-4 py-1.5 rounded-full border border-green-200">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-mono uppercase tracking-widest">
              Privacy-minded
            </span>
          </div>
          <p className="text-neutral-500 max-w-lg mb-8 text-sm font-light">
            Your photo is sent to our try-on partner to generate the preview. We
            don&apos;t use it for marketing lists or sell your data—see our
            Privacy Policy for the full picture.
          </p>
          <span className="text-[10px] font-mono text-neutral-300 uppercase">
            Not every product includes try-on; labels and previews are references,
            not guarantees of fit or final render quality.
          </span>
        </section>
      </Container>
    </div>
  )
}
