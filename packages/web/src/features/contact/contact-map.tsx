import Box from '@mui/material/Box'

import { fadeInUpKeyframes } from '@/styles/animations'

export interface ContactMapProps {
  animate: boolean
}

const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d680.5!2d28.8504734!3d47.0166731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97dd93446d617%3A0x4023ebb8f59e9bac!2sEVO%20Studio!5e0!3m2!1sen!2s!4v1713100000000'

export function ContactMap({ animate }: ContactMapProps) {
  return (
    <Box
      sx={{
        ...fadeInUpKeyframes,
        '@media (prefers-reduced-motion: no-preference)': animate
          ? {
              animation: 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s both',
            }
          : {},
        opacity: animate ? undefined : 0,
        borderRadius: 3,
        overflow: 'hidden',
        aspectRatio: { xs: '16 / 10', md: '1 / 1' },
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Box
        component="iframe"
        src={MAPS_EMBED_URL}
        title="EVO Studio location on Google Maps"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        sx={{
          width: '100%',
          height: '100%',
          border: 0,
          display: 'block',
          filter: 'grayscale(0.3)',
        }}
      />
    </Box>
  )
}
