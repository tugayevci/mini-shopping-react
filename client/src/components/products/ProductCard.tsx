import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import AddToCartButton from './AddToCartButton'
import Typography from '@material-ui/core/Typography'
import Product from '../../types/Product'

interface IProps {
  product: Product
}

const useStyles = makeStyles({
  media: {
    width: 200,
    height: 200,
    marginLeft: '15%',
  },
})

const ProductCard = ({ product }: IProps) => {
  const classes = useStyles()

  return (
    <Card>
      <CardActionArea>
        <CardMedia className={classes.media} image={product.imageUrl} title={product.name} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {product.name}
          </Typography>
          <Typography gutterBottom variant='h6' component='h6'>
            {`${product.price} ₺`}
          </Typography>
          <Typography gutterBottom variant='body1' component='p'>
            {product.filters?.map((filter) => `${filter.render}        `)}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {product.details}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <AddToCartButton product={product} />
      </CardActions>
    </Card>
  )
}
export default ProductCard
