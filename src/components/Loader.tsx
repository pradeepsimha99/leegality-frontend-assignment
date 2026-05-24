interface Props {
  label?: string
}

export function Loader({ label = 'Loading…' }: Props) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="spinner" aria-hidden />
      <span>{label}</span>
    </div>
  )
}
