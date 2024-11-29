import { useEffect ,useState} from "react";
import Link from "next/link";
interface Course  {
    Name: string;
    Code: string;
    Credit: number;
    Year:   number;
    Semester: number;
    Program:    string;
    Stream: string;
  }



export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(()=>{
    fetch('http://localhost:3001/courses',{
      mode: 'cors',
      credentials: 'include',
    })
    .then((res)=>res.json())
    .then((data)=>{
      
        setCourses(data)
    })
  },[])


  return (
    <div className="w-full">
        <h1 className="text-2xl text-slate-900 font-semibold">Courses</h1>
       
        <table className="text-slate-950 w-full">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Credit</th>
                    <th>Year</th>
                    <th>Semester</th>
                    <th>Program</th>
                    <th>Stream</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((course,index)=>(
                    <tr key={index} className=" border-b-2 mb-3 border-b-gray-400">
                        <td>{course.Name}</td>
                        <td>{course.Code}</td>
                        <td>{course.Credit}</td>
                        <td>{course.Year}</td>
                        <td>{course.Semester}</td>
                        <td>{course.Program}</td>
                        <td>{course.Stream}</td>
                        <Link href={`${course.Code}`}>
                            <td className="text-blue-500">View</td>
                        </Link>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}