import { useEffect, useState } from 'react';
import styles from './Carousel.module.css';

// La ultima slide repite la primera para que el loop sea continuo.
const SLIDES = [
  { src: '/img/homeimg1.png', alt: 'Tus mangas al mejor precio' },
  { src: '/img/homeimg2.png', alt: 'Promo señalador' },
  { src: '/img/homeimg3.png', alt: 'Redes Sociales' },
  { src: '/img/homeimg1.png', alt: 'Tus mangas al mejor precio' },
];

const Carousel = ({ intervalo = 6000 }) => {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndice((i) => (i + 1) % SLIDES.length);
    }, intervalo);
    return () => clearInterval(timer);
  }, [intervalo]);

  return (
    <div className={styles.carousel}>
      <div
        className={styles.track}
        style={{
          transform: `translateX(-${indice * 25}%)`,
          transition: indice === 0 ? 'none' : 'transform 0.8s ease-in-out',
        }}
      >
        {SLIDES.map((slide, i) => (
          <div className={styles.slide} key={i}>
            <img src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
