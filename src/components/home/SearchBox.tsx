import { Pricelist } from "@/data/enums/Pricelist";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaChevronLeft, FaChevronRight, FaCalendar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";

export const SearchBox = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [startPrice , setStartPrice] = useState<Number>(0);
    const [endPrice , setEndPrice] = useState<Number>(0);
    const [isOpen, setIsOpen] = useState(false);
    const handlePriceClick = (price: string) => {
        if (price=="10000+"){
            setStartPrice(10000)
            setEndPrice(10000)
        }
        else{
            const [start, end] = price.split("-");
            setStartPrice(Number(start));
            setEndPrice(Number(end));
        }
        setIsOpen(false);
    };
    return (
        <div className="rounded-lg flex items-center  flex-col lg:flex-row w-full bg-blue-800  p-5 select-none z-50">

            <div className={`${isOpen ? " z-50" : "z-30"} relative bg-white  rounded-lg  mb-2 lg:mb-0  `}>
               <div className="flex items-center border p-3 rounded-lg lg:max-w-[300px] justify-between" onClick={() => setIsOpen(!isOpen)}>
                <input className="focus:border-none border-none cursor-pointer outline-none" type="text" placeholder="Select Price"  value={startPrice!==0 && endPrice!==0 ? startPrice + " - " + endPrice : ""}/>
                {!isOpen ? <FaChevronDown className="cursor-pointer text-blue-900" size={14} /> : <FaChevronUp className="cursor-pointer text-blue-900" size={14} /> }    
               </div>
               <div className={`z-50 absolute  mt-0.5 left-0  w-full  border border-blue-900 rounded   bg-white cursor-pointer ${isOpen ? "block" : "hidden"}`}>
                {
                    Object.values(Pricelist)?.map((price) => (
                        <div className=" p-2 hover:bg-blue-900  hover:text-white font-medium   "onClick={() => handlePriceClick(price)}  key={price}>
                            {price}
                        </div>
                    ))
                }
               </div>
            </div>
            <div className={`${isOpen ? " z-30" : "z-50"}`}>
                <DatePicker
                selected={startDate}
                className="border lg:mb-0 mb-2 lg:w-fit w-full cursor-pointer bg-white focus:border-blue-600 focus:border-4 border-black  py-3 rounded-lg text-black lg:min-w-[300px]  lg:px-3 flex justify-center"
                calendarClassName=" shadow-xl rounded-full "
                dayClassName={() => "cursor-pointer hover:text-white hover:bg-blue-900 rounded-full"}
                wrapperClassName=""
                renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth }) => (
                    <div className="  py-2 ">
                        <div className="flex items-center justify-between">
                            <button onClick={decreaseMonth} className="p-1 cursor-pointer"><FaChevronLeft size={16} /></button>
                            <span>{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                            <button onClick={increaseMonth} className="p-1 cursor-pointer"><FaChevronRight size={16} /></button>
                        </div>
                    </div>
                )}
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(dates: [Date | null, Date | null]) => {
                    const [start, end] = dates;
                    setStartDate(start || new Date());
                    setEndDate(end);
                    setIsOpen(false);
                }}
                minDate={new Date()}
                customInput={
                    <div className="mx-2">
                        {(startDate && endDate)
                            ? `${startDate.toDateString().split(" ").slice(1).join(" ")} - ${endDate.toDateString().split(" ").slice(1).join(" ")}`
                            : <div className="flex items-center ">
                                <IoCalendarOutline size={20} className="text-blue-900 " />
                                <span className="px-2">
                                    Check-In Date - Check-Out Date
                                </span>
                            </div>}
                    </div>
                }
            />
            </div>
            <input type="button" value="Search" className="bg-white cursor-pointer text-blue-900 font-bold border border-white  h-[48px] px-6  rounded-lg"/>

        </div>
    );
};