// src/components/Pages/NotFoundPage.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <Container className="d-flex align-items-center justify-content-center text-center" style={{ minHeight: '100vh', backgroundColor: '#F0F2F5' }}>
      <Row>
        <Col>
          <h1 style={{ fontSize: '6rem', color: '#004D40', fontWeight: 'bold' }}>404</h1>
          <h2 style={{ color: '#00695C' }}>Página Não Encontrada</h2>
          <p className="text-muted mb-4">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
          <Button as={Link} to="/" variant="success" className="btn-postar">
            Voltar para a Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFoundPage;