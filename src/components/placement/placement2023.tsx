// pages/index.tsx
import { GetServerSideProps } from 'next';
import PlacementList from '../placementlist';
import { useEffect ,useState } from 'react';

type Placement = {
  _id: string;
  ROLL: number;
  NAME: string;
  Gender: string;
  MOBILE: number;
  Company: string;
  Salary?: string;
  Post: string;
};



const PlacementContent = () => { 
  const [placements, setPlacements] = useState<Placement[]>([]);

  useEffect(()=>{
    const fetchPlacements = async()=>{
      try {
        const response = await fetch('http://localhost:3001/2023-placement');
        const data = await response.json();
        setPlacements(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPlacements();
  },[]);

  
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-2xl font-bold text-center mb-6 text-slate-950">Student Placement Data</h1>
      <PlacementList placements={placements} />
    </div>
  );
};



export default PlacementContent;
