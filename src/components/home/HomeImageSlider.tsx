"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

export const HomeImageSlider = () => {
  const sideImages = useMemo(
    () => [
      "/homeSlider/room1.avif",
      "/homeSlider/room2.avif",
      "/homeSlider/room4.avif",
      "/homeSlider/room5.avif",
    ],
    []
  );

  const [centerIdx, setCenterIdx] = useState(0);
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    const duration = 700;
    const displayMs = 5000;
    const displayTimeoutRef = { current: 0 as unknown as NodeJS.Timeout };
    const slideTimeoutRef = { current: 0 as unknown as NodeJS.Timeout };

    const scheduleNext = () => {
      displayTimeoutRef.current = setTimeout(() => {
        if (sliding) return; // guard
        setSliding(true);
        slideTimeoutRef.current = setTimeout(() => {
          setCenterIdx((i) => (i + 1) % sideImages.length);
          setSliding(false);
          scheduleNext();
        }, duration);
      }, displayMs);
    };

    scheduleNext();

    return () => {
      clearTimeout(displayTimeoutRef.current as unknown as number);
      clearTimeout(slideTimeoutRef.current as unknown as number);
    };
  }, [sideImages.length]);

  return (
    <div className="w-full bg-blue-800 lg:pb-12  pb-5">
      <div className="relative mx-auto max-w-6xl h-[450px] px-6">
        {/* Left stack (overlapping with peek) */}
        <div className="absolute left-[10%] top-1/4 -translate-y-1/2 w-[150px]">
          <div className="relative h-[100px] w-[190px] overflow-visible hidden lg:block">
            <Image
              src={sideImages[0]}
              alt="Left Front"
              width={260}
              height={180}
              className="rounded-lg shadow-md object-cover w-[230px] h-[160px] absolute top-0 left-0 border-2 border-white z-20"
            />
            <Image
              src={sideImages[1]}
              alt="Left Back"
              width={260}
              height={180}
              className="rounded-lg shadow-md object-cover w-[230px] h-[160px] absolute top-10 left-6 z-10  border-2 border-white opacity-90 scale-[0.97]"
            />
          </div>

        </div>
         <h1 className="hidden xl:block absolute top-[85%] left-[10%] -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold"> Luxurious Rooms</h1>


        {/* Right stack (overlapping with peek) */}
        <div className="absolute right-[13%] top-1/4 -translate-y-1/2 w-[150px]">
          <div className="relative h-[100px] w-[190px] overflow-visible hidden lg:block">
            <Image
              src={sideImages[2]}
              alt="Right Front"
              width={260}
              height={180}
              className="rounded-lg shadow-md object-cover w-[230px] h-[160px] absolute top-0 right-0 z-20 border-2 border-white"
            />
            <Image
              src={sideImages[3]}
              alt="Right Back"
              width={260}
              height={180}
              className="rounded-lg shadow-md object-cover w-[230px] h-[160px] absolute top-10 right-6 z-10 border-2 border-white opacity-90 scale-[0.97]"
            />
          </div>
         
          
        </div>
         <h1 className="hidden xl:block absolute top-[85%] -right-[15%] -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold"> Affordable Prices</h1>

        {/* Center slider (incoming slides in, current stays) */}
        <div className="  absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[300px] lg:w-[420px] lg:h-[300px] border-2 border-white overflow-hidden rounded-xl shadow-lg shadow-blue-900">
          {/* Current stays static */}
         
          <Image
            key={`current-${centerIdx}`}
            src={sideImages[centerIdx]}
            alt="Center Current"
            width={600}
            height={300}
            className="object-cover w-[95%] h-[300px] lg:w-[420px] lg:h-[300px] absolute inset-0 z-10 "
          />
          {/* Incoming slides in from right */}
          <Image
            key={`incoming-${centerIdx}`}
            src={sideImages[(centerIdx + 1) % sideImages.length]}
            alt="Center Next"
            width={600}
            height={300}
            className={`object-cover w-[95%] h-[300px] lg:w-[420px] lg:h-[300px] absolute inset-0 ${
              sliding
                ? "z-20 transition-transform duration-700 translate-x-0"
                : "-z-10 transition-none translate-x-full"
            } `}
          />
        </div>
        {/* <div className="z-40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 lg:p-4 rounded-xl bg-white/12 backdrop-blur-sm shadow-xl">
          <h1 className="hidden lg:block text-blue-800 drop-shadow-md text-lg lg:text-xl font-bold tracking-tight ">Shop Now</h1>
        </div> */}
      </div>
    </div>
  );
};