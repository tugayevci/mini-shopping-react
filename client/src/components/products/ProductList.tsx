import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import ProductCard from './ProductCard'
import Product from '../../types/Product'

interface IProps {
  products: Product[]
}

interface StateProps {
  products: Product[]
}

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
  containerStyle: {
    marginTop: 5,
  },
}))

const ProductList = ({ products }: IProps) => {
  const classes = useStyles()
  return (
    <Grid container spacing={4} className={classes.containerStyle}>
      {products.map((item: Product, i: number) => (
        <Grid key={i} item xs={12} sm={4}>
          <ProductCard product={item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductList
