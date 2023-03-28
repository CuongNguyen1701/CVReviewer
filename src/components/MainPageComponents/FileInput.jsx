import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { GearCanvas } from "../canvas";
import PdfPreview from "./PDFPreview";
import { styles } from "../../styles";
import { staggerContainer } from "../../utils/motion";
import { slideIn, textVariant } from "../../utils/motion";
import axios from "axios";

const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL || ""; //from .env file

const FileInput = ({ updateResponse }) => {
  const [loading, setLoading] = useState(0);
  const [paragraph, setParagraph] = useState("");
  const [file, setFile] = useState(null);

  //send CV and paragraph to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return alert("No file selected");
    console.log("here");
    const formData = new FormData();
    formData.append("uploadedImages", file, file.name); //key 1
    formData.append("des", paragraph); //key 2

    console.log(formData);
    for (const entry of formData) {
      console.log(entry); //Show all entries in formData
    }
    try {
      setLoading(1); //make the gear spin
      const response = await axios.post(`${backendUrl}/upload`, formData); //API
      console.log(response); //Response on inspect ele console
      updateResponse(1); //used to trigger fake response div
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setLoading(0); //stop the gear from moving
    }, 1000);
  };

  //Change displayed text whenever the user changes the requirement field(e.g. typing, deleting)
  const handleTextChange = (event) => {
    setParagraph(event.target.value);
  };

  //Change the input file whenever the user
  const handleFileInputChange = (e) => {
    try {
      setLoading(0);
      const processedFile = e.target ? e.target.files[0] : e;
      if (!processedFile) return;
      setFile(processedFile);
    } catch (err) {
      console.log(err);
    }
  };

  const onDrop = async (acceptedFiles) => {
    handleFileInputChange(acceptedFiles[0]);
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
              onChange={handleTextChange}
            />
            <div className="my-5">
              Drag n' drop your CV here for an AI-flavored review!
              <div
                {...getRootProps()}
                htmlFor="dropzone-file"
                className="flex flex-col gap-8 px-8 py-20 my-3 text-center text-black border-2 border-dashed cursor-pointer rounded-xl border-slate-500 bg-slate-100 hover:bg-slate-400 hover:border-black hover:text-white"
              >
                DROPZONE
                <input
                  {...getInputProps()}
                  id="dropzone-file"
                  accept=".pdf"
                  type="file"
                  className="hidden"
                  onChange={handleFileInputChange}
                />
              </div>
              {file && (
                <div className="p-3 flex flex-row">
                  {file.name} uploaded!
                  {/* <PdfPreview file={file} /> */}
                </div>
              )}
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
