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
import { Avatar, AvatarImage } from "../ui/avatar";
import Microsoft from "../../assets/Microsoft.png";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetAllCompanies } from "@/hooks/useGetAllCompanies";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompany } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filterdCompany =
      companies.length >= 1 &&
      companies.filter((company) => {
        if (!searchCompany) {
          return true;
        } else {
          return company?.name
            ?.toLowerCase()
            .includes(searchCompany?.toLowerCase());
        }
      });
    setFilterCompany(filterdCompany);
  }, [companies, searchCompany]);
  return (
    <div>
      <Table>
        <TableCaption>A list of you recent registered company</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length > 0 &&
            filterCompany?.map((company, index) => {
              return (
                <tr key={company._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={company.logo}
                        className="object-cover"
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 ">
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${company?._id}`)
                          }
                          className="flex items-center gap-4 w-fit cursor-pointer"
                        >
                          <Edit2 />
                          <span className="w-4">Edit</span>
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

export default CompaniesTable;
