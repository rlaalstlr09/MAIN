import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './css/PlannerCalendar.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

class CalendarPage extends Component {
    render() {
        const events = [
            { title : 'Planner', date : '2023-09-20' },
        ]
        const calendarOptions = {
            defaultView: "dayGridMonth",
            plugins: [dayGridPlugin],
            events:{events}
        };

        return (
          <div className="App">
            
            <div className="calendar">
                <br></br>
                <FullCalendar {...calendarOptions} />
            </div>
            <div className="Button">
                <Button variant="contained" className="write" component={Link} to="/planner/write">계획표 작성</Button>
               
            </div>
          </div>
        );
    }
}

export default CalendarPage;