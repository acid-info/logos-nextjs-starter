import { breakpoints } from '@/configs/ui.configs'
import { Button } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import React from 'react'

export type HomePageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const HomeContainer: React.FC<HomePageProps> = ({
  children,
  ...props
}) => {
  return (
    <Container {...props}>
      <Button>Hello</Button>
    </Container>
  )
}

const Container = styled.div`
  @media (max-width: ${breakpoints.lg}px) {
    margin-inline: 10px;
  }
`
