import React, { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import defaultAvatar from '../../assets/default-avatar.png'; // Certifique-se que este caminho está correto
import { BsCardImage, BsEmojiSmile } from "react-icons/bs";

function CreatePostBox() {
  const [postText, setPostText] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const { currentUser } = useAuth();

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!postText.trim() || !currentUser) {
      alert("O texto do post não pode estar vazio e você precisa estar logado.");
      return;
    }

    setIsPosting(true);
    try {
      // Ao criar um novo post, inicialize todos os campos esperados
      await addDoc(collection(db, "posts"), {
        text: postText,
        authorName: currentUser.displayName || "Usuário Anônimo",
        authorPhotoURL: currentUser.photoURL || defaultAvatar,
        authorId: currentUser.uid,
        timestamp: serverTimestamp(),
        likes: 0,                 // Inicializa likes como 0
        likedBy: [],              // Inicializa likedBy como um array vazio
        commentsCount: 0,         // Inicializa commentsCount como 0
      });
      setPostText(''); 
    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Falha ao criar post. Verifique o console para detalhes.");
    }
    setIsPosting(false);
  };

  if (!currentUser) {
    return null; 
  }

  return (
    <div className="create-post-box">
      <div className="user-avatar-input">
        <Image 
          src={currentUser.photoURL || defaultAvatar} 
          roundedCircle 
          alt="Seu avatar" 
          onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
        />
        <Form onSubmit={handlePostSubmit} className="w-100">
          <Form.Group controlId="postTextArea">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={`No que você está pensando, ${currentUser.displayName?.split(' ')[0] || 'Usuário'}?`}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              disabled={isPosting}
            />
          </Form.Group>
          <div className="create-post-actions mt-2">
            <div className="icons">
              <BsCardImage size={22} onClick={() => alert('Upload de imagem ainda não implementado.')}/>
              <BsEmojiSmile size={22} onClick={() => alert('Seletor de emoji ainda não implementado.')}/>
            </div>
            <Button 
              variant="primary" 
              type="submit" 
              disabled={isPosting || !postText.trim()} 
              className="btn-postar"
            >
              {isPosting ? 'Postando...' : 'Postar'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreatePostBox;