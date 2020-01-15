import React from 'react'
import { connect } from 'react-redux'
import { Fragment_User_FieldsFragment, UserService } from '@stock-management/api-client/lib'

import Layout from '../layouts/default'
import { rootAction, TRootState } from '../store'

interface IProps {}

type TProps = ReturnType<typeof mapStateToProps> & typeof rootAction & IProps

interface IState {
  users: Fragment_User_FieldsFragment[]
}

export class UserList extends React.Component<TProps, IState> {
  constructor(props: TProps) {
    super(props)
    // eslint-disable-next-line react/state-in-constructor
    this.state = { users: [] }
  }

  componentDidMount(): void {
    this.loadUsers()
  }

  loadUsers = async () => {
    const loadedUsers = await UserService.findMany({
      take: 100,
      skip: 0,
    })
    this.setState({ users: loadedUsers })
  }

  render() {
    const { users } = this.state

    return (
      <Layout>
        <h6>Liste des utilisateurs</h6>
        <ul>
          {users.map((user) => (
            <li key={user.uuid}>
              <p>
                {user.firstName}, {user.lastName}, {user.email}
              </p>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

function mapStateToProps({ i18n }: TRootState) {
  return { language: i18n.language }
}

export default connect(
  mapStateToProps,
  rootAction
)(UserList)
