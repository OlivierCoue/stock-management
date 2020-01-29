/* eslint-disable react/jsx-no-bind,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { connect } from 'react-redux'
import { StoreService, Fragment_Store_AllFieldsFragment, Aisle } from '@stock-management/api-client/lib'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

import Layout from '../layouts/default'
import { rootAction, TRootState } from '../store'
import { generateRoutePath, RoutePath } from '../app/router-config'

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

  onStockCountChange = async (stockUuid: string, add: boolean) => {
    const { selectedAisle } = this.state
    const stock =
      selectedAisle &&
      selectedAisle.stocks &&
      selectedAisle.stocks.find((stockEl) => stockEl && stockEl.uuid === stockUuid)
    if (!stock) return
    if (add) stock.count++
    else if (stock.count > 0) stock.count--
    await StoreService.stockUpdateOne({ uuid: stock.uuid, count: stock.count })
    this.setState({ selectedAisle })
  }

  onBuyClicked = (stockUuid: string) => {
    const { history } = this.props
    history.push(generateRoutePath(RoutePath.PURCHASE, { stockUuid }))
  }

  render() {
    const { store, selectedAisle } = this.state

    return (
      <Layout>
        {store && (
          <div>
            <h5>Détails du magasin : {store.name}</h5>
            <AisleListDetailsContainer>
              <AislesColumnContainer>
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
              </AislesColumnContainer>
              {!selectedAisle && (
                <ProductsColumnContainer>
                  <h6>Sélectionné un rayon pour voir le détail</h6>
                </ProductsColumnContainer>
              )}
              {selectedAisle && (
                <ProductsColumnContainer>
                  <ProductsColumnContainer>
                    <h6>Détails du rayon : {selectedAisle.name}</h6>
                    <ul>
                      {selectedAisle.stocks &&
                        selectedAisle.stocks.map(
                          (stock) =>
                            stock && (
                              <ProductListElement key={stock.uuid}>
                                <p>
                                  produit: <b>{stock.product && stock.product.name}</b> count: <b>{stock.count}</b>
                                </p>
                                <div>
                                  <Button
                                    color="primary"
                                    onClick={() => this.onStockCountChange(stock.uuid, true)}
                                    variant="contained"
                                  >
                                    +
                                  </Button>
                                  <Button
                                    color="secondary"
                                    disabled={stock.count === 0}
                                    onClick={() => this.onStockCountChange(stock.uuid, false)}
                                    variant="contained"
                                  >
                                    -
                                  </Button>
                                  <Button
                                    color="secondary"
                                    disabled={stock.count === 0}
                                    onClick={() => this.onBuyClicked(stock.uuid)}
                                    variant="contained"
                                  >
                                    Buy
                                  </Button>
                                </div>
                              </ProductListElement>
                            )
                        )}
                    </ul>
                  </ProductsColumnContainer>
                </ProductsColumnContainer>
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

const AislesColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`

const ProductsColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`

const AisleListElement = styled.li<{ selected: boolean }>`
  :hover {
    cursor: pointer;
    background-color: ${({ selected }) => (selected ? '#b50000' : '#dedede')};
  }
  ${({ selected }) => selected && 'background-color: red;'}
`

const ProductListElement = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: row;
    justify-content: right;
    > button {
      margin-left: 4px;
      width: 20px;
      height: 40px;
    }
  }
`

function mapStateToProps({ i18n }: TRootState) {
  return { language: i18n.language }
}

export default connect(
  mapStateToProps,
  rootAction
)(StoreDetails)
