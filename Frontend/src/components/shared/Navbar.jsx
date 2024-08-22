import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/Constants";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";

const Navbar = () => {
  const location = useLocation();
  const { user } = useSelector((store) => store.user);
  const [active, setActive] = useState(
    user?.role === "recruiter" ? "company" : "home"
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profilePhoto = user?.profile?.profilePhoto;

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActive("home");
    } else if (path === "/jobs") {
      setActive("jobs");
    } else if (path === "/browse") {
      setActive("browse");
    } else if (path === "/company") {
      setActive("company");
    } else if (path === "/adminjobs") {
      setActive("adminjobs");
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/logout`,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(setUser(null));
      navigate("/");
      dispatch(setUser(response?.data?.user));
    } catch (error) {
      console.log(error);
      toast.success(error.response.data.message);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20">
        <Link to={"/"}>
          <h1 className="text-3xl font-bold">
            Job
            <span className="text-[#8216b8]">Hike</span>
          </h1>
        </Link>
        <div className="flex items-center gap-12 ml-[810px]">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li
                  onClick={() => setActive("company")}
                  className={`cursor-pointer  ${
                    active === "company"
                      ? "border-b border-b-[#8216b8] "
                      : "text-gray-700"
                  }`}
                >
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li
                  onClick={() => setActive("adminjobs")}
                  className={`cursor-pointer hover:text-[#6b0a8b] ${
                    active === "adminjobs"
                      ? "border-b border-b-[#8216b8] "
                      : "text-gray-700"
                  }`}
                >
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li
                  onClick={() => setActive("home")}
                  className={`cursor-pointer  ${
                    active === "home"
                      ? "border-b border-b-[#8216b8] "
                      : "text-gray-700"
                  }`}
                >
                  <Link to={"/"}> Home</Link>
                </li>
                <li
                  onClick={() => setActive("jobs")}
                  className={`cursor-pointer hover:text-[#6b0a8b] ${
                    active === "jobs"
                      ? "border-b border-b-[#8216b8] "
                      : "text-gray-700"
                  }`}
                >
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li
                  onClick={() => setActive("browse")}
                  className={`cursor-pointer hover:text-[#6b0a8b] ${
                    active === "browse"
                      ? "border-b border-b-[#8216b8] text-[#8216b8]"
                      : "text-gray-700"
                  }`}
                >
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {user?._id ? (
            <div className="flex items-center gap-3">
              <Link to={"/login"}>
                <Button
                  className="px-6 py-5 border border-gray-700 text-gray-700 bg-white hover:bg-gray-100 transition duration-300"
                  variant="outline"
                >
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="px-6 py-[21px] bg-purple-800 text-white hover:bg-purple-700 transition duration-300">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-12 h-12">
                  {profilePhoto ? (
                    <AvatarImage
                      width={20}
                      className="rounded-full"
                      src={profilePhoto}
                    />
                  ) : (
                    <div>No Image</div>
                  )}
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className=" w-72 ">
                <div className="flex gap-4 ">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      width={45}
                      className="rounded-full"
                      src={profilePhoto}
                    />
                  </Avatar>
                  <div className="">
                    <h4 className="text-base">{user?.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === "job_seeker" && (
                    <div className="flex w-fit items-center cursor-pointer text-gray-600">
                      <User2 />
                      <Button variant="link">
                        <Link to={"/profile-page"}>View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div
                    onClick={handleLogout}
                    className="flex w-fit items-center cursor-pointer text-gray-600"
                  >
                    <LogOut />
                    <Button variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
