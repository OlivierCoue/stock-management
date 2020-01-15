import React, { ErrorInfo } from 'react'

import Generic from '../pages/error/generic'

interface IProps {
  children: React.ReactNode
}

interface IState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<IProps, IState> {
  state = { hasError: false }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== 'production') console.error('[React] @error =>', error)
    this.setState({ hasError: true })
  }

  render() {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) return <Generic />

    return children
  }
}

export default ErrorBoundary
