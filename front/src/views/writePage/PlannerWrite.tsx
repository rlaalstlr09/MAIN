import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';


  interface Plan {
    title: string;
    todo: string;
    date: string;
    start_time: string;
    end_time: string;
    place: string;
    memo: string;
  }
  
  const PWritePage = () => {
    const [plans, setPlans] = useState<Plan[]>([
      { title: "", todo: "", date:"",start_time: "", end_time: "", place: "", memo: "" }
    ]);
    const [plannerTitle, setPlannerTitle] = useState("");
    const [plannerDate, setPlannerDate] = useState("");
    const navigate = useNavigate();
  
    const handleAddPlan = () => {
      setPlans([
        ...plans,
        { title: "", todo: "",date:"", start_time: "", end_time: "", place: "", memo: "" }
      ]);
    };
  
    const handleChangePlan = (index: number, field: keyof Plan, value: string) => {
      const newPlans = [...plans];
      newPlans[index][field] = value;
      setPlans(newPlans);
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      try {
        // Save the planner
        const plannerResponse = await axios.post('http://localhost:8080/api/planner', { title: plannerTitle, date: plannerDate }, { withCredentials: true });
        const plannerId = plannerResponse.data.id;
  
        // Save the plans
        await Promise.all(plans.map(plan => 
          axios.post(`http://localhost:8080/api/planner/${plannerId}/plan`, plan, { withCredentials: true })
        ));
  
        alert('저장되었습니다.');
        navigate(`/calendar`);
  
        setPlans([{ title: "", todo: "",date:"", start_time: "", end_time: "", place: "", memo: "" }]);
        setPlannerTitle("");
        setPlannerDate("");
        
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('계획표 작성 에러', error);
          if (error.response?.data) {
            alert(error.response.data);
          }
        }
      }
    };
  return(
     <Box
      component="form"
      sx={{ m: 1, width: '80%', margin: '0 auto', mt: 3 }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
  >
      <Stack spacing={2}>
          <h4>계획표 작성</h4>
          <TextField fullWidth label="제목" value={plannerTitle} onChange={e => setPlannerTitle(e.target.value)} />
            <TextField fullWidth label="날짜" type="date" value={plannerDate} onChange={e => setPlannerDate(e.target.value)} />
                   
          {plans.map((plan, index) => (
              <div key={index}>
                  <TextField fullWidth label="할 일" id={`todo_${index}`} value={plan.todo} onChange={e => handleChangePlan(index, 'todo', e.target.value)} />
                  <TextField fullWidth label="시작 시간" id={`start_time_${index}`} type="time" value={plan.start_time} onChange={e => handleChangePlan(index, 'start_time', e.target.value)} />
                  <TextField fullWidth label="끝 시간" id={`end_time_${index}`} type="time" value={plan.end_time} onChange={e => handleChangePlan(index, 'end_time', e.target.value)} />
                  <TextField fullWidth label="장소" id={`place_${index}`} value={plan.place} onChange={e => handleChangePlan(index, 'place', e.target.value)} />
                  <TextField fullWidth label="메모" id={`memo_${index}`} value={plan.memo} onChange={e => handleChangePlan(index, 'memo', e.target.value)} />
              </div>
          ))}
          <Button onClick={handleAddPlan}>계획 추가</Button>
          <Button type="submit">저장</Button>
      </Stack>
  </Box>
);
}
export default PWritePage;