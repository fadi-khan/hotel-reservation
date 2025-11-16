"use client"
import { HomeImageSlider } from "@/components/home/HomeImageSlider";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { DateRangeInput } from "../utils/DateRangeInput";
import { FaCalendar } from "react-icons/fa6";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdOutlineCalendarViewDay } from "react-icons/md";
import { SearchBox } from "@/components/home/SearchBox";
export default function Home() {

    
    return (
        <div className="">
            <div className="relative flex justify-center z-30 ">
            <HomeImageSlider />
            <div className=" absolute -bottom-10 border-2  border-white  justify-center  flex shadow-xl shadow-blue-900 rounded-lg">
            <SearchBox/>
            </div>

            </div>
        </div>
    );
};