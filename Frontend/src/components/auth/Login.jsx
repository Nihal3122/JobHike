import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/Constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/userSlice";
import { Loader2 } from "lucide-react";
import Spinner2 from "../spinner/Spinner2";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.user);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_END_POINT}/login`, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success) {
        dispatch(setUser(response?.data?.user));
        navigate("/");
        dispatch(setLoading(false));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, []);
  return (
    <div className="">
      <Navbar />
      <div className=" my-10 flex items-center justify-center max-w-[60rem] mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md py-5 px-7 my-10 flex flex-col gap-6 shadow-md "
        >
          <h1 className="font-bold text-3xl mb-4">Login</h1>
          <div className="flex flex-col gap-3 ">
            <Label>Email</Label>
            <Input
              onChange={onChangeHandler}
              type="email"
              value={data.email}
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <Label>Password</Label>
            <Input
              onChange={onChangeHandler}
              type="password"
              value={data.password}
              name="password"
              placeholder="Enter your password"
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
          </div>
          {loading ? (
            <Button className="w-full py-[22px]">
              <div className="">
                <Spinner2 className="" />
              </div>
            </Button>
          ) : (
            <Button type="submit" className="w-full py-[22px]">
              Login
            </Button>
          )}

          <span>
            Dont't have an account?{" "}
            <Link className="text-blue-700  hover:underline" to={"/signup"}>
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
