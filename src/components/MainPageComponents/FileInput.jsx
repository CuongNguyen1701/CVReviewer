import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import PDFPreview from "./PDFPreview";
import { GearCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";

const FileInput = () => {
  const [loading, setLoading] = useState(0);
  const [file, setFile] = useState(null);
  const handleSubmit = () => {
    if (!file) return alert("No file selected");
    //TODO: API and stuf
    setLoading(1);
  };
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
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden select-none`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        Drag n' drop your CV here for an AI-flavored review!
        <div
          {...getRootProps()}
          htmlFor="dropzone-file"
          className="flex flex-col gap-8 px-8 py-20 my-12 text-center text-black border-2 border-dashed cursor-pointer rounded-xl border-slate-500 bg-slate-100 hover:bg-slate-400 hover:border-black hover:text-white"
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
          <div className="p-3">
            {file.name} uploaded!
            {/* <PDFPreview file={file} /> */}
          </div>
        )}
        <button
          className="flex flex-row w-fit h-auto green-pink-gradient p-[1px]
                      rounded-[10px] shadow-card select-none self-end
                       hover:p-[2px]"
        >
          <div
            className="bg-tertiary rounded-[10px] py-5 px-12  
                        flex justify-evenly items-center flex-col"
            onClick={handleSubmit}
          >
            SUBMIT
          </div>
        </button>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <GearCanvas loading={loading} />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(FileInput, "fileinput");
