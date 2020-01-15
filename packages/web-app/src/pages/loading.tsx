import React from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'

import Layout from '../layouts/default'

function Loading() {
  return (
    <Layout>
      <Container>
        <CircularProgress color="secondary" size={50} />
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
`

export default Loading
