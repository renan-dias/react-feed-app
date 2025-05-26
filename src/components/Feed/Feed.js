import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import Post from './Post';
import { Spinner, Alert } from 'react-bootstrap';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Feed.js: useEffect disparado para buscar posts.");
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("Feed.js: onSnapshot callback recebido. querySnapshot.empty =", querySnapshot.empty);
      const postsData = [];
      querySnapshot.forEach((doc) => {
        console.log("Feed.js: Processando documento do post:", doc.id);
        postsData.push({ 
          ...doc.data(), 
          id: doc.id,
          timestamp: doc.data().timestamp instanceof Timestamp 
                       ? doc.data().timestamp 
                       : new Timestamp(0,0) 
        });
      });
      console.log("Feed.js: postsData montado:", postsData);
      setPosts(postsData);
      setLoading(false);
      setError(null);
    }, (err) => {
      console.error("Feed.js: Erro no onSnapshot:", err);
      setError("Não foi possível carregar os posts. Tente recarregar a página.");
      setLoading(false);
    });

    return () => {
      console.log("Feed.js: useEffect cleanup. Desinscrevendo do onSnapshot.");
      unsubscribe();
    };
  }, []);

  console.log("Feed.js: Renderizando. Loading:", loading, "Error:", error, "Posts:", posts);

  if (loading) {
    console.log("Feed.js: Renderizando Spinner de loading.");
    return (
      <div className="text-center mt-5" style={{ paddingTop: '50px', paddingBottom: '50px' }}> {/* Adicionado padding para melhor visualização */}
        <Spinner animation="border" variant="primary" role="status"> {/* Alterado variant para primary */}
          <span className="visually-hidden">Carregando posts...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    console.log("Feed.js: Renderizando mensagem de erro.");
    return <Alert variant="danger" className="mt-4">{error}</Alert>;
  }

  if (!Array.isArray(posts)) {
    console.error("Feed.js: Estado 'posts' não é um array!", posts);
    return <Alert variant="danger" className="mt-4">Erro interno: formato de posts inválido.</Alert>;
  }
  
  console.log("Feed.js: Verificando posts.length:", posts.length);

  if (posts.length === 0) {
    console.log("Feed.js: Renderizando 'Ainda não há posts...'");
    return <p className="text-center text-muted mt-4">Ainda não há posts por aqui. Que tal criar o primeiro?</p>;
  }

  console.log("Feed.js: Preparando para mapear e renderizar posts. Número de posts:", posts.length);
  return (
    <div>
      {posts.map(p => { // Usei 'p' para diferenciar da prop 'post' do componente Post
        // Verificação extra dentro do map, embora o Post.js já tenha uma
        if (!p || !p.id) {
          console.error("Feed.js: Tentando renderizar Post com dados de post inválidos no map:", p);
          return null; // Não renderiza este item se for inválido
        }
        console.log("Feed.js: Renderizando componente Post para o post ID:", p.id);
        return <Post key={p.id} post={p} />;
      })}
    </div>
  );
}

export default Feed;
