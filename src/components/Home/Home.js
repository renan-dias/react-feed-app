import React, { useState } from 'react';
import Sidebar from '../Layout/Sidebar';
import MainContent from '../Layout/MainContent';
import { Button } from 'react-bootstrap';
import { List as MenuIcon } from 'react-bootstrap-icons';

function Home() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = (forceState) => {
    // Permite forçar um estado (true/false) ou apenas inverter o estado atual
    setIsMobileSidebarOpen(prevState => typeof forceState === 'boolean' ? forceState : !prevState);
  };

  return (
    <div className="app-container">
      {/* Botão de Menu Hamburger - visível apenas em mobile via CSS */}
      <Button 
        variant="primary" 
        className="mobile-menu-button" 
        onClick={() => toggleMobileSidebar()}
        aria-controls="sidebar" // Para acessibilidade
        aria-expanded={isMobileSidebarOpen} // Para acessibilidade
      >
        <MenuIcon size={24} />
      </Button>

      <Sidebar 
        isMobileSidebarOpen={isMobileSidebarOpen} 
        toggleMobileSidebar={toggleMobileSidebar} 
      />
      <MainContent isMobileSidebarOpen={isMobileSidebarOpen} />
      
      {/* Overlay para o MainContent quando a sidebar mobile estiver aberta */}
      {isMobileSidebarOpen && <div className="main-content-overlay active" onClick={() => toggleMobileSidebar(false)}></div>}
    </div>
  );
}

export default Home;