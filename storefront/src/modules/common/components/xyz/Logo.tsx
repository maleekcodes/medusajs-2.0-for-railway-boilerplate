interface LogoProps {
  className?: string
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <span
      role="img"
      aria-label="XYZ London"
      className={`inline-block bg-current ${className}`}
      style={{
        aspectRatio: "187 / 150",
        WebkitMaskImage: "url(/xyz-london-logo.png)",
        maskImage: "url(/xyz-london-logo.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  )
}
