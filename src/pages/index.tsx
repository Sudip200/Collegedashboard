import Image from "next/image";
import { Inter } from "next/font/google";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StarIcon from '@mui/icons-material/Star';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BusinessIcon from '@mui/icons-material/Business';
import ScienceIcon from '@mui/icons-material/Science';
const inter = Inter({ subsets: ["latin"] });
interface DashboardButtonProps {
  title: string;
  icon: React.ReactNode;
}

const DashboardButton:React.FC<DashboardButtonProps> = ({ title, icon }) => {
  return (
    <button className="bg-white shadow-lg p-4 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100 transition duration-200">
      <div className="text-blue-500 mb-2">{icon}</div>
      <p className="text-gray-800 font-semibold">{title}</p>
    </button>
  );
};
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <DashboardButton title="Student Information" icon={<PersonIcon fontSize="large" />} />
        <DashboardButton title="Faculty Details" icon={<SchoolIcon fontSize="large" />} />
        <DashboardButton title="Student Electives" icon={<AssignmentIcon fontSize="large" />} />
        <DashboardButton title="Student Achievements" icon={<StarIcon fontSize="large" />} />
        <DashboardButton title="Faculty Achievements" icon={<StarIcon fontSize="large" />} />
        <DashboardButton title="Gallery" icon={<PhotoLibraryIcon fontSize="large" />} />
        <DashboardButton title="Courses" icon={<MenuBookIcon fontSize="large" />} />
        <DashboardButton title="NBA Details" icon={<BusinessIcon fontSize="large" />} />
        <DashboardButton title="Classrooms & Labs" icon={<ScienceIcon fontSize="large" />} />
      </div>
    </div>
  );
}