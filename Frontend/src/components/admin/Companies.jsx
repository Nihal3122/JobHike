import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useGetAllCompanies } from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompany } from "@/redux/companySlice";

const Companies = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  useGetAllCompanies();
  useEffect(() => {
    dispatch(setSearchCompany(searchInput));
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
            placeholder="Search company"
          />
          <Button onClick={() => navigate("/admin/register/company")}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
