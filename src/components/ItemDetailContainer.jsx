import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/productos.json')
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.find((p) => String(p.id) === String(id));
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener el producto:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Cargando detalle...</h2>;
  if (!product) return <h2>Producto no encontrado</h2>;

  return (
    <article className={styles.detail}>
      <img src={product.image} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
        <button>Agregar al carrito</button>
      </div>
    </article>
  );
};

export default ItemDetailContainer;