import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/Constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetSCompanyById = (id) => {
  const dispatch = useDispatch();
  const fetchCompanyById = async () => {
    try {
      const response = await axios.get(
        `${COMPANY_API_END_POINT}/get-company/${id}`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.success) {
        dispatch(setSingleCompany(response.data.company));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanyById();
  }, [id,dispatch]);
};
