"use client";
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { motion } from "framer-motion"
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import { Apple, ArrowLeft, Eye, EyeOff } from 'lucide-react';


// Default values shown



// Default values shown  

import Icon from '@/components/icon';
const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    setBaseUrl(process.env.NEXT_PUBLIC_API_URL || '');
  }, []);

  const handleSignup = async () => {
    try {
      setLoading(true);
      const fullname = `${firstname} ${lastname}`
      const response = await axios.post(`${baseUrl}/auth/signup`, { email, password, username: fullname });
      toast(`Kindly verify your email at ${email}`, {

        style: {
          background: "green",
          color: "white",
          border: "1px solid green"
        },
        position: "top-right"
      })
      setEmail('');
      setPassword('');
      setFirstname('');
      setLastname('');
      setLoading(false);
    } catch (error) {
      toast.error('Signup failed');
      setLoading(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 
  return (
    //     <div className='flex bg-black h-screen'>
    //       <div className='w-1/2 flex items-center justify-center'>
    //         <Image src={"https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt='img' width={500} height={500} />
    //       </div>
    //       <div className="h-screen w-1/2 flex items-center justify-center ">
    //         <div className=" rounded-lg p-8 bg-gray-500   bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 w-2/3 space-y-3
    // ">
    //           <h1 className="text-4xl font-bold text-[#34D399]">Signup</h1>

    //           <div className="space-y-2">
    //             <Label className="block text-sm font-medium text-gray-700">Email address</Label>
    //             <Input
    //               type="email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               className="block w-full px-5 py-3 text-base text-gray-700 transition duration-150 ease-in-out bg-gray-300 border border-transparent rounded-md shadow-sm appearance-none focus:outline-none focus:ring-[#34D399] focus:border-[#34D399]"
    //               placeholder="you@example.com"
    //             />
    //           </div>
    //           <div className="space-y-2">
    //             <Label className="block text-sm font-medium text-gray-700">Password</Label>
    //             <Input
    //               type="password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               className="block w-full px-5 py-3 text-base text-gray-700 transition duration-150 ease-in-out bg-gray-300 border border-transparent rounded-md shadow-sm appearance-none focus:outline-none focus:ring-[#34D399] focus:border-[#34D399]"
    //               placeholder="********"
    //             />
    //           </div>
    //           <div className="space-y-2">
    //             <Label className="block text-sm font-medium text-gray-700">Username</Label>
    //             <Input
    //               type="text"
    //               value={username}
    //               onChange={(e) => setUsername(e.target.value)}
    //               className="block w-full px-5 py-3 text-base text-gray-700 transition duration-150 ease-in-out bg-gray-300 border border-transparent rounded-md shadow-sm appearance-none focus:outline-none focus:ring-[#34D399] focus:border-[#34D399]"
    //               placeholder="John Doe"
    //             />
    //           </div>
    //           <div className="flex items-center justify-center w-full">
    //             {/* <Button

    //                             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#34D399] hover:bg-[#64E9F8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#34D399]"
    //                         >
    //                             Sign in
    //                         </Button> */}
    //             <Button
    //               type="button"
    //               onClick={handleLogin}
    //               className="group mt-5 relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#34D399] hover:bg-[#64E9F8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#34D399] "
    //               disabled={loading}
    //             >
    //               {loading ? (
    //                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    //                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    //                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h12c0-6.627-5.373-12-12-12z"></path>
    //                 </svg>
    //               ) : (
    //                 'Sign in'
    //               )}
    //             </Button>
    //           </div>

    //         </div>
    //         {/* <div className="relative">

    //       <div className="absolute inset-0 bg-gradient-to-br from-[#11998e]/20 to-[#38ef7d]/20 rounded-2xl transform rotate-1 scale-[1.02] blur-sm" />
    //       <div className="absolute inset-0 bg-gradient-to-br from-[#11998e]/10 to-[#38ef7d]/10 rounded-2xl transform -rotate-1 scale-[1.01]" />


    //       <div className="relative bg-black/80 backdrop-blur-xl border border-gray-800 p-8 rounded-xl shadow-2xl transform perspective-1000">
    //         <div className="absolute inset-0 bg-gradient-to-br from-[#11998e]/5 to-[#38ef7d]/5 rounded-xl" />

    //         <h2 className="text-2xl font-bold text-white mb-6">Create your account</h2>

    //         <div  className="space-y-4">
    //           <div className="space-y-2">
    //             <Label htmlFor="name" className="text-gray-300">
    //               Full Name
    //             </Label>
    //             <div className="relative">
    //               <Input
    //                 id="name"
    //                 placeholder="Enter your name"
    //                 required
    //                 className="bg-gray-900/50 border-gray-800 focus:border-[#11998e] focus:ring-[#38ef7d]/20 text-white placeholder:text-gray-500"
    //               />
    //               <div className="absolute inset-0 rounded-md pointer-events-none border border-[#11998e]/0 group-focus-within:border-[#11998e]/50 transition-all duration-300" />
    //             </div>
    //           </div>

    //           <div className="space-y-2">
    //             <Label htmlFor="email" className="text-gray-300">
    //               Email
    //             </Label>
    //             <div className="relative">
    //               <Input
    //                 id="email"
    //                 type="email"
    //                 placeholder="you@example.com"
    //                 required
    //                 className="bg-gray-900/50 border-gray-800 focus:border-[#11998e] focus:ring-[#38ef7d]/20 text-white placeholder:text-gray-500"
    //               />
    //               <div className="absolute inset-0 rounded-md pointer-events-none border border-[#11998e]/0 group-focus-within:border-[#11998e]/50 transition-all duration-300" />
    //             </div>
    //           </div>

    //           <div className="space-y-2">
    //             <Label htmlFor="password" className="text-gray-300">
    //               Password
    //             </Label>
    //             <div className="relative">
    //               <Input
    //                 id="password"
    //                 type="password"
    //                 placeholder="Create a secure password"
    //                 required
    //                 className="bg-gray-900/50 border-gray-800 focus:border-[#11998e] focus:ring-[#38ef7d]/20 text-white placeholder:text-gray-500"
    //               />
    //               <div className="absolute inset-0 rounded-md pointer-events-none border border-[#11998e]/0 group-focus-within:border-[#11998e]/50 transition-all duration-300" />
    //             </div>
    //           </div>



    //           <Button
    //           onClick={handleLogin}
    //             type="submit"

    //             className="w-full bg-gradient-to-r from-[#11998e] to-[#38ef7d] hover:from-[#0e8a7d] hover:to-[#2dd66c] text-white font-medium py-2 rounded-md transition-all duration-300 shadow-lg shadow-[#38ef7d]/20"
    //           >

    //               Sign Up

    //           </Button>





    //           <div className="text-center text-sm text-gray-500 mt-4">
    //             Already have an account?{" "}
    //             <a href="/login" className="text-[#38ef7d] hover:underline">
    //               Sign in
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //     </div> */}
    //       </div>
    //     </div>
    <div className="flex min-h-screen">
      {/* Left side - Image and branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-800 to-indigo-900 relative overflow-hidden"
      >
        <div className='p-5 flex items-center justify-between w-full absolute top-8 right-0 cursor-pointer z-50'>
          {/* Brand logo */}
          <Icon />

          {/* Navigation button */}
          <Link href="/" className="">
            <div className='cursor-pointer  text-white flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm z-50'>
              <ArrowLeft size={16} />
              Back to landing page
            </div>
          </Link>
        </div>
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>

        {/* Content overlay */}
        <div className="absolute bottom-16 left-16 text-white max-w-md">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl font-bold mb-2"
          >
            Write Together,
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-3xl font-bold mb-6"
          >
            Grow Together
          </motion.h2>

          {/* Indicator dots */}
          <div className="flex gap-2 mt-8 w-full">
            <div className="w-2/3 h-1 bg-white/50 rounded-full"></div>
            {/* <div className="w-6 h-1 bg-white/30 rounded-full"></div>
            <div className="w-6 h-1 bg-white rounded-full"></div> */}
          </div>
        </div>
      </motion.div>

      {/* Right side - Signup form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 bg-gray-900 p-8 flex items-center justify-center"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Create an account</h1>
            <p className="text-gray-400">
              Already have an account? <Link href="/login" className="text-purple-400 hover:underline">Log in</Link>
            </p>
          </motion.div>

          <motion.div

            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 h-12 text-white"
                  required
                />
              </div>
              <div>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 h-12 text-white"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800/50 border-gray-700 h-12 text-white"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Input
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="bg-gray-800/50 border-gray-700 h-12 text-white pr-10"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>



            {/* Create account button */}
            <Button
              onClick={handleSignup}
              className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white"
            >
              {
                loading ?
                  // Default values shown
                  <div className="w-8 h-8 border-8 border-dashed rounded-full animate-spin border-white"></div> : <p>Create account</p>
              }


            </Button>

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
