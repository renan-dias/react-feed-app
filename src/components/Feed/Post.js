import React, { useState, useEffect } from 'react';
import { Card, Image } from 'react-bootstrap';
import defaultAvatar from '../../assets/default-avatar.png'; // Certifique-se que o caminho e a imagem existem
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { doc, updateDoc, increment, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext'; // Hook customizado

// Função utilitária para formatar o timestamp do Firebase em uma string de tempo relativo (ex: "5min", "2h", "3d").
// Isso melhora a experiência do usuário ao mostrar há quanto tempo um post foi feito, em vez de uma data/hora completa.
const formatTimeAgo = (firebaseTimestamp) => {
  // Verifica se o timestamp é válido e se possui o método `toDate()`.
  // `toDate()` é específico de objetos Timestamp do Firebase.
  if (!firebaseTimestamp || typeof firebaseTimestamp.toDate !== 'function') {
    return 'agora'; // Retorna 'agora' como fallback se o timestamp for inválido.
  }
  const date = firebaseTimestamp.toDate(); // Converte o timestamp do Firebase para um objeto Date do JavaScript.
  const seconds = Math.floor((new Date() - date) / 1000); // Calcula a diferença em segundos entre a data atual e a data do post.

  let interval = seconds / 31536000; // Calcula o intervalo em anos.
  if (interval > 1) return Math.floor(interval) + "a"; // Retorna em anos (ex: "2a").
  interval = seconds / 2592000; // Calcula o intervalo em meses.
  if (interval > 1) return Math.floor(interval) + "m"; // Retorna em meses (ex: "3m").
  interval = seconds / 86400; // Calcula o intervalo em dias.
  if (interval > 1) return Math.floor(interval) + "d"; // Retorna em dias (ex: "4d").
  interval = seconds / 3600; // Calcula o intervalo em horas.
  if (interval > 1) return Math.floor(interval) + "h"; // Retorna em horas (ex: "5h").
  interval = seconds / 60; // Calcula o intervalo em minutos.
  if (interval > 1) return Math.floor(interval) + "min"; // Retorna em minutos (ex: "10min").
  // Se for menos de 10 segundos, retorna 'agora', caso contrário, o número de segundos.
  return Math.floor(seconds) < 10 ? 'agora' : Math.floor(seconds) + "s";
};

// Componente Post.
// Responsável por renderizar um único post, incluindo suas informações,
// ações (curtir, comentar) e metadados (autor, tempo).
// Recebe um objeto `post` como prop, contendo todos os dados do post.
function Post({ post }) {
  // Regra do React: Hooks devem ser chamados no topo da função do componente.
  
  // Obtém o usuário atual do contexto de autenticação.
  // Necessário para verificar se o post já foi curtido pelo usuário e para permitir a ação de curtir.
  const { currentUser } = useAuth(); 

  // Estado para controlar se o post está curtido pelo usuário atual.
  // `isLiked` é um booleano. `setIsLiked` é a função para atualizá-lo.
  const [isLiked, setIsLiked] = useState(false); 
  
  // Estado para armazenar e exibir a contagem de curtidas do post.
  // `likesCount` é um número. `setLikesCount` é a função para atualizá-lo.
  // Inicializado com 0 para evitar problemas caso `post.likes` seja undefined inicialmente.
  const [likesCount, setLikesCount] = useState(0); 

  // useEffect para sincronizar o estado de `isLiked` e `likesCount` com as props `post` e `currentUser`.
  // Este efeito é executado quando o componente monta e sempre que `post` ou `currentUser` mudam.
  useEffect(() => {
    // Garante que a lógica só execute se `post` e `post.id` forem válidos.
    // Isso previne erros caso a prop `post` seja nula ou incompleta.
    if (post && post.id) {
      // Define se o post está curtido pelo usuário atual.
      // Verifica se `currentUser` existe, se `post.likedBy` é um array, e se o ID do `currentUser` está em `post.likedBy`.
      if (currentUser && Array.isArray(post.likedBy) && post.likedBy.includes(currentUser.uid)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
      // Define a contagem de likes.
      // Garante que `post.likes` seja um número; caso contrário, usa 0.
      setLikesCount(typeof post.likes === 'number' ? post.likes : 0);
    } else {
      // Se `post` for inválido, reseta os estados para valores padrão seguros.
      // Isso garante consistência e previne erros se a prop `post` mudar para um valor inválido.
      setIsLiked(false);
      setLikesCount(0);
    }
  }, [post, currentUser]); // Array de dependências do useEffect.

  // Validação da prop `post`.
  // Se `post` ou `post.id` forem inválidos, o componente não renderiza nada (retorna null).
  // Esta é uma guarda importante para evitar erros de renderização se dados inválidos forem passados.
  // Deve ser feito APÓS todas as chamadas de Hooks, conforme as regras do React.
  if (!post || !post.id) {
    // console.warn("Componente Post: 'post' prop é inválida ou não tem ID. Não renderizando.", post); // Log para depuração
    return null; 
  }

  // A partir daqui, `post` é considerado válido e `post.id` existe.
  // A contagem inicial de comentários é obtida de `post.commentsCount`.
  // Garante que seja um número; caso contrário, usa 0.
  const initialCommentsCount = typeof post.commentsCount === 'number' ? post.commentsCount : 0;

  // Função para lidar com a ação de curtir/descurtir um post.
  // É assíncrona porque envolve uma atualização no Firestore.
  const handleLike = async () => {
    // Verifica se há um usuário logado. A ação de curtir só é permitida para usuários autenticados.
    if (!currentUser) {
        console.error("Usuário não autenticado para curtir."); // Idealmente, o botão de curtir estaria desabilitado.
        return; // Interrompe a função.
    }
    // `post.id` já foi validado pelo `if (!post || !post.id)` acima.

    const postRef = doc(db, "posts", post.id); // Referência ao documento do post no Firestore.
    try {
      const newLikedState = !isLiked; // Determina o novo estado de "curtido".

      // Atualização Otimista da UI:
      // A UI é atualizada imediatamente, antes mesmo da confirmação do backend.
      // Isso faz com que a interface pareça mais responsiva.
      setIsLiked(newLikedState);
      // Atualiza a contagem de likes localmente. Se `newLikedState` for true (curtiu), incrementa.
      // Se for false (descurtiu), decrementa, garantindo que não seja menor que 0.
      setLikesCount(prevLikes => newLikedState ? prevLikes + 1 : Math.max(0, prevLikes - 1));

      // Interação com o Firestore:
      if (newLikedState) { // Se o usuário curtiu o post:
        await updateDoc(postRef, {
          likes: increment(1), // Incrementa o campo `likes` no Firestore. `increment` é atômico.
          likedBy: arrayUnion(currentUser.uid) // Adiciona o UID do usuário ao array `likedBy`. `arrayUnion` previne duplicatas.
        });
      } else { // Se o usuário descurtiu o post:
        await updateDoc(postRef, {
          likes: increment(-1), // Decrementa o campo `likes`.
          likedBy: arrayRemove(currentUser.uid) // Remove o UID do usuário do array `likedBy`.
        });
      }
    } catch (error) {
      // Em caso de erro na comunicação com o Firestore:
      console.error("Erro ao atualizar like: ", error);
      // Reverte a UI para o estado anterior à atualização otimista.
      // Isso garante que a UI reflita o estado real dos dados.
      setIsLiked(!isLiked); 
      setLikesCount(prevLikes => !isLiked ? prevLikes + 1 : Math.max(0, prevLikes - 1)); // Ajusta a contagem de volta.
      alert("Não foi possível atualizar o like. Tente novamente."); // Informa o usuário sobre o erro.
    }
  };
  
  // Renderização do JSX do componente Post.
  return (
    <Card className="post-card"> {/* Container principal do post, estilizado como um Card. */}
      <Card.Body>
        {/* Cabeçalho do post: avatar, nome do autor e tempo da postagem. */}
        <div className="post-header">
          {/* Avatar do autor. Usa `post.authorPhotoURL` ou um avatar padrão.
              `onError` é um fallback para caso a imagem do autor não carregue. */}
          <Image 
            src={post.authorPhotoURL || defaultAvatar} 
            roundedCircle 
            alt={post.authorName || "Autor"} // Texto alternativo para a imagem.
            onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
          />
          <div>
            {/* Nome do autor. Usa "Usuário Anônimo" como fallback. */}
            <span className="post-author">{post.authorName || "Usuário Anônimo"}</span>
            {/* Tempo formatado da postagem (ex: "5min atrás"). */}
            <span className="post-time">{formatTimeAgo(post.timestamp)}</span>
          </div>
        </div>
        {/* Conteúdo textual do post. Usa uma string vazia como fallback se `post.text` for nulo. */}
        <div className="post-content">
          {post.text || ""} 
        </div>
        {/* Ações do post: curtir e comentar. */}
        <div className="post-actions">
          {/* Seção de Curtir. `onClick` chama `handleLike`.
              A classe `liked` é aplicada se `isLiked` for true, para estilização. */}
          <div onClick={handleLike} className={isLiked ? 'liked' : ''}>
            {/* Ícone de coração. `AiFillHeart` (preenchido) se curtido, `AiOutlineHeart` (contorno) caso contrário. */}
            {isLiked ? <AiFillHeart size={22} /> : <AiOutlineHeart size={22} />} 
            {/* Exibe a contagem de curtidas. */}
            <span className="ms-1">{likesCount}</span>
          </div>
          {/* Seção de Comentários. Atualmente, exibe um alerta indicando que a funcionalidade está em desenvolvimento. */}
          <div onClick={() => alert('Funcionalidade de comentários em desenvolvimento.')}>
            <BiCommentDetail size={22} /> {/* Ícone de comentário. */}
            {/* Exibe a contagem de comentários. */}
            <span className="ms-1">{initialCommentsCount}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Post;