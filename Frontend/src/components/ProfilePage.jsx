import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import Google from "../assets/Google.png";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, User2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { IoLocationOutline } from "react-icons/io5";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfilePage from "./UpdateProfilePage";
import { useSelector } from "react-redux";
import { useGetAppliedJobs } from "@/hooks/useGetAppliedJobs";

const ProfilePage = () => {
  useGetAppliedJobs()
  const isResume = true;
  const [openUpdateProfile, setOpenProfileOpen] = useState(false);
  const { user } = useSelector((store) => store.user);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg my-10 p-8">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto ? (
                    user?.profile?.profilePhoto
                  ) : (
                    <User2 />
                  )
                }
                alt="Profile"
                className="h-24 w-24 rounded-full object-scale-down"
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.fullName}
              </h1>
              <p className="text-gray-600">{user?.profile?.bio || ""}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpenProfileOpen((prev) => !prev)}
            variant="outline"
            className="border-gray-300 flex items-center"
          >
            <Pen className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="h-5 w-5" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <IoLocationOutline size={20} className="mt-[2px]" />
              <span>Ahmedabad, India</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact className="h-5 w-5" />
            <span>{user?.phone}</span>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-gray-800 border-gray-300 px-4 hover:bg-slate-100  py-1"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-600">NA</span>
            )}
          </div>
        </div>
        <div className="mt-6">
          <Label className="text-xl font-semibold text-gray-800">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="text-blue-500 hover:underline mt-2 block"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-600">NA</span>
          )}
        </div>
      </div>
      <div className="mt-8 max-w-4xl mx-auto border border-gray-200 bg-white rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Applied Jobs
        </h2>
        
      </div>
      {openUpdateProfile && (
        <UpdateProfilePage
          open={openUpdateProfile}
          setOpen={setOpenProfileOpen}
        />
      )}
    </div>
  );
};

export default ProfilePage;
