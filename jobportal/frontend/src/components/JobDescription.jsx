import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)
  const isInitiallyApplied =
    singleJob?.applications?.some(application => application.applicant === user?._id) || false
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)

  const params = useParams()
  const jobId = params.id
  const dispatch = useDispatch()

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })

      if (res.data.success) {
        setIsApplied(true)
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        }
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Failed to apply for the job')
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(res.data.job.applications.some(app => app.applicant === user?._id))
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  return (
    <div className="max-w-5xl mx-auto my-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Position{singleJob?.position > 1 ? 's' : ''}
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? undefined : applyJobHandler}
          disabled={isApplied}
          className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors duration-300 ${
            isApplied
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-[#7209b7] hover:bg-[#5f32ad] active:scale-95'
          }`}
          aria-label={isApplied ? 'Already applied for job' : 'Apply for job'}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </header>

      <section className="border-t border-gray-300 pt-6 space-y-5 text-gray-800">
        <article>
          <h2 className="font-semibold text-lg mb-1">Role</h2>
          <p className="pl-4">{singleJob?.title}</p>
        </article>
        <article>
          <h2 className="font-semibold text-lg mb-1">Location</h2>
          <p className="pl-4">{singleJob?.location}</p>
        </article>
        <article>
          <h2 className="font-semibold text-lg mb-1">Description</h2>
          <p className="pl-4 whitespace-pre-wrap">{singleJob?.description}</p>
        </article>
        <article>
          <h2 className="font-semibold text-lg mb-1">Experience</h2>
          <p className="pl-4">{singleJob?.experience} yrs</p>
        </article>
        <article>
          <h2 className="font-semibold text-lg mb-1">Salary</h2>
          <p className="pl-4">{singleJob?.salary} LPA</p>
        </article>
        <article>
          <h2 className="font-semibold text-lg mb-1">Total Applicants</h2>
          <p className="pl-4">{singleJob?.applications?.length || 0}</p>
        </article>
        <article>
          <h2 className="font-semibold text-lg mb-1">Posted Date</h2>
          <p className="pl-4">{singleJob?.createdAt?.split('T')[0]}</p>
        </article>
      </section>
    </div>
  )
}

export default JobDescription
