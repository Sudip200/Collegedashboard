import Image from "next/image";
import { Inter } from "next/font/google";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { cookies } from "next/headers";
import { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BusinessIcon from '@mui/icons-material/Business';
import PlacementContent from "../components/placement/placement2023";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ScienceIcon from '@mui/icons-material/Science';
import StudentResult from "../components/studentres";
import Courses from "@/components/courses";
import FacultyList from "@/components/facultylist";
const inter = Inter({ subsets: ["latin"] });
interface DashboardButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const DashboardButton:React.FC<DashboardButtonProps> = ({ title, icon ,onClick }) => {
  return (
    <button className="flex flex-row justify-start gap-6 items-center w-full " 
    onClick={onClick}
     >
      <div className="text-blue-500 mb-5 ml-3">{icon}</div>
      <p className="text-gray-800 font-semibold">{title}</p>
    </button>
  );
};
export default function Home() {
  const router = useRouter();
  const [content, setContent] =useState('studentres');
  const [menuVisible, setMenuVisible] = useState(false);

 function renderContent():JSX.Element{
  switch(content){
    case 'studentres':
      return <StudentResult />;
    case 'faculty':
      return <FacultyList/>;
    case 'Courses':
      return <Courses />;
    case 'placements':
      return <PlacementContent />;
    
    case 'achievements':
      return <h1>Achievements</h1>;
    case 'gallery':
      return <h1>Gallery</h1>;
    default:
      return <h1>Default</h1>;
 }
}
function menuVisibleHandler(){

  setMenuVisible(!menuVisible);
}
  
  return (
    <div className="max-h-screen overflow-y-scroll  bg-gray-100 p-6">

   <div className=" min-h-screen grid grid-cols-4 border-slate-700 grid-rows-4 gap-6">
    <div id="admin" className=" bg-blue-600 col-start-1 col-span-1 row-start-1 row-span-1 rounded-md flex justify-center flex-col items-center">
  <img src="/pic.png" alt="logo" className="w-20 h-20 mx-auto my-5 rounded-full" /> 
  <div className="pb-3"><h2>Biswajit Master</h2></div>
    </div>
  <div id='mobile-menu' className='block lg:hidden'>
  { menuVisible && <div id="mobile-ops" className="fixed left-0 top-0 h-full  bg-white shadow-lg z-50 transition-transform transform translate-x-0"
  style={{ transform: menuVisible ? 'translate-x-0' : '-translate-x-full' }}
  > 
   <div className=" bg-blue-600 flex justify-center flex-col items-center w-full">
  <img src="/pic.png" alt="logo" className="w-20 h-20 mx-auto my-5 rounded-full" /> 
  <div className="pb-3"><h2>Biswajit Master</h2></div>
    </div>
    <DashboardButton title="Student Information" icon={<PersonIcon  />} onClick={()=>{
          setContent('studentres');
        }}  />
        <DashboardButton title="Faculty Details" icon={<SchoolIcon />}  
        onClick={()=>{
          setContent('faculty');
        }}
        />
        <DashboardButton title="Student Electives" icon={<AssignmentIcon  />} />
        <DashboardButton title="Student Placements" icon={<WorkIcon  />} onClick={()=>{
          setContent('placements');
        }} />
        <DashboardButton title="Faculty Achievements" icon={<StarIcon  />} />
        <DashboardButton title="Gallery" icon={<PhotoLibraryIcon  />} />
        <DashboardButton title="Courses" icon={<MenuBookIcon  />} 
        onClick={()=>{
          setContent('Courses');
        }}
        />
        <DashboardButton title="NBA Details" icon={<BusinessIcon  />} />
        <DashboardButton title="Classrooms & Labs" icon={<ScienceIcon  />} />
      </div> }
      <div id="overlay" className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${menuVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={menuVisibleHandler}></div>
  </div>





    <div id="menu" className="rounded shadow-lg row-start-2 row-span-full col-span-1 col-span-1 shadow rounded-lg">
        <DashboardButton title="Student Information" icon={<PersonIcon  />} onClick={()=>{
          setContent('studentres');
        }}  />
        <DashboardButton title="Faculty Details" icon={<SchoolIcon />}  
        onClick={()=>{
          setContent('faculty');
        }}
        />
        <DashboardButton title="Student Electives" icon={<AssignmentIcon  />} />
        <DashboardButton title="Student Placements" icon={<WorkIcon  />} onClick={()=>{
          setContent('placements');
        }} />
        <DashboardButton title="Faculty Achievements" icon={<StarIcon  />} />
        <DashboardButton title="Gallery" icon={<PhotoLibraryIcon  />} />
        <DashboardButton title="Courses" icon={<MenuBookIcon  />} 
        onClick={()=>{
          setContent('Courses');
        }}
        />
        <DashboardButton title="NBA Details" icon={<BusinessIcon  />} />
        <DashboardButton title="Classrooms & Labs" icon={<ScienceIcon  />} />
      </div>

      
      <div id="main-container" className=" col-start-2 col-span-3 row-start-1 row-span-4 max-h-screen overflow-y-scroll">
      <div id="three-line" className="block lg:hidden text-slate-950">
        <button onClick={menuVisibleHandler} className="text-2xl text-slate-950">
          &#9776;
        </button>
      </div>
        {renderContent()}
      </div>
       
      </div>
    </div>
  );
}

export async function getServerSideProps(context: { req: { headers: { cookie: any; }; }; }){
  const rawtoken = context.req.headers.cookie;
 
 if(!rawtoken){
   return{
    redirect:{
      destination:'/login',
      permanent:false
    }
   }
 }else{
   return{
     props:{}
   }
 }
}


