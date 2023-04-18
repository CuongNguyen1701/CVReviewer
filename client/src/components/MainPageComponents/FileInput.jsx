import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { GearCanvas } from "../canvas";
import { styles } from "../../styles";
import { staggerContainer } from "../../utils/motion";
import { slideIn, textVariant } from "../../utils/motion";
import axios from "axios";

const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL || ""; //from .env files

const FileInput = ({ updateResponse }) => {
  const [loading, setLoading] = useState(0);
  const [paragraph, setParagraph] = useState("");
  const [files, setFiles] = useState([]);

  //send CV and paragraph to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!files) return alert("No files selected");
    console.log("here");
    const formData = new FormData();

    formData.append("uploadedCVs", files); //key 1
    formData.append("des", paragraph); //key 2

    console.log(formData);
    for (const entry of formData) {
      console.log(entry); //Show all entries in formData
    }
    console.log(backendUrl);
    updateResponse([
      { filename: "test.pdf", rating: 0.5 },
      { filename: "test.pdf", rating: 2.5 },
    ]);
    // try {
    //   const response = await axios.post(`${backendUrl}`, formData);
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
    // TODO: API and stuf
    setLoading(1);
  };

  //Change displayed text whenever the user changes the requirement field(e.g. typing, deleting)
  const handleTextChange = (event) => {
    setParagraph(event.target.value);
  };

  //Change the input files whenever the user
  const handleFileInputChange = (e) => {
    try {
      setLoading(0);
      const processedFiles = e.target ? e.target.files : e;
      console.log(processedFiles);
      if (!processedFiles) return;
      setFiles((files) => [...files, ...processedFiles]);
      console.log(files);
    } catch (err) {
      console.log(err);
    }
  };

  const onDrop = async (e) => {
    handleFileInputChange(e);
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    onDrop,
  });

  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`${styles.padding} max-w-7xl mx-auto relative z-0 flex flex-col`}
    >
      <span className="hash-span" id={"service"}>
        &nbsp;
      </span>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Service</p>
        <h2 className={styles.sectionHeadText}>CV Reviewer</h2>
      </motion.div>
      <div
        className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden select-none`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
        >
          <form>
            <label className="p-3">Write about your staff requirements</label>
            <textarea
              id="paragraph"
              name="paragraph"
              rows="5"
              className="p-5 block w-full mt-1 border-gray-300 rounded-md shadow-sm resize-none
              focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={paragraph}
              placeholder="Enter your JD..."
              onChange={handleTextChange}
            />
            <div className="my-5">
              Drag n' drop your CV here for an AI-flavored review!
              <div
                {...getRootProps()}
                htmlFor="dropzone-files"
                className="flex flex-col gap-8 px-8 py-20 my-3 text-center text-black border-2 border-dashed cursor-pointer rounded-xl border-slate-500 bg-slate-100 hover:bg-slate-400 hover:border-black hover:text-white"
              >
                DROPZONE
                <input
                  {...getInputProps()}
                  id="dropzone-files"
                  accept=".pdf"
                  type="files"
                  multiple={true}
                  className="hidden"
                  onChange={handleFileInputChange}
                />
              </div>
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between gap-5 bg-slate-500 rounded-md m-4 p-2 w-5/6 hover:bg-slate-300 hover:text-black"
                >
                  {index + 1}.{" "}
                  {file.name.length > 30
                    ? `${file.name.substr(0, 20)}...`
                    : file.name}
                  <button
                    className="bg-red-500 text-white rounded-3xl h-6 w-6 hover:bg-red-300 z-10"
                    onClick={(event) => {
                      event.preventDefault();
                      setFiles(files.filter((f) => f !== file));
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                className="flex flex-row w-fit h-auto green-pink-gradient p-[1px]
            rounded-[10px] shadow-card select-none self-end"
              >
                <div
                  className="bg-tertiary hover:bg-slate-600 rounded-[10px] py-5 px-12  
              flex justify-evenly items-center flex-col"
                  onClick={handleSubmit}
                >
                  SUBMIT
                </div>
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="flex-1 xl:h-[500px] h-[350px] w-auto"
        >
          <GearCanvas loading={loading} />
          {loading ? (
            <div className="self-center animate-pulse text-2xl">
              Waiting for the Ayy Eye to do the magic...
            </div>
          ) : null}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FileInput;
