import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

import { AppState } from '../../redux/reducers/rootReducer'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 100,
    color: '#fff',
  },
}))

const BackdropCustom = () => {
  const classes = useStyles()

  const open = useSelector((state: AppState) => state.backdrop.open)

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default BackdropCustom
