import fs from "fs";
import pdfParse from "pdf-parse";

const loadPdf = async (uri) => {
  const buffer = fs.readFileSync(uri);
  try {
    const data = await pdfParse(buffer);

    // The content
    return data.text;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export default loadPdf;
// Testing
// const DUMMY_PDF =
//   "/Users/hoangnam/Downloads/TECHAINER BOOTCAMP/Techainer-capstone-project-GROUP2-master/server/services/CV_Nguyễn_Trực_Cường.pdf";
// readPdf(DUMMY_PDF);
