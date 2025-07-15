import { DefaultLayout } from '@/layouts/DefaultLayout'
import '@acid-info/lsd-react/css'
import { generateLsdVars } from '@acid-info/lsd-react/theme'
import { css, Global } from '@emotion/react'
import { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactNode, useEffect } from 'react'

type NextLayoutComponentType<P = {}> = NextComponentType<
  NextPageContext,
  any,
  P
> & {
  getLayout?: (page: ReactNode) => ReactNode
}

type AppLayoutProps<P = {}> = AppProps & {
  Component: NextLayoutComponentType
}

export default function App({ Component, pageProps }: AppLayoutProps) {
  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>)

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        const themeData = JSON.parse(savedTheme)
        if (themeData.mode) {
          document.documentElement.setAttribute('data-theme', themeData.mode)
        }
      }
    } catch (error) {
      console.error('Failed to load theme from localStorage:', error)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Logos NextJS Starter</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <style
          id="lsd-theme-styles"
          dangerouslySetInnerHTML={{ __html: generateLsdVars() }}
        />
        {/* Prevent theme flash by setting theme before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  if (savedTheme) {
                    var themeData = JSON.parse(savedTheme);
                    if (themeData.mode) {
                      document.documentElement.setAttribute('data-theme', themeData.mode);
                    }
                  }
                } catch (e) {
                  console.error('Failed to load theme from localStorage:', e);
                }
              })();
            `,
          }}
        />
      </Head>
      <Global
        styles={css`
          html,
          body {
            background: rgb(var(--lsd-surface-primary));
            color: rgb(var(--lsd-text-primary));
            margin: 0;
            width: 100%;
            height: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-family: serif;
          }

          #__next {
            margin-left: auto;
            margin-right: auto;
          }

          a,
          a:visited,
          a:hover,
          a:active,
          a:focus {
            color: rgb(var(--lsd-text-primary));
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p {
            margin: 0;
            padding: 0;
            word-break: keep-all;
          }

          [data-theme='light'] {
            .light-mode-hidden {
              display: none !important;
            }
          }

          [data-theme='dark'] {
            .dark-mode-hidden {
              display: none !important;
            }
          }
        `}
      />
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}
