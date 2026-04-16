"use client"

import { usePathname } from "next/navigation"

import { isDigitalRoute } from "@lib/util/is-digital-route"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Container } from "@modules/common/components/xyz/Container"

export default function FooterChrome() {
  const pathname = usePathname()
  const digital = isDigitalRoute(pathname)

  const shell = digital
    ? "bg-deepBlack pt-24 pb-12 border-t border-neutral-800 transition-colors duration-300"
    : "bg-white pt-24 pb-12 border-t border-neutral-100 transition-colors duration-300"

  const heading = digital ? "text-white" : "text-deepBlack"
  const body = digital ? "text-neutral-400" : "text-neutral-500"
  const storyLink = digital
    ? "text-sm font-medium text-white border-b border-white pb-0.5 hover:opacity-60 transition-opacity inline-block"
    : "text-sm font-medium text-deepBlack border-b border-deepBlack pb-0.5 hover:opacity-60 transition-opacity inline-block"
  const bottomBorder = digital ? "border-neutral-800" : "border-neutral-100"
  const copyright = digital ? "text-neutral-500" : "text-neutral-400"
  const tagline = digital ? "text-neutral-500" : "text-neutral-300"

  const linkClass = "hover:opacity-70 transition-opacity"

  return (
    <footer className={shell}>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12 mb-24">
          <div className="space-y-4 sm:col-span-2 lg:col-span-5">
            <h4 className={`text-xs font-bold uppercase tracking-widest ${heading}`}>
              Brand Philosophy
            </h4>
            <p className={`text-sm ${body} leading-relaxed`}>
              XYZ London exists to uncover identity through form.
              <br />
              We believe in expression through movement, proportion, and restraint.
              <br />
              Our garments are designed for longevity, not trends.
              <br />
              Our digital expressions explore identity beyond physical constraints.
            </p>
            <LocalizedClientLink href="/about" className={storyLink}>
              Read Our Story
            </LocalizedClientLink>
          </div>

          <div className="space-y-4 lg:col-span-2">
            <h4 className={`text-xs font-bold uppercase tracking-widest ${heading}`}>
              Product
            </h4>
            <ul className={`space-y-2 text-sm ${body}`}>
              <li>Private Expressions</li>
              <li>Materials: Sustainable fabrics</li>
              <li>Care: Longevity focused</li>
              <li>Archive: 2024 - 2026</li>
            </ul>
          </div>

          <div className="space-y-4 lg:col-span-2">
            <h4 className={`text-xs font-bold uppercase tracking-widest ${heading}`}>
              Legal
            </h4>
            <ul className={`space-y-2 text-sm ${body}`}>
              <li>
                <LocalizedClientLink
                  href="/content/terms-of-use"
                  className={linkClass}
                >
                  Terms &amp; Service
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/content/privacy-policy"
                  className={linkClass}
                >
                  Privacy Policy
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/content/privacy-policy#cookies"
                  className={linkClass}
                >
                  Cookie Settings
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          <div className="space-y-4 lg:col-span-3">
            <h4 className={`text-xs font-bold uppercase tracking-widest ${heading}`}>
              Connect
            </h4>
            <ul className={`space-y-2 text-sm ${body}`}>
              <li>
                <LocalizedClientLink href="/contact" className={linkClass}>
                  Contact
                </LocalizedClientLink>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a href="mailto:contact@xyzwear.com" className={linkClass}>
                  contact@xyzwear.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`flex flex-col md:flex-row justify-between items-center pt-8 border-t ${bottomBorder}`}
        >
          <span
            className={`text-[10px] md:text-xs uppercase tracking-widest ${copyright}`}
          >
            © {new Date().getFullYear()} XYZ London. All rights reserved.
          </span>
          <span
            className={`text-[10px] md:text-xs uppercase tracking-widest ${tagline} mt-2 md:mt-0`}
          >
            Physical / Digital
          </span>
        </div>
      </Container>
    </footer>
  )
}
