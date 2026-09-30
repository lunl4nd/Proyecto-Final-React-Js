import { Link } from 'react-router-dom';
import styles from './Item.module.css';

const Item = ({ product }) => {
  const { id, name, price, image } = product;

  return (
    <article className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.price}>${price}</p>
      <Link to={`/producto/${id}`} className={styles.button}>
        Ver Detalle
      </Link>
    </article>
  );
};

export default Item;