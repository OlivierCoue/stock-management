import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Grid } from '@material-ui/core'

import MenuFile from '../../components/menufile'
import { rootAction, TRootState } from '../../store'

interface IProps {}

type TProps = ReturnType<typeof mapStateToProps> & typeof rootAction & IProps

class Header extends React.Component<TProps> {
  render() {
    const { currentUser } = this.props

    return (
      <HeaderContainer>
        <AppBar position="static">
          <Toolbar>
            <Grid container spacing={1}>
              <Grid item sm={6} xs={12}>
                <MyParaAccueil>
                  <A href="/"> Accueil </A>
                </MyParaAccueil>
              </Grid>
              <Grid item sm={6} xs={12}>
                <DivHeaderRight>
                  <div>
                    {currentUser && <MyParaName>{`${currentUser.firstName} ${currentUser.lastName}`}</MyParaName>}
                  </div>
                  <p> {currentUser && <MenuFile />} </p>
                </DivHeaderRight>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </HeaderContainer>
    )
  }
}
const A = styled.a`
  color: aliceblue;
`
const HeaderContainer = styled.header`
  /* Some style */
`

const DivHeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  float: right;
`
const MyParaAccueil = styled.p`
  font-weight: bold;
  color: white;
  font-size: large;
`

const MyParaName = styled.p`
  color: white;
  font-size: large;
`
function mapStateToProps({ user }: TRootState) {
  return { currentUser: user.current }
}

export default connect(
  mapStateToProps,
  rootAction
)(Header)
