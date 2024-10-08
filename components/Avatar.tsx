import React from "react";

type Props = {
  fullname: string;
  onClick: () => void;
};

const Avatar: React.FC<Props> = ({ fullname, onClick }) => {
  const initials = fullname
    .split(" ")
    .map((word) => word[0])
    .slice(0, 3)
    .join("")
    .toUpperCase();

  return (
    <button type="button" onClick={onClick}>
      <div className="w-8 h-8 rounded-full bg-slate-200 border border-gray-400 flex items-center justify-center">
        <p className="font-semibold text-xs text-black">{initials}</p>
      </div>
    </button>
  );
};

export default Avatar;
