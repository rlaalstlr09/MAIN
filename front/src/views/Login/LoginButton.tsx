import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  email: string;
  // 필요에 따라 User 인터페이스에 다른 필드를 추가할 수 있습니다.
}

export default function LoginButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get<User>('http://localhost:8080/api/session', { withCredentials: true })
      .then(response => setUser(response.data))
      .catch(error => console.error('There was an error!', error));
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return user ? <div>{user.email}</div> : <button onClick={handleLogin}>Login with Google</button>;
}