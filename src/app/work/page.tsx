"use client";

import MultiTab from '@/components/MultiTab';
import Skeleton from '@/components/Skeleton';
import { IJob } from '@/models/Job';
import React, { useEffect, useState } from 'react'

function Work() {

    const [jobs, setJobs] = useState<IJob[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(true);

   useEffect(()=> {
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
   },[]);



  return (
        <main className="flex-1 max-w-4xl mx-auto p-8 min-h-[1300px]">

        <div className="space-y-8">

        <section>
          {
          loading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)
          : jobs.map((job) => <MultiTab key={job._id as string} job={job} />)
          }
        </section>

        </div>
        </main>
  )
}

export default Work