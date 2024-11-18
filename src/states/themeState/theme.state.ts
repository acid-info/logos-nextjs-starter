import { TypographyGenericFontFamily } from '@acid-info/lsd-react'
import { atom, useAtom } from 'jotai'

export type ThemeState = {
  mode: 'light' | 'dark'
  genericFontFamily: TypographyGenericFontFamily | 'Inter'
}

export const defaultThemeState: ThemeState = {
  mode: 'light',
  genericFontFamily: 'Inter',
}

const themeAtom = atom<ThemeState>(() => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme ? JSON.parse(storedTheme) : defaultThemeState
  }
  return defaultThemeState
})

const persistentThemeAtom = atom(
  (get) => get(themeAtom),
  (get, set, newTheme: ThemeState) => {
    set(JSON.parse(JSON.stringify(newTheme)))
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', JSON.stringify(newTheme))
    }
  },
)

export const useThemeState = () => {
  const [theme, setTheme] = useAtom(persistentThemeAtom)

  const setMode = (mode: ThemeState['mode']) => {
    setTheme({
      ...theme,
      mode,
    })
  }

  const setGenericFontFamily = (
    fontFamily: ThemeState['genericFontFamily'],
  ) => {
    setTheme({
      ...theme,
      genericFontFamily: fontFamily,
    })
  }

  const toggleMode = () => {
    setTheme({
      ...theme,
      mode: theme.mode === 'dark' ? 'light' : 'dark',
    })
  }

  return {
    ...theme,
    setMode,
    setGenericFontFamily,
    toggleMode,
  }
}

export const useIsDarkTheme = () => {
  const theme = useThemeState()
  return theme.mode === 'dark'
}

export default useThemeState
