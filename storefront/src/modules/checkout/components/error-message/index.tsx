const ErrorMessage = ({
  error,
  "data-testid": dataTestid,
}: {
  error?: string | null
  "data-testid"?: string
}) => {
  const text = typeof error === "string" ? error : null
  if (!text) {
    return null
  }

  return (
    <div className="pt-2 text-rose-500 text-small-regular" data-testid={dataTestid}>
      <span>{text}</span>
    </div>
  )
}

export default ErrorMessage
