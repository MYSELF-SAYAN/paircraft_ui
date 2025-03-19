"use client";
import React from 'react';
import Icon from './icon';
import { Github } from 'lucide-react';
import { Button } from './ui/button';
import { useAuthContext } from '@/context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Navbar = () => {
    const {isAuthenticated, logout} = useAuthContext();
    const router = useRouter();
    return (
        <div className='bg-black text-white flex  md:flex-row justify-between items-center px-5 md:px-10 py-5'>
            <Icon />
            <div className='flex gap-3 md:gap-5 items-center mt-3 md:mt-0'>
                <Github className='cursor-pointer' onClick={()=>{router.push('https://github.com/MYSELF-SAYAN/paircraft_ui')}} />
                {
                    !isAuthenticated ?  <div className='gap-3 md:gap-5 items-center flex'>
                        <Link href={'/login'}>
                    <Button variant={'default'}  size={'lg'} className='hover:bg-[#7A00E6] hover:text-white'>
                        Login
                    </Button>
                    </Link>
                    <Link href={'/signup'}>
                    <Button variant={'default'}  size={'lg'} className='hover:bg-[#7A00E6] hover:text-white'>
                        Sign Up
                    </Button>
                    </Link>
                    </div> 
                    : <div>
                    <Button onClick={logout} variant={'default'} size={'lg'} className='hover:bg-[#7A00E6] hover:text-white'>
                        Logout
                    </Button>
                    </div>
                }
               
            </div>
        </div>
    );
}

export default Navbar;

