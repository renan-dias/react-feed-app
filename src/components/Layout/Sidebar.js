// src/components/Layout/Sidebar.js
import React, { useState } from 'react';
import { Nav, Button, Image } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import GenericModal from '../Modals/GenericModal';
import CreatePostModal from '../Modals/CreatePostModal'; // Importar o novo modal
import { 
    HouseDoorFill, PeopleFill, Hash, BellFill, EnvelopeFill, BoxArrowRight, PencilSquare
} from 'react-bootstrap-icons'; // Importa ícones do React Bootstrap Icons para uso na interface.
import defaultAvatar from '../../assets/default-avatar.png'; // Avatar padrão para usuários sem foto.

// Componente Sidebar.
// Responsável pela navegação principal da aplicação, exibição de informações do usuário,
// e ações como postar e fazer logout.
function Sidebar() {
  // Hooks de contexto e navegação:
  // `useAuth` para acessar dados do usuário logado (`currentUser`) e função de logout (`signOut`).
  const { currentUser, signOut } = useAuth();
  // `useNavigate` para redirecionar o usuário programaticamente (ex: após logout).
  const navigate = useNavigate();
  // `useLocation` para obter informações sobre a rota atual (ex: `location.pathname` para destacar link ativo).
  const location = useLocation();

  // Estados para controle de modais:
  // `showGenericModal` e `setShowGenericModal` controlam a visibilidade de um modal genérico
  // usado para exibir mensagens de funcionalidades em desenvolvimento.
  const [showGenericModal, setShowGenericModal] = useState(false);
  // `modalContent` armazena o título e o corpo do modal genérico.
  const [modalContent, setModalContent] = useState({ title: '', body: '' });
  // `showCreatePostModal` e `setShowCreatePostModal` controlam a visibilidade do modal de criação de posts.
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  // Funções para manipular o modal genérico:
  // `handleShowGenericModal` define o conteúdo e exibe o modal.
  const handleShowGenericModal = (title, body) => {
    setModalContent({ title, body });
    setShowGenericModal(true);
  };
  // `handleCloseGenericModal` fecha o modal genérico.
  const handleCloseGenericModal = () => setShowGenericModal(false);

  // Funções para manipular o modal de criação de post:
  // `handleShowCreatePostModal` exibe o modal de criação de post.
  const handleShowCreatePostModal = () => setShowCreatePostModal(true);
  // `handleCloseCreatePostModal` fecha o modal de criação de post.
  const handleCloseCreatePostModal = () => setShowCreatePostModal(false);

  // Função para lidar com o logout do usuário.
  // É assíncrona porque `signOut` (do Firebase) é uma operação de rede.
  const handleSignOut = async () => {
    try {
      await signOut(); // Chama a função de logout do AuthContext.
      navigate('/login'); // Redireciona para a página de login após o logout bem-sucedido.
    } catch (error) {
      // Em caso de erro no logout, exibe um erro no console e um alerta ao usuário.
      console.error("Erro ao fazer logout:", error);
      alert("Falha ao sair. Tente novamente.");
    }
  };

  // Determina o nome e a foto do usuário a serem exibidos.
  // Usa o `displayName` e `photoURL` do `currentUser` se disponíveis,
  // caso contrário, usa valores padrão ("Usuário" e `defaultAvatar`).
  // O operador `?.` (optional chaining) previne erros se `currentUser` for nulo.
  const userName = currentUser?.displayName || "Usuário";
  const userPhoto = currentUser?.photoURL || defaultAvatar;

  // Array de configuração para os itens do menu da sidebar.
  // Cada objeto define o caminho (`path`), ícone (`icon`), texto (`text`),
  // e se é um link de feed (`isFeed`) ou se deve abrir um modal (`modalBody`).
  // Isso torna a adição ou modificação de itens de menu mais fácil e declarativa.
  const menuItems = [
    { path: "/", icon: <HouseDoorFill size={20} />, text: "Para você", isFeed: true },
    { path: "#seguindo", icon: <PeopleFill size={20} />, text: "Seguindo", modalBody: "Funcionalidade 'Seguindo' em desenvolvimento." },
    { path: "#salas", icon: <Hash size={20} />, text: "Salas", modalBody: "Funcionalidade 'Salas' em desenvolvimento." },
    { path: "#notificacoes", icon: <BellFill size={20} />, text: "Notificações", modalBody: "Funcionalidade 'Notificações' em desenvolvimento." },
    { path: "#mensagens", icon: <EnvelopeFill size={20} />, text: "Mensagens", modalBody: "Funcionalidade 'Mensagens' em desenvolvimento." },
  ];

  // Renderização do componente Sidebar.
  // Usa Fragment (`<>...</>`) para agrupar múltiplos elementos raiz sem adicionar um nó extra ao DOM.
  return (
    <>
      {/* Componente Nav do React Bootstrap, configurado como uma sidebar vertical (`flex-column`). */}
      <Nav className="sidebar flex-column">
        {/* Seção de perfil do usuário na sidebar. */}
        <div className="user-profile-sidebar">
          {/* Imagem do avatar do usuário. 
              `onError` define um fallback para o `defaultAvatar` caso a imagem do usuário não carregue. */}
          <Image 
            src={userPhoto} 
            alt={userName} // Texto alternativo para acessibilidade.
            onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }} 
          />
          <div>
            <strong>{userName}</strong> {/* Nome do usuário em negrito. */}
            {/* Tag/identificador do usuário (ex: cargo, status). Atualmente fixo como "3 Sistemas". */}
            <span className="user-tag">3 Sistemas</span> 
          </div>
        </div>

        {/* Mapeia o array `menuItems` para renderizar cada item de menu.
            A `key` é importante para o React identificar unicamente cada item. */}
        {menuItems.map(item => (
          <Nav.Item key={item.path}>
            <Nav.Link 
              onClick={() => {
                // Se `item.isFeed` for true, navega para o `item.path`.
                // Caso contrário, exibe o modal genérico com o `item.text` e `item.modalBody`.
                if (item.isFeed) {
                  navigate(item.path);
                } else {
                  handleShowGenericModal(item.text, item.modalBody);
                }
              }}
              // Adiciona a classe "active" se o `location.pathname` corresponder ao `item.path`
              // E se for um item de feed, para destacar o link ativo.
              className={location.pathname === item.path && item.isFeed ? "active" : ""}
              // Define o `href` para navegação real se for um item de feed, senão usa "#".
              href={item.isFeed ? item.path : "#"} 
            >
              {item.icon} {item.text} {/* Exibe o ícone e o texto do item de menu. */}
            </Nav.Link>
          </Nav.Item>
        ))}
        
        {/* Container para o botão "Postar". */}
        <div className="sidebar-post-button-container">
            {/* Botão para abrir o modal de criação de post.
                `onClick` chama `handleShowCreatePostModal`. */}
            <Button 
                variant="success" // Estilo do botão.
                className="w-100 sidebar-post-button" // Classes para estilização (largura total, etc.).
                onClick={handleShowCreatePostModal} 
            >
               <PencilSquare size={18} className="me-2"/> Postar {/* Ícone e texto do botão. */}
            </Button>
        </div>

        {/* Item de menu para Logout. Posicionado geralmente ao final da sidebar. */}
        <Nav.Item className="sidebar-logout-item">
          {/* Link que, ao ser clicado, chama `handleSignOut`.
              Estilizado com cor vermelha para indicar uma ação de "saída" ou "destrutiva". */}
          <Nav.Link onClick={handleSignOut} style={{color: '#D32F2F'}}>
            <BoxArrowRight size={20} /> Sair {/* Ícone e texto "Sair". */}
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Modal Genérico: renderizado mas controlado pelo estado `showGenericModal`.
          Usado para exibir mensagens de funcionalidades em desenvolvimento. */}
      <GenericModal 
        show={showGenericModal} 
        handleClose={handleCloseGenericModal} 
        title={modalContent.title} 
        body={modalContent.body} 
      />
      {/* Modal de Criação de Post: renderizado mas controlado pelo estado `showCreatePostModal`.
          Permite ao usuário criar uma nova postagem. */}
      <CreatePostModal
        show={showCreatePostModal}
        handleClose={handleCloseCreatePostModal}
      />
    </>
  );
}

export default Sidebar;