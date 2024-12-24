import React, { useEffect, useState } from "react";
import { getJobById } from "../services/job";
import ClipLoader from "react-spinners/ClipLoader";

function JobDetail({ jobId }) {
  const [jobDetail, setJobDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (jobId === null) return;
    const fetchJobById = async (jobId) => {
      setLoading(true);
      try {
        const response = await getJobById(jobId);
        setJobDetail(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobById(jobId);
  }, [jobId]);

  

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full p-3">
      {jobDetail === null ? (
        <div>Click on a job to see details</div>
      ) : (
        <div className="h-full">
          {loading ? (
            <div className="flex flex-col items-center">
              <ClipLoader size={50} color="#4A90E2" loading={loading} />
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          ) : (
            <>
            <div className="flex flex-col border-b border-gray-400 pb-4">
                <h1 className="text-4xl font-bold mb-8" >
                    {jobDetail.title}
                </h1>
                <div className="flex gap-4 items-center mb-8" >
                <img src={jobDetail.companyImageUrl} alt="" className="w-20 rounded-full" />
                <p className="mt-2 text-2xl text-gray-800">
                    {jobDetail.company}
                </p>

                </div>
                
                <p className="mt-2 text-green-600">
                    {jobDetail.location}
                </p>
                <span className="mt-2 text-gray-600 bg-pink-200 border rounded absolute px-3 right-10">
                    {jobDetail.employment_type}
                </span>
                <a href={jobDetail.job_link} className="mt-2 text-blue-600" > LinkedIn</a>

                <button className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-3xl absolute right-5 bottom-24" >Apply Now</button>
            </div>

            <div className="flex flex-col border-b mt-4 border-gray-400 pb-4">
                <h2 className="text-2xl font-bold">Job Description</h2>
                <p className="mt-2 text-gray-600">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio voluptatum voluptatem similique nobis aliquam modi unde eaque hic consequatur nostrum ut, nam harum ratione delectus quam magni? Esse minus, voluptatibus quibusdam provident earum autem magnam repudiandae odit officia velit possimus harum dicta illum ex sapiente. Vero atque, rerum, dolores tempore eius error laudantium repellendus, velit eveniet temporibus cupiditate laboriosam! Possimus.
                </p>
            </div>

            <div className="mt-4" >
                <h2 className="text-2xl font-bold mb-4">Other Details</h2>
                <div className="grid grid-cols-2 gap-5">
                    <p><b>Comapny Type:</b> {jobDetail.companytype}</p>
                    <p><b>Experience:</b> {jobDetail.experience}</p>
                    <p><b>Seniority Level:</b> {jobDetail.seniority_level}</p>
                    <p><b>Source:</b> {jobDetail.source}</p>
                    <p><b>Compensation:</b> Market Best Offer </p>
                </div>
            </div>
            </>
            

           
          )}
        </div>
      )}
    </div>
  );
}

export default JobDetail;
