import React, { useState } from "react";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for jobs:", searchQuery);
  };

  return (
    <nav className="flex items-center justify-between p-4">
      <div>
        <h2 className="text-2xl font-bold">Jobify</h2>
      </div>
      <div className="flex gap-5">
        <input
          type="search"
          placeholder="Search jobs in your area"
          className="w-96 px-4 py-2  rounded-lg"
          value={searchQuery}
          onChange={handleQueryChange}

        />
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg border rounded-3xl font-semibold"
        onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="flex gap-8 mr-4">
        <a href="#" className="text-white font-semibold">
          Account
        </a>
        <a href="#" className="text-white font-semibold">
          Settings
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
