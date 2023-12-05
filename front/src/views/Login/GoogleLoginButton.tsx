import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface User {
  email: string;
 
}
interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GoogleLoginModal({ isOpen, onClose }: GoogleLoginModalProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get<User>('http://localhost:8080/api/session', { withCredentials: true })
      .then(response => setUser(response.data))
      .catch(error => console.error('There was an error!', error));
  }, []);

  const modalStyle = {
    position: 'absolute',
    display: 'flex',  
    flexDirection: 'column', 
    alignItems: 'center',  
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    gap: 2,
    width: 400,
    height: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
    <Box sx={modalStyle}>
    <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <div className="login-logo">
        <img className="logo" src="Logo2.png" alt="logo" />
        </div>
        <div className="modal">
      
    <Typography variant="h3" component="div" marginLeft={'30px'}>
    Login<br/>
    </Typography>
    
    </div>
    <hr className='modal-hr'/>
    <a href="http://localhost:8080/oauth2/authorization/google">
      <img src="GoogleLogin.png" alt="Login with Google" />
    </a>
    
    </Box>
    </Modal>
  );
}