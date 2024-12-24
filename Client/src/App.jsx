import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import JobListing from "./components/JobListing";
import JobDetail from "./components/JobDetail";
import { useState } from "react";

function App() {

  const [selectedJobId, setSelectedJobId] = useState(null)

  return (
    <>
      <nav className="bg-blue-500 h-16">
        <Navbar />
      </nav>
      <main>
        <div className="flex h-screen">
          <div className="w-1/3 border-r">
            <JobListing onJobSelect={setSelectedJobId} />
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
