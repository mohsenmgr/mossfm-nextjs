"use client";

import MultiTab from '@/components/MultiTab';
import React, { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import ContactForm from '@/components/ContactForm';
import AboutMe from '@/components/AboutMe';
import { IJob } from '@/models/Job';
import Skeleton from '@/components/Skeleton';
import { IQuote } from '@/models/Quote';

const delayTyping_char = 200;
const delayErasing_text = 150;
const delayTyping_text = 3000;

export default function Page() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [quote, setQuote] = useState<Partial<IQuote>>({ quotes: [], special: "", showSpecial: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const totypeIndex = useRef(0);
  const charIndex = useRef(0);

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch quotes
        const resQuote = await fetch("/api/quote");
        if (!resQuote.ok) throw new Error("Failed to fetch quote");
        const dataQuote: IQuote = await resQuote.json();
        setQuote(dataQuote);

        // Fetch jobs
        const resJobs = await fetch("/api/job");
        if (!resJobs.ok) throw new Error("Failed to fetch jobs");
        const dataJobs: IJob[] = await resJobs.json();
        setJobs(dataJobs);

      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ---------------- TYPEWRITER EFFECT ----------------
useEffect(() => {
  if (!quote) return;

  const timeouts: number[] = [];
  const totypeIndex = { current: 0 };
  const charIndex = { current: 0 };

  const getCurrentText = () => {
    if (quote.showSpecial && quote.special) return quote.special;
    if (quote.quotes?.length) return quote.quotes[totypeIndex.current];
    return "";
  };

  const typeText = () => {
    const typedSpan = document.getElementById("typed");
    if (!typedSpan) return;

    const currentText = getCurrentText();

    if (charIndex.current < currentText.length) {
      typedSpan.textContent += currentText.charAt(charIndex.current);
      charIndex.current++;
      timeouts.push(window.setTimeout(typeText, delayTyping_char));
    } else {
      if (quote.showSpecial) {
        // Special message typed once, stop
        return;
      }
      timeouts.push(window.setTimeout(eraseText, delayTyping_text));
    }
  };

  const eraseText = () => {
    const typedSpan = document.getElementById("typed");
    if (!typedSpan) return;

    const currentText = getCurrentText();

    if (charIndex.current > 0) {
      typedSpan.textContent = currentText.substring(0, charIndex.current - 1);
      charIndex.current--;
      timeouts.push(window.setTimeout(eraseText, delayErasing_text));
    } else {
      if (!quote.quotes?.length || quote.showSpecial) return;
      totypeIndex.current++;
      if (totypeIndex.current >= quote.quotes.length) totypeIndex.current = 0;
      timeouts.push(window.setTimeout(typeText, delayTyping_text));
    }
  };

  // Start typing
  timeouts.push(window.setTimeout(typeText, delayTyping_text));

  // Cleanup on unmount
  return () => {
    timeouts.forEach((t) => clearTimeout(t));
    const typedSpan = document.getElementById("typed");
    if (typedSpan) typedSpan.textContent = "";
    totypeIndex.current = 0;
    charIndex.current = 0;
  };
}, [quote]);

  // ---------------- RENDER ----------------
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
              {loading
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
  );
}