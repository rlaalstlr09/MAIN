import { Button } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
        setPlanner(response.data);
      })
      .catch(error => console.error('There was an error!', error));
  }, [id]);

   if (!planner) return null;

  return (
  <div>
    <h2>{planner.title}</h2>
    <p>Date: {planner.date}</p>
    {planner.plans.map((plan, index) => (
      <div key={index}>
        <p>Todo: {plan.todo}</p>
        <p>Start Time: {plan.start_time}</p>
        <p>End Time: {plan.end_time}</p>
        <p>Place: {plan.place}</p>
        <p>Memo: {plan.memo}</p>
      </div>
    ))}
    <Button onClick={() => handleUpdate(planner.id)}>수정</Button>
    <Button onClick={() => handleDelete(planner.id)}>삭제</Button>
  </div>
);
}