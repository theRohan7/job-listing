import { Router } from "express";
import { getAllJobs, getJobById } from "../controllers/jobs.controller.js";


const router = Router();

router.route('/').get(getAllJobs)
router.route('/:jobId').get(getJobById)



export default router;