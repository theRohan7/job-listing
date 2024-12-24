import axios from "axios"
import { BACKEND_URL } from "../utils/constants"



const getJobs = async () => {
    try {
        
        const URL = `${BACKEND_URL}/jobs`

        const response = await axios.get(URL)

        return response.data;

    } catch (error) {
        throw new Error(error.response.data.message)
        
    }
}

const getJobById = async(jobId) => {
    try {
        
        const URL = `${BACKEND_URL}/jobs/${jobId}`

        const response = await axios.get(URL)

        return response.data;

    } catch (error) {
        throw new Error(error.response.data.message)
        
    }
}


export {
    getJobs,
    getJobById
}