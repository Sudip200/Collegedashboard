import { cookies } from 'next/headers';
import { useEffect, useState } from 'react';

// Define the structure of the data
interface Result {
  _id: string;
  sl: number;
  NAME: string;
  ROLL: number;
  BSCH201: string;
  BSM201: string;
  ESCS201: string;
  HMHU201: string;
  BSCH291: string;
  ESCS291: string;
  ESME291: string;
  HMHU291: string;
  SGPA1: number;
  SGPA2: number;
  YGPA: string;
  DGPA: string;
  SEMETER: string;
  OVERAL: string;
  MAR: number;
}

export default function StudentResult() {
  const [results, setResults] = useState<Result[]>([]);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [ total , setTotal] = useState<number>(0);

  // Fetch data from API
  useEffect(() => {
    const searchQueryLower = searchQuery.toLowerCase();
    const fetchResults = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/results`,

        { mode: 'cors',  
          credentials: 'include',}

        );
        const data = await response.json();
        setResults(data);
        setTotal(data.length);
        setFilteredResults(data)
       

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchResults();
  }, []);
  useEffect(()=>{
    setFilteredResults(
      results.filter(
        ({ NAME, ROLL, SGPA1, SGPA2, YGPA }) =>
          NAME.toLowerCase().includes(searchQuery) ||
          ROLL.toString().includes(searchQuery) 
      
      )

    )
  },[searchQuery,results])

  return (
    <div className="bg-gray-100 min-h-screen px-4 sm:px-8">
    <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">Student Information</h1>
  
    {/* Search Input */}
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by name, roll, SGPA1, SGPA2, or YGPA"
        className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  
    {/* Summary */}
    <div className="text-gray-700 mb-6">
      <p className="font-medium">Total number of students: <span className="font-bold">{total}</span></p>
    </div>
  
    {/* Table Header */}
    <div className="bg-gray-200 text-gray-700 font-semibold grid grid-cols-6 sm:grid-cols-8 gap-4 p-4 rounded-t-lg">
      <div className="col-span-1">Photo</div>
      <div className="col-span-2">Name</div>
      <div className="col-span-1">Roll</div>
      <div className="hidden sm:block">SGPA1</div>
      <div className="hidden sm:block">SGPA2</div>
      <div className="hidden sm:block">YGPA</div>
      <div className="col-span-1 text-right">Action</div>
    </div>
  
    {/* Results List */}
    <div className="bg-white shadow rounded-b-lg">
      {filteredResults.map((result) => (
        <div
          key={result._id}
          className="grid grid-cols-6 sm:grid-cols-8 gap-4 p-4 border-b last:border-none items-center hover:bg-gray-50 transition-colors"
        >
          {/* Student Photo */}
          <div className="col-span-1 flex justify-center">
            <img src="/pic.png" alt="user" className="w-10 h-10 rounded-full border shadow-sm" />
          </div>
  
          {/* Name */}
          <div className="col-span-2 text-gray-800 font-medium">{result.NAME}</div>
  
          {/* Roll */}
          <div className="col-span-1 text-gray-700">{result.ROLL}</div>
  
          {/* SGPA1 */}
          <div className="hidden sm:block text-gray-700">{result.SGPA1}</div>
  
          {/* SGPA2 */}
          <div className="hidden sm:block text-gray-700">{result.SGPA2}</div>
  
          {/* YGPA */}
          <div className="hidden sm:block text-gray-700">{result.YGPA}</div>
  
          {/* View Button */}
          <div className="col-span-1 text-right">
            <button
              onClick={() => setSelectedResult(result)}
              className="bg-blue-600 text-white font-medium py-1 px-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
 
  

      {/* Modal for displaying detailed information */}
      {selectedResult && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg p-6 max-w-4xl sm:w-full w-4/5 flex flex-col md:flex-row">
      {/* Left section: Profile and attendance */}
      <div className="flex flex-col items-center md:w-1/3 border-r p-4">
        <img
          src="/pic.png"
          alt="user"
          className="w-24 h-24 rounded-full border mb-4"
        />
        <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">
          {selectedResult.NAME}
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg w-full">
          <h3 className="text-lg font-bold mb-2 text-slate-800">Attendance</h3>
          <table className="text-left text-slate-950 text-sm sm:text-base w-full">
            <tbody>
              <tr>
                <td className="font-bold">Overall:</td>
                <td>30%</td>
              </tr>
              <tr>
                <td className="font-bold">BSCH201:</td>
                <td>10%</td>
              </tr>
              <tr>
                <td className="font-bold">BSM201:</td>
                <td>14%</td>
              </tr>
              {/* Add more attendance details if available */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right section: Detailed academic information */}
      <div className="flex flex-col md:w-2/3 p-4">
        <h2 className="text-2xl font-bold mb-4 text-slate-900 text-center">
          Academic Information
        </h2>
        <table className="text-left border text-slate-950 text-sm sm:text-base w-full">
          <tbody>
            {[
              { label: "Roll", value: selectedResult.ROLL },
              { label: "Semester", value:8 },
              { label: "BSCH201", value: selectedResult.BSCH201 },
              { label: "BSM201", value: selectedResult.BSM201 },
              { label: "ESCS201", value: selectedResult.ESCS201 },
              { label: "HMHU201", value: selectedResult.HMHU201 },
              { label: "BSCH291", value: selectedResult.BSCH291 },
              { label: "ESCS291", value: selectedResult.ESCS291 },
              { label: "ESME291", value: selectedResult.ESME291 },
              { label: "HMHU291", value: selectedResult.HMHU291 },
              { label: "SGPA1", value: selectedResult.SGPA1 },
              { label: "SGPA2", value: selectedResult.SGPA2 },
              { label: "YGPA", value: selectedResult.YGPA },
              { label: "DGPA", value: selectedResult.DGPA },
            ].map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-sky-100" : "bg-white"
                } border`}
              >
                <td className="p-1 font-bold">{row.label}:</td>
                <td className="p-1">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <button
      onClick={() => setSelectedResult(null)}
      className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-red-900 transition-colors"
    >
     x
    </button>
  </div>
)}
    </div>
  );
}
