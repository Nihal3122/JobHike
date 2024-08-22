import { setcompanies } from "@/redux/companySlice";
import { setAllJobs } from "@/redux/jobSlice";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/Constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  const fetchAllCompanies = async () => {
    try {
      const response = await axios.get(`${COMPANY_API_END_POINT}/get-companies`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success) {
        dispatch(setcompanies(response.data.companies));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCompanies();
  }, []);
};