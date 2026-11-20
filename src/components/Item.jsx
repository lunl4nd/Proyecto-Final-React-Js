import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Item.module.css';

export default function Item ({ product }){
  const { id, name, price, stock, image } = product;
  const {addToCart, getCurrentQuantity}= useCart();
  const currentQuantity= getCurrentQuantity(product.id);
  const handleAddToCart = () => {
    addToCart(product, 1);
    alert(`Agregaste 1 de ${name} al carrito`);
  };
  return (
    <article className={styles.card}>
      <Link to={`/product/${id}`} className={styles.button}>
        <img src={image} alt={name} className={styles.image} />
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>${price}</p>
        <p> Stock Disponible: {stock}</p>
      </Link>
      <Link to={`/product/${id}`}>Ver Detalle </Link>
      <button onClick={handleAddToCart}>Añadir al carrito</button>
      {currentQuantity > 0 && <p>En el carrito: {currentQuantity}</p>}
    </article>
  )
}
