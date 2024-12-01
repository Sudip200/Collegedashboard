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
    <div className=" bg-gray-100 ">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-900">Student Results</h1>
      <input
        type="text"
        placeholder="Search by name, roll, sgpa1, sgpa2, or ygpa"
        className="mb-6 p-2 border rounded w-full text-slate-950"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="text-slate-900 pb-7">
        <p>Total number of students: {total}</p>
        
      </div>



      <div className="grid grid-cols-1 gap-6 text-slate-950">
        {filteredResults.map((result) => (
          <div
            key={result._id}
            className="bg-white shadow-md rounded-lg p-2  hover:shadow-xl transition-shadow duration-300 flex flex-row items-start justify-between"
          >
            <div className="grid grid-cols-3 gap-1 justify-items-start sm:grid-cols-6 sm:gap-8  w-full items-center ">
              <div><img src="/pic.png" alt="user" className="w-10 h-10 rounded-full border" /></div>
              <div className='' ><strong></strong> {result.NAME}</div>
              <div><strong>Roll:</strong> {result.ROLL}</div>
                <div className="hidden sm:block"><strong>SGPA1:</strong> {result.SGPA1}</div>
                <div className="hidden sm:block"><strong>SGPA2:</strong> {result.SGPA2}</div>
                <div className="hidden sm:block"><strong>YGPA:</strong> {result.YGPA}</div>
             </div>
             <div> <button
              onClick={() => setSelectedResult(result)}
              className="w-11 bg-white  text-blue-600 sm:bg-blue-600 sm:text-white   lg:w-24 rounded-lg hover:bg-blue-800 transition-colors h-7" 
            >
              View
            </button>
            </div>
           
          </div>
        ))}
      </div>

      {/* Modal for displaying detailed information */}
      {selectedResult && (
        <div className="  fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md sm:w-full w-4/5 flex justify-center flex-col">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 text-center">Student Information</h2>
            <img src="/pic.png" alt="user" className="w-20 h-20 rounded-full border " />
            <table className="text-left border text-slate-950 text-sm sm:text-base">
              <tbody className='h-1/4'>
              <tr className="bg-sky-100 border border-black">
              <td className="p-1 font-bold">Name:</td>
              <td className="p-1">{selectedResult.NAME}</td>
              </tr>
              <tr className="bg-sky-100 border border-black">
              <td className="p-1 font-bold">Roll:</td>
              <td className="p-1">{selectedResult.ROLL}</td>
              </tr>
              <tr className="bg-sky-100 border border-black">
              <td className="p-1 font-bold">Semester:</td>
              <td className="p-1">{selectedResult.SEMETER}</td>
              </tr>
              <tr className="bg-sky-100 border border-black">
              <td className="p-1 font-bold">BSCH201:</td>
              <td className="p-1">{selectedResult.BSCH201}</td>
              </tr>
              <tr className="bg-sky-100 border border-black">
              <td className="p-1 font-bold">BSM201:</td>
              <td className="p-1">{selectedResult.BSM201}</td>
              </tr>
              <tr className="bg-sky-100 border border-black">
              <td className="p-1 font-bold">ESCS201:</td>
              <td className="p-1">{selectedResult.ESCS201}</td>
              </tr>
              <tr className="bg-sky-100 border border-black">
              <td className="p-1 font-bold">HMHU201:</td>
              <td className="p-1">{selectedResult.HMHU201}</td>
              </tr>
              <tr className="bg-sky-100 border border-black">
              <td className="p-1 font-bold">BSCH291:</td>
              <td className="p-1">{selectedResult.BSCH291}</td>
              </tr>
              <tr className="bg-sky-100 border border-black">
              <td className="p-1 font-bold">ESCS291:</td>
              <td className="p-1">{selectedResult.ESCS291}</td>
              </tr>
              <tr className="bg-sky-100 border border-black">
              <td className="p-1 font-bold">ESME291:</td>
              <td className="p-1">{selectedResult.ESME291}</td>
              </tr>
              <tr className="bg-sky-100 border border-black">
              <td className="p-1 font-bold">HMHU291:</td>
              <td className="p-1">{selectedResult.HMHU291}</td>
              </tr>
              <tr className="bg-sky-100 border border-black ">
              <td className="p-1 font-bold ">SGPA1:</td>
              <td className="p-1">{selectedResult.SGPA1}</td>
              </tr>
              <tr className="bg-sky-100 border border-black">
              <td className="p-1 font-bold">SGPA2:</td>
              <td className="p-1">{selectedResult.SGPA2}</td>
              </tr>
              <tr className="bg-sky-100 border border-black">
              <td className="p-1 font-bold">YGPA:</td>
              <td className="p-1">{selectedResult.YGPA}</td>
              </tr>
              <tr className="bg-sky-100 border border-black">
              <td className="p-1 font-bold">DGPA:</td>
              <td className="p-1">{selectedResult.DGPA}</td>
              </tr>
              </tbody>
            </table>
            <button
              onClick={() => setSelectedResult(null)}
              className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-red-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
