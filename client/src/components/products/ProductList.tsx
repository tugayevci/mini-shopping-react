import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import ProductCard from './ProductCard'

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
  containerStyle: {
    marginTop: 5,
  },
}))

const ProductList = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={4} className={classes.containerStyle}>
      <Grid item xs={12} sm={4}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ProductCard />
      </Grid>
    </Grid>
  )
}

export default ProductList
