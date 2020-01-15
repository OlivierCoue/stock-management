import React from 'react'
import DehazeIcon from '@material-ui/icons/Dehaze'
import { Menu, Button, MenuItem } from '@material-ui/core'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { rootAction, TRootState } from '../store'

interface IProps {}

type TProps = ReturnType<typeof mapStateToProps> & typeof rootAction & IProps

interface IState {
  openMenu: Boolean | false
}

class MenuFile extends React.Component<TProps, IState> {
  constructor(props: TProps) {
    super(props)
    // eslint-disable-next-line react/state-in-constructor
    this.state = { openMenu: false }
  }

  toggleMenu = () => {
    const { openMenu } = this.state
    this.setState({
      openMenu: !openMenu,
    })
  }

  onLogoutClicked = () => {
    const { authLogoutRequest } = this.props
    authLogoutRequest()
  }

  render() {
    const { openMenu } = this.state

    return (
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.toggleMenu}>
          <MenuIcon />
        </Button>
        <Menu
          keepMounted
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          getContentAnchorEl={null}
          id="simple-menu"
          onClose={this.toggleMenu}
          open={Boolean(openMenu)}
        >
          <div>
            <MenuItem onClick={this.onLogoutClicked}>Logout</MenuItem>
          </div>
        </Menu>
      </div>
    )
  }
}

const MenuIcon = styled(DehazeIcon)`
  color: white;
`

function mapStateToProps({ user }: TRootState) {
  return { currentUser: user.current }
}

export default connect(
  mapStateToProps,
  rootAction
)(MenuFile)
