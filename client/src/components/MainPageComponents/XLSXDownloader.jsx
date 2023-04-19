import React from "react";
import * as XLSX from "xlsx";
// import { saveAs } from 'file-saver';
const downloadExcel = (data) => {
  console.log(data);
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "NeuralCVRater");
  const date = new Date(Date.now());
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const miliseconds = date.getMilliseconds().toString().padStart(3, "0");
  const formattedDate = `${year}_${month}_${day}_${hours}_${minutes}_${seconds}_${miliseconds}`;
  XLSX.writeFile(workbook, `NeuralCV_${formattedDate}.xlsx`);
};
const XLSXDownloader = ({ data }) => {
  console.log(data);
  return (
    <button
      className="bg-green-600 rounded-lg p-2 max-w-md hover:bg-green-300 hover:text-black 
      flex flex-row gap-2 justify-center items-center text-xl"
      onClick={() => downloadExcel(data)}
    >
      <img
        src="https://www.svgrepo.com/show/506387/arrow-circle-down.svg"
        className="w-10"
      ></img>
      Download As Excel
    </button>
  );
};

export default XLSXDownloader;
