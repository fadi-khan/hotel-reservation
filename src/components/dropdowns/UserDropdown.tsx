import { authService } from "@/lib/services/auth";
import { store } from "@/lib/store/store";
import { handleLogout as handleLogoutAction } from "@/lib/store/authSlice";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import Link from "next/link";
import { useEffect, useState } from "react"
import { BiChevronDown } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { RiSuitcaseFill, RiSuitcaseLine } from "react-icons/ri";

export const UserDropdown = () => {

    type Profile = {
        name?: string
        email?: string
    }

    const [profile, setProfile] = useState<Profile | null>(null)
    useEffect(() => {
        const loadProfile = async () => {
            const response = await authService.getProfile()
            setProfile(response?.data ?? null)
        }

        loadProfile()
    }, [])

    const handleLogout = async () => {
        try {
            await authService.logout()
        } finally {
            store.dispatch(handleLogoutAction())
            setProfile(null)
            window.location.href = "/"
        }
    }

    return (

        <Menu  >

            {profile?.email && <MenuButton className={' w-full cursor-pointer inline-flex items-center gap-2 focus:outline-white font-semibold'}>
                {profile.email}
                <BiChevronDown className="size-5" />
            </MenuButton>}

            <MenuItems 
                transition
                anchor='bottom start'
                className={'shadow-2xl shadow-black z-40 bg-white gap-1  mt-3 py-2   flex flex-col rounded-lg text-blue-900   outline-none border border-blue-800 w-48'}>
                <MenuItem >
                    <button className= "cursor-pointer font-medium hover:px-4 transition-all duration-150 ease-out px-3 group flex  py-1 items-center gap-x-2 w-full">
                        <FaUser />
                        <Link href={"/profile"}> Profile</Link>

                    </button>
                </MenuItem>
                <MenuItem>
                    <button className="cursor-pointer font-medium  hover:px-4 transition-all duration-150 ease-out px-3 group flex  py-1 items-center gap-x-2 w-full">
                        <RiSuitcaseFill className=" " size={18} />
                        <Link href={'/'}> My Bookings</Link>
                    </button>
                </MenuItem>
                <MenuItem >
                    <button 
                    onClick={handleLogout}
                    className="cursor-pointer font-medium hover:px-4 transition-all duration-150 ease-out  px-3 text-red-400 group flex  py-1 items-center gap-x-2 w-full">
                        <MdLogout size={18} />
                        <span>Logout</span>
                    </button>
                    
                </MenuItem>

            </MenuItems>


        </Menu>
    )
}