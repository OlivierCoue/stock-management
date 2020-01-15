import React, { Suspense } from 'react'
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom'
import { lazyWithPreload as lazyWP } from '@mysg/react-common'
import { PermissionNames, User } from '@stock-management/api-client/lib'
import { connect } from 'react-redux'

import { rootAction, TRootAction, TRootState } from '../store'
import Loading from '../pages/loading'
import NotFound from '../pages/error/not-found'

import { generateRoutePath, RoutePath } from './router-config'

enum RouteType {
  AUTH = 'auth', // Requires to not be authenticated
  CUSTOM = 'custom', // Relies on 'custom' (canActivate() & redirectTo) RouteParams
  PUBLIC = 'public', // Always available
  PRIVATE = 'private', // Requires to be authenticated, access can be restricted using permissions
}

interface IRouteParams {
  access?: PermissionNames[]
  Component: RouteProps['component']
  custom?: {
    canActivate: (currentUser?: User | null) => boolean
    redirectTo: RoutePath
  }
  path: RoutePath
  type: RouteType
}

interface IRedirectParams {
  from: RoutePath
  to: RoutePath
}

interface IProps {}

type TProps = ReturnType<typeof mapStateToProps> & TRootAction & IProps

class Router extends React.Component<TProps> {
  componentDidMount(): void {
    const { userReconnectRequest } = this.props
    userReconnectRequest()
  }

  renderRoute = (route: IRouteParams) => {
    const { currentUser } = this.props
    const { Component, type, path } = route

    switch (type) {
      case RouteType.AUTH: {
        if (currentUser) {
          return (
            <Redirect
              exact
              from={path}
              key={`${path}->${RoutePath.STORE_LIST}`}
              to={generateRoutePath(RoutePath.STORE_LIST, {})}
            />
          )
        }

        return <Route exact component={Component} key={path} path={path} />
      }
      case RouteType.PUBLIC: {
        return <Route exact component={Component} key={path} path={path} />
      }
      case RouteType.PRIVATE: {
        if (currentUser) {
          return <Route exact component={Component} key={path} path={path} />
        }

        return (
          <Redirect
            exact
            from={path}
            key={`${path}->${RoutePath.AUTH_LOGIN}`}
            to={generateRoutePath(RoutePath.AUTH_LOGIN, {})}
          />
        )
      }
      case RouteType.CUSTOM: {
        const { custom } = route
        if (typeof custom !== 'object') throw new Error('custom must be an object')

        const { canActivate, redirectTo } = custom
        if (typeof canActivate !== 'function') throw new Error('canActivate must be a function')
        if (typeof redirectTo !== 'string') throw new Error('redirectTo must be a string')

        return canActivate(currentUser) ? (
          <Route exact component={Component} key={path} path={path} />
        ) : (
          <Redirect exact from={path} key={`${path}->${redirectTo}`} to={generateRoutePath(redirectTo, {})} />
        )
      }
      default: {
        throw new Error('Unknown RouteType')
      }
    }
  }

  renderRedirect = (redirect: IRedirectParams) => {
    const { from, to } = redirect

    return <Redirect exact from={generateRoutePath(from, {})} key={`${from}->${to}`} to={generateRoutePath(to, {})} />
  }

  render() {
    const { serverAvailable } = this.props

    if (!serverAvailable) return null

    return (
      <Suspense fallback={Loading()}>
        <BrowserRouter>
          <Switch>
            {routes.map((route) => this.renderRoute(route))}
            {redirects.map((redirect) => this.renderRedirect(redirect))}
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    )
  }
}

const routes: IRouteParams[] = [
  /**
   * Root
   */
  {
    Component: lazyWP(() => import('../pages/store-list')),
    path: RoutePath.STORE_LIST,
    type: RouteType.PRIVATE,
  },
  {
    Component: lazyWP(() => import('../pages/store-details')),
    path: RoutePath.STORE_DETAILS,
    type: RouteType.PRIVATE,
  },
  {
    Component: lazyWP(() => import('../pages/login')),
    path: RoutePath.AUTH_LOGIN,
    type: RouteType.AUTH,
  },
]

const redirects: IRedirectParams[] = []

function mapStateToProps({ user }: TRootState) {
  return { currentUser: user.current, serverAvailable: user.serverAvailable }
}

export default connect(
  mapStateToProps,
  rootAction
)(Router)
