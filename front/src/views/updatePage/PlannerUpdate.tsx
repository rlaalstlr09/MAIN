import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack } from '@mui/material';

interface Plan {
    title: string;
    todo: string;
    date: string;
    start_time: string;
    end_time: string;
    place: string;
    memo: string;
  }
  
  const PUpdatePage: React.FC = () => {
    const [plannerTitle, setPlannerTitle] = useState<string>("");
    const [plannerDate, setPlannerDate] = useState<string>("");
    const [plans, setPlans] = useState<Plan[]>([]);
    const navigate = useNavigate();
    const { id: plannerId } = useParams();

  
    useEffect(() => {
      const fetchPlanner = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/planner/${plannerId}`, { withCredentials: true });
          setPlannerTitle(response.data.title);
          setPlannerDate(response.data.date);
          setPlans(response.data.plans);
        } catch (error) {
          console.error('계획표 불러오기 에러', error);
        }
      };
    
      fetchPlanner();
    },  [plannerId]);
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        try {
          // Save the planner and the plans
          const planner = { title: plannerTitle, date: plannerDate, plans };
          await axios.put(`http://localhost:8080/api/planner/${plannerId}`, planner, { withCredentials: true });
      
          alert('수정 되었습니다.');
          navigate(`/calendar`);
      
          setPlans([{ title: "", todo: "",date:"", start_time: "", end_time: "", place: "", memo: "" }]);
          setPlannerTitle("");
          setPlannerDate("");
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error('계획표 수정 에러', error);
            if (error.response?.data) {
              alert(error.response.data);
            }
          }
        }
      };

      const handleChangePlan = (index: number, field: keyof Plan, value: string) => {
        const newPlans = [...plans];
        newPlans[index][field] = value;
        setPlans(newPlans);
      };
    
      const handleRemovePlan = (index: number) => {
        const newPlans = [...plans];
        newPlans.splice(index, 1);
        setPlans(newPlans);
      };

      const handleAddPlan = () => {
        setPlans([
          ...plans,
          { title: "", todo: "",date:"", start_time: "", end_time: "", place: "", memo: "" }
        ]);
      };

    return (
     
        <Box
      component="form"
      sx={{ m: 1, width: '80%', margin: '0 auto', mt: 3 }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
  >
           
            <h4>계획표 수정</h4>
            <Stack spacing={2}>
            <TextField fullWidth label="제목" value={plannerTitle} onChange={e => setPlannerTitle(e.target.value)} />
            <TextField fullWidth label="날짜" type="date" value={plannerDate} onChange={e => setPlannerDate(e.target.value)} />
                   
            {plans.map((plan, index) => (
            <div key={index}>
                <TextField fullWidth label="할 일" id={`todo_${index}`} value={plan.todo} onChange={e => handleChangePlan(index, 'todo', e.target.value)} />
                <TextField fullWidth label="시작 시간" id={`start_time_${index}`} type="time" value={plan.start_time} onChange={e => handleChangePlan(index, 'start_time', e.target.value)} />
                <TextField fullWidth label="끝 시간" id={`end_time_${index}`} type="time" value={plan.end_time} onChange={e => handleChangePlan(index, 'end_time', e.target.value)} />
                <TextField fullWidth label="장소" id={`place_${index}`} value={plan.place} onChange={e => handleChangePlan(index, 'place', e.target.value)} />
                <TextField fullWidth label="메모" id={`memo_${index}`} value={plan.memo} onChange={e => handleChangePlan(index, 'memo', e.target.value)} />
                <Button onClick={() => handleRemovePlan(index)}>계획 삭제</Button>
            </div>
            ))}
            <Button onClick={handleAddPlan}>계획 추가</Button>
            <Button type = "submit" variant="contained" >수정</Button>
            <Button variant="contained" onClick={() => navigate('/calendar')}>취소</Button>
            </Stack>
        </Box>
    );
  }

  export default PUpdatePage;