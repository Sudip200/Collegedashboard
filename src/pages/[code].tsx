import { cookies } from 'next/headers';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { handleClientScriptLoad } from 'next/script';

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

export default function Attendence() {
  const [results, setResults] = useState<Result[]>([]);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);
  const [oneClicked, setOneClicked] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [ fromRoll, setFromRoll] = useState<number>(0);
  const [ toRoll, setToRoll] = useState<number>( 0);
  const [ total , setTotal] = useState<number>(0);
  const router = useRouter();

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
    if(fromRoll != 0 && toRoll != 0){
      setFilteredResults(
        results.filter(
          ({ ROLL }) =>
            ROLL >= fromRoll && ROLL <= toRoll
        )
      )
    }
  setTotal(filteredResults.length)
    
  },[searchQuery,results,fromRoll,toRoll])

  function handleCheckboxChange(id:string,sta:string) {
    if(sta=='p'){
      const checkbox = document.getElementById(id+'a');
      if (checkbox) {
        checkbox.setAttribute('disabled', 'true');
      }
    }else if(sta=='a'){
      const checkbox = document.getElementById(id+'p');
      if (checkbox) {
        checkbox.setAttribute('disabled', 'true');
      }
      
    }else{
      //disable both
      const checkbox = document.getElementById(id+'a');
      if (checkbox) {
        checkbox.setAttribute('disabled', 'true');
      }
      const checkbox1 = document.getElementById(id+'p');
      if (checkbox1) {
        checkbox1.setAttribute('disabled', 'true');
      }
    }
  
  }
 async function attendence(status:boolean , roll:number,id:string){  {
   if(status){
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attend`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ROLL:roll,
          CourseCode:router.query.code,
          status:'present'
        }),
      }).then((response) =>{
        console.log(response)
        response.json()
        handleCheckboxChange(id, 'both')
      })
   }else{
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attend`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ROLL:roll,
        CourseCode:router.query.code,
        status:'absent'
      }),
    }).then((response) => {
      console.log(response)
      response.json()
      handleCheckboxChange(id, 'both')
    })
   }
  }
 }
  return (
    <div className=" bg-gray-100 h-screen min-w-max">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-900">Take Attendence {router.query.code}  </h1>
      {/* Select roll number range */}
        
      <input
        type="text"
        placeholder="Search by name, roll"
        className="mb-6 p-2 border rounded w-full text-slate-950"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="flex gap-4 mb-6">
            <input
            type="number"
            placeholder="From roll number"
            onChange={ 
                (e) => setFromRoll(parseInt(e.target.value))
            }
            className="p-2 border rounded w-1/2 text-slate-950"
            />
            <input
            type="number"
            placeholder="To roll number"
            onChange={ 
                (e) => setToRoll(parseInt(e.target.value))
            } 
            className="p-2 border rounded w-1/2 text-slate-950"
            />
        </div>

      <div className="text-slate-900">
        <p>Total number of students: {total}</p>
        
      </div>



    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-slate-950">
      <thead>
        <tr>
        
        <th className="py-2 px-4 bg-gray-200 text-left text-slate-900">Name</th>
        <th className="py-2 px-4 bg-gray-200 text-left text-slate-900">Roll</th>
        <th className="py-2 px-4 bg-gray-200 text-left text-slate-900">Present</th>
        <th className="py-2 px-4 bg-gray-200 text-left text-slate-900">Absent</th>
        </tr>
      </thead>
      <tbody>
        {filteredResults.map((result) => (
        <tr key={result._id} className="border-b">
          
          <td className="py-2 px-4">{result.NAME}</td>
          <td className="py-2 px-4">{result.ROLL}</td>
          <td className="py-2 px-4">
         
            <input type="checkbox" id={result.NAME+result.ROLL+'p'} className="form-checkbox h-5 w-5 text-blue-600 " onChange={(e)=>{
              if(e.target.checked){
               attendence(true, result.ROLL, result.NAME+result.ROLL)
              // handleCheckboxChange(result.NAME+result.ROLL, 'p')
              }
            }
            } />
          </td>
          <td className="py-2 px-4">
            <input   id={result.NAME+result.ROLL+'a'} type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 "  

            onChange={(e)=>{
              if(e.target.checked){
                attendence(false, result.ROLL, result.NAME+result.ROLL)
              // handleCheckboxChange(result.NAME+result.ROLL, 'a')
              }
            }
            }
            />
          </td>
      
        </tr>
        ))}
      </tbody>
    </table>

     
    </div>
  );
}
