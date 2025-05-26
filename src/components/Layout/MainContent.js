// src/components/Layout/MainContent.js
import React from 'react';
import Feed from '../Feed/Feed';

// Recebe prop isMobileSidebarOpen para aplicar classe de blur/escurecimento se necessário
function MainContent({ isMobileSidebarOpen }) { 
  return (
    // A classe `sidebar-open-blur` será aplicada baseada na prop,
    // e o CSS em App.css cuidará do efeito visual.
    <main className={`main-content ${isMobileSidebarOpen ? 'sidebar-open-blur' : ''}`}>
      <h2 className="page-title">Para você</h2>
      <Feed />
    </main>
  );
}

export default MainContent;