import React, { Dispatch } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Product from '../../types/Product'

import { getCart, setCart, CartActions } from '../../redux/actions/cartActions'
import { AppState } from '../../redux/reducers/rootReducer'
import { useDispatch, useSelector } from 'react-redux'

interface IProps {
  product: Product
}

const AddToCartButton = ({ product }: IProps) => {
  const cart = useSelector((state: AppState) => state.cart.cart)
  const cartDispatch = useDispatch<Dispatch<CartActions>>()

  const addToCartHandler = (product: Product) => {
    const isExist = cart.find((cartItem) => cartItem === product)
    console.log('is', isExist)

    if (isExist) {
    } else {
      cartDispatch(setCart([...cart, product]))
    }
  }
  console.log('cart', cart)

  return (
    <Button size='small' color='primary' onClick={() => addToCartHandler(product)}>
      Add to Cart
    </Button>
  )
}
export default AddToCartButton
