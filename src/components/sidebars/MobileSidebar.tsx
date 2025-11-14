"use client"
import { IoMdClose } from "react-icons/io"
import Link from "next/link"
import Image from "next/image"
export const MobileSideBar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: () => void }) => {

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed top-0 right-0 h-screen w-[65%] bg-blue-900 z-50 transform transition-transform duration-500 ease-in-out
      ${isOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'}`}
    >
      <div className=" px-7 my-[34px] shadow-blue-600  shadow-sm text-white flex justify-between items-center border-b border-blue-900">
        <IoMdClose size={24} className="mb-7 border-2  rounded-full font-bold cursor-pointer items-center" onClick={setIsOpen}/>
      </div>
      <ul className="px-4 flex flex-col gro gap-5 text-white font-medium mt-20 text-start">
        <Link className="p-3 rounded-lg border hover:bg-white hover:text-blue-900" href="/home">Home</Link>  
        <Link className="p-3 rounded-lg border hover:bg-white hover:text-blue-900" href="/contact">Contact</Link>
        <Link className=  "p-3 rounded-lg border hover:bg-white hover:text-blue-900" href="/my-bookings">My Bookings</Link>
        <Link className="p-3 rounded-lg border hover:bg-white hover:text-blue-900" href="/sign-in">Sign In</Link>
        <Link className="p-3 rounded-lg border hover:bg-white hover:text-blue-900" href="/sign-up">Sign Up</Link>
        <Link className="p-3 rounded-lg border hover:bg-white hover:text-blue-900" href="/sign-out">Logout</Link>
      </ul>
    </div>
  )

}