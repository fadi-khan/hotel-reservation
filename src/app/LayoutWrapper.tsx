import { MainHeader } from "@/components/headers/MainHeader";
import { MobileSideBar } from "@/components/sidebars/MobileSidebar";
import { ToastProvider } from "@/components/toasts/ToastProvider";
import ReduxProvider from "@/lib/Providers/ReduxProvider";
import { useState } from "react";

export const LayoutWrapper  = ({ children }: { children: React.ReactNode })=>{

      const [isOpen, setIsOpen] = useState(false);
    return(
        <ReduxProvider>
        <MainHeader setIsOpen={()=>setIsOpen(!isOpen)}/>
        <MobileSideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <ToastProvider />
            {children}
        </ReduxProvider>
    )
}