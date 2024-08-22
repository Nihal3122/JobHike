import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div className="overflow-x-auto bg-white">
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader>
          <TableRow className="">
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job Role
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </TableHead>
            <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {allAppliedJobs?.length > 0 &&
            allAppliedJobs?.map((appliedJob, index) => (
              <TableRow key={appliedJob?._id}>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {appliedJob?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {appliedJob?.job.title}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {appliedJob?.job.company?.name}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-right">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                      appliedJob?.status === "pending"
                        ? "text-yellow-800 bg-yellow-100"
                        : appliedJob?.status === "accepted"
                        ? "text-green-800 bg-green-100"
                        : ""
                    }`}
                  >
                    {appliedJob?.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
