/* eslint-disable react/jsx-no-bind,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { connect } from 'react-redux'
import { StoreService, Fragment_Store_AllFieldsFragment, Aisle } from '@stock-management/api-client/lib'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'

import Layout from '../layouts/default'
import { rootAction, TRootState } from '../store'

interface IProps {}

type TProps = ReturnType<typeof mapStateToProps> &
  typeof rootAction &
  IProps &
  RouteComponentProps<{ storeUuid: string }>

interface IState {
  store: Fragment_Store_AllFieldsFragment | null
  selectedAisle: Aisle | null
}

export class StoreDetails extends React.Component<TProps, IState> {
  constructor(props: TProps) {
    super(props)
    // eslint-disable-next-line react/state-in-constructor
    this.state = { store: null, selectedAisle: null }
  }

  componentDidMount(): void {
    this.loadStore()
  }

  loadStore = async () => {
    const {
      match: {
        params: { storeUuid },
      },
    } = this.props
    const store = await StoreService.findOne({ where: { uuid: storeUuid } })
    this.setState({ store })
  }

  onAisleClicked = (aisle: Aisle) => {
    this.setState({ selectedAisle: aisle })
  }

  render() {
    const { store, selectedAisle } = this.state

    return (
      <Layout>
        {store && (
          <div>
            <h5>Détails du magasin : {store.name}</h5>
            <AisleListDetailsContainer>
              <ColumnContainer>
                <h6>Liste des rayons :</h6>
                <ul>
                  {store.aisles &&
                    store.aisles.map(
                      (aisle) =>
                        aisle && (
                          <AisleListElement
                            key={aisle.uuid}
                            onClick={() => this.onAisleClicked(aisle)}
                            selected={Boolean(selectedAisle && aisle.uuid === selectedAisle.uuid)}
                          >
                            <p>{aisle.name}</p>
                            <p>vendeur: {aisle.seller && `${aisle.seller.firstName} ${aisle.seller.lastName}`}</p>
                          </AisleListElement>
                        )
                    )}
                </ul>
              </ColumnContainer>
              {!selectedAisle && (
                <ColumnContainer>
                  <h6>Sélectionné un rayon pour voir le détail</h6>
                </ColumnContainer>
              )}
              {selectedAisle && (
                <ColumnContainer>
                  <ColumnContainer>
                    <h6>Détails du rayon : {selectedAisle.name}</h6>
                    <ul>
                      {selectedAisle.stocks &&
                        selectedAisle.stocks.map(
                          (stock) =>
                            stock &&
                            stock.count > 0 && (
                              <li key={stock.uuid}>
                                <p>
                                  produit: <b>{stock.product && stock.product.name}</b> count: <b>{stock.count}</b>
                                </p>
                              </li>
                            )
                        )}
                    </ul>
                  </ColumnContainer>
                </ColumnContainer>
              )}
            </AisleListDetailsContainer>
          </div>
        )}
      </Layout>
    )
  }
}

const AisleListDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`

const AisleListElement = styled.li<{ selected: boolean }>`
  :hover {
    cursor: pointer;
    background-color: ${({ selected }) => (selected ? '#b50000' : '#dedede')};
  }
  ${({ selected }) => selected && 'background-color: red;'}
`

function mapStateToProps({ i18n }: TRootState) {
  return { language: i18n.language }
}

export default connect(
  mapStateToProps,
  rootAction
)(StoreDetails)
