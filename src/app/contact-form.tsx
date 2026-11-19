"use client";

import { FormEvent, useEffect, useState } from "react";
import "./contact-form.css";

// Same endpoint, fields and payload as the original traversevpn.com contact form, so inquiries keep
// arriving in the same Google Apps Script / sheet.
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx-NwbOg3ZK1RAVao8HNicwHvvQaE_mKipqA7jxHqPwvx1u3xo2P4zTonfzhQW7C57X0g/exec";
const INQUIRY_TYPES = ["Sales Inquiry", "Technical Support", "General Inquiry", "Partnership", "Billing", "Other"];
const COMPANY_SIZES = ["1–10", "11–50", "51–200", "201–500", "500+"];

type FormState = { fullName: string; email: string; inquiryType: string; companySize: string; subject: string; message: string; agreed: boolean };
const EMPTY: FormState = { fullName: "", email: "", inquiryType: "", companySize: "", subject: "", message: "", agreed: false };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  // Buttons elsewhere link here as /contact-us?type=Billing etc., so the right team is preselected.
  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("type");
    if (type && INQUIRY_TYPES.includes(type)) setForm((prev) => ({ ...prev, inquiryType: type }));
  }, []);

  const set = <K extends keyof FormState>(field: K, value: FormState[K]) => setForm((prev) => ({ ...prev, [field]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    if (!event.currentTarget.checkValidity()) { event.currentTarget.reportValidity(); return; }
    if (!form.agreed) { setError("Please agree to the privacy terms so we can reply."); return; }
    setError("");
    setStatus("sending");
    try {
      await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(form) });
      setStatus("sent");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") return <div className="contact-form-done" role="status">
    <b>Message sent</b>
    <p>Thanks for getting in touch. We&rsquo;ll reply to your email soon.</p>
    <button type="button" onClick={() => setStatus("idle")}>Send another message</button>
  </div>;

  return <form id="contact-form" className="contact-form" onSubmit={submit} noValidate aria-label="Contact form">
    <p className="contact-form-lead">Fill out the form and we&rsquo;ll route your message to the right team. Fields marked with <abbr title="required">*</abbr> are required.</p>
    <div className="contact-form-row">
      <label><span>Full name <abbr title="required">*</abbr></span><input name="fullName" autoComplete="name" placeholder="First and last name" required value={form.fullName} onChange={(e) => set("fullName", e.target.value)} /></label>
      <label><span>Email <abbr title="required">*</abbr></span><input name="email" type="email" autoComplete="email" placeholder="name@example.com" required value={form.email} onChange={(e) => set("email", e.target.value)} /></label>
    </div>
    <div className="contact-form-row">
      <label><span>Inquiry type <abbr title="required">*</abbr></span>
        <select name="inquiryType" required value={form.inquiryType} onChange={(e) => set("inquiryType", e.target.value)}>
          <option value="" disabled>Select one</option>
          {INQUIRY_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </label>
      <label><span>Company size <abbr title="required">*</abbr></span>
        <select name="companySize" required value={form.companySize} onChange={(e) => set("companySize", e.target.value)}>
          <option value="" disabled>Select</option>
          {COMPANY_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
        </select>
      </label>
    </div>
    <label><span>Subject</span><input name="subject" placeholder="Brief description of your question" value={form.subject} onChange={(e) => set("subject", e.target.value)} /></label>
    <label><span>Message</span><textarea name="message" rows={5} placeholder="Tell us more. The more detail you share, the faster we can help." value={form.message} onChange={(e) => set("message", e.target.value)} /></label>
    <label className="contact-form-consent">
      <input type="checkbox" name="agreed" checked={form.agreed} onChange={(e) => set("agreed", e.target.checked)} />
      <span>I agree that Traverse VPN may store and use the information I submit here to respond to my inquiry, in line with its <a href="/privacy-policy">Privacy Policy</a>.</span>
    </label>
    {error && <p className="contact-form-error" role="alert">{error}</p>}
    {status === "error" && <p className="contact-form-error" role="alert">Your message couldn&rsquo;t be sent. Check your connection and try again, or email <a href="mailto:info@traversevpn.com">info@traversevpn.com</a>.</p>}
    <button className="contact-form-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}<span aria-hidden="true">↗</span></button>
  </form>;
}
