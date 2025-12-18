import { toast } from "react-toastify";
import { httpService } from "./HttpService"
type LoginPayload = {
  email: string;
  password: string;
};
export const authService = {


    login: async ({ password, email }:LoginPayload) => {

        try {
            const response = await httpService.post("auth/sign-in",{password:password,email:email,name:"Unknown"})
                localStorage.setItem("access_token", response.data.access_token)
                toast.success("Logged in Successfully !")

            return response;
        } catch (error:any) {

            toast.error(error.response.data.message||" Failed to process request . Please try again later !")

            
        }
    }

}  