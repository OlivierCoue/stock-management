import React from 'react'
import { connect } from 'react-redux'
import { StoreService, Fragment_Store_FieldsFragment } from '@stock-management/api-client/lib'
import { Link } from 'react-router-dom'

import Layout from '../layouts/default'
import { rootAction, TRootState } from '../store'
import { generateRoutePath, RoutePath } from '../app/router-config'

interface IProps {}

type TProps = ReturnType<typeof mapStateToProps> & typeof rootAction & IProps

interface IState {
  stores: Fragment_Store_FieldsFragment[]
}

export class Home extends React.Component<TProps, IState> {
  constructor(props: TProps) {
    super(props)
    // eslint-disable-next-line react/state-in-constructor
    this.state = { stores: [] }
  }

  componentDidMount(): void {
    this.loadStores()
  }

  loadStores = async () => {
    const loadedStores = await StoreService.findMany({
      take: 100,
      skip: 0,
    })
    // @ts-ignore
    this.setState({ stores: loadedStores })
  }

  render() {
    const { stores } = this.state

    return (
      <Layout>
        <ul>
          {stores.map((store) => (
            <li key={store.uuid}>
              <Link to={generateRoutePath(RoutePath.WORD_CARD_DETAILS, { wordCardUuid: store.uuid })}>
                {store.name}
              </Link>
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
)(Home)
