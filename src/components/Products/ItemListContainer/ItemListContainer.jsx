import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ItemList from '../ItemList/ItemList';
import { getProducts } from '../../../services/productCatalog';
import { useSearch } from '../../../context/SearchContext';

const ItemListContainer = ({ Message, soloDestacados = false }) => {
  const [result, setResult] = useState({ products: [], error: null, loaded: false });
  const { searchTerm, setSearchTerm } = useSearch();

  useEffect(() => {
    let active = true;

    getProducts()
      .then((data) => {
        if (active) {
          setResult({ products: data, error: null, loaded: true });
        }
      })
      .catch((loadError) => {
        console.error('Error al cargar productos:', loadError);
        if (active) {
          setResult({
            products: [],
            error: 'No se pudieron cargar los productos.',
            loaded: true
          });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (!result.loaded) return <h2>Cargando productos...</h2>;
  if (result.error) return <p role="alert">{result.error}</p>;

  const products = soloDestacados
    ? result.products.filter((product) => product.destacado)
    : result.products;
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
  const filteredProducts = products.filter((product) =>
    (product.name ?? '').toLocaleLowerCase().includes(normalizedSearch)
  );

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <input
            id="product-search"
            type="text"
            className="form-control"
            aria-label="Buscar productos"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
      <section>
      {Message && <h2>{Message}</h2>}
      <ItemList products={filteredProducts} />
    </section>
    </Container>
    
  );
};

export default ItemListContainer;