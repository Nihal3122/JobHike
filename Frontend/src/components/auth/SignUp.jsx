import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/Constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/userSlice";
import { Loader2 } from "lucide-react";
import Spinner1 from "../spinner/Spinner1";
import Spinner2 from "../spinner/Spinner2";
import Spinner3 from "../spinner/Spinner3";

const SignUp = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    file: null,
  });

  const navigate = useNavigate();

  const { loading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    setData((prevData) => ({
      ...prevData,
      file: file,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      formData.append("role", data.role);
      if (data.file) {
        formData.append("file", data.file);
      }

      const response = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        dispatch(setLoading(false));
        dispatch(setUser(response?.data?.user));
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-[75rem] mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md py-5 px-7 my-10 flex flex-col gap-4 shadow-md"
        >
          <h1 className="font-bold text-[1.7rem] mb-5">Sign Up</h1>
          <div className="flex flex-col gap-3">
            <Label>Full Name</Label>
            <Input
              onChange={onChangeHandler}
              value={data.fullName}
              name="fullName"
              type="text"
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              onChange={onChangeHandler}
              type="email"
              value={data.email}
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Password</Label>
            <Input
              onChange={onChangeHandler}
              type="password"
              value={data.password}
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Phone</Label>
            <Input
              onChange={onChangeHandler}
              type="number"
              value={data.phone}
              name="phone"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  onChange={onChangeHandler}
                  checked={data.role === "job_seeker"}
                  value="job_seeker"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Job Seeker</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  checked={data.role === "recruiter"}
                  onChange={onChangeHandler}
                  value="recruiter"
                  className="cursor-pointer "
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile: </Label>
              <Input
                onChange={changeFileHandler}
                accept="image/*"
                type="file"
                className="cursor-pointer"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full py-[22px]">
              <div className="">
                <Spinner2 className="" />
              </div>
            </Button>
          ) : (
            <Button type="submit" className="w-full py-[22px]">
              Sign up
            </Button>
          )}
          <span>
            Already have an account?{" "}
            <Link className="text-blue-700 hover:underline" to={"/login"}>
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
