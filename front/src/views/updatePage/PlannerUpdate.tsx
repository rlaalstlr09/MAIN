import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function PUpdatePage() {

    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [todo, setTodo] = useState('');
    const [date, setDate] = useState('');
    const [start_time, setStart_time] = useState('');
    const [end_time, setEnd_time] = useState('');
    const [place, setPlace] = useState('');
    const [memo, setMemo] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/planner/${id}`, { withCredentials: true })
            .then(response => {
                setTitle(response.data.title);
                setTodo(response.data.todo);
                setDate(response.data.date);
                setStart_time(response.data.start_time);
                setEnd_time(response.data.end_time);
                setPlace(response.data.place);
                setMemo(response.data.memo);
                
            })
            .catch(error => console.error('There was an error!', error));
    }, [id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
            const response = await axios.put(`http://localhost:8080/api/planner/${id}`, {
              title,
              todo,
              date,
              start_time,
              end_time,
              place,
              memo
            },{
                withCredentials: true
            });

             if (response.status === 200) { // HTTP 상태 코드가 성공을 의미하는 경우
                alert('수정되었습니다.'); // 서버로부터 받은 메시지를 alert 창으로 출력
                navigate(`/calendar`);
      }
            
            setTitle('');
            setTodo('');
            setDate('');
            setStart_time('');
            setEnd_time('');
            setPlace('');
            setMemo('');

        } catch (error) {
            console.error('계획표 수정 에러', error);
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
            <h4>계획표 수정</h4>
            <TextField fullWidth label="제목" id="_title" value={title} onChange={e=> setTitle(e.target.value)} /><br/>
            <TextField fullWidth label="할 일" id="_todo" value={todo} onChange={e=> setTodo(e.target.value)}/><br/>
            <TextField fullWidth label="날짜" id="_date" value={date} onChange={e=> setDate(e.target.value)}/><br/>
            <TextField fullWidth label="시작 시간" id="_start_time" value={start_time} onChange={e=> setStart_time(e.target.value)}/> ~ <TextField fullWidth label="끝 시간" id="_end_time" value={end_time} onChange={e=> setEnd_time(e.target.value)}/><br/>
            <TextField fullWidth label="장소" id="_place" value={place} onChange={e=> setPlace(e.target.value)}/><br/>
            <TextField fullWidth label="메모" id="_memo" value={memo} onChange={e=> setMemo(e.target.value)}/><br/>
            <Button type = "submit" variant="contained" >수정</Button>
            <Button variant="contained" onClick={() => navigate('/calendar')}>취소</Button>
        </Box>
    );
  }