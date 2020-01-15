import React from 'react'
import styled from 'styled-components'
import LinearProgress from '@material-ui/core/LinearProgress'
import { GraphQLClient } from '@stock-management/api-client/lib'

class NetworkStatusNotifier extends React.PureComponent {
  static renderNotifier(state: any) {
    const { loading } = state

    return (
      <>
        {loading && (
          <>
            <LoadingContainer>
              <LinearProgress color="secondary" />
            </LoadingContainer>
          </>
        )}
      </>
    )
  }

  render() {
    return <GraphQLClient.NetworkStatusNotifier render={NetworkStatusNotifier.renderNotifier} />
  }
}

const LoadingContainer = styled.div`
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1600;
`

export default NetworkStatusNotifier
