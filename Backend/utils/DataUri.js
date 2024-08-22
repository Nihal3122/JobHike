import DatauriParser from "datauri/parser.js";
import path from "path";

const parser = new DatauriParser();

export const getDataUri = (file) => {
  const extName = path.extname(file.originalname).toString();
  try {
    return parser.format(extName, file.buffer);
  } catch (error) {
    throw error;
  }
};
