import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined'
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined'
import PeopleOutlined from '@mui/icons-material/PeopleOutlined'
import SpaOutlined from '@mui/icons-material/SpaOutlined'
import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined'
import VerifiedOutlined from '@mui/icons-material/VerifiedOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { fadeInUpKeyframes } from '@/styles/animations'

type IconComponent = typeof PeopleOutlined

const iconMap: Record<string, IconComponent> = {
  people: PeopleOutlined,
  favorite: FavoriteBorderOutlined,
  star: StarBorderOutlined,
  spa: SpaOutlined,
  verified: VerifiedOutlined,
  autoAwesome: AutoAwesomeOutlined,
}

export type BenefitItemProps = {
  icon: string
  title: string
  index: number
  animate: boolean
}

export function BenefitItem({ icon, title, index, animate }: BenefitItemProps) {
  const Icon = iconMap[icon]
  const delay = index * 0.05

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1.5,
        alignItems: 'center',
        borderTop: 1,
        borderColor: 'brand.main',
        pt: 2,
        ...fadeInUpKeyframes,
        '@media (prefers-reduced-motion: no-preference)': animate
          ? {
              animation: `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
            }
          : {},
        opacity: animate ? undefined : 0,
      }}
    >
      {Icon ? <Icon aria-hidden sx={{ color: 'brand.dark', fontSize: 32 }} /> : null}
      <Typography
        sx={{
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: 'text.primary',
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}
