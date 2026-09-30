import styles from './PersonCard.module.css';

const PersonCard = ({ person }) => {
  const { name, role, email, image } = person;

  return (
    <article className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <h5 className={styles.name}>{name}</h5>
      <p className={styles.role}>{role}</p>
      <a href={`mailto:${email}`} className={styles.email}>
        {email}
      </a>
    </article>
  );
};

export default PersonCard;