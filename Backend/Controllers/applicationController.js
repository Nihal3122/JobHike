import { Application } from "../Models/applicationModel.js";
import { Job } from "../Models/jobModel.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.userId;
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    if (!jobId) {
      return res.status(404).json({
        message: "Job Id is requried",
      });
    }
    // Now Check if the user already apply for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You’ve already applied for this job.",
      });
    }
    // Create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.application.push(newApplication);
    await job.save();
    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.userId;
    const application = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "application not found",
        success: false,
      });
    }
    res.status(200).json({
      application,
    });
  } catch (error) {
    console.log(error);
  }
};

// For Recruiters How much applicants applied for his job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
        options: { sort: { createdAt: -1 } },
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json({
      job,
    });
  } catch (error) {
    console.log(error);
  }
};

// update status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicantionId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status are requried",
      });
    }
    if (!applicantionId) {
      return res.status(400).json({
        message: "applicantion id are requried",
      });
    }
    // find application by applicationId
    const application = await Application.findOne({ _id: applicantionId });
    if (!application) {
      return res.status(404).json({
        message: "applicantion not found",
      });
    }

    // update the status
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
