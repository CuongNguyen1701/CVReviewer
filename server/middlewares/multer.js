import multer from "multer";
import loadPdf from "../services/loadPdf.js";
import fetch from "node-fetch";
import fs from "fs";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + ".pdf");
  },
});
const multi_upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
}).array("uploadedImages", 100);

const upload_process = (req, res) => {
  multi_upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res
        .status(500)
        .send({ error: { message: `Multer uploading error: ${err.message}` } })
        .end();
      return;
    } else if (err) {
      // An unknown error occurred when uploading.
      if (err.name == "ExtensionError") {
        res
          .status(413)
          .send({ error: { message: err.message } })
          .end();
      } else {
        res
          .status(500)
          .send({
            error: { message: `unknown uploading error: ${err.message}` },
          })
          .end();
      }
      return;
    }

    // Everything went fine.
    // show file `req.files`
    // show body `req.body`
    try {
      const promises = req.files.map(async (file) => {
        const data = await loadPdf(file.path);
        fs.unlink(`${file.path}`, (err) => {
          if (err) throw err;
        });
        return data;
      });

      await Promise.all(promises).then(async (arrayData) => {
        // Serialize the request body into JSON
        const body = JSON.stringify({
          des: req.body.des,
          inf: arrayData,
        });

        const response = await fetch("http://0.0.0.0:8080/predict", {
          method: "POST", // method should be in lowercase
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: body, // Pass the JSON string as the request body
          cache: "default",
        });

        const json = await response.json();
        res.json(json);
      });
    } catch (err) {
      console.log(err);
    }
  });
};
export default upload_process;
