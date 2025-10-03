import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate()

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
  }

  return (
    <div
      className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-white to-indigo-50 border border-gray-200 transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl flex flex-col justify-between h-full select-none"
      role="article"
    >
      <header className="flex items-center justify-between mb-3">
        <time
          dateTime={job?.createdAt}
          className="text-xs italic text-gray-400 font-light tracking-wide"
        >
          {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
        </time>
        <Button
          variant="outline"
          className="rounded-full p-2 shadow-sm hover:bg-[#F83002] hover:text-white transition-colors duration-300"
          size="icon"
          aria-label="Bookmark this job"
        >
          <Bookmark className="text-gray-600" />
        </Button>
      </header>

      <section className="flex items-center gap-4 mb-5">
        <Button
          className="p-5 rounded-xl border border-gray-300 shadow-sm hover:border-[#7209b7] transition-colors duration-300"
          variant="outline"
          size="icon"
          aria-label={`${job?.company?.name} logo`}
        >
          <Avatar className="rounded-lg">
            <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name} logo`} />
          </Avatar>
        </Button>
        <div>
          <h2 className="font-bold text-xl text-gray-900 truncate max-w-xs">{job?.company?.name}</h2>
          <p className="text-sm text-gray-500 tracking-wide">India</p>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-extrabold text-2xl text-indigo-900 mb-3 line-clamp-2">{job?.title}</h3>
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">{job?.description}</p>
      </section>

      <section className="flex flex-wrap gap-4 mb-6">
        <Badge className="text-blue-800 font-semibold" variant="ghost">
          {job?.position} Position{job?.position > 1 ? 's' : ''}
        </Badge>
        <Badge className="text-[#F83002] font-semibold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </section>

      <footer className="flex gap-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="flex-grow font-medium border-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300"
          aria-label={`View details of ${job?.title}`}
        >
          View Details
        </Button>
        <Button
          className="flex-grow bg-gradient-to-r from-[#7209b7] to-[#ad34eb] hover:from-[#5a078a] hover:to-[#8d1fc1] text-white font-semibold shadow-lg transition-all duration-300"
          aria-label={`Save ${job?.title} for later`}
        >
          Save For Later
        </Button>
      </footer>
    </div>
  )
}

export default Job
