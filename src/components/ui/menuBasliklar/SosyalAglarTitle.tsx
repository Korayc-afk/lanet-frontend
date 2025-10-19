import React from "react";

interface SosyalAglarTitleProps {
  title: string;
  description?: string;
}

const SosyalAglarTitle: React.FC<SosyalAglarTitleProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex gap-2 mb-4 items-start  ">
      <span className="text-slate-500 bg-slate-800 border border-slate-700 p-2 rounded-md">
        {/* Icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-gray-400"
        >
          <path d="M14.48 16.68a.5.5 0 01-.24-.06l-5.11-3.04a.5.5 0 01.5-.87l5.11 3.04a.5.5 0 01-.26.93zM9.81 11.13l5.01-3a.5.5 0 10-.5-.87l-5.01 3a.5.5 0 10.5.87z" />
          <circle cx="7.46" cy="12" r="2" />
          <circle cx="16.7" cy="6.46" r="2" />
          <circle cx="16.7" cy="17.54" r="2" />
        </svg>
      </span>
      <div>
        <h2 className="font-medium text-gray-100 text-xl ml-2">{title}</h2>
        {description && (
          <p className="text-sm text-gray-500 ml-2">{description}</p>
        )}
      </div>
    </div>
  );
};

export default SosyalAglarTitle;
