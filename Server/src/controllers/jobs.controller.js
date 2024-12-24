
import { ObjectId } from "mongodb";
import { connectDB } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";




const getAllJobs = asyncHandler( async (req, res) => {

    const JobCollection = await connectDB();
    const jobs = await JobCollection.find({}).toArray();

    if(!jobs){
        throw new ApiError(404, "Jobs not found")
    }

    res
    .status(200)
    .json(new ApiResponse(200, jobs, "Jobs fetched successfully"))
})


const getJobById = asyncHandler( async (req, res) => {
    const { jobId } = req.params


    if(!jobId){
        throw new ApiError(400, "Job ID is required")
    }

   const JobCollection = await connectDB();
   const job = await JobCollection.findOne({ _id: new ObjectId(jobId) });

    if(!job){
        throw new ApiError(404, "Job not found")
    }

    res
    .status(200)
    .json(new ApiResponse(200, job, "Job fetched successfully"))
})




export {
    getAllJobs,
    getJobById
}