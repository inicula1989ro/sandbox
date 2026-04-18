import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export function NailIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        d="M9 3.5h6c.55 0 1 .45 1 1v4.5a4 4 0 0 1-8 0V4.5c0-.55.45-1 1-1Z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M9 3.5h6c.55 0 1 .45 1 1v4.5a4 4 0 0 1-8 0V4.5c0-.55.45-1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8 11v8c0 1.66 1.34 3 3 3h2c1.66 0 3-1.34 3-3v-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15.5" cy="5.5" r="0.9" fill="currentColor" />
      <circle cx="13.5" cy="7" r="0.55" fill="currentColor" opacity="0.7" />
    </SvgIcon>
  )
}
