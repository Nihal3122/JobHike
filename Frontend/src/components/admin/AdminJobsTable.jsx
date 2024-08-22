import React, { useEffect, useState } from "react";
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
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJob, searchJob } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJob);
  const navigate = useNavigate();

  useEffect(() => {
    const filterdJobs =
      allAdminJob.length >= 1 &&
      allAdminJob.filter((job) => {
        if (!searchJob) {
          return true;
        } else {
          return (
            job?.company?.name
              ?.toLowerCase()
              .includes(searchJob?.toLowerCase()) ||
            job?.title?.toLowerCase().includes(searchJob?.toLowerCase())
          );
        }
      });
    setFilterJobs(filterdJobs);
  }, [allAdminJob, searchJob]);
  return (
    <div>
      <Table>
        <TableCaption>A list of you recent registered job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job, index) => {
            return (
              <tr key={job?._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 ">
                      <div
                        onClick={() => navigate(`/admin/companies/${job?._id}`)}
                        className="flex items-center gap-4 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => navigate(`/jobs/applicants/${job?._id}`)}
                        className="flex items-center w-fit gap-4 cursor-pointer mt-4"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
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

export default AdminJobsTable;
