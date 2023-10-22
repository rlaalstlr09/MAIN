import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleSignInButton from './LoginButton';  // GoogleSignInButton 컴포넌트 임포트
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface User{
    nickname:string;
}



const App = () => {
    
    const [open, setOpen] = React.useState(false);
      
    const handleClickOpen = () => {
        axios.post('/logout', {}, { withCredentials : true })
        .then(Response => {

        })
        .catch(error => {

        })
    };
    
    const handleClose = () => {
        setOpen(false);
    };

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get('/user')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div>
      {user ? (
        <>
          <p>{user.nickname}</p>
          <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        로그아웃
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"로그아웃"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            정말 로그아웃 하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleClickOpen} autoFocus>
            로그아웃
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        </>
      ) : (
          <button onClick={handleClose}>로그인</button>  
      )}
    </div>
  );
};

export default App;