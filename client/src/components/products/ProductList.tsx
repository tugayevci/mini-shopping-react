import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'
import ProductCard from './ProductCard'
import Product from '../../types/Product'

interface IProps {
  products: Product[]
}

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
    top: '50%',
  },
  containerStyle: {
    marginTop: 5,
  },
}))

const ProductList = ({ products }: IProps) => {
  const classes = useStyles()
  return (
    <Grid container spacing={4} className={classes.containerStyle}>
      {products.length === 0 ? (
        <Grid item container xs={12} direction='column'>
          <Grid item xs={false} sm={4}></Grid>
          <Grid item xs={12} sm={12}>
            <Typography component='h4' variant='h4' className={classes.typographyStyles}>
              We could not find a product that matches your criteria{' '}
              <span role='img' aria-label='sad'>
                😞
              </span>
            </Typography>
          </Grid>
        </Grid>
      ) : (
        products.map((item: Product, i: number) => (
          <Grid key={i} item xs={12} sm={4}>
            <ProductCard product={item} />
          </Grid>
        ))
      )}
    </Grid>
  )
}

export default ProductList
