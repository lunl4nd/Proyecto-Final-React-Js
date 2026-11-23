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
      <Link to="/" className={styles.logo} aria-label="Ir a la página de inicio">
        La Luna de Papel
      </Link>
      <nav className={styles.nav}>
        <ul>
          {user && (
            <li className={styles.welcome}>
              Bienvenido, {user.email}
            </li>
          )}
          <li><Link to="/" aria-label="Ir a inicio">Inicio</Link></li>
          <li><Link to="/products" aria-label="Ver productos">Productos</Link></li>
          <li><Link to="/destacados" aria-label="Ver productos destacados">Destacados</Link></li>
          <li>
            <Link to="/carrito" aria-label={`Ir al carrito, ${totalItems} productos`}>
              Carrito {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          </li>
          {user ? (
            <>
              {user.rol === 'admin' && (
                <li><Link to="/gestion" aria-label="Ir a gestión de productos">Gestión</Link></li>
              )}
              <li>
                <button
                  type="button"
                  className={styles.linkButton}
                  onClick={logout}
                  aria-label="Cerrar sesión"
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <li className={styles.authLink}>
              <Link to="/login" aria-label="Iniciar sesión">Iniciar sesión</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;