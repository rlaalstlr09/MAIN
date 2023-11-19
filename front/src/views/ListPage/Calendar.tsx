import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import WriteButton from '../component/WriteButton';
import './css/ListPage.css';

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
    <div className="App">
      <div className='calendar'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale='ko' 
          events={planners.map(planner => ({
            id: String(planner.id),
            title: planner.title,
            date: new Date(planner.date).toISOString(),
          }))}
          eventClick= {handleClick}
          displayEventTime={false}
        />
    </div>
    <div className="Button">
    <WriteButton redirectPath='/calendar/planner/write'/>
    
  </div>
</div>
  );
}