import { setAllAdminJob, setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/Constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetAdminJobs = () => {
  const dispatch = useDispatch();
  const fetchAllJobsPostByAdmin = async () => {
    try {
      const response = await axios.get(`${JOB_API_END_POINT}/recruiter/jobs`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success) {
        dispatch(setAllAdminJob(response.data.jobs));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllJobsPostByAdmin();
  }, []);
};
