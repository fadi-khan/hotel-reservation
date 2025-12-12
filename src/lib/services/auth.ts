import { httpService } from "./HttpService"
type LoginPayload = {
  email: string;
  password: string;
};
export const authService = {


    login: async ({ password, email }:LoginPayload) => {

        try {
            const response = await httpService.post("auth/sign-in",{password:password,email:email,name:"Unknown"})
            return response;
        } catch (error:any) {

            throw new Error(error.response.data.message||" Failed to process request . Please try again later !")
            
        }
    }

}