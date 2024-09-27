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
  SEMETER: String,
  OVERAL: String,
  MAR: number
}

export default function Home() {
  const [results, setResults] = useState<Result[]>([]);

  // Fetch data from API
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('http://localhost:3000/results');
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-900">Student Results</h1>

      <div className="grid grid-cols-1  gap-6 text-slate-950">
        {results.map((result) => (
          <div
            key={result._id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <ul className="space-y-2 flex flex-row gap-1 overflow-hidden">

            <li><strong>Name:</strong> {result.NAME}</li>
            <li><strong>Roll:</strong> {result.ROLL}</li>
            <li><strong>Sem:</strong> {result.SEMETER}</li>
            <li><strong>Overall:</strong> {result.OVERAL}</li>
            <li><strong>BSCH201:</strong> {result.BSCH201}</li>
            <li><strong>BSCH201:</strong> {result.BSCH201}</li>
            <li><strong>BSCH201:</strong> {result.BSCH201}</li>
              <li><strong>BSCH201:</strong> {result.BSCH201}</li>
              <li><strong>BSM201:</strong> {result.BSM201}</li>
              <li><strong>ESCS201:</strong> {result.ESCS201}</li>
              <li><strong>HMHU201:</strong> {result.HMHU201}</li>
              <li><strong>BSCH291:</strong> {result.BSCH291}</li>
              <li><strong>ESCS291:</strong> {result.ESCS291}</li>
              <li><strong>ESME291:</strong> {result.ESME291}</li>
              <li><strong>HMHU291:</strong> {result.HMHU291}</li>
              <li><strong>SGPA1:</strong> {result.SGPA1}</li>
              <li><strong>SGPA2:</strong> {result.SGPA2}</li>
              <li><strong>YGPA:</strong> {result.YGPA}</li>
              <li><strong>DGPA:</strong> {result.DGPA}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
