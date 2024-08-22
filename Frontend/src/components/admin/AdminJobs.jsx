import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompany } from "@/redux/companySlice";
import AdminJobsTable from "./AdminJobsTable";
import { useGetAdminJobs } from "@/hooks/useGetAdminJobs";
import { setSearchJob } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAdminJobs();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchJob(searchInput));
  }, [searchInput]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-8">
          <Input
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            className="w-[30%]"
            placeholder="Search by company, role"
          />
          <Button onClick={() => navigate("/admin/register/jobs")}>
            Post New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
