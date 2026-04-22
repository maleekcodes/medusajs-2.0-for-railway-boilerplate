import type { ReactNode } from "react"

type AccountPageHeaderProps = {
  title: string
  children?: ReactNode
}

export default function AccountPageHeader({
  title,
  children,
}: AccountPageHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-3">
      <h1 className="text-xs font-bold uppercase tracking-widest text-deepBlack">
        {title}
      </h1>
      {children ? (
        <p className="text-sm text-neutral-500 leading-relaxed max-w-2xl">
          {children}
        </p>
      ) : null}
    </div>
  )
}
