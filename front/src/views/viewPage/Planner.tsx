import FullCalendar from '@fullcalendar/react';
import { Button, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventClickArg } from '@fullcalendar/core';
import PlannerModal from './PlannerModal';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type Plan = {
  id: number;
  todo: string;
  start_time: string;
  end_time: string;
  place: string;
  memo: string;
};

type Planner = {
  id: number;
  title: string;
  date: string;
  plans: Plan[];
};

export default function PlannerPage() {
  const [planner, setPlanner] = useState<Planner | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  const handleEventClick = ({ event }: EventClickArg) => {
  setSelectedPlanId(Number(event.id));
  setModalOpen(true);
};

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

const handleClose = () => {
  setAnchorEl(null);
};

  const handleUpdate = async (id: number) => {
    navigate(`/calendar/planner/update/${id}`);
  };
  
  const handleDelete = async (id: number) => {
    try {
        await axios.delete(`http://localhost:8080/api/planner/${id}`, { withCredentials: true });
        alert('삭제 성공');
        navigate('/calendar');
    } catch (error) {
        console.error('삭제 에러', error);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/planner/${id}`, { withCredentials: true })
      .then(response => {
        console.log(response.data); 
        const sortedData = response.data;
        sortedData.plans.sort((a: Plan, b: Plan) => a.start_time.localeCompare(b.start_time)); // 시간을 기준으로 정렬
        setPlanner(sortedData);
      })
      .catch(error => console.error('There was an error!', error));
  }, [id]);

   if (!planner) return null;
   function combineDateAndTime(date:Date, timeStr:String) {
    let timeArr = timeStr.split(':');
    let hour = parseInt(timeArr[0]);
    let minute = parseInt(timeArr[1]);
  
    let newDate = new Date(date.getTime());
    newDate.setHours(hour);
    newDate.setMinutes(minute);
  
    return newDate;
  }

   const calendarEvents = planner?.plans.map(plan => ({
    id:plan.id.toString(),
    title: `${plan.todo} - ${plan.place}`,
    start: combineDateAndTime(new Date(planner.date), plan.start_time),
    end: combineDateAndTime(new Date(planner.date), plan.end_time),
  }));


 

  return (
    <div className='App'>
      <div className='outline'> 
      
      <h1 style={{textAlign:'center', marginTop:'4%'}}>{planner.title}</h1>
      <IconButton aria-label="menu"
              onClick={handleClick}
              sx={{
                position: 'absolute',
                right: '27%',
                top: '16.5%',
                color: (theme) => theme.palette.grey[500],
              }} aria-haspopup="true" color='success'>
                  <MoreVertIcon fontSize='large' color='info'/>
                  </IconButton>

                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <Button onClick={() => handleUpdate(planner.id)}>수정</Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button onClick={() => handleDelete(planner.id)}>삭제</Button>
                    </MenuItem>
                    
                  </Menu>
                 
      <div id="calendar">
      <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridDay"
          events={calendarEvents}
          initialDate={planner.date}
          locale='ko' 
          eventClick={handleEventClick}
        />

      <PlannerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        planId={selectedPlanId}
        plannerId={planner.id}
      />
       
          
     
      
      </div>
      </div>
    </div>
);
}