import React, { Component } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleResponse {
  email:string;
  nickname:string;
}

class GoogleSignInButton extends Component {
  componentDidMount() {
    window.google.accounts.id.initialize({
      client_id: '444728658488-bcjatt5fqktq6cnrr57hkv7nb0jbb0c5.apps.googleusercontent.com',
      callback: this.handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById('google-signin-btn'),
      {}  // customization options
    );
  }

  handleCredentialResponse = (response: GoogleResponse) => {
    console.log(response);
    // 여기서 백엔드 서버에 인증 정보를 보내서 세션을 생성하거나 JWT 토큰을 받아옵니다.
  };

  render() {
    return <div id="google-signin-btn"></div>;
  }
}

export default GoogleSignInButton;
