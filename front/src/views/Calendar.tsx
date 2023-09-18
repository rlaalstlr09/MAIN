import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Calendar.css';

class CalendarPage extends Component {
    render() {
        const events = [
            { title : 'Planner1', date : '2023-09-20' },
        ]
        const calendarOptions = {
            defaultView: "dayGridMonth",
            plugins: [dayGridPlugin],
            events:{events}
        };

        return (
           
          <div className="App" style={{ width: "70%", height: "70%", alignContent : "center"}}>
            
            <div className="calendar">
                <br></br>
                <FullCalendar {...calendarOptions} />
            </div>
          </div>
        );
    }
}

export default CalendarPage;