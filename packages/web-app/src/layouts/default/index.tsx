import React from 'react'
import styled from 'styled-components'

import Head from './head'
import Header from './header'
import Main from './main'
import Footer from './footer'

interface IProps {
  children: React.ReactNode
}

function Layout(props: IProps) {
  const { children } = props

  return (
    <Wrapper>
      <Head />
      <Header />
      <Main {...props}>{children}</Main>
      <Footer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  /* Some style */
`

export default Layout
