// src/components/Layout/MainContent.js
import React from 'react';
// A importação de CreatePostBox foi removida pois a criação de posts agora é feita através de um modal (CreatePostModal).
// Manter código não utilizado ou comentado pode levar a confusão e dificultar a manutenção.
// import CreatePostBox from '../Feed/CreatePostBox'; // REMOVER ESTA LINHA 
import Feed from '../Feed/Feed';

// Componente MainContent.
// Responsável por exibir o conteúdo principal da página, que neste caso é o feed de posts.
// Ele é usado dentro do componente `Home` para compor a área central da interface do usuário.
function MainContent() {
  // O uso de Fragment (`<>...</>`) é uma boa prática quando não se deseja adicionar um nó extra ao DOM,
  // o que pode ser útil para manter a estrutura HTML limpa e evitar problemas de layout.
  return (
    <>
      {/* Título da página. "Para você" sugere um feed personalizado ou principal.
          A classe `page-title` pode ser usada para estilização consistente de títulos de página. */}
      <h2 className="page-title">Para você</h2>
      
      {/* O componente CreatePostBox foi removido daqui.
          A funcionalidade de criar posts foi movida para um modal (CreatePostModal),
          acessível através de um botão na Sidebar. Isso centraliza a ação de postar
          e libera espaço na área de conteúdo principal, tornando a interface mais limpa. */}
      {/* <CreatePostBox />  REMOVER ESTA LINHA */}
      
      {/* Componente Feed.
          Renderiza a lista de posts. É o principal conteúdo desta seção.
          A responsabilidade de buscar e exibir os posts é delegada a este componente,
          seguindo o princípio de responsabilidade única. */}
      <Feed />
    </>
  );
}

export default MainContent;