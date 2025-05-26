// src/components/Layout/Sidebar.js
import React, { useState } from 'react';
import { Nav, Button, Image } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import GenericModal from '../Modals/GenericModal';
import CreatePostModal from '../Modals/CreatePostModal'; // Importar o novo modal
import { 
    HouseDoorFill, PeopleFill, Hash, BellFill, EnvelopeFill, BoxArrowRight, PencilSquare
} from 'react-bootstrap-icons';
import defaultAvatar from '../../assets/default-avatar.png';

function Sidebar() {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showGenericModal, setShowGenericModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });
  const [showCreatePostModal, setShowCreatePostModal] = useState(false); // Novo estado

  const handleShowGenericModal = (title, body) => {
    setModalContent({ title, body });
    setShowGenericModal(true);
  };
  const handleCloseGenericModal = () => setShowGenericModal(false);

  const handleShowCreatePostModal = () => setShowCreatePostModal(true); // Função para abrir o modal de post
  const handleCloseCreatePostModal = () => setShowCreatePostModal(false); // Função para fechar

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Falha ao sair. Tente novamente.");
    }
  };

  const userName = currentUser?.displayName || "Usuário";
  const userPhoto = currentUser?.photoURL || defaultAvatar;

  const menuItems = [
    { path: "/", icon: <HouseDoorFill size={20} />, text: "Para você", isFeed: true },
    { path: "#seguindo", icon: <PeopleFill size={20} />, text: "Seguindo", modalBody: "Funcionalidade 'Seguindo' em desenvolvimento." },
    { path: "#salas", icon: <Hash size={20} />, text: "Salas", modalBody: "Funcionalidade 'Salas' em desenvolvimento." },
    { path: "#notificacoes", icon: <BellFill size={20} />, text: "Notificações", modalBody: "Funcionalidade 'Notificações' em desenvolvimento." },
    { path: "#mensagens", icon: <EnvelopeFill size={20} />, text: "Mensagens", modalBody: "Funcionalidade 'Mensagens' em desenvolvimento." },
  ];

  return (
    <>
      <Nav className="sidebar flex-column">
        <div className="user-profile-sidebar">
          <Image 
            src={userPhoto} 
            alt={userName} 
            onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }} 
          />
          <div>
            <strong>{userName}</strong>
            <span className="user-tag">3 Sistemas</span> 
          </div>
        </div>

        {menuItems.map(item => (
          <Nav.Item key={item.path}>
            <Nav.Link 
              onClick={() => {
                if (item.isFeed) {
                  navigate(item.path);
                } else {
                  handleShowGenericModal(item.text, item.modalBody);
                }
              }}
              className={location.pathname === item.path && item.isFeed ? "active" : ""}
              href={item.isFeed ? item.path : "#"} // Para links de navegação reais
            >
              {item.icon} {item.text}
            </Nav.Link>
          </Nav.Item>
        ))}
        
        <div className="sidebar-post-button-container">
            <Button 
                variant="success" 
                className="w-100 sidebar-post-button"
                onClick={handleShowCreatePostModal} // <--- MODIFICADO AQUI
            >
               <PencilSquare size={18} className="me-2"/> Postar
            </Button>
        </div>

        <Nav.Item className="sidebar-logout-item">
          <Nav.Link onClick={handleSignOut} style={{color: '#D32F2F'}}>
            <BoxArrowRight size={20} /> Sair
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <GenericModal 
        show={showGenericModal} 
        handleClose={handleCloseGenericModal} 
        title={modalContent.title} 
        body={modalContent.body} 
      />
      <CreatePostModal  // <--- ADICIONADO AQUI
        show={showCreatePostModal}
        handleClose={handleCloseCreatePostModal}
      />
    </>
  );
}

export default Sidebar;