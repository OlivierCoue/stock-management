import React from 'react'
import { connect } from 'react-redux'
import { VariantType, withSnackbar, WithSnackbarProps } from 'notistack'

import { TRootState } from '../store'
import { INotification } from '../store/modules/notification'

interface IProps {
  notifications?: INotification[]
}

type TProps = ReturnType<typeof mapStateToProps> & WithSnackbarProps & IProps

interface IState {
  displayedNotifications: INotification[]
}

class Notification extends React.Component<TProps, IState> {
  state = {
    displayedNotifications: [] as INotification[],
  }

  componentDidUpdate(prevProps: Readonly<TProps>) {
    const { notifications } = this.props
    const { displayedNotifications } = this.state

    if (prevProps.notifications !== notifications) {
      for (const notification of notifications) {
        if (!displayedNotifications.includes(notification)) {
          this.showSnackbar(notification.message, notification.variant)
          displayedNotifications.push(notification)

          this.setState({ displayedNotifications: displayedNotifications.slice() })
        }
      }
    }
  }

  showSnackbar = (message: string, variant: VariantType) => {
    const { enqueueSnackbar } = this.props

    enqueueSnackbar(message, { variant })
  }

  render() {
    return null
  }
}

function mapStateToProps({ notification }: TRootState) {
  return { notifications: notification.notifications }
}

export default withSnackbar(connect(mapStateToProps)(Notification))
