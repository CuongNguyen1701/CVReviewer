import React from "react";

const SubmitButton = ({handleSubmit}) => {
  return (
    <button
      className="flex flex-row w-fit h-auto green-pink-gradient p-[1px]
            rounded-[10px] shadow-card select-none self-end"
    >
      <div
        className="bg-tertiary hover:bg-slate-600 rounded-[10px] py-5 px-12  
              flex justify-evenly items-center flex-col"
        onClick={handleSubmit}
      >
        SUBMIT
      </div>
    </button>
  );
};

export default SubmitButton;
