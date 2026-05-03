import { BOOKING_URL } from '@/constants/i18n'

export interface BookFabProps {
  label: string
}

export function BookFab({ label }: BookFabProps) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="book-fab book-fab--pill"
      aria-label={label}
    >
      {label}
    </a>
  )
}
