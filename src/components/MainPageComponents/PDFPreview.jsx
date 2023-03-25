import { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

function PdfPreview({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const previewUrl = file ? URL.createObjectURL(file) : null;
  return (
    <div className="overflow-hidden">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div className="max-h-10">
          <Viewer disableWorker={true} fileUrl={previewUrl} />
        </div>
      </Worker>
    </div>
  );
}
export default PdfPreview;
