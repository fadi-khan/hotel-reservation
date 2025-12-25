import { Button, CloseButton, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Field, Input, Label } from "@headlessui/react"
import { useLoginModalStore } from "./store/loginModalStore"
import Image from "next/image"
import { MdClose } from "react-icons/md"
import { FaGoogle } from "react-icons/fa"
import { FaGooglePlus } from "react-icons/fa6"
import { IoLogoGoogle } from "react-icons/io"
import { useEffect, useState } from "react"
import { authService } from "@/lib/services/auth"
import { useSignUpModalStore } from "./store/signupModalStore"

export const SignUpModal = () => {
    const { openSignUpModal, closeSignUpModal, signUpModalOpen } = useSignUpModalStore()
    const [email, setEmail]= useState("")
    const [password,setPassword]=useState("")

   const handleSignUp= async(e:React.FormEvent)=>{
    e.preventDefault()

    try {
       const response =await  authService.login({password,email})
       if(response?.data){

        console.log("Logged in Successfully ")
        console.log(response.data)


        console.log(localStorage.getItem("access_token"))
       }
    } catch (error) {
        
    }
    
   }

    return (

        <>
            <Button
                onClick={openSignUpModal}
                className={"bg-blue-900  text-white  hover:bg-blue-900/90 text-sm focus:border-black border rounded-lg px-4 py-2 cursor-pointer font-medium"}> Login</Button>
            <Dialog open={signUpModalOpen} onClose={closeSignUpModal} as="div" transition
                className={"relative z-30 rounded-2xl"}
            >
                <DialogBackdrop className={"fixed w-screen  inset-0 bg-black/80 "} />

                <div className="fixed inset-0 flex w-screen items-center justify-center ">
                    <DialogPanel className={"rounded-lg pb-10 min-w-sm border border-blue-900 shadow shadow-black bg-white/30 px-8 py-2 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-[closed]::opacity-0 "}>
                        <DialogTitle className={"w-full flex justify-between items-center gap-4"}>
                            <Image src="/logos/logo.png" alt="logo" height={55} width={55} />
                            <MdClose size={25} onClick={closeSignUpModal} className="cursor-pointer text-blue-900  " />
                        </DialogTitle>

                        <form onSubmit={handleSignUp} className=" flex flex-col items-center mt-6 justify-center gap-y-6">
                            <Field className={"flex-col flex w-full "}>
                                <Label className={"font-medium  text-blue-900"}>Email</Label>
                                <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                 placeholder="Enter you email" required type="email" className={"bg-white   rounded p-2 px-3 focus:outline-blue-900"}></Input>
                            </Field>

                            <Field className={"flex-col flex w-full "}>
                                <Label className={"font-medium text-blue-900"}>Password</Label>
                                <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required type="password" className={"bg-white  rounded p-2 px-3  focus:outline-blue-900"}></Input>
                            </Field>

                            <Input className={"w-full bg-blue-800 text-white py-3 hover:bg-blue-900/90 px-3 rounded-lg mt-3 font-medium cursor-pointer"} type="submit" name="Login" value="Login"></Input>
                        </form>

                        <hr className=" mt-12 mb-4 text-blue-900 h-0.5 bg-blue-900 " />

                        <Button className={"items-center flex justify-center mt-8 gap-2  rounded-lg cursor-pointer bg-orange-700 hover:bg-orange-800 text-white w-full py-3 px-3"}> <FaGoogle size={16}/> <span>Login with Google</span> </Button>



                    </DialogPanel>
                </div>
            </Dialog>


        </>


    )
}