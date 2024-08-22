import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useGetAllJobs } from "@/hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { motion, AnimatePresence } from "framer-motion";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchQuery(""));
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Search Results ({allJobs.length})
        </h1>
        {allJobs.length === 0 && (
          <p className="text-center text-lg mt-32 font-semibold text-gray-700 bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300 max-w-md mx-auto">
            No jobs found for this category. Please check back later!
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <AnimatePresence>
            {allJobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Browse;
