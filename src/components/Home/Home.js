import React from 'react';
import Sidebar from '../Layout/Sidebar';
import MainContent from '../Layout/MainContent';

// Componente Home.
// Representa a página principal da aplicação após o login do usuário.
// É responsável por organizar o layout da página, dividindo-a em uma barra lateral (`Sidebar`)
// e uma área de conteúdo principal (`MainContent`).
function Home() {
  // A estrutura `div` com a classe `app-container` serve como um container geral
  // para aplicar estilos de layout que posicionam a `Sidebar` e o `MainContent` lado a lado.
  // Este é um padrão comum para criar layouts de painel ou dashboard.
  return (
    <div className="app-container">
      {/* Sidebar: Componente de navegação lateral. 
          Contém links para diferentes seções da aplicação, perfil do usuário e botão de logout.
          É renderizado à esquerda do conteúdo principal. */}
      <Sidebar />
      {/* MainContent: Componente que exibe o conteúdo principal da rota atual.
          Por exemplo, na rota "/", ele exibe o feed de posts.
          É renderizado à direita da Sidebar. */}
      <MainContent />
    </div>
  );
}

export default Home;