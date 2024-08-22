import React from "react";
import { Badge } from "./ui/badge";
import { PiBagSimple } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

const LatestJobCard = ({ job }) => {
  const daysAgoFunction = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAtDate;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };
  const navigate = useNavigate();

  return (
    <div className="p-5 w-[380px] rounded-md shadow-lg bg-white border transition hover:shadow-xl hover:border-gray-300 cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="text-base text-gray-600">
          {job?.createdAt
            ? daysAgoFunction(job?.createdAt) === 0
              ? "Today"
              : `${daysAgoFunction(job?.createdAt)} day${
                  daysAgoFunction(job?.createdAt) > 1 ? "s" : ""
                } ago`
            : "Today"}
        </p>
        <Button
          variant="outline"
          className="rounded-full hover:bg-gray-100"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-3 my-2">
        <Button variant="outline" className="p-6 hover:bg-gray-100" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} className="object-fill" />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-semibold ">{job?.company?.name}</h1>
          <p className="text-base text-slate-600">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-semibold text-lg my-2 ">{job?.title}</h1>
        <p className="text-sm text-gray-700 line-clamp-2 h-10">{job?.description}</p>
      </div>

      <div className="flex items-center mt-4 ml-2">
        <div className="flex items-center gap-1 font-[450]">
          <PiBagSimple className="mt-[2px]" />
          <p className="">{job?.experience} Years</p>
        </div>
        <div className="border w-6 rotate-90 border-slate-200"></div>
        <div className="flex items-center gap-1 font-[450]">
          <p className="">
            ₹ <span className="ml-[px]">{job?.salary}</span>
          </p>
        </div>
        <div className="border w-6 rotate-90 border-slate-200"></div>
        <div className="flex items-center gap-1 font-[450]">
          <IoLocationOutline className="mt-[2px]" />
          <p className="">India</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/job/description/${job?._id}`)}
          variant="outline"
          className="px-4 py-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800 hover:bg-gray-100 transition duration-150 ease-in-out"
        >
          Details
        </Button>
        <Button
          variant="outline"
          className="px-4 py-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800 hover:bg-gray-100 transition duration-150 ease-in-out"
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default LatestJobCard;
