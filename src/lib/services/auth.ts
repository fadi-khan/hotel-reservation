import { toast } from "react-toastify";
import { httpService } from "./HttpService"
import { store } from "../store/store";
import { clearCredentials, setCredentials } from "../store/authSlice";
import { Params } from "next/dist/server/request/params";
type LoginPayload = {
    email: string;
    password: string;
};
type VerifyOtpPayload = {
    email: string;
    otp: string;
};
export const authService = {


    login: async ({ password, email }: LoginPayload) => {

        try {
            const response = await httpService.post("auth/sign-in", { password, email, name: "Unknown" })
            // localStorage.setItem("access_token", response.data.access_token)
            toast.success(response?.data?.message)



            return response;
        } catch (error: any) {

            toast.error(error.response.data.message || " Failed to process request . Please try again later !")
            throw error;

        }
    },

    verifyOtp: async ({ email, otp }: VerifyOtpPayload) => {

        const payload = {
            email: email,
            otp: otp

        }

        try {

            const response = await httpService.post("auth/verify-otp", payload)
            toast.success("Login Successful!")
            store.dispatch(setCredentials(response?.data?.user))
            return response;


        } catch (error: any) {

            toast.error(error.response.data.message || " Failed to process request . Please try again later !")

            throw error;
        }


    },

    getProfile: async () => {
        try {
            const response = await httpService.get("auth/profile");

            return response;

        } catch (error: any) {
            toast.error(error.response.data.message || " Failed to process request . Please try again later !")

            throw error;

        }
    },
    logout: async () => {
        try {
            const response = await httpService.post("auth/logout");
            store.dispatch(clearCredentials())
            return response;

        } catch (error: any) {
            toast.error(error.response.data.message || " Failed to process request . Please try again later !")

            throw error;

        }
    }
    ,
    getUserDataFromGoogle:  (params:any) => {
        const email = params.email;
        const name = params.name;
        const role = params.role;

        if (typeof email !== 'string' || typeof name !== 'string' || typeof role !== 'string') {
            console.error('Invalid params received:', params);
            return;
        }

         store.dispatch(setCredentials({email, name, role}));
    }



}  