import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        La Luna de Papel
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/carrito">Carrito</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;