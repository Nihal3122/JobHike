import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/Constants";
import { toast } from "sonner";

const JobDescription = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.user);

  const [isApply, setIsApply] = useState(false);

  const fetchSingleJobs = async () => {
    try {
      const response = await axios.get(`${JOB_API_END_POINT}/get-job/${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        dispatch(setSingleJob(response.data.job));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyJobHandler = async () => {
    try {
      const response = await axios.post(
        `${APPLICATION_API_END_POINT}/apply-job/${id}`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("response",response);
      if (response.data.success) {
        toast.success(response.data.message);
        const updatedSingleJob = {
          ...singleJob,
          application: [
            ...(singleJob.application || []),
            { applicant: user?._id },
          ],
        };

        dispatch(setSingleJob(updatedSingleJob));
        setIsApply(true); // Update isApply state here
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchSingleJobs();
  }, [id, dispatch]);

  useEffect(() => {
    if (singleJob && user) {
      const applied = singleJob.application?.some(
        (application) => application?.applicant?._id === user?._id
      );
      setIsApply(applied);
    }
  }, [singleJob, user]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg my-10 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {singleJob?.title}
          </h1>
          <div className="flex items-center gap-4 mt-2 text-gray-600">
            <span>{singleJob?.company?.name}</span>
            <span className="w-px h-6 bg-gray-300" />
            <span>{singleJob?.location}</span>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Job Description
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {singleJob?.description}
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Responsibilities
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Develop and implement key features and functionalities</li>
            <li>Build and maintain reusable code and libraries</li>
            <li>Ensure the technical feasibility and quality of designs</li>
            <li>
              Optimize systems and applications for performance and scalability
            </li>
            <li>Collaborate effectively with team members and stakeholders</li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Requirements
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              Strong problem-solving skills and ability to work independently
            </li>
            <li>
              Proficiency in relevant tools and technologies specific to the
              role
            </li>
            <li>
              Understanding of software development lifecycle and methodologies
            </li>
            <li>
              Ability to collaborate effectively with cross-functional teams
            </li>
            <li>Excellent communication skills, both written and verbal</li>
            <li>
              Attention to detail and commitment to delivering high-quality work
            </li>
            <li>
              Adaptability to new technologies and willingness to continuously
              learn
            </li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Additional Information
          </h2>
          <div className="flex flex-col gap-6  p-6 rounded-lg border-gray-200">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-800">Experience:</h3>
              <p className="text-gray-600">{singleJob?.experience} years</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-800">Salary:</h3>
              <p className="text-gray-600">₹{singleJob?.salary} </p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-800">
                Available Positions:
              </h3>
              <p className="text-gray-600">{singleJob?.position}</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-800">Total Applicants:</h3>
              <p className="text-gray-600">{singleJob?.application?.length}</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-800">Posted On:</h3>
              <p className="text-gray-600">
                {singleJob?.createdAt.split("T")[0]}
              </p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button
            onClick={applyJobHandler}
            disabled={isApply}
            className={`px-6 py-2 rounded-md ${
              isApply ? `bg-gray-500 cursor-not-allowed` : ``
            }`}
          >
            {isApply ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
