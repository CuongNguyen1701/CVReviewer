import multer from "multer";
import loadPdf from "./loadPdf.js";
import fetch from "node-fetch";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const dirPath = `./uploads/${uuidv4()}`;
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    await fs.promises.mkdir(dirPath, { recursive: true });
    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const multi_upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 1MB
}).array("uploadedCVs", 100);

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
      let fileList = [];
      // console.log(req.user);
      const promises = req.files.map(async (file) => {
        const data = await loadPdf(file.path);
        fs.unlink(`${file.path}`, (err) => {
          if (err) throw err;
        });
        fileList.push(file.filename);
        return data;
      });

      Promise.all(promises).then(async (arrayData) => {
        // Serialize the request body into JSON
        // console.log(arrayData);
        // await fs.promises.rmdir(dirPath);
        const body = JSON.stringify({
          des: req.body.description,
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

        const result = fileList.map((filename, i) => ({
          filename,
          sorted: json.sorted[i],
          rating:
            json.similarity[i] < 0 ? -json.similarity[i] : json.similarity[i],
        }));
        result.sort((a, b) => b.rating - a.rating);

        console.log(JSON.stringify(result));
        res.json(result);
      });
    } catch (err) {
      console.log(err);
    }
  });
};
export default upload_process;
