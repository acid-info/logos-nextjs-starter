import {
  createTheme,
  CreateThemeProps,
  defaultThemes,
  Theme,
} from '@acid-info/lsd-react'
import { css } from '@emotion/react'
import { useMemo } from 'react'
import { useThemeState } from '../../states/themeState/theme.state'

const baseThemes = defaultThemes

const useThemeCssVars = (theme: Theme, colorMode: string) =>
  useMemo(
    () => css`
      [data-theme=${colorMode}] {
        ${theme.cssVars}
      }

      [data-font-family='sans-serif'] {
        --lsd-typography-generic-font-family: sans-serif;
      }

      [data-font-family='serif'] {
        --lsd-typography-generic-font-family: serif;
      }

      [data-font-family='monospace'] {
        --lsd-typography-generic-font-family: monospace;
      }
    `,
    [theme, colorMode],
  )

export const useLSDTheme = () => {
  const { genericFontFamily, mode } = useThemeState()

  const themes = useMemo(() => {
    const options: CreateThemeProps = {
      breakpoints: {
        sm: {
          width: 768,
        },
        md: {
          width: 1024,
        },
        lg: {
          width: 1280,
        },
        xl: {
          width: 1440,
        },
      },
      palette: {
        primary: '20, 0, 255',
        secondary: '255, 255, 255',
      },
      spacing: [],
      typography: {},
      typographyGlobal: {
        genericFontFamily: genericFontFamily as any,
      },
    }

    return {
      light: createTheme(options, baseThemes.light),
      dark: createTheme(options, baseThemes.dark),
    }
  }, [genericFontFamily])

  return {
    dark: themes.dark,
    light: themes.light,
    current: themes[mode],
    lightCssVars: useThemeCssVars(themes.light, 'light'),
    darkCssVars: useThemeCssVars(themes.dark, 'dark'),
  }
}
