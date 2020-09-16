import React, { useState } from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import Paper from '@material-ui/core/Paper'

import { AppState } from '../../redux/reducers/rootReducer'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
  shoppingCart: {
    color: 'white',
  },
  shoppingCartArea: {
    width: 285,
    height: 100,
    position: 'absolute',
    top: '101%',
    right: '1%',
    zIndex: 99,
  },
  productImage: {
    width: 151,
  },
  root: {
    display: 'flex',
  },
  content: {
    flex: '1 0 auto',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  cartEmptyText: {
    margin: '12%',
  },
}))

const CartArea = () => {
  const classes = useStyles()
  const cart = useSelector((state: AppState) => state.cart.cart)
  const [showCart, setShowCart] = useState(false)

  return (
    <>
      <IconButton aria-label='cart' onClick={() => setShowCart((state: boolean) => !state)}>
        <Badge badgeContent={cart.cartItems.length} color='secondary'>
          <ShoppingCartIcon className={classes.shoppingCart} />
        </Badge>
      </IconButton>
      {showCart && (
        <Paper elevation={3} className={classes.shoppingCartArea}>
          {cart.cartItems.length === 0 && (
            <Typography className={classes.cartEmptyText} component='h5' variant='h5'>
              Your cart is empty
            </Typography>
          )}

          {cart.cartItems.map((cartItem, i) => {
            const cartItemPrice = cartItem.product.price * cartItem.count

            return (
              <Card key={i} className={classes.root}>
                <CardMedia className={classes.productImage} image={cartItem.product.imageUrl} title={cartItem.product.name} />
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component='h5' variant='h5'>
                      {cartItem.count}
                      {' x '}
                      {cartItem.product.name}
                    </Typography>
                    <Typography component='h6' variant='h6'>
                      {cartItemPrice.toFixed(2)}
                      {' ₺'}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            )
          })}

          {cart.cartItems.length > 0 && (
            <Card className={classes.root}>
              <Typography component='h5' variant='h5'>
                Total:{' '}
                {cart.cartItems
                  .map((cartItem) => cartItem.product.price * cartItem.count)
                  .reduce((a, r) => a + r)
                  .toFixed(2)}{' '}
                ₺
              </Typography>
            </Card>
          )}
        </Paper>
      )}
    </>
  )
}

export default CartArea
