import React from "react";
import * as XLSX from "xlsx";
// import { saveAs } from 'file-saver';
const downloadExcel = (data) => {
  console.log(data);
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "DataSheet.xlsx");
};
const XLSXDownloader = ({ data }) => {
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
