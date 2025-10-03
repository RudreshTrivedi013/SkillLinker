import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true

const Profile = () => {
  useGetAppliedJobs()
  const [open, setOpen] = useState(false)
  const { user } = useSelector(store => store.auth)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto my-8 px-6 sm:px-8 lg:px-0 space-y-12">
        {/* Profile Card */}
        <section className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <Avatar className="h-28 w-28 rounded-3xl shadow-md ring-2 ring-indigo-300">
                <AvatarImage
                  src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                  alt="profile"
                  className="rounded-3xl"
                />
              </Avatar>
              <div className="max-w-lg">
                <h1 className="text-2xl font-semibold text-gray-900">{user?.fullname}</h1>
                <p className="mt-2 text-gray-600">{user?.profile?.bio || 'No bio available'}</p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="p-3 rounded-full hover:bg-indigo-100 transition"
              aria-label="Edit Profile"
              title="Edit Profile"
            >
              <Pen className="text-indigo-600" />
            </Button>
          </div>

          <div className="mt-8 space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="text-indigo-500" />
              <span className="break-all">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Contact className="text-indigo-500" />
              <span>{user?.phoneNumber || 'Not provided'}</span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length ? (
                user.profile.skills.map((skill, idx) => <Badge key={idx}>{skill}</Badge>)
              ) : (
                <span className="text-gray-400 italic">NA</span>
              )}
            </div>
          </div>

          <div className="mt-8 max-w-sm space-y-1">
            <Label className="text-md font-bold">Resume</Label>
            {isResume && user?.profile?.resume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user.profile.resume}
                className="text-indigo-600 hover:underline break-all"
              >
                {user.profile.resumeOriginalName || 'View Resume'}
              </a>
            ) : (
              <span className="text-gray-400 italic">NA</span>
            )}
          </div>
        </section>

        {/* Applied Jobs Section */}
        <section className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Applied Jobs</h2>
          <AppliedJobTable />
        </section>
      </main>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
