import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ItemList = ({ products }) => {
  return (
    <Container className="py-3">
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                style={{ height: 220, objectFit: 'contain', padding: '0.75rem' }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Precio: ${product.price}</Card.Text>
                <Button
                  as={Link}
                  to={`/product/${product.id}`}
                  variant="primary"
                  className="mt-auto"
                >
                  Ver detalle
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemList;