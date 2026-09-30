import { useEffect, useState } from 'react';
import ItemList from './ItemList';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/productos.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar productos:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Cargando productos...</h2>;

  return (
    <section>
      <ItemList products={products} />
    </section>
  );
};

export default ItemListContainer;