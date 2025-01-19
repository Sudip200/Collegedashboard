// components/PlacementList.tsx
import { GetServerSideProps } from 'next/types';
import React, { useState, useEffect } from 'react';

type Placement = {
  _id: string;
  ROLL: number;
  NAME: string;
  Gender: string;
  MOBILE: number;
  Company: string;
  Salary?: string;
  Post: string;
  Year: number;
};

type PlacementListProps = {
  placements: Placement[];
};

const PlacementList: React.FC<PlacementListProps> = ({ placements }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlacements, setFilteredPlacements] = useState(placements);
  const [year, setYear] = useState(2023);
  useEffect(() => {
    console.log('running effect');
    const query = searchQuery.toLowerCase();
    setFilteredPlacements(
      placements.filter(
        ({ NAME, Company, Post,Year}) =>
          NAME.toLowerCase().includes(query) ||
          Company.toLowerCase().includes(query) ||
          Post.toLowerCase().includes(query) 
        

      )
    );
    setFilteredPlacements(placements.filter(({Year})=>Year===year));
  }, [searchQuery, placements, year]);

  return (
    <div className="container border">
      <input
        type="text"
        placeholder="Search by name, company, or post"
        className="mb-6 p-2 border rounded w-full text-slate-950"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="p-2 border rounded text-slate-950"
        >
          <option value={2023}>2023</option>
          <option value={2022}>2022</option>
          <option value={2021}>2021</option>
        </select>
      </div>
<div className="overflow-x-scroll sm:overflow-hidden">
  
  <div className="grid gap-6">
  <div className="min-w-max grid grid-cols-7 items-center justify-around bg-white shadow-md border border-gray-200 text-slate-950">
    <div><span>Name</span></div>
    <div><span>Roll</span></div>
    <div><span>Gender</span></div>
    <div><span>Mobile</span></div>
    <div><span>Company</span></div>
    <div><span>Post</span></div>
    <div><span>Salary</span></div>
  </div>

    {filteredPlacements.map((placement) => (
      
      <div
        key={placement._id}
        className="min-w-max sm:min-w-full grid grid-cols-7 items-center justify-around text-slate-950"
      >
        <div className="">{placement.NAME || 'N/A'}</div>
        <div className="">{placement.ROLL || 'N/A'}</div>
        <div className="">{placement.Gender || 'N/A'}</div>
        <div className="">{placement.MOBILE || 'N/A'}</div>
        <div className="">{placement.Company || 'N/A'}</div>
        <div className="">{placement.Post || 'N/A'}</div>
        <div className="">{placement.Salary || 'N/A'}</div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};


export default PlacementList;
