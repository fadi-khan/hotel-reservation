"use client"
import { authService } from "@/lib/services/auth";
import { Spinner } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

// 1. Move logic into a separate component
function LoginSuccessHandler() {
    const params = useSearchParams();
    const router = useRouter();
    
    const email = params.get("email") || "";
    const name = params.get("name") || "";
    const role = params.get("role") || "";

    useEffect(() => {
        // Only run logic if parameters are present
        if (email) {
            authService.getUserDataFromGoogle({ email, name, role });
            router.replace("/");
        }
    }, [email, name, role, router]);

    return null; // This component handles logic only
}

// 2. Main page component wraps the handler in Suspense
export default function LoginSuccessPage() {
    return (
        <div className="p-8 text-center text-green-600 font-semibold">
            <Suspense fallback={<Spinner className="fixed top-1/2 left-1/2" />}>
                <LoginSuccessHandler />
            </Suspense>
            
            Login Successful! Redirecting to home...
            <p className="mt-2 text-sm text-gray-600">You will be redirected automatically.</p>
            <Spinner className="fixed top-1/2 left-1/2" />
        </div>
    );
}
