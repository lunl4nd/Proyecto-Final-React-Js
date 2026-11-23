import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../services/productCatalog';
import { useCart } from '../../../context/CartContext';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [result, setResult] = useState({ id: null, product: null, error: null });

  useEffect(() => {
    let active = true;

    getProductById(id)
      .then((result) => {
        if (active) {
          setResult({ id, product: result, error: null });
        }
      })
      .catch((loadError) => {
        console.error('Error al cargar el detalle del producto:', loadError);
        if (active) {
          setResult({
            id,
            product: null,
            error: 'No se pudo cargar la información del producto.'
          });
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (result.id !== id) return <h2>Cargando detalle...</h2>;
  if (result.error) return <h2 role="alert">Error: {result.error}</h2>;
  const product = result.product;
  if (!product) return <h2>No se encontró el producto.</h2>;

  const handleAddToCart = () => {
    addToCart(product, 1);
    alert(`Agregaste 1 de ${product.name} al carrito`);
  };

  return (
    <>
      <Helmet>
        <title>La Luna de Papel | {product.name}</title>
        <meta name="description" content={`Detalles y precio de ${product.name}`} />
      </Helmet>
      <Container className="py-4">
        <Row className="align-items-center g-4">
          <Col xs={12} md={6}>
            <img
              src={product.image}
              alt={product.name}
              className="w-100"
              style={{ maxHeight: 420, objectFit: 'contain' }}
            />
          </Col>
          <Col xs={12} md={6}>
            <h1>{product.name}</h1>
            <p className="fs-2 fw-bold">Precio: ${product.price}</p>
            {product.stock !== undefined && <p>Stock disponible: {product.stock}</p>}
            <Button onClick={handleAddToCart}>Añadir al carrito</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ItemDetailContainer;