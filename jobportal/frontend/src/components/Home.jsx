import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const patternUrl = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

const Home = () => {
  useGetAllJobs()
  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white/70 to-purple-50/80 backdrop-blur-sm antialiased relative overflow-x-hidden">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-28 pt-8 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent opacity-80 transition-opacity duration-1000" />
        <div
          className={`absolute inset-0 bg-[url('${patternUrl}')] opacity-40 transition-opacity duration-1000`}
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-100/40 via-indigo-50/25 to-transparent -z-20 rounded-xl transition-all duration-700"></div>
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-gradient-to-r from-indigo-100/40 rounded-full blur-4xl opacity-75 -z-20 transform -translate-y-1/2 translate-x-[-12%] animate-slowPulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-indigo-100/35 via-purple-50/30 to-transparent rounded-full blur-4xl -z-20 transition-shadow duration-500"></div>
        <div className="absolute bottom-24 left-12 w-56 h-56 bg-gradient-to-br from-emerald-50/40 rounded-full blur-3xl opacity-70 -z-20 animate-pulse-slow"></div>
        <div className="absolute top-40 right-16 w-44 h-44 bg-gradient-to-bl from-purple-100/25 rounded-full blur-2xl opacity-60 -z-20"></div>
        <section className="relative z-10">
          <HeroSection />
        </section>
        <section className="relative z-10">
          <CategoryCarousel />
        </section>
        <section className="relative z-10">
          <LatestJobs />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home
