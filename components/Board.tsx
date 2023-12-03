import Link from "next/link";
import React, { useState, useEffect } from "react";

import { getExcerpt } from "../helpers/formatter";

type Props = {
  title: string;
  href: string;
  isDisabled?: boolean;
};

const getRandomColor = (): string => {
  const colors: string[] = ['#EBFDF5', '#F4F4F4', '#F8E8E8', '#F4F4FF', '#FEF7EF'];
  const randomIndex: number = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const Board: React.FC<Props> = ({ title, href, isDisabled }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  useEffect(() => {
    setBackgroundColor(getRandomColor());
  }, []);

  const content = (
    <div className={`p-4 h-32 rounded-xl flex justify-center items-center`} style={{ backgroundColor }}>
      <p className="text-md font-semilight text-black">
        {getExcerpt(title, 50)}
      </p>
    </div>
  );

  if (isDisabled) return content;

  return (
    <Link href={href}>
      <a>{content}</a>
    </Link>
  );
};

export default Board;
