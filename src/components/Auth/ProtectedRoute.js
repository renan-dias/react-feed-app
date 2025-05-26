import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Componente de Ordem Superior (Higher-Order Component - HOC) ou Componente de Proteção de Rota.
// Seu propósito é proteger rotas que exigem autenticação.
// Ele verifica se há um usuário autenticado (`currentUser`).
// Se não houver, redireciona o usuário para a página de login (`/login`).
// Caso contrário, renderiza os componentes filhos (`children`) passados para ele.
function ProtectedRoute({ children }) {
  // Obtém o usuário atual do contexto de autenticação.
  // O hook `useAuth` provê acesso ao `currentUser`, que é nulo se ninguém estiver logado.
  const { currentUser } = useAuth();

  // Verifica se o usuário não está autenticado.
  if (!currentUser) {
    // Se `currentUser` for nulo, significa que o usuário não está logado.
    // O componente `Navigate` do React Router é usado para redirecionar o usuário
    // para a rota especificada, neste caso, a página de login.
    // Este redirecionamento impede o acesso não autorizado a rotas protegidas.
    return <Navigate to="/login" />;
  }

  // Se `currentUser` existir, significa que o usuário está autenticado.
  // Nesse caso, o componente renderiza seus `children`.
  // `children` representa os componentes que estão aninhados dentro de `ProtectedRoute` na definição das rotas.
  // Por exemplo: <ProtectedRoute><MinhaPaginaSecreta /></ProtectedRoute>
  return children;
}

export default ProtectedRoute;