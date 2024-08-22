import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "../ui/label";
import Spinner2 from "../spinner/Spinner2";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/Constants";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useGetSCompanyById } from "@/hooks/useGetSCompanyById";

const CompanyDescription = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null || "",
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useGetSCompanyById(id);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const { singleCompany } = useSelector((store) => store.company);

  const onFileChangeHandler = (e) => {
    const file = e.target.files[0];
    setInput((prevData) => ({
      ...prevData,
      file,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("website", input.website);
      formData.append("location", input.location);
      if (input.file) {
        formData.append("file", input.file);
      }
      const response = await axios.put(
        `${COMPANY_API_END_POINT}/update-company/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/companies");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.success(error.response.data.message);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name,
      description: singleCompany?.description,
      website: singleCompany?.website,
      location: singleCompany?.location,
      file: singleCompany?.logo || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto my-20 p-8 bg-white shadow-md rounded-lg">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-10 mb-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl">Company Description</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Company Name</Label>
              <Input
                onChange={onChangeHandler}
                value={input.name}
                type="text"
                name="name"
                placeholder="Enter company name"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                onChange={onChangeHandler}
                value={input.description}
                type="text"
                name="description"
                placeholder="Enter description"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                onChange={onChangeHandler}
                value={input.website}
                type="text"
                name="website"
                placeholder="Enter website URL"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                onChange={onChangeHandler}
                value={input.location}
                type="text"
                name="location"
                placeholder="Enter location"
                className="mt-1"
              />
            </div>
            <div className="">
              <Label>Logo</Label>
              <Input
                onChange={onFileChangeHandler}
                type="file"
                accept="image/*"
                className="mt-1 "
              />
            </div>
          </div>
          <div className="mt-8">
            {loading ? (
              <Button className="w-full py-3 text-white ">
                <Spinner2 className="" />
              </Button>
            ) : (
              <Button type="submit" className="w-full py-3 text-white ">
                Save
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyDescription;
