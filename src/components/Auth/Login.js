import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

// Componente de Login.
// Permite que os usuários façam login utilizando a autenticação do Google.
function Login() {
  // Obtém a função signInWithGoogle do contexto de autenticação.
  // Isso desacopla o componente Login da implementação específica do método de login,
  // facilitando a manutenção e testes.
  const { signInWithGoogle } = useAuth();
  // Hook do React Router para navegar programaticamente entre as rotas.
  // Utilizado para redirecionar o usuário após o login bem-sucedido.
  const navigate = useNavigate();

  // Função para lidar com o processo de login.
  // É assíncrona porque a autenticação com o Google é uma operação de rede.
  const handleLogin = async () => {
    try {
      // Chama a função de login com Google provida pelo AuthContext.
      await signInWithGoogle();
      // Após o login bem-sucedido, redireciona o usuário para a página inicial ('/').
      // O redirecionamento garante que o usuário seja levado para a área principal da aplicação.
      navigate('/');
    } catch (error) {
      // Em caso de erro durante o login (ex: usuário fechou o popup do Google, problema de rede),
      // o erro é registrado no console e um alerta é exibido ao usuário.
      // Idealmente, um sistema de notificação mais robusto seria usado em vez de `alert`.
      console.error("Erro ao fazer login com Google:", error);
      alert("Falha ao fazer login. Tente novamente.");
    }
  };

  // A interface do componente Login é centralizada na tela e oferece um botão para login com Google.
  return (
    // Container principal que centraliza o conteúdo verticalmente e horizontalmente na página.
    // `minHeight: "100vh"` garante que o container ocupe toda a altura da viewport.
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Row>
        <Col md={12}>
          {/* Card do React Bootstrap para agrupar o conteúdo do formulário de login. */}
          <Card style={{ width: '25rem' }}>
            <Card.Body className="text-center">
              <Card.Title className="mb-4">Bem-vindo!</Card.Title>
              <Card.Text>
                Faça login com sua conta Google para continuar.
              </Card.Text>
              {/* Botão para acionar a função handleLogin.
                  Utiliza um ícone do Google para melhor identificação visual.
                  `w-100` faz o botão ocupar toda a largura disponível.
                  `d-flex align-items-center justify-content-center` centraliza o conteúdo do botão. */}
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