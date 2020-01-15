import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button, TextField } from '@material-ui/core'
import { AuthService } from '@stock-management/api-client/lib'
import { sleep } from '@mysg/helper/lib'
import { RouteComponentProps } from 'react-router-dom'

import Layout from '../layouts/default'
import { rootAction, TRootState } from '../store'

interface IProps {}

type TProps = ReturnType<typeof mapStateToProps> & typeof rootAction & IProps & RouteComponentProps

interface IState {
  email: string
  password: string
  loginFailed: boolean
  loginLoading: boolean
}

export class Login extends React.Component<TProps, IState> {
  state = { email: '', password: '', loginFailed: false, loginLoading: false }

  onEmailChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: currentTarget.value })
  }

  onPasswordChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: currentTarget.value })
  }

  onLoginSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { email, password } = this.state
    const { userReconnectRequest, history } = this.props

    this.setState({ loginFailed: false, loginLoading: true })
    try {
      await AuthService.login(email, password)
      await sleep(200)
      userReconnectRequest()
      history.push('/')
    } catch (err) {
      this.setState({ loginFailed: true, loginLoading: false })
    }
  }

  render() {
    const { email, password, loginFailed, loginLoading } = this.state

    return (
      <Layout>
        <Div>
          <form onSubmit={this.onLoginSubmit}>
            <Div>
              <TextField
                label="Email"
                margin="normal"
                name="email"
                onChange={this.onEmailChange}
                value={email}
                variant="outlined"
              />
              <TextField
                label="Mot de passe"
                margin="normal"
                name="password"
                onChange={this.onPasswordChange}
                type="password"
                value={password}
                variant="outlined"
              />
              <Button color="primary" type="submit" variant="contained">
                Se connecter
              </Button>
              {loginLoading && <div>Connexion en cours...</div>}
              {loginFailed && <div>Email ou mot de passe incorrect.</div>}
            </Div>
          </form>
        </Div>
      </Layout>
    )
  }
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 50%;
  justify-content: center;
`

function mapStateToProps({ i18n }: TRootState) {
  return { language: i18n.language }
}

export default connect(
  mapStateToProps,
  rootAction
)(Login)
