import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function GenericModal({ show, handleClose, title, body }) {
  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered
      dialogClassName="glassmorphism-effect" // Aplicando o efeito ao diálogo do modal
    >
      <Modal.Header closeButton style={{ borderBottom: 'none' }}> {/* Removendo borda padrão */}
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: '#333' }}> {/* Garantir cor do texto legível */}
        {body}
      </Modal.Body>
      <Modal.Footer style={{ borderTop: 'none' }}> {/* Removendo borda padrão */}
        <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: 'rgba(0,0,0,0.1)', border: 'none'}}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GenericModal;