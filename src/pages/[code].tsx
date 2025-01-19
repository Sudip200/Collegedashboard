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
interface PresentationStatus{
  status:string;
  roll:number;
}

export default function Attendence() {
  const [results, setResults] = useState<Result[]>([]);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);
  const [oneClicked, setOneClicked] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [ fromRoll, setFromRoll] = useState<number>(0);
  const [isCreated,setCreated]=useState<Boolean>(false);
  const [ready,setReady]=useState<Boolean>(false);
  const [ toRoll, setToRoll] = useState<number>( 0);
 const [date,setDate] =useState<string>('');
  const [presentstatus,setPresentStatus]=useState<PresentationStatus[]>([]);
  const [ total , setTotal] = useState<number>(0);
  const router = useRouter();
  

  async function checkData(){
   
    if(presentstatus.length!=0){
      return;
    }
    console.log(router.query.code);
   await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendence?CourseCode=${router.query.code}&Date=${new Date().toLocaleDateString()}`,{
     method:'GET',
      headers:{
        'Content-Type': 'application/json',
      },
      credentials:'include',
    }).then((response)=>{
       console.log(response)
      return response.json()
    }).then((data)=>{
     
      if(data.length==0){
         createClass();
         setReady(true);
        return;
      }

      setPresentStatus(data);
    
      
    
     
    })
    
  }
  async function createClass(){
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createclass`,{
      method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    credentials:'include',

    body:JSON.stringify({
      CourseCode:router.query.code,
      Date:new Date().toLocaleDateString()
    })
    }).then((response)=>{
        console.log(1)
       return response.text()

    }).then((data)=>{
      console.log(data)
            if(data === "created"){
              setCreated(true);
            }else{   
              setCreated(false) 
            }
    })
  }
  function presentationStatus(data:any){
    data.map((item:any)=>{
      
      console.log(item);
      if(item.Status=="present"){
       // console.log(item.roll.toString())
        handleCheckboxChange(item.StudentId.toString(), 'p')
    }else if(item.Status=="absent"){
      //console.log(item.roll.toString())
      handleCheckboxChange(item.StudentId.toString(), 'a')
    }
    }

  
  )
  setReady(true);
  }
  // Fetch data from API
  useEffect(() => {
   
    const searchQueryLower = searchQuery.toLowerCase();
    const fetchResults = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/results`,
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
  useEffect(()=>{
    if(router.isReady){ 
      checkData();
      let date= new Date().toLocaleDateString();
      setDate(date)
    if(presentstatus.length!=0){
      presentationStatus(presentstatus)
    }
    
    }
  },[router.isReady,presentationStatus])
 function enableCheckbox(id:string,sta:string) {
  //set checkbox true or false ,if present set 'p' id to true else set 'a' id to true
  if(sta=='p'){
    const checkbox = document.getElementById(id+'a');
    if (checkbox) {
      checkbox.removeAttribute('disabled');
    }
  }

 }
  function handleCheckboxChange(id:string,sta:string) {
    console.log(id,sta)
    const checkbox = document.getElementById(id+'a');
      const checkbox2 = document.getElementById(id+'p');
    if(sta=='p'){
      
      if (checkbox) {
        checkbox.setAttribute('disabled', 'true');
      }
      if (checkbox2) {
        //change the status of the checkbox to true and disable it
        checkbox2.setAttribute('checked', 'true');
        checkbox2.setAttribute('disabled', 'true');
      }
    }else if(sta=='a'){
    
      if (checkbox2) {
        checkbox2.setAttribute('disabled', 'true');
      }
      if (checkbox) {
        checkbox.setAttribute('checked', 'true');
        checkbox.setAttribute('disabled', 'true');
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
        credentials:'include',
        body: JSON.stringify({
          ROLL:roll,
          CourseCode:router.query.code,
          Status:'present',
          Date: new Date().toLocaleDateString()
        }),
      }).then((response) =>{
        console.log(response)
    
        handleCheckboxChange(id, 'p')
      })
   }else{
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attend`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials:'include',
      body: JSON.stringify({
        ROLL:roll,
        CourseCode:router.query.code,
        Status:'absent',
        Date:new Date().toLocaleDateString()
      }),
    }).then((response) => {
      console.log(response)

      handleCheckboxChange(id, 'a')
    })
   }
  }
 }
  return (
    <div className=" bg-gray-100 h-screen min-w-max">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-900">Take Attendence {router.query.code} for Date   </h1> <br>
      </br>
      
      <h2 className='text-slate-900 text-center mb-6 text-2xl font-mono'> {date}</h2>
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

      <div className="text-slate-900 mb-6 font-serif">
        <p>Total number of students: {total}</p>
        
      </div>



   {ready && <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-slate-950">
      <thead>
        <tr>
        
        <th className="py-2 px-4 bg-gray-200 text-left text-slate-900">Name</th>
        <th className="py-2 px-4 bg-gray-200 text-left text-slate-900">Roll</th>
        <th className="py-2 px-4 bg-gray-200 text-left text-slate-900">Present</th>
        <th className="py-2 px-4 bg-gray-200 text-left text-slate-900">Absent</th>
        </tr>
      </thead>
      {/* <input type='date' onChange={(e)=>{
        console.log(e.target.value)
      }}/> */}
      <tbody>
        {filteredResults.map((result) => (
        <tr key={result._id} className="border-b">
          
          <td className="py-2 px-4">{result.NAME}</td>
          <td className="py-2 px-4">{result.ROLL}</td>
          <td className="py-2 px-4">
         
            <input type="checkbox" id={result.ROLL+'p'} className="form-checkbox h-5 w-5 text-blue-600 " onChange={(e)=>{
              if(e.target.checked){
               attendence(true, result.ROLL, result.ROLL.toString())
              // handleCheckboxChange(result.NAME+result.ROLL, 'p')
              }
            }
            } />
          </td>
          <td className="py-2 px-4">
            <input   id={result.ROLL+'a'} type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 "  

            onChange={(e)=>{
              if(e.target.checked){
                attendence(false, result.ROLL, result.ROLL.toString())
              // handleCheckboxChange(result.NAME+result.ROLL, 'a')
              }
            }
            }
            />
          </td>
      
        </tr>
        ))}
      </tbody>
    </table> }

     
    </div>
  );
}
