import { createTheme, alpha } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    blood: Palette['primary']
  }
  interface PaletteOptions {
    blood?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    blood: true
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main:        '#01411C',
      light:       '#01884a',
      dark:        '#013016',
      contrastText: '#ffffff',
    },
    blood: {
      main:        '#C8102E',
      light:       '#dc3d51',
      dark:        '#9b0b22',
      contrastText: '#ffffff',
    },
    secondary: {
      main:        '#016b2e',
      light:       '#2da260',
      dark:        '#01411C',
      contrastText: '#ffffff',
    },
    error: {
      main: '#C8102E',
    },
    background: {
      default: '#f8fafc',
      paper:   '#ffffff',
    },
    text: {
      primary:   '#0f172a',
      secondary: '#475569',
    },
  },
  typography: {
    fontFamily: "'Inter', 'system-ui', 'sans-serif'",
    h1: { fontFamily: "'Outfit', 'Inter', sans-serif", fontWeight: 800 },
    h2: { fontFamily: "'Outfit', 'Inter', sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Outfit', 'Inter', sans-serif", fontWeight: 700 },
    h4: { fontFamily: "'Outfit', 'Inter', sans-serif", fontWeight: 600 },
    h5: { fontFamily: "'Outfit', 'Inter', sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Outfit', 'Inter', sans-serif", fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          fontSize: '0.9375rem',
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 4px 12px rgba(1,65,28,0.25)' },
        },
        contained: {
          '&.MuiButton-containedPrimary': {
            background: 'linear-gradient(135deg, #01411C 0%, #016b2e 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #016b2e 0%, #01411C 100%)',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.06)',
          '&:hover': {
            boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
            transform: 'translateY(-2px)',
            transition: 'all 0.25s ease',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 600 },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&:hover fieldset': { borderColor: '#01411C' },
            '&.Mui-focused fieldset': { borderColor: '#01411C' },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 16 },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { borderRadius: '0 20px 20px 0' },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #01411C 0%, #C8102E 100%)',
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 4, height: 8 },
        bar: { borderRadius: 4 },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 8,
          fontSize: '0.8rem',
          background: '#0f172a',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: '0 1px 12px rgba(0,0,0,0.08)' },
      },
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main:        '#2da260',
      light:       '#4fb077',
      dark:        '#01411C',
      contrastText: '#ffffff',
    },
    blood: {
      main:        '#e45a6d',
      light:       '#ea7789',
      dark:        '#C8102E',
      contrastText: '#ffffff',
    },
    secondary: {
      main:        '#4fb077',
      light:       '#70be8e',
      dark:        '#2da260',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0f172a',
      paper:   '#1e293b',
    },
    text: {
      primary:   '#f1f5f9',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: "'Inter', 'system-ui', 'sans-serif'",
    h1: { fontFamily: "'Outfit', sans-serif", fontWeight: 800 },
    h2: { fontFamily: "'Outfit', sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Outfit', sans-serif", fontWeight: 700 },
    h4: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h5: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: alpha('#1e293b', 0.8),
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&:hover fieldset': { borderColor: '#2da260' },
            '&.Mui-focused fieldset': { borderColor: '#2da260' },
          },
        },
      },
    },
  },
})

export default lightTheme
