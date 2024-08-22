import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Spinner2 from "../spinner/Spinner2";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/Constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PostJobs = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: 0,
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${JOB_API_END_POINT}/post-job`,
        input,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/jobs");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (comapny) => comapny.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany?._id });
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          className="grid grid-cols-2 gap-5 w-[65%] pt-10"
          onSubmit={handleSubmit}
        >
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              type="text"
              onChange={onChangeHandler}
              value={input.title}
              name="title"
              id="title"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="description">Job Description</Label>
            <Input
              type="text"
              onChange={onChangeHandler}
              value={input.description}
              name="description"
              id="description"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="requirements">Requirements</Label>
            <Input
              type="text"
              onChange={onChangeHandler}
              value={input.requirements}
              name="requirements"
              id="requirements"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="salary">Salary</Label>
            <Input
              type="number"
              onChange={onChangeHandler}
              value={input.salary}
              name="salary"
              id="salary"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              type="text"
              onChange={onChangeHandler}
              value={input.location}
              name="location"
              id="location"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="jobType">Job Type</Label>
            <Input
              type="text"
              onChange={onChangeHandler}
              value={input.jobType}
              name="jobType"
              id="jobType"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="experience">Experience (years)</Label>
            <Input
              type="number"
              onChange={onChangeHandler}
              value={input.experience}
              name="experience"
              id="experience"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="position">Number of Positions</Label>
            <Input
              type="number"
              onChange={onChangeHandler}
              value={input.position}
              name="position"
              id="position"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          {companies.length > 0 && (
            <Select onValueChange={selectChangeHandler}>
              <SelectTrigger className="focus-visible:ring-offset-0 focus-visible:ring-0">
                <SelectValue placeholder="Please select a company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companies.map((company) => (
                    <SelectItem
                      key={company._id}
                      value={company?.name.toLowerCase()}
                    >
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}

          {companies.length === 0 && (
            <p className="text-red-500 font-medium">
              Please register the company first
            </p>
          )}

          {loading ? (
            <div className="col-span-2 flex justify-end mt-4">
              <Button className="">
                <Spinner2 />
              </Button>
            </div>
          ) : (
            <div className="col-span-2 flex justify-end mt-4">
              {companies.length === 0 ? (
                <p className="text-red-500 font-medium">
                  Please register the company first
                </p>
              ) : (
                <Button type="submit" className="px-10">
                  Post Job
                </Button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJobs;
