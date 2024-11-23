import { createTheme } from '@mui/material/styles';

const HIGHLIGHT_BACKGROUND_COLOR = "#FFFCD8";
const OPEN_MARKER_COLOR = "#92C65E";
const CLOSED_MARKER_COLOR = "#DB5757";
const SELECTED_MARKER_COLOR = "#FFFF00";
const SELECTED_BACKGROUND_COLOR = "#F0F5FA";
const PRIMARY_COLOR = "#4A24E7"

// Extend the theme
declare module '@mui/material/styles' {
  interface TypeBackground {
    highlighted: string
  }

  interface TypeBackgroundOptions {
    highlighted?: string
  }

  interface Palette {
    hospital: {
      open: string,
      closed: string,
      selected: string
    },
    background: {
      default: string;
      paper: string;
      highlighted: string
    };
  }
  // Allow configuration using `createTheme`
  interface PaletteOptions {
    hospital?: {
      open?: string,
      closed?: string,
      selected?: string
    },
    background?: {
      default?: string;
      paper?: string;
      highlighted?: string
    };
  }

}

const Palette = () => {

  return createTheme({
    palette: {
      primary: {
        main: PRIMARY_COLOR,
      },
      action: {
        selected: SELECTED_BACKGROUND_COLOR
      },
      hospital: {
        open: OPEN_MARKER_COLOR,
        closed: CLOSED_MARKER_COLOR,
        selected: SELECTED_MARKER_COLOR
      },
      background: {
        highlighted: HIGHLIGHT_BACKGROUND_COLOR
      }
    },
  });

};

export default Palette;
