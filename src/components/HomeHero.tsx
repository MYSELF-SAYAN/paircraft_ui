"use client";
import React from 'react';
import { Rocket } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { Button } from './ui/button';
import { useAuthContext } from '@/context';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import Link from 'next/link';
const HomeHero = () => {
    const { isAuthenticated } = useAuthContext();
    const fibonacciCode = `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Calculate first 10 Fibonacci numbers
for i in range(10):
    print(fibonacci(i))`;
    return (
        <div className='flex flex-col items-center space-y-5'>
            <div className="inline-block rounded-full bg-white/5 px-3 py-1 text-sm backdrop-blur-xl">
                <span className="text-gray-400">🚀 Competitive Programming Made Better</span>
            </div>
            <div className='text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl flex flex-col gap-4'>
                <p className='text-center text-[#7A00E6]'>
                    Let's
                </p>

                <div className="relative">
                    <TypeAnimation sequence={['build together', 1000, 'collaborate remotely', 1000, 'code as a team', 1000, 'create magic', 1000, 'solve challenges', 1000]} wrapper="span" speed={50} repeat={Infinity} />

                </div>
            </div>
            {/* <Typewriter

                    words={['create magic', 'collaborate together', 'build together', 'code as a team']}
                    loop={0}
                    cursor
                    cursorStyle='|'
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                    onLoopDone={() => {
                        setTimeout(() => {
                            document.querySelector('.Typewriter__cursor')?.classList.add('hidden');
                        }, 1000);
                        setTimeout(() => {
                            document.querySelector('.Typewriter__cursor')?.classList.remove('hidden');
                        }, 2000);
                    }}
                /> */}

            <p className='text-lg text-center max-w-2xl text-gray-400 '>Experience real-time collaborative coding with persistent rooms, live chat, and seamless sharing. The future of pair programming is here.</p>
            {
                isAuthenticated ? <div className='flex gap-3 items-center justify-center'>
                    <Link href={'/dashboard'}>
                    <Button variant={'default'} size={'lg'} className='hover:bg-[#7A00E6] hover:text-white'>
                       Dashboard
                    </Button>
                    </Link>
                   
                </div> : <div className='flex gap-3 items-center justify-center'>
                    <Link href={'/signup'}>
                    <Button variant={'default'} size={'lg'} className='hover:bg-[#7A00E6] hover:text-white'>
                       Join now
                    </Button>
                    </Link>
                   
                </div>
            }

            <motion.div initial={{
                opacity: 0,
                scale: 0.95
            }} animate={{
                opacity: 1,
                scale: 1
            }} transition={{
                duration: 0.5,
                delay: 0.2
            }} className="mx-auto w-full max-w-3xl rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
                    <div className="flex gap-1">
                        <div className="h-3 w-3 rounded-full bg-red-500/80" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                        <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-sm text-gray-400">fibonacci.py</span>
                </div>
                <div className="p-4 text-left">
                    <TypeAnimation sequence={[fibonacciCode]} wrapper="div" speed={50} style={{
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        color: 'rgb(209 213 219)',
                        whiteSpace: 'pre'
                    }} repeat={0} />
                </div>
            </motion.div>
        </div>
    );
}

export default HomeHero;

