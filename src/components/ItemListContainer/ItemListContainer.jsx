import { useEffect, useState } from 'react';
import ItemList from '../ItemList/ItemList';

const ItemListContainer = ({ Message, soloDestacados = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/productos.json')
      .then((res) => res.json())
      .then((data) => {
        const lista = soloDestacados ? data.filter((p) => p.destacado) : data;
        setProducts(lista);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar productos:', err);
        setLoading(false);
      });
  }, [soloDestacados]);

  if (loading) return <h2>Cargando productos...</h2>;

  return (
    <section>
      {Message && <h2>{Message}</h2>}
      <ItemList products={products} />
    </section>
  );
};

export default ItemListContainer;