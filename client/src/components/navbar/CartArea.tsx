import React, { Dispatch, useState } from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import Paper from '@material-ui/core/Paper'

import { AppState } from '../../redux/reducers/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete'
import CartItem from '../../types/CartItem'
import { CartActions, setCart } from '../../redux/actions/cartActions'

import { setBackdropStatus, BackdropStatusActions } from '../../redux/actions/backdropActions'

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
  deleteIcon: {
    marginTop: 50,
    marginRight: 10,
  },
}))

const CartArea = () => {
  const classes = useStyles()
  const cart = useSelector((state: AppState) => state.cart.cart)
  const [showCart, setShowCart] = useState(false)
  const cartDispatch = useDispatch<Dispatch<CartActions>>()
  const backdropDispatch = useDispatch<Dispatch<BackdropStatusActions>>()

  const deleteFromCart = async (id: number) => {
    backdropDispatch(setBackdropStatus(true)) //Backdrop true

    let temp = cart.cartItems
    temp = temp.filter((x) => x.id !== id)
    cartDispatch(await setCart({ cartItems: temp }))
    backdropDispatch(setBackdropStatus(false)) //Backdrop false
  }

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

          {cart.cartItems.map((cartItem: CartItem, i: number) => {
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
                <div>
                  <IconButton aria-label='delete-cart-item' onClick={() => deleteFromCart(cartItem.id)}>
                    <DeleteIcon className={classes.deleteIcon} />
                  </IconButton>
                </div>
              </Card>
            )
          })}

          {cart.cartItems.length > 0 && (
            <Card className={classes.root}>
              <Typography component='h5' variant='h5'>
                Total:{' '}
                {cart.cartItems
                  .map((cartItem: CartItem) => cartItem.product.price * cartItem.count)
                  .reduce((a: number, r: number) => a + r)
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
