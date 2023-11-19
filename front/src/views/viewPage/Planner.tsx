import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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
        const sortedData = response.data;
        sortedData.plans.sort((a: Plan, b: Plan) => a.start_time.localeCompare(b.start_time)); // 시간을 기준으로 정렬
        setPlanner(sortedData);
      })
      .catch(error => console.error('There was an error!', error));
  }, [id]);

   if (!planner) return null;

  return (
    <div className='App'>
      <div style={{ height: '60%', width: '60%' }}> 
      <h2>{planner.title}</h2>
      <p>Date: {planner.date}</p>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>시작 시간</TableCell>
              <TableCell>종료 시간</TableCell>
              <TableCell>할 일</TableCell>
              <TableCell>장소</TableCell>
              <TableCell>메모</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {planner.plans.map((plan, index) => (
              <TableRow key={index}>
                <TableCell>{plan.start_time}</TableCell>
                <TableCell>{plan.end_time}</TableCell>
                <TableCell>{plan.todo}</TableCell>
                <TableCell>{plan.place}</TableCell>
                <TableCell>{plan.memo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => handleUpdate(planner.id)}>수정</Button>
      <Button onClick={() => handleDelete(planner.id)}>삭제</Button>
      </div>
    </div>
);
}