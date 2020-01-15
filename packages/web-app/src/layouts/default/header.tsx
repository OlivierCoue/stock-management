import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { AppBar, Toolbar } from '@material-ui/core'

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
            <HeaderContainer>
              <div>
                <PageTitle href="/">Stock Management</PageTitle>
              </div>
              <NameMenuContainer>
                {currentUser && <MyParaName>{`${currentUser.firstName} ${currentUser.lastName}`}</MyParaName>}
                <div> {currentUser && <MenuFile />} </div>
              </NameMenuContainer>
            </HeaderContainer>
          </Toolbar>
        </AppBar>
      </HeaderContainer>
    )
  }
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const PageTitle = styled.a`
  color: white;
  font-size: large;
`

const NameMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
