import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { LoginModal } from '../auth/LoginModal';
import { httpService } from '@/lib/services/HttpService';
import { UserDropdown } from '../dropdowns/UserDropdown';

export const MainHeader = ({setIsOpen}: {setIsOpen: () => void}) => {

    const [isLoggedIn, setIsLoggedIn]= useState(false)

    useEffect(()=>{
        setIsLoggedIn(httpService.isLoggedIn())

    }, [])

    return (
        <header className="flex justify-between px-4 lg:px-12 shadow-blue-400  
         border border-blue-900 shadow-sm ">

            <Link href="/"
           
            className="flex items-center h-1/2 cursor-pointer ">
             <Image src="/logos/logo.png" alt="Logo" width={85} height={67} />   
            </Link>
            <div className="flex items-center gap-2">
                <ul className="hidden md:flex gap-7 text-blue-900 font-medium items-center ">
                    <Link href="/home">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                    {!isLoggedIn ?<LoginModal/>:<UserDropdown/>} 
               
                </ul>
                <BiMenu className='size-8 md:hidden text-blue-900 cursor-pointer ' onClick={setIsOpen}/> 
                
                    </div>
                </header>
            );
        };
