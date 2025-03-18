"use client";
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Icon from '@/components/icon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [baseUrl, setBaseUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router=useRouter()
    useEffect(() => {
        setBaseUrl(process.env.NEXT_PUBLIC_API_URL || '');
    }, []);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${baseUrl}/auth/login`, { email, password });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                toast.success('Login successful');
               router.push('/')
            }
        } catch (error) {
            toast.error('Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        // <div className="h-screen w-screen bg-black flex items-center justify-center">
        //     <div className="bg-[#1A202C] rounded-lg p-8">
        //         <h1 className="text-4xl font-bold text-[#34D399]">Login</h1>
        //         <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
        //             <div className="space-y-2">
        //                 <Label className="block text-sm font-medium text-gray-700">Email address</Label>
        //                 <Input
        //                     type="email"
        //                     value={email}
        //                     onChange={(e) => setEmail(e.target.value)}
        //                     className="block w-full px-5 py-3 text-base text-gray-700 transition duration-150 ease-in-out bg-gray-300 border border-transparent rounded-md shadow-sm appearance-none focus:outline-none focus:ring-[#34D399] focus:border-[#34D399]"
        //                     placeholder="you@example.com"
        //                 />
        //             </div>
        //             <div className="space-y-2">
        //                 <Label className="block text-sm font-medium text-gray-700">Password</Label>
        //                 <Input
        //                     type="password"
        //                     value={password}
        //                     onChange={(e) => setPassword(e.target.value)}
        //                     className="block w-full px-5 py-3 text-base text-gray-700 transition duration-150 ease-in-out bg-gray-300 border border-transparent rounded-md shadow-sm appearance-none focus:outline-none focus:ring-[#34D399] focus:border-[#34D399]"
        //                     placeholder="********"
        //                 />
        //             </div>
        //             <div>
        //                 {/* <Button

        //                     className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#34D399] hover:bg-[#64E9F8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#34D399]"
        //                 >
        //                     Sign in
        //                 </Button> */}
        //                 <Button
        //                     type="button"
        //                     onClick={handleLogin}
        //                     className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#34D399] hover:bg-[#64E9F8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#34D399]"
        //                     disabled={loading}
        //                 >
        //                     {loading ? (
        //                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        //                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        //                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h12c0-6.627-5.373-12-12-12z"></path>
        //                         </svg>
        //                     ) : (
        //                         'Sign in'
        //                     )}
        //                 </Button>
        //             </div>
        //         </form>
        //     </div>
        //     <ToastContainer />
        // </div>
        <div className="flex min-h-screen">
            {/* Left side - Image and branding */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-800 to-indigo-900 relative overflow-hidden"
            >
                <div className='p-5 flex items-center justify-between w-full absolute top-8 right-0 z-50'>
                    {/* Brand logo */}
                    <Icon />

                    {/* Navigation button */}
                    <Link href="/" className="cursor-pointer  text-white flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">

                        <ArrowLeft size={16} />
                        Back to landing page

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
                        <h1 className="text-3xl font-bold text-white mb-2">Login to Paircraft</h1>
                        <p className="text-gray-400">
                            Dont have an account? <Link href="/signup" className="text-purple-400 hover:underline">Sign up</Link>
                        </p>
                    </motion.div>

                    <motion.div

                        className="space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >


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
                            onClick={handleLogin}
                            className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white"
                        >
                            Login
                        </Button>

                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Page;
