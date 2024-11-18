import { ThemeProvider, ThemeProviderProps } from '@acid-info/lsd-react'
import { Global } from '@emotion/react'
import React, { useEffect } from 'react'
import { useThemeState } from '../../states/themeState/theme.state' // Using Jotai's useThemeState hook
import { useLSDTheme } from './themes'

export type LSDThemeProviderProps = Partial<ThemeProviderProps>

export const LSDThemeProvider: React.FC<LSDThemeProviderProps> = ({
  children,
  ...props
}) => {
  const theme = useLSDTheme()
  const { mode, genericFontFamily } = useThemeState()

  useEffect(() => {
    const html = document.querySelector('html') as HTMLElement
    html.setAttribute('data-theme', mode) // Removed `.value` since Jotai provides direct values
    html.setAttribute('data-font-family', genericFontFamily) // Removed `.value`
  }, [mode, genericFontFamily]) // Removed `.value` in dependencies

  return (
    <ThemeProvider theme={theme.current} injectCssVars={false}>
      <Global styles={theme.darkCssVars} />
      <Global styles={theme.lightCssVars} />
      {children}
    </ThemeProvider>
  )
}
