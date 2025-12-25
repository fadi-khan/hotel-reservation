"use client"

import { MainHeader } from "@/components/headers/MainHeader";
import { MobileSideBar } from "@/components/sidebars/MobileSidebar";
import { useAuth } from "@/lib/hooks/useAuth";
import { useState } from "react";

export const Wrapper = () => {

    useAuth()
      const [isOpen, setIsOpen] = useState(false);
    
    return (
         <>
    <MainHeader setIsOpen={()=>setIsOpen(!isOpen)}/>
    <MobileSideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
    )
};