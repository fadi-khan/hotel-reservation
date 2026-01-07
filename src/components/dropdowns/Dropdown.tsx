
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import { FaUser } from "react-icons/fa";


interface DropDownMenuItem {
    name: "",
    className?: string,
    icon: React.ReactNode,
    link: string

}

export const Dropdown = ({
    menuItems, selectActive = false }: { menuItems: DropDownMenuItem[], selectActive?: boolean },
    dropdownName: "Dropdown",
    dropdwonIcon: React.ReactNode = <FaUser />
) => {


    return (
        <Menu  >
            <MenuButton

                className={'  w-full cursor-pointer inline-flex items-center gap-2 focus:outline-white font-semibold'}>
                {dropdownName}
                <BiChevronDown className="size-5" />

            </MenuButton>

            <MenuItems
                transition
                anchor='bottom start'
                className={'shadow-2xl shadow-black z-40 bg-white gap-1  mt-3 py-2   flex flex-col rounded-lg text-blue-900   outline-none border border-blue-800 w-48'}>
                {
                    menuItems.map((menuItem) => (
                        <MenuItem >
                            <button
                                className={`cursor-pointer font-medium hover:px-4 transition-all duration-150 ease-out px-3 group flex  py-1 items-center gap-x-2 w-full ${menuItem?.className}`}>
                                {menuItem.name}
                                <Link href={menuItem.link}> Profile</Link>
                            </button>
                        </MenuItem>
                    )

                    )
                }

            </MenuItems>
        </Menu>
    )
}