import React from 'react'

function Skeleton() {
  return (
        <div className="bg-[rgba(13,52,58,1)] rounded-lg shadow-lg p-4 md:p-8 border border-gray-700 animate-pulse mb-6">
          <div className="h-6 bg-gray-600 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-500 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-500 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-500 rounded w-2/3"></div>
        </div>
  )
}

export default Skeleton