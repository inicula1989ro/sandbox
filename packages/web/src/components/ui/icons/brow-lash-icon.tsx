import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export function BrowLashIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        d="M3 7c3.5-3 14.5-3 18 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M3 14c3 3.3 15 3.3 18 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="12" cy="14" r="2.2" fill="currentColor" />
      <path d="M5 18.5l0.4 2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 19.5l0.2 2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 19.8l0 2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M16 19.5l-0.2 2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M19 18.5l-0.4 2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </SvgIcon>
  )
}
