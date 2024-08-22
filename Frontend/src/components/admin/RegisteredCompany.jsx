import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/Constants";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const RegisteredCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const registeredNewCompany = async () => {
    try {
      const response = await axios.post(
        `${COMPANY_API_END_POINT}/register-company`,
        { companyName },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      
        const compnyId = response?.data?.company?._id;
        navigate(`/admin/companies/${compnyId}`);
        dispatch(setSingleCompany(response?.data?.company));
      }
    } catch (error) {
      console.log(error);
      toast.success(error.response.data.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? you can change this
            later
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          onChange={(e) => setCompanyName(e.target.value)}
          className="my-2"
          value={companyName}
          placeholder="Company name"
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registeredNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default RegisteredCompany;
