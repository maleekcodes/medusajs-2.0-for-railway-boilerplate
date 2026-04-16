"use client"

import { motion } from "framer-motion"
import { ArrowRight, Box, Layers, ScanFace, ShieldCheck } from "lucide-react"

import { Container } from "@modules/common/components/xyz/Container"
import { Shape } from "@modules/common/components/xyz/Shape"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type { ShapeType } from "@/types/xyz"

const steps = [
  {
    id: "01",
    title: "Scan Structure",
    description: "Camera-assisted analysis maps your key structural points.",
    shape: "circle" as ShapeType,
    icon: ScanFace,
  },
  {
    id: "02",
    title: "Compute Fit",
    description: "Matches your volumetric data to our architectural patterns.",
    shape: "hexagon" as ShapeType,
    icon: Layers,
  },
  {
    id: "03",
    title: "Visualize",
    description: "See the garment on your form in AR before you acquire.",
    shape: "rhombus" as ShapeType,
    icon: Box,
  },
]

export default function ARFitTemplate() {
  return (
    <div className="pt-32 pb-24 bg-white text-deepBlack min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            System v1.0
          </span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mt-4 mb-8">
            FIND YOUR <br className="hidden md:block" />
            PERFECT FIT.
          </h1>
          <p className="max-w-2xl text-xl font-light text-neutral-600 mb-12">
            Instant sizing analysis based on your unique structure. <br />
            No measuring tapes. No gender categories. Just form.
          </p>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <LocalizedClientLink
              href="/store"
              className="bg-deepBlack text-white px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors inline-flex items-center gap-3"
            >
              <span>Start Fit Analysis</span>
              <ArrowRight size={16} />
            </LocalizedClientLink>
          </motion.div>
        </motion.div>

        <section className="mb-32 border-t border-neutral-100 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-light tracking-tight leading-tight mb-6">
                We don&apos;t classify bodies. <br />
                We design systems that adapt to them.
              </h2>
            </div>
            <div className="text-neutral-500 font-light leading-relaxed space-y-6">
              <p>
                XYZ London does not size by gender. Our sizing system is built
                on{" "}
                <span className="text-deepBlack font-medium">
                  Architectural Fluidity
                </span>
                : a technical approach that uses volume, drape, and internal
                structure to allow garments to adapt naturally to different
                frames.
              </p>
              <p>
                Rather than assigning identity through size labels, we invite
                individuals to choose how they wish to reveal their form. Fit
                becomes an expression, not a prescription.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-32">
          <div className="flex items-end justify-between border-b border-deepBlack pb-4 mb-12">
            <h2 className="text-3xl font-light tracking-tight">
              The Analysis Process
            </h2>
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
              Privacy Encrypted
            </span>
          </div>
          <p className="text-neutral-500 max-w-lg mb-8 text-sm font-light">
            This experience analyses form and proportion only. <br />
            No images or body data are stored on our servers.
          </p>
          <span className="text-[10px] font-mono text-neutral-300 uppercase">
            System v1.0 (Beta)
          </span>
        </section>
      </Container>
    </div>
  )
}
