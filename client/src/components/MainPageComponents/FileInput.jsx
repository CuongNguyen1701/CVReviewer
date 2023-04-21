import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { GearCanvas } from "../canvas";
import { styles } from "../../styles";
import { staggerContainer } from "../../utils/motion";
import { slideIn, textVariant } from "../../utils/motion";
import { History } from "./";
import SubmitButton from "./SubmitButton";
import axios from "axios";

const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL || ""; //from .env files

const FileInput = ({ updateResponse, history }) => {
  const [loading, setLoading] = useState(0);
  const [paragraph, setParagraph] = useState("");
  const [files, setFiles] = useState([]);
  const [language, setLanguage] = useState("en");

  //send CV and paragraph to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!files) return alert("No files selected");
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("uploadedCVs", file);
    });
    formData.append("description", paragraph);
    formData.append("language", language);

    for (const entry of formData) {
      console.log(entry); //Show all entries in formData
    }
    console.log(backendUrl);
    try {
      setLoading(1);
      const response = await axios.post(`${backendUrl}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      updateResponse(response.data);
    } catch (error) {
      setLoading(0);
      console.log(error);
    }
    setLoading(0);
    // TODO: API and stuf
  };

  //Change displayed text whenever the user changes the requirement field(e.g. typing, deleting)
  const handleTextChange = (event) => {
    setParagraph(event.target.value);
  };

  //Change the input files whenever the user
  const handleFileInputChange = (e) => {
    try {
      setLoading(0);
      let processedFiles = e.target ? e.target.files : e;
      if (!processedFiles) return;
      let unuploadedFiles = [];
      processedFiles = processedFiles.filter((file) => {
        if (file.size > 2 * 1e6) unuploadedFiles.push(file.name);
        return file.size < 2 * 1e6;
      });
      setFiles((files) => [...files, ...processedFiles]);
      if (unuploadedFiles.length > 0) {
        unuploadedFiles.length < 5 &&
          alert(
            `The following files are too large: \n${unuploadedFiles.join(
              ", "
            )}.\n\n Please upload files smaller than 2MB.`
          );
        unuploadedFiles.length >= 5 &&
          alert(
            `The following files are too large: \n${unuploadedFiles
              .slice(0, 5)
              .join(", ")}, and ${
              unuploadedFiles.length - 5
            } more.\n\n Please upload files smaller than 2MB.`
          );
      }
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

  const UploadedFile = ({ file, index }) => {
    return (
      <div
        key={index}
        className="flex flex-row justify-between gap-5 bg-slate-500 rounded-md m-4 p-2  hover:bg-slate-300 hover:text-black"
      >
        <div className="flex flex-row gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6c/PDF_icon.svg"
            className="h-auto w-5"
          ></img>
          {index + 1}.{" "}
          {file.name.length > 30
            ? `${file.name.substr(0, 20)}...pdf`
            : file.name}
        </div>
        <button
          className="bg-red-500 text-white rounded-3xl h-6 w-6 hover:bg-red-300 hover:text-black z-10"
          onClick={(event) => {
            event.preventDefault();
            setFiles(files.filter((f) => f !== file));
          }}
        >
          X
        </button>
      </div>
    );
  };
  const LanguageButton = ({ lang }) => {
    let backgroundImage = `bg-${lang}-circle`;
    let isSelected = language === lang;
    <div className="bg-vn-circle"></div>;
    <div className="bg-en-circle"></div>;
    return (
      <div
        className={` ${
          isSelected ? "text-white" : "text-gray-500"
        } flex flex-col items-center`}
      >
        <button
          className={`${backgroundImage} bg-cover w-10 h-10 ${
            isSelected ? "brightness-100" : "brightness-50"
          } rounded-full hover:brightness-100`}
          onClick={(event) => {
            event.preventDefault();
            setLanguage(`${lang}`);
          }}
        ></button>
        {lang.toUpperCase()}
      </div>
    );
  };
  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`${styles.padding} max-w-full mx-auto relative z-0 flex flex-col`}
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
          <div className="flex flex-row justify-center gap-5">
            <div className="bg-tertiary p-8 rounded-2xl">
              History
              <History history={history} />
            </div>
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
                <div
                  {...getRootProps()}
                  htmlFor="dropzone-files"
                  className="flex flex-col gap-8 px-8 py-20 my-3 text-center text-black border-2 border-dashed cursor-pointer rounded-xl 
                          border-slate-500 bg-slate-100 hover:bg-slate-400 hover:text-white hover:border-white"
                >
                  Drag & drop your CV here for an AI-flavored review!
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
                <button
                  className="bg-red-500 rounded-2xl max-h-20 p-2
                                  hover:bg-red-300 hover:text-black"
                  onClick={(event) => {
                    event.preventDefault();
                    setFiles([]);
                  }}
                >
                  Clear all
                </button>
                {files.map((file, index) => (
                  <UploadedFile file={file} index={index} key={index} />
                ))}
                <div className="flex flex-row justify-between">
                  <SubmitButton handleSubmit={handleSubmit} />
                  <div className="flex flex-row gap-5 p-2 justify-between">
                    <LanguageButton lang="en" />
                    <LanguageButton lang="vn" />
                  </div>
                </div>
              </div>
            </form>
          </div>
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
