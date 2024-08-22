import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const Jobs = () => {
  const hideScrollbarStyle = {
    overflowY: "scroll",
    scrollbarWidth: "none", // For Firefox
    msOverflowStyle: "none", // For Internet Explorer and Edge
  };
  const { allJobs, searchQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title
            .toLowerCase()
            .includes(searchQuery.substring(0, 4).toLowerCase()) ||
          job.location
            .toLowerCase()
            .includes(searchQuery.substring(0, 4).toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchQuery]);

  return (
    <>
      <Navbar />
      <div className="max-w-8xl mx-auto pt-7 bg-slate-50 px-10">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span className=" h-10 text-lg font-semibold py-2 px-4  rounded-lg bg-gray-100">
              No Job Available
            </span>
          ) : (
            <div className="flex-1 h-[88vh] pb-5" style={hideScrollbarStyle}>
              <div className="grid grid-cols-3 gap-4 gap-y-7 ">
                <AnimatePresence>
                  {filterJobs.map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;
