import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col my-10 gap-5">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto px-4 py-2 bg-gray-100 text-[#de5298] font-medium rounded-full border shadow-sm"
        >
          JobHike: The Premier Job Portal Website
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold"
        >
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#8216b8]">Dream Job</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Discover top global job opportunities for every career stage with
          JobHike.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex w-[40%] shadow-lg border border-gray-200 pl-3 items-center gap-4 mx-auto rounded-full h-14"
        >
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="job title, keywords, or company"
            className="outline-none border-none w-full px-3"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#8216b8] h-14 w-16 hover:bg-[#6d0b9e]"
          >
            <Search className="w-28" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
