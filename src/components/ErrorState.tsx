interface Props {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: Props) {
  return (
    <div className="error-state" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}
