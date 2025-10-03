import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job)

  return (
    <section className="max-w-7xl mx-auto my-24 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-gray-900">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>
      {allJobs.length <= 0 ? (
        <p className="text-center text-gray-500 text-lg font-medium mt-12">No Job Available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))}
        </div>
      )}
    </section>
  )
}

export default LatestJobs
