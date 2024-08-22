import { Company } from "../Models/CompanyModel.js";
import cloudinary from "../utils/Cloudinary.js";
import { getDataUri } from "../utils/DataUri.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;
    const userId = req.userId;
    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Company name is requried.",
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        success: false,
        message:
          "A company with this name already exists. Please choose a different name.",
      });
    }
    company = await Company.create({
      name: companyName,
      userId,
      description,
      website,
      location,
    });
    return res.status(201).json({
      company,
      message: "Company created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.userId;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        companies,
        message: "Companies not found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      fileUri.content
    );
    const logo = cloudinaryResponse.secure_url;
    const updatedData = { name, description, website, location, logo };
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company Updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
