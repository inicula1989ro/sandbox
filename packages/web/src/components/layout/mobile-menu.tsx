import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import { copy } from '@/constants/copy'

export interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

const navItems = Object.entries(copy.nav).map(([key, label]) => ({
  key,
  label,
  href: `#${key}`,
}))

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      aria-label="Main navigation"
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.default',
            pt: 10,
            px: 2,
          },
        },
      }}
    >
      <nav>
        <List>
          {navItems.map(({ key, label, href }) => (
            <ListItemButton
              key={key}
              component="a"
              href={href}
              onClick={onClose}
              sx={{
                borderRadius: 2,
                mb: 0.5,
              }}
            >
              <ListItemText
                primary={label}
                slotProps={{
                  primary: {
                    sx: {
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '1.25rem',
                      fontWeight: 500,
                    },
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </nav>
      <Box sx={{ px: 2, mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          href="#book"
          onClick={onClose}
          sx={{ py: 1.5 }}
        >
          {copy.hero.cta}
        </Button>
      </Box>
    </Drawer>
  )
}
