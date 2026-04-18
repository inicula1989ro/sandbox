import { createTheme, alpha } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    brand: Palette['primary']
  }
  interface PaletteOptions {
    brand?: PaletteOptions['primary']
  }
}

const PINK = '#E91E63'
const BRAND = '#E7B5C0'
const BG_DEFAULT = '#0A0A0A'
const BG_PAPER = '#141414'
const TEXT_PRIMARY = '#F5F5F5'
const TEXT_SECONDARY = '#A0A0A0'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: PINK, contrastText: '#FFFFFF' },
    background: { default: BG_DEFAULT, paper: BG_PAPER },
    text: { primary: TEXT_PRIMARY, secondary: TEXT_SECONDARY },
    divider: alpha(BRAND, 0.2),
    brand: {
      main: BRAND,
      light: '#F5E6EA',
      dark: '#D4919F',
      contrastText: '#2B2B2B',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      letterSpacing: '0.04em',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      letterSpacing: '0.04em',
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      fontSize: '0.9375rem',
      lineHeight: 1.6,
    },
    overline: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      fontSize: '0.75rem',
      fontWeight: 500,
      letterSpacing: '3px',
      textTransform: 'uppercase' as const,
      lineHeight: 1.5,
    },
    button: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: BG_DEFAULT, color: TEXT_PRIMARY },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          padding: '12px 32px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiAccordion: {
      defaultProps: { elevation: 0, disableGutters: true, square: true },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderBottom: `1px solid ${alpha(BRAND, 0.2)}`,
          '&:before': { display: 'none' },
          '&.Mui-expanded': { margin: 0 },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '16px 0',
          minHeight: 'unset',
          '&.Mui-expanded': { minHeight: 'unset' },
        },
        content: {
          margin: 0,
          '&.Mui-expanded': { margin: 0 },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: { padding: '8px 0 24px 0' },
      },
    },
  },
})
