import React from "react";
import XLSXDownloader from "./XLSXDownloader";
const History = ({ history }) => {
  return (
    <div className="flex flex-row">
      {history != []
        ? history.map((item, index) => {
            <XLSXDownloader data={item} key={index} />;
          })
        : null}
    </div>
  );
};

export default History;
