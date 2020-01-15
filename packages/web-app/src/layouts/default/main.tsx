import React from 'react'
import styled from 'styled-components'

interface IProps {
  children: React.ReactNode
}

function Main(props: IProps) {
  const { children } = props

  return <MainContainer {...props}>{children}</MainContainer>
}

const MainContainer = styled.main`
  /* Some style */
  margin: auto;
  width: 1200px;
`

export default Main
