import Carousel from '../components/Carousel/Carousel';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';
import styles from './Home.module.css';

const Home = () => (
  <div className={styles.contenedor}>
    <h1 className={styles.titulo}>LA LUNA DE PAPEL</h1>

    <Carousel />

    <h2 className={styles.subtitulo}>PRODUCTOS DESTACADOS</h2>
    <ItemListContainer soloDestacados />
  </div>
);

export default Home;
