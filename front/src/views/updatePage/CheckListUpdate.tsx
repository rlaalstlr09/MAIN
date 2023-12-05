import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack } from '@mui/material';



export default function CUpdatePage() {
    const { id } = useParams();  // URL의 경로 파라미터에서 ID를 가져옵니다.
    const navigate = useNavigate();
    
    const [place, setPlace] = useState('');
    const [todo, setTodo] = useState('');

    const [value, setValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
  
      // 입력된 값이 숫자인지 확인
      if (!isNaN(Number(newValue))) {
        setValue(newValue);
      } else {
        // 숫자가 아닌 경우 경고를 표시하거나 무시할 수 있습니다.
        console.warn('숫자만 입력 가능합니다.');
      }
    };

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
        display={'flex'}
        alignItems="center"
  justifyContent="center"
           component="form"
           sx={{ m: 1, width: '100%', margin: '0 auto', mt: 3 }}
           noValidate
           autoComplete="off"
           onSubmit={handleSubmit}
       >
         <div className="write-outline">
           <div className="write-form">
              <h2 style={{marginBottom:'3%'}}>체크리스트 수정</h2>
            <Stack spacing={2}>
            <TextField fullWidth label="할 일" id="_todo" value={todo} onChange={e=> setTodo(e.target.value)}/><br/>
            <TextField fullWidth label="장소" id="_place" value={place} onChange={e=> setPlace(e.target.value)}/><br/>
            </Stack>
            <div className='button-form'>
            <Button className='write-button' type = "submit" variant="contained" >수정</Button>
            <Button className='write-button' variant="outlined" onClick={() => navigate('/check')}>취소</Button>
            </div>
            
            </div>
            </div>
        </Box>
    );
  }