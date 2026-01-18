import { authService } from "@/lib/services/auth";
import { Field, Input, Label } from "@headlessui/react";
import { useState, useRef, useEffect } from "react";

export const OtpModal = ({ email }: { email: string }) => {
  // 1. Initialize an array of 6 empty strings
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  // 2. Create an array of refs for the inputs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join(""); // Combine array to string
    const response = await authService.verifyOtp({ email, otp: otpString });
    console.log('response otp', response)


  };

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return; // Only allow numbers

    const newOtp = [...otp];
    // Take only the last character entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move focus forward if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move focus backward on backspace if current field is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <form className="flex flex-col justify-center pt-4 gap-y-5" onSubmit={handleSubmit}>
      <Field className="flex flex-col gap-y-3">
        <Label className="text-blue-900 font-medium">Enter your OTP</Label>
        <div className="flex justify-between w-full">
          {otp.map((digit, index) => (
            <Input
              key={index}
              // @ts-ignore - assigning ref to array
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 focus:outline-none!  text-center border-2 font-mono font-bold text-xl text-blue-900 border-blue-800 rounded   bg-white"
            />
          ))}
        </div>
      </Field>

      <button
        type="submit"
        disabled={otp.some((v) => v === "")}
        className="w-full disabled:bg-blue-300 mt-6 bg-blue-800 text-white py-3 hover:bg-blue-900 rounded-lg font-medium transition-all"
      >
        Login
      </button>
    </form>
  );
};