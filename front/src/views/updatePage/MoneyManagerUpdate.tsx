import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function MUpdatePage() {

    const { id } = useParams();

    const [date, setDate] = useState('');
    const [place, setPlace] = useState('');
    const [inMoney, setInMoney] = useState('');
    const [outMoney, setOutMoney] = useState('');
    const [headCount, setHeadCount] = useState('');
    const navigate = useNavigate();

    function handleIntegerInput(setState: React.Dispatch<React.SetStateAction<string>>) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = event.target.value;
      
          // 입력된 값이 정수인지 확인
          if (!isNaN(Number(newValue)) && Number.isInteger(Number(newValue))) {
            setState(newValue);
          } else {
            // 정수가 아닌 경우 경고를 표시하거나 무시할 수 있습니다.
            console.warn('정수만 입력 가능합니다.');
          }
        };
      }

    useEffect(() => {
        axios.get(`http://localhost:8080/api/money/${id}`, { withCredentials: true })
            .then(response => {
                setDate(response.data.date);
                setPlace(response.data.place);
                setInMoney(response.data.inMoney);
                setOutMoney(response.data.outMoney);
                setHeadCount(response.data.headCount);
            })
            .catch(error => console.error('There was an error!', error));
    }, [id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
            const response = await axios.put(`http://localhost:8080/api/money/${id}`, {
              date,
              place,
              inMoney,
              outMoney,
              headCount
              
            },{
                withCredentials: true
            });

             if (response.status === 200) { // HTTP 상태 코드가 성공을 의미하는 경우
                alert('수정되었습니다.'); // 서버로부터 받은 메시지를 alert 창으로 출력
                navigate('/money');
      }
            
            setDate('');
            setPlace('');
            setInMoney('');
            setOutMoney('');
            setHeadCount('');

        } catch (error) {
            console.error('예산관리 수정 에러', error);
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
            <h4>예산관리 수정</h4>
            <TextField fullWidth label="날짜" id="_date" value={date} onChange={e=> setDate(e.target.value)}/><br/>
            <TextField fullWidth label="장소" id="_place" value={place} onChange={e=> setPlace(e.target.value)}/><br/>
            <TextField fullWidth label="사용 예산" id="_memo" value={outMoney} onChange={handleIntegerInput(setOutMoney)}/><br/>
            <TextField fullWidth label="입금 예산" id="_memo" value={inMoney} onChange={handleIntegerInput(setInMoney)}/><br/>
            <TextField fullWidth label="인원 수" id="_memo" value={headCount} onChange={handleIntegerInput(setHeadCount)}/><br/>
            <Button type = "submit" variant="contained" >수정</Button>
            <Button variant="contained" onClick={() => navigate('/money')}>취소</Button>
        </Box>
    );
  }