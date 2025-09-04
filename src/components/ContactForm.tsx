"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setStatus("Please verify that you are not a robot.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      // Placeholder POST request
      const res = await fetch("/api/contact/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus(`Error: ${data.error || "Something went wrong."}`);
      }
    } catch (err) {
      setStatus("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-16">
      <div className="bg-[rgba(13,52,58,1)] w-full rounded-lg shadow-lg p-4 md:p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Contact Me
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg shadow-sm 
                     bg-[#1F4B52] text-white placeholder-gray-300 
                     border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg shadow-sm 
                     bg-[#1F4B52] text-white placeholder-gray-300 
                     border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Let's work together"
              value={formData.subject}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg shadow-sm 
                     bg-[#1F4B52] text-white placeholder-gray-300 
                     border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Your message..."
              value={formData.message}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg shadow-sm 
                     bg-[#1F4B52] text-white placeholder-gray-300 
                     border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>

          <div className="w-full">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={(token) => setCaptchaToken(token)}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-200 hover:bg-green-500 text-gray-900 font-medium py-3 px-6 rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && <p className="text-white mt-2">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;