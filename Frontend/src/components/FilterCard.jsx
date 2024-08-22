import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const filterData = [
  {
    filterType: "Location",
    values: [
      "Ahmedabad",
      "Vadodara",
      "Gandhinagar",
      "Hyderabad",
      "Delhi",
      "Bangalore",
    ],
  },
  {
    filterType: "Job Roles",
    values: [
      "Frontend Developer",
      "Backend Developer",
      "Data Scientist",
      "Graphic Designer",
      "Full Stack Developer",
      "MERN Stack Developer",
      "UI/UX Designer",
      "Software Tester",
      "Mobile App Developer",
    ],
  },

];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const onChangeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);

  return (
    <motion.div
      className="bg-white shadow-xl border border-gray-200 rounded-md p-1 sticky"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-xl ml-5 font-semibold mb-4 pt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        All Filters
      </motion.h1>
      <hr className="mb-3 w-56 ml-4 border-t-2 border-slate-200" />
      <RadioGroup onValueChange={onChangeHandler} value={selectedValue}>
        {filterData.map((data, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <div className="mb-1 ml-6">
              <motion.h2
                className="text-xl font-semibold mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                {data.filterType}
              </motion.h2>
              {data.values.map((value, valueIndex) => (
                <motion.div
                  key={`${index}-${valueIndex}`}
                  className="flex items-center space-x-2 my-[14px] ml-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + valueIndex * 0.1 }}
                >
                  <RadioGroupItem value={value} id={`${index}-${valueIndex}`} />
                  <Label
                    className="text-slate-600"
                    htmlFor={`${index}-${valueIndex}`}
                  >
                    {value}
                  </Label>
                </motion.div>
              ))}
            </div>
            <hr className="mb-1 w-56 ml-4 border-t-2 border-slate-200" />
          </motion.div>
        ))}
      </RadioGroup>
    </motion.div>
  );
};

export default FilterCard;
