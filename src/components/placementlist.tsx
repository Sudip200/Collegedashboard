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
};

type PlacementListProps = {
  placements: Placement[];
};

const PlacementList: React.FC<PlacementListProps> = ({ placements }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlacements, setFilteredPlacements] = useState(placements);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredPlacements(
      placements.filter(
        ({ NAME, Company, Post }) =>
          NAME.toLowerCase().includes(query) ||
          Company.toLowerCase().includes(query) ||
          Post.toLowerCase().includes(query)
      )
    );
  }, [searchQuery, placements]);

  return (
    <div className="container ">
      <input
        type="text"
        placeholder="Search by name, company, or post"
        className="mb-6 p-2 border rounded w-full text-slate-950"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
<div className="overflow-x-scroll sm:overflow-hidden">
  <div className="min-w-full grid grid-cols-7 items-center justify-around bg-white shadow-md border border-gray-200 text-slate-950">
    <div><span>Name</span></div>
    <div><span>Roll</span></div>
    <div><span>Gender</span></div>
    <div><span>Mobile</span></div>
    <div><span>Company</span></div>
    <div><span>Post</span></div>
    <div><span>Salary</span></div>
  </div>
  <div className="grid gap-6">
    {filteredPlacements.map((placement) => (
      <div
        key={placement._id}
        className="min-w-max sm:min-w-full grid grid-cols-7 items-center justify-around text-slate-950"
      >
        <div className="">{placement.NAME}</div>
        <div className="">{placement.ROLL}</div>
        <div className="">{placement.Gender}</div>
        <div className="">{placement.MOBILE}</div>
        <div className="">{placement.Company}</div>
        <div className="">{placement.Post}</div>
        <div className="">{placement.Salary || 'N/A'}</div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};


export default PlacementList;
