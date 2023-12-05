import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import WriteButton from '../component/WriteButton';
import MenuButton from '../component/MenuButton';
import './css/ListPage.css';
import { format } from 'date-fns';
import interactionPlugin from '@fullcalendar/interaction';
import { Menu, MenuItem, Popover } from '@mui/material';

interface Planner {
  id: number;
  title: string;
  date: string; 
}

const CalendarPage: React.FC = () => {
  const [planners, setPlanners] = useState<Planner[]>([]);
  
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const dateClick = (dateStr:string) => {
    setAnchorEl(document.getElementById('calendar'));
    setSelectedDate(dateStr)
  }

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedDate('');
  };


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
      <div className='outline'>
        <div id="calendar">
        <FullCalendar
      
          plugins={[dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          locale='ko' 
          events={planners.map(planner => ({
            id: String(planner.id),
            title: planner.title,
            date: new Date(planner.date).toISOString(),
          }))}
          eventClick= {handleClick}
          selectable={true}
          
          dateClick={(info) => {
            const dateStr = format(info.date, 'yyyy-MM-dd');
            dateClick(dateStr);
          }}
          displayEventTime={false}
        />
           <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
      >
        <MenuItem onClick={handleClose}>
            <MenuButton redirectPath={`/calendar/planner/write?date=${selectedDate}`} text={"계획표 작성"}/>
        </MenuItem>
      </Popover>
    </div>
    <div className="Button">
      <WriteButton redirectPath='/calendar/planner/write'/>
    </div>
  </div>
</div>
  );
}
export default CalendarPage;