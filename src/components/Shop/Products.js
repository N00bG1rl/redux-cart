import ProductItem from './ProductItem'
import classes from './Products.module.css'

const DUMMY_DATA = [
  {
    id: 'p1',
    price: 5,
    title: 'Product 1',
    description: 'Best product',
  },
  {
    id: 'p2',
    price: 3,
    title: 'Product 2',
    description: 'Second best product',
  },
]

const Products = props => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_DATA.map(product => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  )
}

export default Products
