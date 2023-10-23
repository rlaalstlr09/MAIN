import React from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import axios from 'axios';

const clientId = 'YOUR_CLIENT_ID.apps.googleusercontent.com';

const GoogleSignInButton = () => {
  const handleLogin = async (res : GoogleLoginResponse) => {
    console.log('Login Success:', res.profileObj);
    
    try{
        const response = await axios.post('/api/login', { idtoken : res.tokenId });
        // Handle successful response here.
        console.log(response.data);
        
    }catch(err){
        // Handle error here.
        console.error(err);
        
    }
  };

  const onSuccess = (res: GoogleLoginResponse | any) => {
    handleLogin(res);
  };

  const onFailure = (res : any) => {
    console.log('Login failed: ', res);
  };

  return (
      <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
      />
   );
};

export default GoogleSignInButton;