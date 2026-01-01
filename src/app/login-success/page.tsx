"use client"
import { authService } from "@/lib/services/auth";
import { Spinner } from "flowbite-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginSuccessPage() {

    const params = useSearchParams()
    const router = useRouter();
    console.log("Login success params:", params);
    const email = params.get("email") || "";
    const name = params.get("name") || "";
    const role = params.get("role") || "";


    useEffect(() => {
        authService.getUserDataFromGoogle({ email, name, role });
        router.replace("/");
    }, []);

    return <div className="p-8 text-center text-green-600 font-semibold">
        Login Successful! Redirecting to home...

        <p className="mt-2 text-sm text-gray-600">You will be redirected automatically.</p>
        <Spinner className="fixed top-1/2 left-1/2 " ></Spinner>

    </div>;
};