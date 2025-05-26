import React from 'react';
import Sidebar from '../Layout/Sidebar';
import MainContent from '../Layout/MainContent';

function Home() {
  return (
    <div className="app-container">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default Home;