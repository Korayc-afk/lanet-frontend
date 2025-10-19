import React from "react";

interface BiletTitleProps {
  title: string;
  description?: string;
}

const BiletTitle: React.FC<BiletTitleProps> = ({ title, description }) => {
  return (
    <div className="mb-6">
      <div className="flex gap-2 mb-4 items-start ">
        <span className="text-slate-500 bg-slate-800 border border-slate-700 p-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
            />
          </svg>
        </span>
        <div>
          <h2 className="font-medium text-gray-100 text-2xl mb-2 ml-2">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-gray-500 mb-2 ml-2">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiletTitle;
