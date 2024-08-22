import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/Constants";

export const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  const fetchAppliedJob = async () => {
    try {
      const response = await axios.get(
        `${APPLICATION_API_END_POINT}/applied-job`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(setAllAppliedJobs(response.data.application));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppliedJob();
  }, [dispatch]);
};
