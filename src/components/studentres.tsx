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
        const response = await fetch('http://localhost:3001/results',

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
    <div className=" bg-gray-100 ">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-900">Student Results</h1>
      <input
        type="text"
        placeholder="Search by name, roll, sgpa1, sgpa2, or ygpa"
        className="mb-6 p-2 border rounded w-full text-slate-950"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="text-slate-900">
        <p>Total number of students: {total}</p>
        
      </div>



      <div className="grid grid-cols-1 gap-6 text-slate-950">
        {filteredResults.map((result) => (
          <div
            key={result._id}
            className="bg-white shadow-md rounded-lg p-2  hover:shadow-xl transition-shadow duration-300 flex flex-row items-start justify-between"
          >
            <div className="grid grid-cols-3 sm:grid-cols-6 sm:gap-8  w-full items-center ">
              <div><img src="/pic.png" alt="user" className="w-10 h-10 rounded-full border" /></div>
              <div ><strong></strong> {result.NAME}</div>
              <div><strong>Roll:</strong> {result.ROLL}</div>
                <div className="hidden sm:block"><strong>SGPA1:</strong> {result.SGPA1}</div>
                <div className="hidden sm:block"><strong>SGPA2:</strong> {result.SGPA2}</div>
                <div className="hidden sm:block"><strong>YGPA:</strong> {result.YGPA}</div>
             </div>
             <div> <button
              onClick={() => setSelectedResult(result)}
              className=" bg-blue-500 text-white  lg:w-24 rounded-lg hover:bg-blue-600 transition-colors h-7" 
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
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Detailed Course Grades</h2>
            <img src="/pic.png" alt="user" className="w-20 h-20 rounded-full border" />
            <ul className="space-y-2 text-slate-700">
              <li><strong>Name:</strong> {selectedResult.NAME}</li>
              <li><strong>Roll:</strong> {selectedResult.ROLL}</li>
              <li><strong>Semester:</strong> {selectedResult.SEMETER}</li>
              <li><strong>BSCH201:</strong> {selectedResult.BSCH201}</li>
              <li><strong>BSM201:</strong> {selectedResult.BSM201}</li>
              <li><strong>ESCS201:</strong> {selectedResult.ESCS201}</li>
              <li><strong>HMHU201:</strong> {selectedResult.HMHU201}</li>
              <li><strong>BSCH291:</strong> {selectedResult.BSCH291}</li>
              <li><strong>ESCS291:</strong> {selectedResult.ESCS291}</li>
              <li><strong>ESME291:</strong> {selectedResult.ESME291}</li>
              <li><strong>HMHU291:</strong> {selectedResult.HMHU291}</li>
              <li><strong>SGPA1:</strong> {selectedResult.SGPA1}</li>
              <li><strong>SGPA2:</strong> {selectedResult.SGPA2}</li>
              <li><strong>YGPA:</strong> {selectedResult.YGPA}</li>
              <li><strong>DGPA:</strong> {selectedResult.DGPA}</li>
            </ul>
            <button
              onClick={() => setSelectedResult(null)}
              className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
