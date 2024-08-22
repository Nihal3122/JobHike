import { Job } from "../Models/jobModel.js";

export const postJob = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
        success: false,
      });
    }

    // Create new job
    const job = new Job({
      title,
      description,
      requirements: requirements.split(" , "),
      salary: Number(salary),
      location,
      jobType,
      experience,
      position,
      company: companyId,
      createdBy: userId,
    });

    await job.save();

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// This Controller is for Job Seekers
export const getAllJobs = async (req, res) => {
  try {
    // Get the keyword from the query parameters
    const keyword = req.query.keyword || "";
    
    // Take only the first four letters of the keyword
    const limitedKeyword = keyword.substring(0, 4);
    
    console.log("limitedKeyword",limitedKeyword); // Logging the first four letters of the keyword
    
    // Create a query to search for the first four letters of the keyword
    const query = {
      $or: [
        { title: { $regex: limitedKeyword, $options: "i" } },
      ],
    };

    // Fetch jobs based on the query
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found",
      });
    }
    
    // Return the jobs if found
    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// This Controller is for Job Seekers
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate({
        path: "company",
      })
      .populate({
        path: "application",
        populate: {
          path: "applicant",
        },
      });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// This Controller is for Recruiters
export const getJobsByRecruiter = async (req, res) => {
  try {
    const userId = req.userId;
    const jobs = await Job.find({ createdBy: userId }).populate({
      path: "company",
    });
    if (!jobs) {
      return res.status(404).status({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
  }
};
