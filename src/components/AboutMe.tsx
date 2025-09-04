import React from 'react'
import Image from "next/image";


function AboutMe() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-8 bg-none text-gray-100">
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-green-200">
                      <Image src="/images/mohsen.png" alt="Moss FM"  className="w-full h-full object-cover" width={150} height={150} />
                    </div>
                
                    <h2 className="text-4xl font-extrabold text-green-200 text-center">
                      About Me
                    </h2>
                  </div>
                
                  <div className="mt-6 space-y-6">
                    <p className="text-lg leading-relaxed text-gray-300">
                      Hi! I'm Mohsen FM, a passionate software engineer specializing in
                      web development and creating seamless user experiences. With years of
                      experience in full-stack development, I love turning ideas into
                      beautiful, functional websites and applications.
                
                      I have a strong background in computer engineering, specializing in building modern, user-friendly, and performant web applications.
                      With experience in <span className="font-semibold">React, Tailwind CSS, and modern JavaScript</span>,
                      I love turning complex problems into simple, elegant solutions. Beyond coding,
                      I enjoy exploring new technologies, photography, and travelling.
                    </p>
                
                    <div>
                      <h3 className="text-xl font-semibold text-green-200 mb-3">Key Skills</h3>
                      <ul className="flex flex-wrap gap-3">
                        <li className="px-4 py-2 rounded-md text-sm font-medium bg-[rgba(13,52,58,1)] text-white">JavaScript</li>
                        <li className="px-4 py-2 rounded-md text-sm font-medium bg-[rgba(13,52,58,1)] text-white">React</li>
                        <li className="px-4 py-2 rounded-md text-sm font-medium bg-[rgba(13,52,58,1)] text-white">Node.js</li>
                        <li className="px-4 py-2 rounded-md text-sm font-medium bg-[rgba(13,52,58,1)] text-white">Tailwind CSS</li>
                        <li className="px-4 py-2 rounded-md text-sm font-medium bg-[rgba(13,52,58,1)] text-white">TypeScript</li>
                      </ul>
                    </div>
                  </div>
                </section>
  )
}

export default AboutMe