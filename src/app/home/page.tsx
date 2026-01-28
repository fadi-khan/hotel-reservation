"use client"
import { mockRoom, RoomCard } from "@/components/card/RoomCard";
import { HomeImageSlider } from "@/components/home/HomeImageSlider";
import { SearchBox } from "@/components/home/SearchBox";
import { HomeFilterBar } from "@/components/sidebars/HomeFilterBar";
import { useRoomsQuery } from "@/lib/hooks/useRoomQueries";
import { Button, Card } from "flowbite-react";
import Image from "next/image";
import { useEffect } from "react";
export const Metadata = {
    title: "Hotel Booking App",
    description: "Hotel Booking ",
}
export default function Home() {

    // useEffect(()=>{
    //      const {data:response, isLoading, } = useRoomsQuery()
    //      console.log(response)

    // },[])
    return (
        <div className=" text-black">
            <div><HomeImageSlider /></div>
            <div className="relative flex justify-center z-30 ">

                <div className=" absolute -bottom-10 border-2  border-white  justify-center  flex shadow-xl shadow-blue-900 rounded-lg">
                    <SearchBox />

                </div>


            </div>
            <div className="lg:px-12">
                <HomeFilterBar />
                <RoomCard  room={mockRoom}/>
            </div>
        </div>
    );
};