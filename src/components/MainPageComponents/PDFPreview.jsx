import React, { useState } from "react";
import { Document, Page } from "react-pdf";

function PDFPreview({ file }) {
  const [numPages, setNumPages] = useState(null);
  console.log(file);
  function onDocumentLoadSuccess({ numPages }) {
    console.log(numPages);
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={1} />

        {/* {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))} */}
      </Document>
    </div>
  );
}

export default PDFPreview;
