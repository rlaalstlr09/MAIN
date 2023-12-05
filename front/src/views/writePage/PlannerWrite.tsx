import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const initialDate = queryParams.get('date') || '';
  const initialPlace = queryParams.get('place') || '';
    const [plans, setPlans] = useState<Plan[]>([
      { title: "", todo: "", date:"",start_time: "", end_time: "", place: initialPlace, memo: "" }
    ]);
    const [plannerTitle, setPlannerTitle] = useState("");
    const [plannerDate, setPlannerDate] = useState(initialDate);
    const navigate = useNavigate();
  
    const handleAddPlan = () => {
      setPlans([
        ...plans,
        { title: "", todo: "",date:"", start_time: "", end_time: "", place: "", memo: "" }
      ]);
    };

    const handleRemovePlan = (index: number) => {
      const newPlans = [...plans];
      newPlans.splice(index, 1);
      setPlans(newPlans);
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
      display="flex"
      component="form"
      alignItems="center"
  justifyContent="center"
      sx={{ m: 1, width: '100%', margin: '0 auto', mt: 3 }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
  >
        <div className="write-outline">
            <div className="write-form">
          <h1>계획표 작성</h1>
          <Stack spacing={2}>
          <TextField style={{width:'500px' , margin:'20px auto'}} variant="standard" label="제목" value={plannerTitle} onChange={e => setPlannerTitle(e.target.value)} />
          <TextField style={{width:'500px', margin:'20px auto'}} variant="standard" InputLabelProps={{shrink: true, }} label="날짜" type="date" value={plannerDate} onChange={e => setPlannerDate(e.target.value)} />
                   <br/>
          {plans.map((plan, index) => (
              <div key={index} className='planner-text'>
               
                  <TextField fullWidth label="할 일" id={`todo_${index}`} value={plan.todo} onChange={e => handleChangePlan(index, 'todo', e.target.value)} />
                  <TextField fullWidth InputLabelProps={{shrink: true, }} label="시작 시간" id={`start_time_${index}`} type="time" value={plan.start_time} onChange={e => handleChangePlan(index, 'start_time', e.target.value)} />
                  <TextField fullWidth InputLabelProps={{shrink: true, }} label="끝 시간" id={`end_time_${index}`} type="time" value={plan.end_time} onChange={e => handleChangePlan(index, 'end_time', e.target.value)} />
                  <TextField fullWidth label="장소" id={`place_${index}`} value={plan.place} onChange={e => handleChangePlan(index, 'place', e.target.value)} />
                  <TextField fullWidth multiline label="메모" id={`memo_${index}`} value={plan.memo} onChange={e => handleChangePlan(index, 'memo', e.target.value)} />
                 
                  <IconButton aria-label="delete" onClick={() => handleRemovePlan(index)}><DeleteIcon fontSize='medium'/></IconButton>
                  
                  
              </div>
          ))}
            </Stack>
          <div className='add-button-form'>
            <hr className='hr'/>
          <IconButton style={{backgroundColor:'white'}} size='large' onClick={handleAddPlan}><AddIcon color='secondary' fontSize='large'/></IconButton>
          </div>
          <div className='button-form'>
          <Button className='write-button' variant="contained" type="submit">저장</Button>
          <Button className='write-button' variant="outlined" onClick={() => navigate('/calendar')}>취소</Button>
          </div>  
      </div>
      </div>
  </Box>
);
}
export default PWritePage;