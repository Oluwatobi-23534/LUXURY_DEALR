// upload.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const name = path.basename(
      file.originalname,
      path.extname(file.originalname)
    ); // Remove the extension from the original filename
    cb(null, `${name}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function fileFilter(req, file, cb) {
    const fileTypes = /jpe?g|png|webp/
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/

    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = mimetypes.test(file.mimetype)

    if (extname && mimetype) {
        cb(null, true)
    } else {
        cb(new Error("images Only"), false)
    }
}

const upload = multer({ storage: storage });

export default upload;
