import { useEffect, useState } from 'react';
import { Col, Container, Pagination, Row, Spinner } from 'react-bootstrap';
import ItemList from '../ItemList/ItemList';
import { getProducts } from '../../../services/productCatalog';
import { useSearch } from '../../../context/SearchContext';

const ItemListContainer = ({ Message, soloDestacados = false }) => {
  const [result, setResult] = useState({ products: [], error: null, loaded: false });
  const { searchTerm, setSearchTerm } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

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

  const products = soloDestacados
    ? result.products.filter((product) => product.destacado)
    : result.products;
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
  const filteredProducts = products.filter((product) =>
    (product.name ?? '').toLocaleLowerCase().includes(normalizedSearch)
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, soloDestacados]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (!result.loaded) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '50vh' }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }
  if (result.error) return <p role="alert">{result.error}</p>;

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
        <ItemList products={paginatedProducts} />
      </section>
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-3">
          <Pagination.First
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            aria-label="Ir a la primera página"
          />
          <Pagination.Prev
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Ir a la página anterior"
          />
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => setCurrentPage(pageNumber)}
                aria-label={`Ir a la página ${pageNumber}`}
                aria-current={pageNumber === currentPage ? 'page' : undefined}
              >
                {pageNumber}
              </Pagination.Item>
            );
          })}
          <Pagination.Next
            onClick={() =>
              setCurrentPage((page) => Math.min(page + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            aria-label="Ir a la página siguiente"
          />
          <Pagination.Last
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Ir a la última página"
          />
        </Pagination>
      )}
    </Container>
    
  );
};

export default ItemListContainer;