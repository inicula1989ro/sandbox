import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    brand: Palette['primary']
  }
  interface PaletteOptions {
    brand?: PaletteOptions['primary']
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#E91E63',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5E6EA',
    },
    text: {
      primary: '#2B2B2B',
    },
    brand: {
      main: '#E7B5C0',
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
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
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
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontSize: '1.125rem',
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontSize: '1rem',
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
    subtitle2: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      fontSize: '0.9375rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: '12px 32px',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
      },
    },
  },
})
