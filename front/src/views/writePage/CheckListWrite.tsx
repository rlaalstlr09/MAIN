import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';


export default function CWritePage() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const initialPlace = queryParams.get('place') || '';
  
    const [place, setPlace] = useState(initialPlace);
    const [todo, setTodo] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8080/api/check', {
              place,
              todo,
              
            },{
                withCredentials: true
            });

             if (response.status === 200) { // HTTP 상태 코드가 성공을 의미하는 경우
                alert('저장되었습니다.'); // 서버로부터 받은 메시지를 alert 창으로 출력
                navigate(`/check`);
      }
            
            setPlace('');
            setTodo('');

        } catch (error) {
            console.error('체크리스트 작성 에러', error);
            if ((error as AxiosError).response && (error as AxiosError).response?.data) { 
                alert((error as AxiosError).response?.data); // 에러 메시지를 alert 창으로 출력
            }
         }
       };
    return (
     
        <Box
            component="form"
            sx={{ m: 1, width: '80%', margin: '0 auto', mt: 3 }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <h4>체크리스트 작성</h4><br/>
            <Stack spacing={2}>
            
            <TextField fullWidth label="할 일" id="_todo" value={todo} onChange={e=> setTodo(e.target.value)}/><br/>
            <TextField fullWidth label="장소" id="_place" value={place} onChange={e=> setPlace(e.target.value)}/><br/>
            <div>
            <Button type = "submit" variant="contained" >저장</Button>
            <Button variant="contained" onClick={() => navigate('/check')}>취소</Button>
            </div>
            </Stack>
        </Box>
    );
  }