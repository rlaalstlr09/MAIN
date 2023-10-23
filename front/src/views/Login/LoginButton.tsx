// import React, { Component } from 'react';

// declare global {
//   interface Window {
//     google: any;
//   }
// }

// interface GoogleResponse {
//   credential: string;
// }

// class GoogleSignInButton extends Component {
//   componentDidMount() {
//     window.google.accounts.id.initialize({
//       client_id: '444728658488-bcjatt5fqktq6cnrr57hkv7nb0jbb0c5.apps.googleusercontent.com',
//       callback: this.handleCredentialResponse,
//     });
//     window.google.accounts.id.renderButton(
//       document.getElementById('google-signin-btn'),
//       {}  // customization options
//     );
//   }

//   handleCredentialResponse = (response: GoogleResponse) => {
//     console.log(response);
//     // 여기서 백엔드 서버에 인증 정보를 보내서 세션을 생성하거나 JWT 토큰을 받아옵니다.
//   };

//   render() {
//     return (
//       <div>
//         <button id="google-signin-btn">Sign in with Google</button>
//       </div>
//     );
//   }
// }

// export default GoogleSignInButton;

export{};