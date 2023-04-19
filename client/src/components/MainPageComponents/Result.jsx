import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { staggerContainer } from "../../utils/motion";
import { slideIn } from "../../utils/motion";
import { XLSXDownloader } from "./";
const tempData = {
  //This is just a temporary variable, delete when connnected to the server
  rating: 87,
};

const ResultComponent = ({ data, rank }) => {
  const [count, setCount] = useState(0);
  let rating = data.rating * 100;
  console.log("rating:" + rating);
  useEffect(() => {
    if (count < rating) {
      const intervalId = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 20);
      return () => clearInterval(intervalId);
    }
  }, [count]);
  let radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (count / 100) * circumference;
  let c = 40;
  return (
    <div className="flex flex-row">
      {`${rank + 1})`}
      <svg className="transform -rotate-90 w-20 h-20 overflow-visible">
        <circle
          cx={`${c}`}
          cy={`${c}`}
          r={radius}
          stroke="currentColor"
          strokeWidth="7"
          fill="transparent"
          className="text-gray-700"
        />

        <circle
          cx={`${c}`}
          cy={`${c}`}
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-blue-500 "
        />
      </svg>
      <div className="p-4 text-4xl">{`${count}/100`}</div>
      <div className="p-4 text-2xl">{`${data.filename}`}</div>
    </div>
  );
};

const Result = ({ responseData }) => {
  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`${styles.padding} flex flex-col items-start max-w-7xl mx-auto relative z-0`}
    >
      <span className="hash-span" id={"result"}>
        &nbsp;
      </span>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex flex-col gap-3 bg-black-100 p-8 rounded-2xl"
      >
        Based on the requirements, the CV is rated:
        <XLSXDownloader />
        <div className="flex flex-col justify-between">
          {responseData.map((data, index) => {
            return <ResultComponent data={data} key={index} rank={index} />;
          })}
        </div>
      </motion.div>
      <div
        className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden select-none`}
      ></div>
    </motion.section>
  );
};

export default Result;
