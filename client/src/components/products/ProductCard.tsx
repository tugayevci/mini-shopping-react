import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  media: {
    height: 300,
  },
})

const ProductCard = () => {
  const classes = useStyles()

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image='https://mudo.akinoncdn.com/products/2020/01/08/370203/34ff8b14-0eed-428d-9303-791a217568b9.jpg'
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Basic Tshirt
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Lightweight fabric with some stretch,Super comfy, breathable and lightweight fabric, lounge wear, great for gym workout, streetwear or
            school outfit
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  )
}
export default ProductCard
