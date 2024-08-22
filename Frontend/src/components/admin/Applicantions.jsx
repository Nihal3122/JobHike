import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantionsTable from "./ApplicantionsTable";
import { APPLICATION_API_END_POINT } from "@/utils/Constants";
import { useParams } from "react-router-dom";
import { setAppApplicants } from "@/redux/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Applicantions = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allApplicants } = useSelector((store) => store.application);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const response = await axios(
          `${APPLICATION_API_END_POINT}/jobs/applicants/${id}`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        dispatch(setAppApplicants(response?.data?.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-2xl my-5">
          Applicants ({allApplicants?.application?.length})
        </h1>
        <ApplicantionsTable />
      </div>
    </div>
  );
};

export default Applicantions;
