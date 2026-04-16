/** Matches XYZ-style cart line layout (flex row, not table). */
const SkeletonCartLineCard = () => {
  return (
    <div className="flex gap-6 pb-8 border-b border-neutral-100">
      <div className="h-32 w-32 shrink-0 bg-neutral-100 animate-pulse" />
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex justify-between gap-4">
          <div className="space-y-2">
            <div className="h-5 w-48 max-w-full bg-neutral-100 animate-pulse" />
            <div className="h-4 w-32 bg-neutral-100 animate-pulse" />
          </div>
          <div className="h-5 w-5 shrink-0 bg-neutral-100 animate-pulse rounded" />
        </div>
        <div className="flex items-end justify-between pt-2">
          <div className="h-10 w-28 bg-neutral-100 animate-pulse" />
          <div className="h-6 w-20 bg-neutral-100 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCartLineCard
