import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Spinner2 from "./spinner/Spinner2";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/Constants";
import { setUser } from "@/redux/userSlice";
import { toast } from "sonner";

const UpdateProfilePage = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.user);
  const [data, setData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || null,
  });
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
  console.log(data.skills);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("bio", data.bio);
      formData.append("skills", data.skills);

      if (data?.file) {
        formData.append("file", data.file);
      }
      const response = await axios.post(
        `${USER_API_END_POINT}/update-profile`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.user) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        setLoading(false);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            Update Profile
          </DialogTitle>
        </DialogHeader>
        <form className="mt-5 -ml-16" onSubmit={submitHandler}>
          <div className="grid gap-6">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right text-gray-700">
                Name:
              </Label>
              <Input
                id="fullName"
                onChange={onChangeHandler}
                value={data.fullName}
                className="col-span-3 border-gray-300"
                name="fullName"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right text-gray-700">
                Email:
              </Label>
              <Input
                id="email"
                onChange={onChangeHandler}
                value={data.email}
                className="col-span-3 border-gray-300"
                name="email"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right text-gray-700">
                Phone:
              </Label>
              <Input
                id="phone"
                onChange={onChangeHandler}
                value={data.phone}
                type="number"
                className="col-span-3 border-gray-300"
                name="phone"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right text-gray-700">
                Bio:
              </Label>
              <Input
                id="bio"
                onChange={onChangeHandler}
                value={data.bio}
                className="col-span-3 border-gray-300"
                name="bio"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right text-gray-700">
                Skills:
              </Label>
              <Input
                id="skills"
                onChange={onChangeHandler}
                value={data.skills}
                className="col-span-3 border-gray-300"
                name="skills"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right text-gray-700">
                Resume:
              </Label>
              <Input
                id="file"
                type="file"
                onChange={changeFileHandler}
                className="col-span-3 border-gray-300"
                accept="application/pdf"
                name="file"
              />
            </div>
          </div>
          <div className="flex justify-end mt-10">
            {loading ? (
              <Button className="w-32 text-white border-none rounded-md shadow-md">
                <div className="flex items-center justify-center">
                  <Spinner2 className="w-5 h-5" />
                </div>
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-32 text-white border-none rounded-md shadow-md focus:outline-none"
              >
                Save Changes
              </Button>
            )}
          </div>
          <DialogFooter></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfilePage;
