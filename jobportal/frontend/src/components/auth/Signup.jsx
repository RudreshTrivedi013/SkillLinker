import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });
  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-blue-100 via-indigo-100/80 to-purple-100/70 flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        {/* CARD STYLED FORM WITH GLASSMORPHISM */}
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg bg-white bg-opacity-80 backdrop-blur-sm border border-white/60 shadow-2xl rounded-[2.5rem] px-10 py-12 m-4
                  transition-all duration-300 hover:shadow-[0_8px_40px_10px_rgba(68,0,255,0.14)] space-y-8"
        >
          {/* HEADING */}
          <h1 className="font-black text-3xl leading-tight text-center text-indigo-800 drop-shadow-sm mb-8 tracking-widest">
            Create Your Account
          </h1>
          {/* FULL NAME */}
          <div className="space-y-2">
            <Label className="block text-base font-medium text-indigo-700">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-indigo-50 focus:bg-white focus:border-indigo-500 
               focus:ring-2 focus:ring-indigo-100 text-lg 
               transition duration-200 outline-none shadow-sm"
              required
            />
          </div>
          {/* EMAIL */}
          <div className="space-y-2">
            <Label className="block text-base font-medium text-indigo-700">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="patel@gmail.com"
              className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-indigo-50 focus:bg-white focus:border-indigo-500 
               focus:ring-2 focus:ring-indigo-100 text-lg 
               transition duration-200 outline-none shadow-sm"
              autoComplete="email"
              required
            />
          </div>
          {/* PHONE */}
          <div className="space-y-2">
            <Label className="block text-base font-medium text-indigo-700">Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="8080808080"
              className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-indigo-50 focus:bg-white focus:border-indigo-500 
                focus:ring-2 focus:ring-indigo-100 text-lg 
                transition duration-200 outline-none shadow-sm"
              required
            />
          </div>
          {/* PASSWORD */}
          <div className="space-y-2">
            <Label className="block text-base font-medium text-indigo-700">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Create a password"
              className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-indigo-50 focus:bg-white focus:border-indigo-500 
                focus:ring-2 focus:ring-indigo-100 text-lg 
                transition duration-200 outline-none shadow-sm"
              autoComplete="new-password"
              required
            />
          </div>
          
          {/* ROLE */}
          <div>
            <span className="text-indigo-700 text-base font-semibold block mb-2">Role</span>
            <RadioGroup className="flex items-center gap-10 mb-3">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  id="student"
                  className="cursor-pointer accent-indigo-600 focus:ring-2 focus:ring-blue-300"
                  required
                />
                <Label htmlFor="student" className="cursor-pointer text-indigo-700 text-base">Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  id="recruiter"
                  className="cursor-pointer accent-indigo-600 focus:ring-2 focus:ring-purple-300"
                />
                <Label htmlFor="recruiter" className="cursor-pointer text-indigo-700 text-base">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {/* PROFILE PICTURE */}
          <div className="flex items-center gap-4">
            <Label className="block text-indigo-700 font-medium">Profile</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer bg-indigo-50 hover:bg-indigo-100 border border-gray-200 rounded-xl py-2 px-4 transition focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          {/* BUTTON */}
          <div>
            {loading ? (
              <Button className="w-full py-3 text-lg font-black rounded-xl bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-500 shadow-lg flex items-center justify-center opacity-70 cursor-not-allowed"
                disabled>
                <Loader2 className='mr-2 h-6 w-6 animate-spin' /> Please wait
              </Button>
            ) : (
              <Button type="submit"
                className="w-full py-3 text-lg font-black rounded-xl bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-500 shadow-lg text-white 
                  hover:scale-[1.03] hover:shadow-[0_4px_30px_8px_rgba(68,0,200,0.10)] transition-all duration-200 outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Signup
              </Button>
            )}
          </div>
          {/* FOOTER */}
          <div className="text-center mt-2">
            <span className="text-base text-gray-600">Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:underline font-bold transition">Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup
