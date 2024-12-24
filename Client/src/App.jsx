import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import JobListing from "./components/JobListing";
import JobDetail from "./components/JobDetail";
import { useState } from "react";

function App() {

  const [selectedJobId, setSelectedJobId] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <nav className="bg-blue-500 h-16">
        <Navbar onSearch = {setSearchQuery} />
      </nav>
      <main>
        <div className="flex h-screen">
          <div className="w-1/3 border-r">
            <JobListing onJobSelect={setSelectedJobId} searchQuery={searchQuery} />
          </div>
          <div className="w-2/3">
            <JobDetail jobId={selectedJobId} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
