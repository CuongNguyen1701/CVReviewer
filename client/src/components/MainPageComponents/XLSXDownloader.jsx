import React from "react";
import XLSX from "xlsx";

const downloadExcel = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "DataSheet.xlsx");
};
const XLSXDownloader = ({ data }) => {
  return (
    <button
      className="bg-red-600 rounded-lg p-6"
      onClick={() => downloadExcel(data)}
    >
      Download As Excel
    </button>
  );
};

export default XLSXDownloader;
