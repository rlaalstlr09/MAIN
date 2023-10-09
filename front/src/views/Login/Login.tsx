import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

const clientId = "78381076150-8e8lrtqv3f37clo72fq9o1t9ast0bbls.apps.googleusercontent.com"; 

export default function LoginPage() {
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('tokenId' in response) {
      console.log(response.profileObj); // 로그인한 사용자 정보 출력
    }
  }
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  );
}
