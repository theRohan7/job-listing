import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { getJobs } from "../services/job.js";

function JobListing({ onJobSelect }) {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12;

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await getJobs();
        setJobs(response?.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleJobClick = (jobId) => {
    onJobSelect(jobId);
  }

  console.log(jobs);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <div className="flex flex-col items-center">
          <ClipLoader size={50} color="#4A90E2" loading={loading} />
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <div
            className="h-[680px] w-full bg-white shadow rounded overflow-y-auto p-3"
            style={{ maxWidth: '100%' }}
          >
            {currentJobs.length > 0 ? (
              <ul className="space-y-4">
                {currentJobs.map((job) => (
                  <li key={job._id} className="p-4 bg-gray-50 shadow rounded" onClick={()=>handleJobClick(job._id)} >
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.location}</p>
                    <p className="text-sm text-green-600">{job.seniority_level}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No jobs found.</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-2 mx-3 ">
            
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 bg-gray-300 rounded ${
                currentPage === 1 && 'opacity-50 cursor-not-allowed'
              }`}
            >
              Prev
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 bg-gray-300 rounded ${
                currentPage === totalPages && 'opacity-50 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobListing;
