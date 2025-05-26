import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import Post from './Post';
import { Spinner, Alert } from 'react-bootstrap';

// Componente Feed.
// Responsável por buscar e exibir a lista de posts.
// Utiliza o Firestore para escutar atualizações em tempo real na coleção de posts.
function Feed() {
  // Estado para armazenar a lista de posts.
  // `posts` é um array de objetos, onde cada objeto representa um post.
  const [posts, setPosts] = useState([]);

  // Estado para controlar o indicador de carregamento.
  // `loading` é true enquanto os posts estão sendo buscados, false caso contrário.
  const [loading, setLoading] = useState(true);

  // Estado para armazenar mensagens de erro caso a busca de posts falhe.
  const [error, setError] = useState(null);

  // useEffect para buscar os posts quando o componente é montado.
  // A array de dependências vazia `[]` significa que este efeito executa apenas uma vez,
  // similar ao `componentDidMount` em componentes de classe.
  useEffect(() => {
    // console.log("Feed.js: useEffect disparado para buscar posts."); // Log para depuração

    // Cria uma query para buscar posts na coleção "posts" do Firestore,
    // ordenados por "timestamp" em ordem decrescente (mais recentes primeiro).
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    
    // `onSnapshot` estabelece um listener em tempo real para a query.
    // Sempre que houver uma mudança nos dados que correspondem à query (novo post, post atualizado, etc.),
    // a função de callback é executada com um `querySnapshot`.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // console.log("Feed.js: onSnapshot callback recebido. querySnapshot.empty =", querySnapshot.empty); // Log para depuração
      const postsData = []; // Array temporário para armazenar os posts formatados.
      querySnapshot.forEach((doc) => { // Itera sobre cada documento no snapshot.
        // console.log("Feed.js: Processando documento do post:", doc.id); // Log para depuração
        postsData.push({ 
          ...doc.data(), // Extrai todos os dados do documento.
          id: doc.id,    // Adiciona o ID do documento ao objeto do post.
          // Garante que o timestamp seja um objeto Timestamp do Firebase.
          // Se `doc.data().timestamp` já for um Timestamp, usa ele.
          // Caso contrário (ex: pode ser null ou um formato diferente após alguma migração ou erro),
          // cria um novo Timestamp zerado para evitar erros na renderização ou formatação.
          // É uma medida de segurança para garantir que `post.timestamp.toDate()` não falhe.
          timestamp: doc.data().timestamp instanceof Timestamp 
                       ? doc.data().timestamp 
                       : new Timestamp(0,0) 
        });
      });
      // console.log("Feed.js: postsData montado:", postsData); // Log para depuração
      setPosts(postsData); // Atualiza o estado `posts` com os dados recebidos.
      setLoading(false);   // Define o carregamento como concluído.
      setError(null);      // Limpa qualquer erro anterior, pois os dados foram carregados.
    }, (err) => { // Função de callback para tratar erros do listener `onSnapshot`.
      // console.error("Feed.js: Erro no onSnapshot:", err); // Log para depuração
      setError("Não foi possível carregar os posts. Tente recarregar a página."); // Define a mensagem de erro.
      setLoading(false); // Define o carregamento como concluído (mesmo com erro).
    });

    // Função de limpeza do useEffect.
    // É executada quando o componente é desmontado.
    // `unsubscribe` remove o listener do Firestore, prevenindo memory leaks e
    // chamadas desnecessárias ao callback após o componente não estar mais na tela.
    return () => {
      // console.log("Feed.js: useEffect cleanup. Desinscrevendo do onSnapshot."); // Log para depuração
      unsubscribe();
    };
  }, []); // Array de dependências vazia.

  // console.log("Feed.js: Renderizando. Loading:", loading, "Error:", error, "Posts:", posts); // Log para depuração

  // Se `loading` for true, exibe um componente Spinner (indicador de carregamento).
  if (loading) {
    // console.log("Feed.js: Renderizando Spinner de loading."); // Log para depuração
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="success" role="status">
          {/* Texto para acessibilidade, lido por leitores de tela. */}
          <span className="visually-hidden">Carregando posts...</span>
        </Spinner>
      </div>
    );
  }

  // Se `error` não for nulo, exibe uma mensagem de erro usando o componente Alert.
  if (error) {
    // console.log("Feed.js: Renderizando mensagem de erro."); // Log para depuração
    return <Alert variant="danger" className="mt-4">{error}</Alert>;
  }

  // Verificação de segurança: se `posts` não for um array (o que não deveria acontecer),
  // exibe uma mensagem de erro para ajudar na depuração.
  if (!Array.isArray(posts)) {
    // console.error("Feed.js: Estado 'posts' não é um array!", posts); // Log para depuração
    return <Alert variant="danger" className="mt-4">Erro interno: formato de posts inválido.</Alert>;
  }
  
  // console.log("Feed.js: Verificando posts.length:", posts.length); // Log para depuração

  // Se a lista de `posts` estiver vazia e não houver erro nem carregamento,
  // exibe uma mensagem indicando que não há posts.
  if (posts.length === 0) {
    // console.log("Feed.js: Renderizando 'Ainda não há posts...'"); // Log para depuração
    return <p className="text-center text-muted mt-4">Ainda não há posts por aqui. Que tal criar o primeiro?</p>;
  }

  // console.log("Feed.js: Preparando para mapear e renderizar posts. Número de posts:", posts.length); // Log para depuração
  // Se houver posts, mapeia o array `posts` para renderizar um componente `Post` para cada item.
  return (
    <div>
      {posts.map(p => { // Renomeado para `p` para evitar conflito com a prop `post` do componente `Post`.
        // Verificação adicional de segurança dentro do map.
        // Embora o componente Post também tenha uma verificação, esta previne erros caso
        // um objeto de post inválido (sem id) chegue até aqui.
        if (!p || !p.id) {
          // console.error("Feed.js: Tentando renderizar Post com dados de post inválidos no map:", p); // Log para depuração
          return null; // Não renderiza este item se for inválido, evitando que a UI quebre.
        }
        // console.log("Feed.js: Renderizando componente Post para o post ID:", p.id); // Log para depuração
        // Renderiza o componente `Post`, passando o objeto do post (`p`) como prop `post`.
        // A `key` é essencial para o React identificar unicamente cada item na lista,
        // otimizando a renderização e o estado dos componentes.
        return <Post key={p.id} post={p} />;
      })}
    </div>
  );
}

export default Feed;
