import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-24">
      <h1 className="text-4xl font-bold">
        <span className="text-[#8216b8]">Latest & Top</span> Job Openings
      </h1>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-10 my-16 mx-10">
        <AnimatePresence>
          {allJobs.length !== 0 &&
            allJobs.slice(0, 6).map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <LatestJobCard job={job} />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LatestJobs;
