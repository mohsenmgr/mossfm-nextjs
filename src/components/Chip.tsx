import React, { FC } from 'react'

type ChipProps = {
  text: string;
};

const Chip: FC<ChipProps> = ({ text }) => {
  return (
    <span       
              className="bg-[rgba(13,52,58,1)] inline-flex items-center px-3 py-1  text-green-100 rounded-md text-sm">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 14l6-4-6-4v8z" />
                </svg>
                { text }
            </span>
  );
};

export default Chip