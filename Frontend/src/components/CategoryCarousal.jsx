import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack Developer",
  "MERN Stack Developer",
  "Video Editing",
  "Data Analyst",
  "UI/UX Designer",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Cybersecurity Specialist",
  "Software Tester",
  "Mobile App Developer",
];

const CategoryCarousal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="">
      <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent className="">
          {category.map((category, index) => {
            return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Button
                    onClick={() => searchJobHandler(category)}
                    className="rounded-full w-48 h-10 bg-slate-100"
                    variant="outline"
                  >
                    {category}
                  </Button>
                </motion.div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  );
};

export default CategoryCarousal;
