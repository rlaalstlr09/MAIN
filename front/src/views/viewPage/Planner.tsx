import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Planner {
  end_time: string;
  id: number;
  title: string;
  todo: string;
  start_time: string;
  place: string;
  memo: string;
}



export default function PlannerPage() {
  const [planner, setPlanner] = useState<Planner | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleUpdate = async (id: number) => {
    navigate(`/calendar/check/update/${id}`);
  };
  
  const handleDelete = async (id: number) => {
    try {
        await axios.delete(`http://localhost:8080/api/planner/${id}`, { withCredentials: true });
        alert('삭제 성공');
        const response = await axios.get(`http://localhost:8080/api/planner/${id}`, { withCredentials: true });
        setPlanner(response.data);
    } catch (error) {
        console.error('삭제 에러', error);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/planner/${id}`)
      .then(response => {
        console.log(response.data);
        setPlanner(response.data);
      })
      .catch(error => console.error('There was an error!', error));
  }, [id]);  

   if (!planner) return null;

   return (
     <div>
       <h2>{planner.title}</h2>
       <p>Todo: {planner.todo}</p>
       <p>Start Time: {planner.start_time}</p>
       <p>End Time: {planner.end_time}</p>
       <p>Place: {planner.place}</p>
       <p>Memo: {planner.memo}</p>
     </div>
   );
}