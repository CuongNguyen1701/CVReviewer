import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { staggerContainer } from "../../utils/motion";
import { slideIn } from "../../utils/motion";
const tempData = {
  //This is just a temporary variable, delete when connnected to the server
  rating: 90,
};
const Result = ({ responseData }) => {
  let rating = tempData.rating;
  let radius = 120;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (rating / 100) * circumference;
  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
    >
      <span className="hash-span" id={"result"}>
        &nbsp;
      </span>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] flex-row items-center bg-black-100 p-8 rounded-2xl"
      >
        Based on the requirements, the CV is rated:
        <br />
        <div className="flex items-center justify-center">
          <svg className="transform -rotate-90 w-72 h-72">
            <circle
              cx="145"
              cy="145"
              r={radius}
              stroke="currentColor"
              strokeWidth="30"
              fill="transparent"
              className="text-gray-700"
            />

            <circle
              cx="145"
              cy="145"
              r={radius}
              stroke="currentColor"
              strokeWidth="30"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="text-blue-500 "
            />
          </svg>
          <span className="absolute text-5xl">{`${rating}/100`}</span>
        </div>
      </motion.div>
      <div
        className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden select-none`}
      ></div>
    </motion.section>
  );
};

export default Result;
