import { toast } from "react-toastify";
import { httpService } from "./HttpService"
type LoginPayload = {
  email: string;
  password: string;
};
type VerifyOtpPayload = {
  email: string;
  otp: string;
};
export const authService = {


    login: async ({ password, email }:LoginPayload) => {

        try {
            const response = await httpService.post("auth/sign-in",{password,email,name:"Unknown"})
                // localStorage.setItem("access_token", response.data.access_token)
                toast.success(response?.data?.message)



            return response;
        } catch (error:any) {

            toast.error(error.response.data.message||" Failed to process request . Please try again later !")

            
        }
    }   ,
    
    verifyOtp: async ({email,otp}: VerifyOtpPayload)=>{

        const payload = {
                email:email,
                otp:otp

        }

        try {

            const response = await httpService.post("auth/verify-otp",  payload)
             localStorage.setItem("access_token", response.data.access_token)
            toast.success("Login Successful!")


        } catch (error:any) {

           toast.error(error.response.data.message||" Failed to process request . Please try again later !")

            
        }


    }

}  