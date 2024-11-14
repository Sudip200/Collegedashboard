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

export default function Home() {
  const [results, setResults] = useState<Result[]>([]);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);

  // Fetch data from API
  useEffect(() => {
    const searchQueryLower = searchQuery.toLowerCase();
    const fetchResults = async () => {
      try {
        const response = await fetch('http://localhost:3001/results');
        const data = await response.json();
        setResults(data);
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
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-900">Student Results</h1>
      <input
        type="text"
        placeholder="Search by name, roll, sgpa1, sgpa2, or ygpa"
        className="mb-6 p-2 border rounded w-full text-slate-950"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />





      <div className="grid grid-cols-1 gap-6 text-slate-950">
        {filteredResults.map((result) => (
          <div
            key={result._id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-row items-start justify-between"
          >
            <ul className="flex flex-row items-center gap-20">
              <img src="/user.png" alt="user" className="w-16 h-16 rounded-full border" />
              <li><strong></strong> {result.NAME}</li>
              <li><strong>Roll:</strong> {result.ROLL}</li>
              <li><strong>SGPA1:</strong> {result.SGPA1}</li>
              <li><strong>SGPA2:</strong> {result.SGPA2}</li>
              <li><strong>YGPA:</strong> {result.YGPA}</li>
            </ul>
            <button
              onClick={() => setSelectedResult(result)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal for displaying detailed information */}
      {selectedResult && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Detailed Course Grades</h2>
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
