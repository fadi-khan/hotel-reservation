"use client"
import { HomeImageSlider } from "@/components/home/HomeImageSlider";
import { SearchBox } from "@/components/home/SearchBox";
import { Button, Card } from "flowbite-react";
import Image from "next/image";
export const Metadata = {
    title: "Hotel Booking App",
    description: "Hotel Booking ",
}
export default function Home() {

    
    return (
        <div className="">
            <HomeImageSlider />
            <div className="relative flex justify-center z-30 ">
            
            <div className=" absolute -bottom-10 border-2  border-white  justify-center  flex shadow-xl shadow-blue-900 rounded-lg">
            <SearchBox/>
            </div>
           

            </div>
            
        </div>
    );
};