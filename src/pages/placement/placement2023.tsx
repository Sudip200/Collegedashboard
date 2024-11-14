// pages/index.tsx
import { GetServerSideProps } from 'next';
import PlacementList from '../../components/placementlist';

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

type HomeProps = {
  placements: Placement[];
};

const Home: React.FC<HomeProps> = ({ placements }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-2xl font-bold text-center mb-6 text-slate-950">Student Placement Data</h1>
      <PlacementList placements={placements} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Replace with your API URL
  const response = await fetch('http://localhost:3001/2023-placement');
  const placements = await response.json();
  
  return {
    props: {
      placements,
    },
  };
};

export default Home;
