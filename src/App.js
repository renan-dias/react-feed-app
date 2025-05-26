import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import NotFoundPage from './components/Pages/NotFoundPage'; // Importar a página 404
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" element={<Home />} 
          />
          {/* Adicione outras rotas protegidas aqui se necessário, antes da rota curinga */}
          {/* Ex: <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> */}
          
          <Route path="*" element={<NotFoundPage />} /> {/* Rota Curinga para 404 */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;