import React from "react";

interface BonuslarTitleProps {
  title: string;
  description?: string;
}

const BonuslarTitle: React.FC<BonuslarTitleProps> = ({
  title,
  description,
}) => {
  return (
    <div className="mb-6 mt-6">
      <div className="flex gap-2 mb-4 items-start ">
        <span className="text-slate-500 bg-slate-800 border border-slate-700 p-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
        </span>
        <div>
          <h2 className="font-medium text-gray-100 text-base ml-2">{title}</h2>
          {description && (
            <p className="text-sm font-light text-gray-500 ml-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BonuslarTitle;
