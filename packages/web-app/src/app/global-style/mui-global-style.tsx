import React from 'react'
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

interface IProps {}

type TProps = WithStyles<typeof styles> & IProps

function MuiGlobalStyle(props: TProps) {
  return <CssBaseline />
}

function styles(theme: Theme) {
  return {
    '@global': {
      h1: theme.typography.h1,
      h2: theme.typography.h2,
      h3: theme.typography.h3,
      h4: theme.typography.h4,
      h5: theme.typography.h5,
      h6: {
        ...theme.typography.h6,
        '&.subtitle1': theme.typography.subtitle1,
        '&.subtitle2': theme.typography.subtitle2,
        '&.body1': theme.typography.body1,
      },
      'div.body2': theme.typography.body2,
      p: theme.typography.body2,
      button: theme.typography.button,
      figcaption: theme.typography.caption,
      a: {
        color: theme.palette.secondary.main,
        textDecoration: 'none',
        '&:hover': { color: theme.palette.secondary.light },
      },
    },
  }
}

export default withStyles(styles)(MuiGlobalStyle)
