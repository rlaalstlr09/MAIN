import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  email: string;
 
}

export default function LoginButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get<User>('http://localhost:8080/api/session', { withCredentials: true })
      .then(response => setUser(response.data))
      .catch(error => console.error('There was an error!', error));
  }, []);

  return user ? (
    <div>{user.email}</div>
  ) : (<div>
    로그인이 필요합니다.<br/>
    <a href="http://localhost:8080/oauth2/authorization/google">
      <img src="GoogleLogin.png" alt="Login with Google" />
    </a>
    </div>
  );
}