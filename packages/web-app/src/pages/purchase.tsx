import React from 'react'
import { connect } from 'react-redux'
import { Fragment_Stock_FieldsFragment, StoreService } from '@stock-management/api-client/lib'
import { RouteComponentProps } from 'react-router'
// @ts-ignore
import { PaymentInputsContainer, PaymentInputsWrapper } from 'react-payment-inputs'
// @ts-ignore
import images from 'react-payment-inputs/images'

import Layout from '../layouts/default'
import { rootAction, TRootState } from '../store'

interface IProps {}

type TProps = ReturnType<typeof mapStateToProps> &
  typeof rootAction &
  IProps &
  RouteComponentProps<{ stockUuid: string }>

interface IState {
  stock: Fragment_Stock_FieldsFragment | null
  cardNumber: string
  expiryDate: string
  cvc: string
}

export class Purchase extends React.Component<TProps, IState> {
  constructor(props: TProps) {
    super(props)
    // eslint-disable-next-line react/state-in-constructor
    this.state = { stock: null, cvc: '', expiryDate: '', cardNumber: '' }
  }

  componentDidMount(): void {
    this.loadStock()
  }

  loadStock = async () => {
    const {
      match: {
        params: { stockUuid },
      },
    } = this.props
    const loadedStock = await StoreService.stockFindOne({
      where: { uuid: stockUuid },
    })
    this.setState({ stock: loadedStock })
  }

  handleCardNumberChange = (event: any) => {
    this.setState({ cardNumber: event.target.value })
  }

  handleExpiryDateChange = (event: any) => {
    this.setState({ expiryDate: event.target.value })
  }

  handleCvcChange = (event: any) => {
    this.setState({ cvc: event.target.value })
  }

  render() {
    const { stock, cardNumber, expiryDate, cvc } = this.state

    return (
      <Layout>
        <PaymentInputsContainer>
          {({
            meta,
            getCardNumberProps,
            getExpiryDateProps,
            getCVCProps,
            getCardImageProps,
          }: {
            meta: any
            getCardNumberProps: any
            getExpiryDateProps: any
            getCVCProps: any
            getCardImageProps: any
          }) => (
            <div>
              {stock && stock.product && (
                <div>
                  <h6>Acheter le produit : {stock.product.name}</h6>
                  <div>
                    disponible: {stock.count} prix: {stock.product.price}
                  </div>

                  <PaymentInputsWrapper>
                    <svg {...getCardImageProps({ images })} />
                    <input {...getCardNumberProps({ onChange: this.handleCardNumberChange })} value={cardNumber} />
                    <input {...getExpiryDateProps({ onChange: this.handleExpiryDateChange })} value={expiryDate} />
                    <input {...getCVCProps({ onChange: this.handleCvcChange })} value={cvc} />
                    {meta.isTouched && meta.error && <span>Error: {meta.error}</span>}
                  </PaymentInputsWrapper>

                  {!meta.error && (
                    <div>
                      <div>{cardNumber}</div>
                      <div>{expiryDate}</div>
                      <div>{cvc}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </PaymentInputsContainer>
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
)(Purchase)
