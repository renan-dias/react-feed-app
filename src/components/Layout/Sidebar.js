// src/components/Layout/Sidebar.js
import React, { useState, useEffect } from 'react';
import { Nav, Button, Image } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import GenericModal from '../Modals/GenericModal';
import CreatePostModal from '../Modals/CreatePostModal';
import { 
    HouseDoorFill, PeopleFill, Hash, BellFill, EnvelopeFill, BoxArrowRight, PencilSquare
} from 'react-bootstrap-icons'; // Removido MenuIcon, pois o botão está em Home.js
import defaultAvatar from '../../assets/default-avatar.png';

// Recebe props isMobileSidebarOpen e toggleMobileSidebar de Home.js
function Sidebar({ isMobileSidebarOpen, toggleMobileSidebar }) { 
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showGenericModal, setShowGenericModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const handleShowGenericModal = (title, body) => {
    setModalContent({ title, body });
    setShowGenericModal(true);
    // Se a sidebar mobile estiver aberta, fecha ao abrir um modal
    if (isMobileSidebarOpen) toggleMobileSidebar(false); 
  };
  const handleCloseGenericModal = () => setShowGenericModal(false);

  const handleShowCreatePostModal = () => {
    setShowCreatePostModal(true);
    if (isMobileSidebarOpen) toggleMobileSidebar(false); 
  }
  const handleCloseCreatePostModal = () => setShowCreatePostModal(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
      if (isMobileSidebarOpen) toggleMobileSidebar(false); 
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Falha ao sair. Tente novamente.");
    }
  };
  
  // Efeito para fechar a sidebar mobile se a rota mudar (se estiver aberta)
  // Isso garante que a navegação por link feche a sidebar.
  useEffect(() => {
    if (isMobileSidebarOpen) {
      toggleMobileSidebar(false); // Chama a função passada por prop para fechar
    }
    // A dependência 'toggleMobileSidebar' foi adicionada para seguir as regras de hooks,
    // mas é importante garantir que ela seja estável (ex: useCallback em Home.js) se causar re-renderizações.
    // Para este caso, como ela apenas atualiza o estado em Home, deve ser estável o suficiente.
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [location.pathname, isMobileSidebarOpen, toggleMobileSidebar]);


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
      {/* A classe 'open' é controlada pelo estado em Home.js e passada via prop */}
      <Nav className={`sidebar flex-column glassmorphism-effect ${isMobileSidebarOpen ? 'open' : ''}`} id="sidebar">
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
                  // O useEffect acima cuidará de fechar a sidebar se estiver aberta
                } else {
                  handleShowGenericModal(item.text, item.modalBody);
                }
              }}
              className={location.pathname === item.path && item.isFeed ? "active" : ""}
              href={item.isFeed ? item.path : "#"} // href="#" para itens que abrem modal para não alterar a rota desnecessariamente
            >
              {item.icon} {item.text}
            </Nav.Link>
          </Nav.Item>
        ))}
        
        <div className="sidebar-post-button-container">
            <Button 
                variant="primary" // Mudado para primary para seguir o novo tema do App.css
                className="w-100 sidebar-post-button btn-postar" // Adicionado btn-postar para herdar estilos
                onClick={handleShowCreatePostModal}
            >
               <PencilSquare size={18} className="me-2"/> Postar
            </Button>
        </div>

        <Nav.Item className="sidebar-logout-item">
          <Nav.Link onClick={handleSignOut} style={{color: '#DC3545'}}> 
            <BoxArrowRight size={20} /> Sair
          </Nav.Link>
        </Nav.Item>
      </Nav>
      
      {/* Modais permanecem aqui, pois são chamados pela Sidebar */}
      <GenericModal 
        show={showGenericModal} 
        handleClose={handleCloseGenericModal} 
        title={modalContent.title} 
        body={modalContent.body} 
      />
      <CreatePostModal
        show={showCreatePostModal}
        handleClose={handleCloseCreatePostModal}
      />
    </>
  );
}

export default Sidebar;