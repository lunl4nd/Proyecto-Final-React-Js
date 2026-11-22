import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch('/productos.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('No se pudo cargar la información');
      }
      return response.json();
    })
    .then((data) => {
      setProduct(data.filter((prod) => prod.id === id));
    })
    .catch((error) => {
      setError(error.message);
    })
    .finally(() => {
      setLoading(false);
    });
}, [id]);


  if (loading) return <h2>Cargando detalle...</h2>;
  if (error) return <h2>Error: {error} </h2>;

  return (
    <div className="detail">
      <div>
        <strong> {id}</strong>
      </div>
      <h1>Detalle del producto</h1>
      <ul>
         {product.map((product)=>(
        <li key= {product.id}>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name}/>
          <p>Precio: ${product.price}</p>
        </li>
        
        ))}
      </ul>
    </div>

  )
};

export default ItemDetailContainer;