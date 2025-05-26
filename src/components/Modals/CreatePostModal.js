// src/components/Modals/CreatePostModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, Image, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import defaultAvatar from '../../assets/default-avatar.png'; // Certifique-se que este caminho está correto
import { BsCardImage } from "react-icons/bs";

function CreatePostModal({ show, handleClose }) {
  const [postText, setPostText] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  // Futuramente: const [postImage, setPostImage] = useState(null);
  // Futuramente: const [imagePreview, setImagePreview] = useState('');

  const { currentUser } = useAuth();

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!postText.trim() && !postImage) { // Verifica se há texto ou imagem
      alert("O post precisa de conteúdo (texto ou imagem).");
      return;
    }
    if (!currentUser) {
      alert("Você precisa estar logado para postar.");
      return;
    }

    setIsPosting(true);
    try {
      // Lógica para upload de imagem viria aqui (Firebase Storage)
      // Por enquanto, vamos focar no texto. 
      // let imageUrl = '';
      // if (postImage) { /* ... upload image and get URL ... */ }

      await addDoc(collection(db, "posts"), {
        text: postText,
        // imageUrl: imageUrl, // Adicionar quando a funcionalidade de imagem estiver pronta
        authorName: currentUser.displayName || "Usuário Anônimo",
        authorPhotoURL: currentUser.photoURL || defaultAvatar,
        authorId: currentUser.uid,
        timestamp: serverTimestamp(),
        likes: 0,
        likedBy: [],
        commentsCount: 0,
      });
      setPostText('');
      // setPostImage(null);
      // setImagePreview('');
      handleClose(); // Fecha o modal após o post
    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Falha ao criar post. Verifique o console para detalhes.");
    }
    setIsPosting(false);
  };

  // Futuramente:
  // const handleImageChange = (e) => {
  //   if (e.target.files[0]) {
  //     setPostImage(e.target.files[0]);
  //     setImagePreview(URL.createObjectURL(e.target.files[0]));
  //   }
  // };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Criar nova postagem</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-start mb-3">
          <Image 
            src={currentUser?.photoURL || defaultAvatar} 
            roundedCircle 
            alt="Seu avatar" 
            style={{ width: '45px', height: '45px', marginRight: '10px' }}
            onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
          />
          <span style={{ fontWeight: '500', marginTop: '10px' }}>{currentUser?.displayName || "Usuário"}</span>
        </div>
        <Form onSubmit={handlePostSubmit}>
          <Form.Group controlId="postModalTextArea">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder={`No que você está pensando, ${currentUser?.displayName?.split(' ')[0] || 'Usuário'}?`}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              disabled={isPosting}
              style={{ border: 'none', boxShadow: 'none', resize: 'none', paddingLeft: 0 }}
            />
          </Form.Group>
          
          {/* Placeholder para preview de imagem (futuro) */}
          {/* {imagePreview && (
            <div className="my-2 text-center">
              <Image src={imagePreview} thumbnail style={{ maxHeight: '200px' }} />
            </div>
          )} */}

          <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
            <div>
              {/* Botão para adicionar foto (funcionalidade futura) */}
              <Button 
                variant="light" 
                onClick={() => alert('Upload de fotos será implementado em breve!')} 
                title="Adicionar foto"
                className="me-2"
              >
                <BsCardImage size={22} style={{color: "#4DB6AC"}}/>
              </Button>
              {/* Outros ícones como emoji podem ser adicionados aqui */}
            </div>
            <Button 
              variant="primary" 
              type="submit" 
              disabled={isPosting || (!postText.trim()/* && !postImage*/)} // Habilita se houver texto ou imagem
              className="btn-postar" // Reutilizar a classe do App.css
            >
              {isPosting ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-1" /> 
              ) : null}
              {isPosting ? 'Postando...' : 'Postar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreatePostModal;