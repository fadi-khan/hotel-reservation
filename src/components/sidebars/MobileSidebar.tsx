"use client"
import { IoMdClose } from "react-icons/io"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { httpService } from "@/lib/services/HttpService"
import { MdLogout } from "react-icons/md"
import { UserDropdown } from "../dropdowns/UserDropdown"
import { authService } from "@/lib/services/auth"
import { useLoginModalStore } from "../auth/store/loginModalStore"
export const MobileSideBar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (x: boolean) => void }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const setLoginModalOpen = useLoginModalStore((x) => x.setLoginModalOpen)

  useEffect(() => {
    setIsLoggedIn(httpService.isLoggedIn())

  }, [])

  const handleLogout = async () => {
    try {
      await authService.logout()
      localStorage.removeItem("access_token")
      setIsOpen(false)
    } finally {

      window.location.href = "/"
    }
  }

  const handleLogin = async () => {
    setIsOpen(false)
    setLoginModalOpen(true)
  }
  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed top-0  z-40 right-0 h-screen w-[65%] bg-blue-900  transform transition-transform duration-500 ease-in-out
      ${isOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'}`}
    >
      <div className=" px-7 my-[34px] shadow-blue-600  shadow-sm text-white flex justify-between items-center border-b border-blue-900">
        <IoMdClose size={24} className="mb-7 border-2  rounded-full font-bold cursor-pointer items-center" onClick={() => { setIsOpen(false) }} />
      </div>
      <ul className="px-4 flex flex-col gro gap-5 text-white font-medium mt-20 text-start">
        <Link className="p-3 rounded-lg border hover:bg-white hover:text-blue-900" href="/home">Home</Link>
        <Link className="p-3 rounded-lg border hover:bg-white hover:text-blue-900" href="/contact">Contact</Link>
        {isLoggedIn && <Link className="p-3 rounded-lg border hover:bg-white hover:text-blue-900" href="/my-bookings">Profile</Link>}
        {isLoggedIn && <Link className="p-3 rounded-lg border hover:bg-white hover:text-blue-900" href="/my-bookings">My Bookings</Link>}
        {
          !isLoggedIn && <button onClick={handleLogin} className="p-3 cursor-pointer rounded-lg border hover:bg-white hover:text-blue-900">Sign In</button>
        }
        {isLoggedIn && <button onClick={handleLogout} className="p-3  cursor-pointer inline-flex items-center gap-2  text-red-500 rounded-lg border hover:bg-white " ><MdLogout /> Logout</button>}

      </ul>
    </div>
  )

}