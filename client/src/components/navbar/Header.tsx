import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import CartArea from './CartArea'

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
}))

const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography className={classes.typographyStyles}>Shopping App</Typography>
        <CartArea />
      </Toolbar>
    </AppBar>
  )
}

export default Header
