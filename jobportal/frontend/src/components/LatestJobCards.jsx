import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-2xl shadow-lg bg-white border border-gray-200 cursor-pointer hover:shadow-2xl transition-shadow duration-300 select-none"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/description/${job._id}`)
        }
      }}
      aria-label={`View details for ${job?.title} at ${job?.company?.name}`}
    >
      <div>
        <h1 className="font-semibold text-lg text-gray-900 truncate">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500 mt-1">India</p>
      </div>
      <div>
        <h2 className="font-extrabold text-xl my-3 text-indigo-900 truncate">{job?.title}</h2>
        <p className="text-sm text-gray-700 line-clamp-3">{job?.description}</p>
      </div>
      <div className="flex items-center gap-3 mt-5 flex-wrap">
        <Badge className="text-blue-700 font-semibold" variant="ghost">
          {job?.position} Position{job?.position > 1 ? 's' : ''}
        </Badge>
        <Badge className="text-[#F83002] font-semibold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
