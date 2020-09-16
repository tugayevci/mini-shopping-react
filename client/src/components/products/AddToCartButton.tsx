import React, { Dispatch } from 'react'
import Button from '@material-ui/core/Button'
import Product from '../../types/Product'

import { setCart, CartActions } from '../../redux/actions/cartActions'
import { setBackdropStatus, BackdropStatusActions } from '../../redux/actions/backdropActions'
import { AppState } from '../../redux/reducers/rootReducer'
import { useDispatch, useSelector } from 'react-redux'

interface IProps {
  product: Product
}

const AddToCartButton = ({ product }: IProps) => {
  const cart = useSelector((state: AppState) => state.cart.cart)
  const cartDispatch = useDispatch<Dispatch<CartActions>>()
  const backdropDispatch = useDispatch<Dispatch<BackdropStatusActions>>()

  const addToCartHandler = async (product: Product) => {
    backdropDispatch(setBackdropStatus(true)) //Backdrop true
    const isExist = cart.cartItems.find((cartItem) => cartItem.product === product) //Daha önce sepette var mı?

    if (isExist) {
      const index = cart.cartItems.findIndex((cartItem) => cartItem.product === product)
      let tempCartItems = cart.cartItems
      tempCartItems[index] = { product, count: tempCartItems[index].count + 1 } //Varsa count 1 arttır

      cartDispatch(await setCart({ ...cart, cartItems: [...tempCartItems] }))
    } else {
      cartDispatch(await setCart({ ...cart, cartItems: [...cart.cartItems, { product, count: 1 }] }))
    }
    backdropDispatch(setBackdropStatus(false)) //Backdrop false
  }

  return (
    <Button variant='contained' color='primary' onClick={() => addToCartHandler(product)}>
      Add to Cart
    </Button>
  )
}
export default AddToCartButton
