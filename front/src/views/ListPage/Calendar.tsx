import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../css/Calendar.css';
import { Button } from '@mui/material';

interface Planner {
  id: number;
  title: string;
  date: string; 
}

export default function CalendarPage() {
  const [planners, setPlanners] = useState<Planner[]>([]);
  const navigate = useNavigate();

  const handleClick = (info : any) => {
    navigate(`/calendar/planner/${info.event.id}`);
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/api/planner`,{
      withCredentials: true
  })
      .then(response => {
        setPlanners(response.data);
      })
      .catch(error => console.error('There was an error!', error));
  }, []);

  return (
    <div className="main">
      <div className='calendar'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={planners.map(planner => ({
            id: String(planner.id),
            title: planner.title,
            date: new Date(planner.date).toISOString(),
          }))}
          eventClick= {handleClick}
        />
    </div>
    <div className="Button">
    <Button variant="contained" className="write" component={Link} to="/calendar/planner/write">계획표 작성</Button>
    
  </div>
</div>
  );
}