import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PWritePage() {

    const [title, setTitle] = useState('');
    const [todo, setTodo] = useState('');
    const [date, setDate] = useState('');
    const [start_time, setStart_time] = useState('');
    const [end_time, setEnd_time] = useState('');
    const [place, setPlace] = useState('');
    const [memo, setMemo] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8080/planner', {
              title,
              todo,
              date,
              start_time,
              end_time,
              place,
              memo
            });

             if (response.status === 200) { // HTTP 상태 코드가 성공을 의미하는 경우
                 alert(response.data); // 서버로부터 받은 메시지를 alert 창으로 출력
      }
            
            setTitle('');
            setTodo('');
            setDate('');
            setStart_time('');
            setEnd_time('');
            setPlace('');
            setMemo('');

        } catch (error) {
            console.error('계획표 작성 에러', error);
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
            <h4>계획표 작성</h4>
            <TextField fullWidth label="제목" id="_title" value={title} onChange={e=> setTitle(e.target.value)} /><br/>
            <TextField fullWidth label="할 일" id="_todo" value={todo} onChange={e=> setTodo(e.target.value)}/><br/>
            <TextField fullWidth label="날짜" id="_date" value={date} onChange={e=> setDate(e.target.value)}/><br/>
            <TextField fullWidth label="시작 시간" id="_start_time" value={start_time} onChange={e=> setStart_time(e.target.value)}/> ~ <TextField fullWidth label="끝 시간" id="_end_time" value={end_time} onChange={e=> setEnd_time(e.target.value)}/><br/>
            <TextField fullWidth label="장소" id="_place" value={place} onChange={e=> setPlace(e.target.value)}/><br/>
            <TextField fullWidth label="메모" id="_memo" value={memo} onChange={e=> setMemo(e.target.value)}/><br/>
            <Button type = "submit"variant="contained" className="write">저장</Button>
        </Box>
    );
  }