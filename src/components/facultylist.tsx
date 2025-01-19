import { GetStaticProps } from "next";
import { useEffect,useState } from "react";

type Faculty = {
  Department: string;
  Name: string;
  Qualification: string;
  Specialization: string;
  Designation: string;
};

type Props = {
  faculties: Faculty[];
};

export default function FacultyList() {
    const [faculties, setFaculty] = useState<Faculty[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPlacements, setFilteredPlacements] = useState(faculties);
    useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/faculty";
        const res = await fetch(apiUrl,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = await res.json();
        console.log(data);
        setFaculty(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchFaculties();


    }, []);
    useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredPlacements(
      faculties.filter(
        ({ Name, Department, Qualification }) =>
          Name.toLowerCase().includes(query) ||
          Department.toLowerCase().includes(query) ||
          Qualification.toLowerCase().includes(query)
      )
    );
    }, [searchQuery, faculties]);
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold text-center mb-6 text-slate-900">Faculty List</h1>

      <div>
        <input
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, department, or qualification"
          className="mb-6 p-2 border rounded w-full text-slate-950"
        />

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlacements.map((faculty, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-slate-950">{faculty.Name}</h2>
            <p className="text-sm text-gray-600">Department: {faculty.Department}</p>
            <p className="text-sm text-gray-600">
              Qualification: {faculty.Qualification}
            </p>
            <p className="text-sm text-gray-600">
              Specialization: {faculty.Specialization || "None"}
            </p>
            <p className="text-sm text-gray-600">
              Designation: {faculty.Designation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


