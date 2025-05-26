import React, { useState, useEffect } from 'react';
import { Card, Image } from 'react-bootstrap';
import defaultAvatar from '../../assets/default-avatar.png'; // Certifique-se que o caminho e a imagem existem
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { doc, updateDoc, increment, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext'; // Hook customizado

const formatTimeAgo = (firebaseTimestamp) => {
  if (!firebaseTimestamp || typeof firebaseTimestamp.toDate !== 'function') {
    return 'agora';
  }
  const date = firebaseTimestamp.toDate();
  const seconds = Math.floor((new Date() - date) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "a";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "m";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "min";
  return Math.floor(seconds) < 10 ? 'agora' : Math.floor(seconds) + "s";
};

function Post({ post }) {
  // CHAMAR TODOS OS HOOKS NO TOPO DA FUNÇÃO
  const { currentUser } = useAuth(); // Hook useAuth (provavelmente usa useContext)
  const [isLiked, setIsLiked] = useState(false); // Hook useState
  const [likesCount, setLikesCount] = useState(0); // Hook useState, inicializado com 0

  useEffect(() => {
    // Só executa a lógica se 'post' for válido e tiver um 'id'
    if (post && post.id) {
      // Define se o post está curtido pelo usuário atual
      if (currentUser && Array.isArray(post.likedBy) && post.likedBy.includes(currentUser.uid)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
      // Define a contagem de likes
      setLikesCount(typeof post.likes === 'number' ? post.likes : 0);
    } else {
      // Se 'post' for inválido, reseta os estados para valores padrão seguros
      setIsLiked(false);
      setLikesCount(0);
    }
  }, [post, currentUser]); // Dependências do useEffect

  // Isso é feito APÓS todas as chamadas de Hooks.
  if (!post || !post.id) {
    // console.warn("Componente Post: 'post' prop é inválida ou não tem ID. Não renderizando.", post);
    return null; // Não renderiza nada se o post for inválido
  }

  // A partir daqui, 'post' é considerado válido.
  // Podemos calcular initialCommentsCount aqui com segurança.
  const initialCommentsCount = typeof post.commentsCount === 'number' ? post.commentsCount : 0;

  const handleLike = async () => {
    if (!currentUser) {
        console.error("Usuário não autenticado para curtir.");
        return;
    }
    // 'post.id' já foi validado pelo early return acima

    const postRef = doc(db, "posts", post.id);
    try {
      const newLikedState = !isLiked;
      // Atualização otimista da UI antes da chamada ao backend
      setIsLiked(newLikedState);
      setLikesCount(prevLikes => newLikedState ? prevLikes + 1 : Math.max(0, prevLikes - 1));

      if (newLikedState) { // Se curtiu
        await updateDoc(postRef, {
          likes: increment(1),
          likedBy: arrayUnion(currentUser.uid)
        });
      } else { // Se descurtiu
        await updateDoc(postRef, {
          likes: increment(-1),
          likedBy: arrayRemove(currentUser.uid)
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar like: ", error);
      // Reverter UI em caso de erro na chamada ao backend
      setIsLiked(!isLiked); 
      setLikesCount(prevLikes => !isLiked ? prevLikes + 1 : Math.max(0, prevLikes - 1));
      alert("Não foi possível atualizar o like. Tente novamente.");
    }
  };
  
  //RENDERIZAR O JSX
  return (
    <Card className="post-card">
      <Card.Body>
        <div className="post-header">
          <Image 
            src={post.authorPhotoURL || defaultAvatar} 
            roundedCircle 
            alt={post.authorName || "Autor"}
            onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
          />
          <div>
            <span className="post-author">{post.authorName || "Usuário Anônimo"}</span>
            <span className="post-time">{formatTimeAgo(post.timestamp)}</span>
          </div>
        </div>
        <div className="post-content">
          {post.text || ""} 
        </div>
        <div className="post-actions">
          <div onClick={handleLike} className={isLiked ? 'liked' : ''}>
            {isLiked ? <AiFillHeart size={22} /> : <AiOutlineHeart size={22} />} 
            <span className="ms-1">{likesCount}</span>
          </div>
          <div onClick={() => alert('Funcionalidade de comentários em desenvolvimento.')}>
            <BiCommentDetail size={22} />
            <span className="ms-1">{initialCommentsCount}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Post;