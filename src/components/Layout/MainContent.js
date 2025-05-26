// src/components/Layout/MainContent.js
import React from 'react';
// import CreatePostBox from '../Feed/CreatePostBox'; // REMOVER ESTA LINHA
import Feed from '../Feed/Feed';

function MainContent() {
  return (
    <>
      <h2 className="page-title">Para você</h2>
      {/* <CreatePostBox />  REMOVER ESTA LINHA */}
      <Feed />
    </>
  );
}

export default MainContent;