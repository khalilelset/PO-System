import '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    awal: Palette['primary'];
    teni: Palette['primary'];
    telet: Palette['primary'];
    rabe3: Palette['primary'];
    khames: Palette['primary'];
  }

  interface PaletteOptions {
    awal?: PaletteOptions['primary'];
    teni?: PaletteOptions['primary'];
    telet?: PaletteOptions['primary'];
    rabe3?: PaletteOptions['primary'];
    khames?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#005858',
    },
    awal: {
      main: '#fbfaf6',
    },
    teni: {
      main: '#d2be8b',
    },
    telet: {
      main: '#005858',
    },
    rabe3: {
      main: '#009292',
    },
    khames: {
      main: '#002a2f',
    },
  },
});

export default theme;
