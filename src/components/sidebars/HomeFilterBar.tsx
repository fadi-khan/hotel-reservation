import { RoomType } from "@/data/enums/RoomType"
import { Field, Label, Radio, RadioGroup, Select } from "@headlessui/react"

export const HomeFilterBar = () => {

    return (
        <div className="mt-12  md:my-6 p-3 z-50! rounded  h-full gap-y-6 flex  justify-between w-full   ">
            <div className="flex items-center gap-2 w-full ">
                <Select  className=" cursor-pointer dark:bg-white! bg-white! rounded " name="Select">
                    <option className="">
                        Sort By
                    </option>
                    <option>
                        Price Low to High
                    </option>
                    <option>
                        Price High to Low
                    </option>

                </Select>
            </div>

            <div className="flex items-center gap-2 w-full justify-end">
                
                <Select className="cursor-pointer dark:bg-white! bg-white! rounded " name="Select">
                    <option>Room Type</option>
                    {Object.values(RoomType).map((value, index) => (
                       <option key={index}>{value} </option>
                    ))
                    }
                </Select>


            </div>


        </div>
    )
}