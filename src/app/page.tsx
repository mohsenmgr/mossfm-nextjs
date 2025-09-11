"use client";

import MultiTab from '@/components/MultiTab';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import ContactForm from '@/components/ContactForm';
import AboutMe from '@/components/AboutMe';
import { IJob } from '@/models/Job';
import Skeleton from '@/components/Skeleton';




function Page() {

  const [jobs, setJobs] = useState<IJob[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);


 useEffect(() => {

  const fetchJobs = async () => {
      try {
        const res = await fetch("/api/job"); // your GET API route
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data: IJob[] = await res.json();
        setJobs(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } 
      finally {
        setLoading(false);
      }
    };

    fetchJobs();



  /***************** */
  const typedSpan = document.getElementById("typed");
  const totype = [
    "There is only one right path in this world, the path of righteousness.",
    "Good thoughts, good words, good deeds.",
    "Let us be among those who renew the world.",
    "The righteous man is the friend of all who seek righteousness.",
  ];

  const delayTyping_char = 200;
  const delayErasing_text = 150;
  const delayTyping_text = 3000;

  let totypeIndex = 0;
  let charIndex = 0;
  const timeouts: NodeJS.Timeout[] = []; // store all timeout IDs

  function typeText() {
    if (!typedSpan) return;
    if (charIndex < totype[totypeIndex].length) {
      typedSpan.textContent += totype[totypeIndex].charAt(charIndex);
      charIndex++;
      timeouts.push(setTimeout(typeText, delayTyping_char));
    } else {
      timeouts.push(setTimeout(eraseText, delayTyping_text));
    }
  }

  function eraseText() {
    if (!typedSpan) return;
    if (charIndex > 0) {
      typedSpan.textContent = totype[totypeIndex].substring(0, charIndex - 1);
      charIndex = charIndex - 1;
      timeouts.push(setTimeout(eraseText, delayErasing_text));
    } else {
      totypeIndex++;
      if (totypeIndex >= totype.length) totypeIndex = 0;
      timeouts.push(setTimeout(typeText, delayTyping_text));
    }
  }

  // start typing
  if (totype[totypeIndex].length) timeouts.push(setTimeout(typeText, delayTyping_text));

  // cleanup function
  return () => {
    // clear all timeouts when component unmounts
    timeouts.forEach((t) => clearTimeout(t));
    if (typedSpan) typedSpan.textContent = ""; // reset text
  };
}, []);

  if (error) return <p>Error: {error}</p>;

  return (

      <div className="flex flex-col min-h-screen">
  <div className="flex flex-1">
    

    
    <div className="w-1/4 flex items-start justify-center pointer-events-none bg-transparent max-[768px]:w-[22%] max-[768px]:hidden">
      <Image
        src="/pers.svg"
        alt="Left Pillar"
        width={150}
        height={150}
        className="h-full w-full object-cover block pillar"
      />
    </div>
   

   
      

      
    <main className="flex-1 max-w-4xl mx-auto p-0 min-h-[1300px]">
      <div className="flex flex-col items-center justify-center gap-3">
          <Image width={300}
               height={300}
               src="/images/farvahar.png" alt="Farvahar" className="max-w-full h-auto" />
          <div className="wrapper">
            <h1 className="effect-wrapper">
              <span className="text-green-900" id="typed"></span>
              <span className="cursor">&nbsp;</span>
            </h1>
          </div>
      </div>
    
    
             
    
        <div className="space-y-8">
          <section className="max-w-5xl mx-auto px-6 py-8 bg-none text-gray-100">
            <AboutMe />
          </section>
        <section>
          {
          loading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)
          : jobs.map((job) => <MultiTab key={job._id as string} job={job} />)
          }
        </section>
    
          <section className="bg-none text-gray-100">
              <ContactForm />
          </section>
      </div>
    </main>

        <div className="w-1/4 flex items-start justify-center pointer-events-none bg-transparent max-[768px]:w-[22%] max-[768px]:hidden">
          <Image width={150} height={150} src="/pers.svg" alt='Right Pillar' className="h-full w-full object-cover block scale-x-[-1]" />
        </div>
  </div>
</div>

  )
}

export default Page;