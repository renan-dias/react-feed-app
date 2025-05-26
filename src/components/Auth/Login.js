import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

function Login() {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/'); // Redireciona para a home após o login
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
      alert("Falha ao fazer login. Tente novamente.");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Row>
        <Col md={12}>
          <Card style={{ width: '25rem' }}>
            <Card.Body className="text-center">
              <Card.Title className="mb-4">Bem-vindo!</Card.Title>
              <Card.Text>
                Faça login com sua conta Google para continuar.
              </Card.Text>
              <Button variant="outline-primary" onClick={handleLogin} className="w-100 d-flex align-items-center justify-content-center">
                <FcGoogle size={24} className="me-2" /> Entrar com Google
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;