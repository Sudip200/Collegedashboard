// components/PlacementList.tsx
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
    <div className="container mx-auto px-4 py-8">
      <input
        type="text"
        placeholder="Search by name, company, or post"
        className="mb-6 p-2 border rounded w-full text-slate-950"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="grid gap-6">
        {filteredPlacements.map((placement) => (
          <div
            key={placement._id}
            className="bg-white shadow-md p-4  border border-gray-200 text-slate-950
            flex flex-row justify-between scree
            "
      
          >
            <h2 className="text-lg font-bold mb-2">{placement.NAME}</h2>
            <p><span className="font-semibold">Roll:</span> {placement.ROLL}</p>
            <p><span className="font-semibold">Gender:</span> {placement.Gender}</p>
            <p><span className="font-semibold">Mobile:</span> {placement.MOBILE}</p>
            <p><span className="font-semibold">Company:</span> {placement.Company}</p>
            <p><span className="font-semibold">Post:</span> {placement.Post}</p>
            <p><span className="font-semibold">Salary:</span> {placement.Salary || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacementList;
