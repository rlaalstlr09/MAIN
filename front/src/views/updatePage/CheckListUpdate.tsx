import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';



export default function CUpdatePage() {
    const { id } = useParams();  // URL의 경로 파라미터에서 ID를 가져옵니다.
    const navigate = useNavigate();
    
    const [place, setPlace] = useState('');
    const [todo, setTodo] = useState('');

    // 페이지가 로드될 때 체크리스트 항목을 조회합니다.
    useEffect(() => {
        axios.get(`http://localhost:8080/api/check/${id}`, { withCredentials: true })
            .then(response => {
                setPlace(response.data.place);
                setTodo(response.data.todo);
            })
            .catch(error => console.error('There was an error!', error));
    }, [id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8080/api/check/${id}`, {
                place,
                todo,
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                alert('수정되었습니다.');
                navigate(`/check`);
            }
        } catch (error) {
            console.error('예산관리 수정 에러', error);
            if ((error as AxiosError).response && (error as AxiosError).response?.data) {
                alert((error as AxiosError).response?.data);
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
            <h4>체크리스트 수정</h4><br/>
            <TextField fullWidth label="할 일" id="_todo" value={todo} onChange={e=> setTodo(e.target.value)}/><br/>
            <TextField fullWidth label="장소" id="_place" value={place} onChange={e=> setPlace(e.target.value)}/><br/>
            <Button type = "submit" variant="contained" className="write">수정</Button>
            <Button type = "reset" variant="contained" className="reset">취소</Button>
        </Box>
    );
  }