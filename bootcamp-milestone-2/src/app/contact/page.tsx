"use client";

import { useRef, useState } from "react";
import emailjs from  "@emailjs/browser";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");

    try {
      await emailjs.sendForm(
        "service_siqxhj9",  
        "template_ztjn485",  
        formRef.current,
        "_-lPWbwXq02nhlwP5"    
      );

      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  }

  return (
    <main>
      <h1 className="page-title">Contact</h1>

      <form id="contact-form" ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"   // must match EmailJS template variable
          id="name"
          placeholder="Name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"  // must match EmailJS template variable
          id="email"
          placeholder="Email"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          name="message"     // must match EmailJS template variable
          id="message"
          placeholder="Message"
          required
        />

        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Submit"}
        </button>

        {status === "success" && <p>Message sent!</p>}
        {status === "error" && (
          <p>Something went wrong. Please try again.</p>
        )}
      </form>
    </main>
  );
}
