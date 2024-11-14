import Link from 'next/link';

const PlaceMentYear =()=>{

    return(
        <div className="bg-gray-50 flex h-dvh justify-center items-center flex-row gap-3">
            <div className='text-slate-900 font-bold text-4xl bg-blue-200 p-16 shadow-md rounded-full' >
            <Link href="http://localhost:3001/2021.pdf"  >2021</Link>
            </div>
            <div className='text-slate-900 font-bold text-4xl bg-blue-200 p-16 shadow-md rounded-full' >
            
            <Link href="http://localhost:3001/2022.pdf">2022</Link>
            </div>
            <div className='text-slate-900 font-bold text-4xl bg-blue-200 p-16 shadow-md rounded-full ' >
            <Link href="/placement/placement2023">2023</Link>
            </div>
        
            
        </div>
    )
}

export default PlaceMentYear;