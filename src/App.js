import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import NotFoundPage from './components/Pages/NotFoundPage'; // Importar a página 404
import './App.css';

// Componente principal da aplicação.
// Responsável por configurar o provedor de autenticação e o roteamento das páginas.
function App() {
  return (
    // AuthProvider é utilizado para prover o contexto de autenticação para todos os componentes da aplicação.
    // Isso permite que qualquer componente acesse informações sobre o usuário logado e realize ações como login e logout.
    <AuthProvider>
      {/* Router é o componente base para o roteamento da aplicação. 
          Ele utiliza a API de Histórico do HTML5 para manter a UI sincronizada com a URL. */}
      <Router>
        {/* Routes é usado para definir as diferentes rotas da aplicação. 
            Ele renderiza o primeiro Route ou Redirect que corresponde à localização atual. */}
        <Routes>
          {/* Rota para a página de login. 
              Não é protegida, permitindo que usuários não autenticados acessem. */}
          <Route path="/login" element={<Login />} />
          {/* Rota para a página inicial (Home).
              Esta rota pode ser protegida ou não, dependendo da lógica implementada no componente Home 
              ou se estivesse envolvida por um ProtectedRoute. */}
          <Route 
            path="/" element={<Home />} 
          />
          {/* Adicione outras rotas protegidas aqui se necessário, antes da rota curinga.
              Rotas protegidas geralmente utilizam um componente como ProtectedRoute para verificar
              a autenticação do usuário antes de renderizar o componente da página. */}
          {/* Ex: <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> */}
          
          {/* Rota Curinga (Wildcard) para páginas não encontradas (404).
              Esta rota é acionada se nenhuma das rotas anteriores corresponder à URL atual. */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;