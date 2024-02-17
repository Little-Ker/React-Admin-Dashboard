import { createTheme as createMuiTheme, responsiveFontSizes } from '@mui/material/styles'
import variable from 'styles/variable.sass'
import { baseThemeOptions } from './base-theme-options'
import { darkThemeOptions } from './dark-theme-options'
import { lightThemeOptions } from './light-theme-options'

export const createTheme = (config) => {
  const mainColor = {
    Blue: {
      main: variable.mainBlue,
      dark: variable.mainBlueDark,
    },
    Green: {
      main: variable.mainGreen,
      dark: variable.mainGreenDark,
    },
    Purple: {
      main: variable.mainPurple,
      dark: variable.mainPurpleDark,
    },
  }

  const theme = createMuiTheme(
    baseThemeOptions,
    config.mode === 'Dark' ? darkThemeOptions : lightThemeOptions,
    {
      // direction: config.direction,
      palette: {
        ...config.mode === 'Dark' ? darkThemeOptions : lightThemeOptions,
        primary: mainColor[config.mainColor],
        blue: {
          main: mainColor.Blue.main,
          dark: mainColor.Blue.main,
        },
        green: {
          main: mainColor.Green.main,
          dark: mainColor.Green.main,
        },
        purple: {
          main: mainColor.Purple.main,
          dark: mainColor.Purple.main,
        },
      },
    }

  )

  // if (config.responsiveFontSizes) {
  //   theme = responsiveFontSizes(theme)
  // }

  return theme
}
