import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import styles from './Header.module.css';

const Header = () => {
  const {getCartQuantity} = useCart();
  const {user, logout} = useAuth();
  const totalItems= getCartQuantity();
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        La Luna de Papel
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/products">Productos</Link></li>
          <li><Link to="/destacados">Destacados</Link></li>
          <li><Link to="/carrito"> Carrito {totalItems > 0 && <span>{totalItems}</span>}</Link></li>
          {user ? (
            <>
              {user.rol === 'admin' && (
                <li><Link to="/gestion">Gestión</Link></li>
              )}
              <li><span>Bienvenido, {user.email}</span></li>
              <li><button onClick={logout}>Cerrar sesión</button></li>
            </>
          ) : (
            <li><Link to="/login">Iniciar sesión</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;