import PersonCard from '../PersonCard/PersonCard';
import styles from './Footer.module.css';

const team = [
  {
    name: 'Lun de Santos Herrero',
    role: 'CEO & Fundadora',
    email: 'lun@lalunadepapel.com',
    image: '/img/Lun_Icon.jpeg',
  },
  {
    name: 'Crazy Lizard',
    role: 'CTO',
    email: 'CL@lalunadepapel.com',
    image: '/img/Cande_Icon.jpeg',
  },
  {
    name: 'La Planta',
    role: 'Encargada de Envíos',
    email: 'LaPlanta@lalunadepapel.com',
    image: '/img/Vere_Icon.jpeg',
  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.team}>
        <h4>Nuestro equipo</h4>
        <div className={styles.cards}>
          {team.map((person) => (
            <PersonCard key={person.name} person={person} />
          ))}
        </div>
      </section>
      <section className={styles.info}>
        <div>
          <h4>La Luna de Papel S.A</h4>
          <p>Mis amigas accedieron a aparecer sólo si ponía esos nombres e imágenes...</p>
          <p>©2026 - Todos los derechos reservados.</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;