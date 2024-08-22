import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/Constants";

const ApplicantionsTable = () => {
  const shortListing = ["accepted", "rejected"];
  const { allApplicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const response = await axios.put(
        `${APPLICATION_API_END_POINT}/update/application/${id}`,
        { status },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A List of recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allApplicants &&
            allApplicants?.application?.map((item) => {
              return (
                <tr key={item.applicant._id}>
                  <TableCell>{item?.applicant?.fullName}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell>
                  <TableCell>{item?.applicant?.phone}</TableCell>
                  <TableCell>
                    {item.applicant.profile.resume ? (
                      <a
                        className="text-blue-600 cursor-pointer hover:underline"
                        href={item?.applicant?.profile?.resumeOriginalName}
                        target="_blank"
                      >
                        {item?.applicant?.profile?.resumeOriginalName}
                      </a>
                    ) : (
                      <span>NA</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item?.applicant?.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 flex flex-col gap-2 bg-white shadow-lg rounded-lg p-2">
                        {shortListing?.map((status, index) => {
                          return (
                            <div
                              className="hover:bg-slate-200 cursor-pointer rounded-md px-2 py-1 transition duration-200 ease-in-out"
                              key={index}
                              onClick={() => statusHandler(status, item._id)}
                            >
                              <span className="text-sm font-medium">
                                {status}
                              </span>
                            </div>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </tr>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantionsTable;
