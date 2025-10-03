import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Logout failed, please try again")
    }
  }

  return (
    <div className='bg-white shadow-xl sticky top-0 z-50 backdrop-blur-md bg-opacity-95 border-b border-gray-300'>
      <div className='flex items-center justify-between max-w-7xl mx-auto h-16 px-6 sm:px-12'>
        <div>
          <h1
            onClick={() => navigate('/')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate('/') }}
            className='text-3xl font-extrabold tracking-widest select-none cursor-pointer text-gray-900 hover:text-[#F83002] transition-colors duration-300'
            aria-label="Navigate to Home"
          >
            Skill<span className='text-[#F83002]'>Linker</span>
          </h1>
        </div>

        <nav className='flex items-center gap-16'>
          <ul className='flex font-semibold items-center gap-10 text-gray-700 uppercase tracking-wider select-none'>
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link to="/admin/companies" className='hover:text-[#F83002] transition ease-in-out duration-300 font-medium'>
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className='hover:text-[#F83002] transition ease-in-out duration-300 font-medium'>
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className='hover:text-[#F83002] transition ease-in-out duration-300 font-medium'>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className='hover:text-[#F83002] transition ease-in-out duration-300 font-medium'>
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className='hover:text-[#F83002] transition ease-in-out duration-300 font-medium'>
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className='flex items-center gap-6'>
              <Link to="/login" aria-label="Login">
                <Button
                  variant="outline"
                  className="px-7 py-2 text-sm font-bold tracking-wide rounded-lg shadow-sm hover:shadow-lg hover:bg-[#F83002] hover:text-white transition-colors duration-300"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup" aria-label="Signup">
                <Button
                  className="px-7 py-2 bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-bold text-sm tracking-wide rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar
                  className="cursor-pointer border-2 border-[#F83002] ring-2 ring-[#c084fc] ring-offset-2 ring-offset-white shadow-lg hover:ring-offset-indigo-200 transition-shadow duration-300"
                  title={user.fullname}
                >
                  <AvatarImage src={user?.profile?.profilePhoto} alt="User avatar" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-6 rounded-3xl shadow-xl bg-white border border-gray-100 select-none">
                <div className='space-y-6'>
                  <div className='flex gap-5 items-center'>
                    <Avatar className="ring-2 ring-[#F83002] shadow-md">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="User avatar" />
                    </Avatar>
                    <div>
                      <h4 className='font-extrabold text-lg text-gray-900 truncate max-w-[190px]'>{user?.fullname}</h4>
                      <p className='text-sm text-gray-500 tracking-tight truncate'>{user?.profile?.bio || "No bio available"}</p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-4 text-gray-700'>
                    {user.role === 'student' && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 text-indigo-700 font-semibold hover:text-[#F83002] transition-colors duration-300 cursor-pointer"
                      >
                        <User2 size={20} /> View Profile
                      </Link>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-3 text-red-600 font-semibold hover:text-red-700 transition-colors duration-300 cursor-pointer"
                      type="button"
                      aria-label="Logout"
                    >
                      <LogOut size={20} /> Logout
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </nav>
      </div>
    </div>
  )
}

export default Navbar
