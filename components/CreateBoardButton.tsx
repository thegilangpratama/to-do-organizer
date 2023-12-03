import React from "react";

type Props = {
  onClick?: () => void;
};

const CreateBoardButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      className="p-4 h-32 hover:bg-[#f4f4f4] rounded-xl border-dashed border-2"
      type="button"
      onClick={onClick}
    >
      <p className="text-md text-slate-500">Create new board</p>
    </button>
  );
};

export default CreateBoardButton;
