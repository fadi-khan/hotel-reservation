import { MainHeader } from "@/components/headers/MainHeader";
import { MobileSideBar } from "@/components/sidebars/MobileSidebar";
import { ToastProvider } from "@/components/toasts/ToastProvider";
import { RoomWizard } from "@/components/wizards/RoomWizard";
import QueryProvider from "@/lib/Providers/QueryClientProvider";
import ReduxProvider from "@/lib/Providers/ReduxProvider";
import { Sidebar, SidebarItem } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {

    const [isOpen, setIsOpen] = useState(false);
    return (
        <QueryProvider>
            <ReduxProvider>
                <MainHeader setIsOpen={() => setIsOpen(!isOpen)} />
                <MobileSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
                <ToastProvider />
                {children}
                <div className="hidden"><RoomWizard /></div>
            </ReduxProvider>
        </QueryProvider>

    )
}