import React from "react";

interface EnCokIzlenenTitleProps {
  title: string;
  description?: string;
}

const EnCokIzlenenTitle: React.FC<EnCokIzlenenTitleProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex gap-2 mb-4 ">
      <span className="text-slate-500 bg-slate-800 border border-slate-700 p-2 rounded-md">
        {/* Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 text-gray-400"
        >
          <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
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
  );
};

export default EnCokIzlenenTitle;
