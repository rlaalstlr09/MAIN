import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CWritePage() {

    const [place, setPlace] = useState('');
    const [todo, setTodo] = useState('');
   
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8080/check', {
              place,
              todo,
            });

             if (response.status === 200) { // HTTP 상태 코드가 성공을 의미하는 경우
                 alert(response.data); // 서버로부터 받은 메시지를 alert 창으로 출력
      }
            
            setPlace('');
            setTodo('');

        } catch (error) {
            console.error('예산관리 작성 에러', error);
            if ((error as AxiosError).response && (error as AxiosError).response?.data) { 
                alert((error as AxiosError).response?.data); // 에러 메시지를 alert 창으로 출력
            }
         }
       };
    return (
     
        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <h4>계획표 작성</h4><br/>
            <TextField fullWidth label="할 일" id="_todo" value={todo} onChange={e=> setTodo(e.target.value)}/><br/>
            <TextField fullWidth label="장소" id="_place" value={place} onChange={e=> setPlace(e.target.value)}/><br/>
            <Button type = "submit"variant="contained" className="write">저장</Button>
        </Box>
    );
  }