import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  id?: string
  'data-testid'?: string
}

export function Container({
  children,
  className = '',
  id,
  'data-testid': dataTestId,
}: ContainerProps) {
  return (
    <div
      id={id}
      data-testid={dataTestId}
      className={`max-w-7xl mx-auto px-6 md:px-12 ${className}`}
    >
      {children}
    </div>
  )
}
