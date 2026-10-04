import { useState } from "react";
import { toast } from "react-toastify";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      toast.error("Please fill all fields before sending!");
  
      return;
    }

    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <div className="contact-container max-w-6xl mx-auto flex flex-wrap lg:flex-nowrap items-stretch my-20 font-[Poppins]">
      {/* Left Info Section */}
      <div className="max-w-[35%] w-full flex flex-col bg-[#F5F5F5] px-10 max-sm:px-2 py-10 max-sm:py-5 justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-x-3">
            <span className="w-10 h-10 rounded-full bg-[#DB4444]"></span>
            <h2 className="font-medium text-lg">Call To Us</h2>
          </div>
          <p className="text-sm">We are available 24/7, 7 days a week</p>
          <p className="text-sm">Phone: +880161112222</p>
        </div>

        <hr className="my-7 border-gray-300" />

        <div className="space-y-2">
          <div className="flex items-center gap-x-3">
            <span className="w-10 h-10 rounded-full bg-[#DB4444]"></span>
            <h2 className="font-medium text-lg">Write To Us</h2>
          </div>
          <p className="text-sm">
            Fill out our form and we will contact you within 24 hours.
          </p>
          <p className="text-sm">Email: customer@exclusive.com</p>
          <p className="text-sm">Email: support@exclusive.com</p>
        </div>
      </div>

      {/* Right Form Section */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full bg-[#F5F5F5] ml-2.5 p-10 max-lg:p-6 max-sm:p-3 justify-between rounded-md"
      >
        <div className="flex flex-wrap justify-between gap-4 mb-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name *"
            className="w-full lg:w-[32%] p-3 rounded border focus:outline-[#DB4444]"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email *"
            className="w-full lg:w-[32%] p-3 rounded border focus:outline-[#DB4444]"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Phone *"
            className="w-full lg:w-[32%] p-3 rounded border focus:outline-[#DB4444]"
          />
        </div>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message *"
          className="w-full p-3 resize-none h-40 rounded border focus:outline-[#DB4444] mb-5"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#DB4444] text-white px-8 py-3 rounded hover:bg-[#c43d3d] transition"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
