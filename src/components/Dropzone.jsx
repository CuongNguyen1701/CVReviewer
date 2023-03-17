import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";

import { styles } from "../styles";
import { GearCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Dropzone = () => {
  const [loading, setLoading] = useState(0);
  const [file, setFile] = useState(null);
  const handleFileInputChange = (e) => {
    try {
      setLoading(!loading);
      const processedFile = e.target ? e.target.files[0] : e;
      if (!processedFile) return;
      setFile(processedFile);
      console.log("processedFile:");
      console.log(processedFile);
    } catch (err) {
      console.log(err);
    }
    // setLoading(1);
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
          className="my-12 flex flex-col gap-8 cursor-pointer text-black px-8 py-20
                    rounded-xl border-2 border-dashed border-slate-500 bg-slate-100
                     hover:bg-slate-400 hover:border-black hover:text-white text-center"
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

export default SectionWrapper(Dropzone, "dropzone");
