import multer from "multer";
import path from "path";
import fs from "fs";

const createMulter = (folderName = "others") => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = folderName || "others";
      const uploadPath = path.join("assets", folder); //assets/profile

      // if folder does not exist. so we will make directory.
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`,
      );
    },
  });

  return multer({ storage });
  //   return multer({
  //   storage,
  //   limits: { fileSize: 5 * 1024 * 1024 } // 5MB
  // });
};

export default createMulter;

// //✔ Create a folder → assets/profile
// ✔ Upload files inside that folder
// ✔ Generate unique file names
// ✔ Return a configured multer instance
