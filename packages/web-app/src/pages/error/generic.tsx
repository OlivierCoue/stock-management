import React from 'react'

import Layout from '../../layouts/default'

export function Generic() {
  return (
    <Layout>
      <h1>Something went wrong.</h1>
      {process.env.NODE_ENV !== 'production' && <p>Check the console for more information.</p>}
    </Layout>
  )
}

export default Generic
