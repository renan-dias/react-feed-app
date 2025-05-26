// src/components/Pages/NotFoundPage.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa o componente Link para navegação interna.

// Componente NotFoundPage.
// Exibido quando o usuário tenta acessar uma rota que não existe na aplicação (erro 404).
// O objetivo é fornecer uma mensagem clara ao usuário e uma forma de retornar à página inicial.
function NotFoundPage() {
  // A estrutura do componente utiliza React Bootstrap para layout e estilização.
  // `Container`, `Row`, `Col` são usados para centralizar o conteúdo na tela.
  return (
    // Container principal:
    // `d-flex align-items-center justify-content-center text-center`: classes do Bootstrap para flexbox,
    // centralizando o conteúdo vertical e horizontalmente, e alinhando o texto ao centro.
    // `minHeight: '100vh'`: garante que o container ocupe toda a altura da viewport.
    // `backgroundColor: '#F0F2F5'`: define uma cor de fundo suave para a página.
    <Container className="d-flex align-items-center justify-content-center text-center" style={{ minHeight: '100vh', backgroundColor: '#F0F2F5' }}>
      <Row>
        <Col>
          {/* Título principal "404". 
              Estilizado inline para demonstrar, mas idealmente seria via classes CSS.
              Cores e tamanho da fonte escolhidos para dar destaque. */}
          <h1 style={{ fontSize: '6rem', color: '#004D40', fontWeight: 'bold' }}>404</h1>
          {/* Subtítulo indicando o tipo de erro. */}
          <h2 style={{ color: '#00695C' }}>Página Não Encontrada</h2>
          {/* Mensagem explicativa para o usuário.
              `text-muted` e `mb-4` são classes Bootstrap para cor de texto suave e margem inferior. */}
          <p className="text-muted mb-4">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
          {/* Botão para retornar à página inicial.
              `as={Link} to="/"`: o componente Button do React Bootstrap é renderizado como um Link do React Router,
              direcionando para a rota "/" (Home). Isso garante uma navegação SPA (Single Page Application)
              sem recarregamento completo da página.
              `variant="success"` e `className="btn-postar"` (reutilizada de App.css) para estilização. */}
          <Button as={Link} to="/" variant="success" className="btn-postar">
            Voltar para a Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFoundPage;