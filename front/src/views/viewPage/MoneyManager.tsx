import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface MoneyManager {
    date: string;
    place: string;
    in_money: number;
    out_money:number;
    head_count:number;

  }
  
  export default function MoneyManagerPage() {
    const [moneyManager, setMoneyManager] = useState<MoneyManager | null>(null);
    const { id } = useParams<{ id: string }>();
  
    useEffect(() => {
      axios.get(`http://localhost:8080/api/money/${id}`)
        .then(response => {
          console.log(response.data);
          setMoneyManager(response.data);
        })
        .catch(error => console.error('There was an error!', error));
    }, [id]);  
  
     if (!moneyManager) return null;
  
     return (
       <div>
         <p>Date {moneyManager.date}</p>
         <p>Place: {moneyManager.place}</p>
         <p>inMoney: {moneyManager.in_money}</p>
         <p>outMoney: {moneyManager.out_money}</p>
         <p>headCount: {moneyManager.head_count}</p>
         
         
       </div>
     );
  }