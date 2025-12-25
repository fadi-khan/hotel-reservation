import { authService } from "@/lib/services/auth"
import { Button, Dialog, Field, Input, Label } from "@headlessui/react"
import { useState } from "react"

export const OtpModal = ({ email }: { email: string })=>{


const [otp , setOtp ] =  useState("")  
const handleSubmit = async (e:any) => {
    
    e.preventDefault()
    const response = await authService.verifyOtp({email,otp})

}


return(

<form className=" flex flex-col justify-center pt-4 gap-y-5 " onSubmit={handleSubmit}>

    <Field className={'flex flex-col gap-y-1'}>

        <Label className={'text-blue-900 font-medium '}> Enter your OTP </Label>
        <Input 
        type="text"
        maxLength={6}
        inputMode="numeric"
        placeholder="Enter your six digits OTP here "

        className={"py-2 border rounded border-none focus:outline-blue-900 px-2 bg-white "}
        value={otp}
        onChange={(e)=>setOtp(e.target.value)}
        />

    </Field>
    <Input
    
    disabled={otp.length<6}
    type="submit" className={'w-full disabled:bg-blue-500 bg-blue-800 text-white py-3 hover:bg-blue-900/90 px-3 rounded-lg mt-3 font-medium cursor-pointer'} value="Login"/> 


</form>
    

)

    


}