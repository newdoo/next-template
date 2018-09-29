/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss'
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  // palette: {
  //   primary: {
  //     light: '#4f5b62',
  //     main: '#263238',
  //     dark: '#000a12',
  //     contrastText: '#000000',
  //   },
  //   secondary: {
  //     light: green[300],
  //     main: '#000000',
  //     dark: green[700],
  //   },
  // },
  typography: {
    fontFamily: [
      'Orbitron', 'sans-serif'
    ].join(','),
    fontWeightMedium: 400,
    display1: {
      fontWeight: 700,
    },
    display4: {
      fontWeight: 700,
    },
  }
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
