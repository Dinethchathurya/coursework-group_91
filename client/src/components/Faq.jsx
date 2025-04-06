import React, { useState } from "react";

function Faq() {
  const [openIndex, setOpenIndex] = useState(0); // First item is open by default

  const handleToggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const faqs = [
    {
      question: "How can I book tickets?",
      answer:
        'Click on "Book Tickets," choose your movie, showtime, and seats, and proceed to payment.',
    },
    {
      question: "Can I cancel or modify my booking?",
      answer:
        "Yes! Log in to your account to make changes or cancel your booking (subject to terms).",
    },
    {
      question: "Are there any discounts?",
      answer: "Look out for special offers and promo codes on our homepage!",
    },
  ];

  return (
    <div className="mx-auto py-20 bg-[#131334]">
      <div className="container mx-auto p-5">
        <h2 className="text-3xl font-bold text-white mb-5 text-center ">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-4 lg:mx-32">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`collapse collapse-plus ${
                openIndex === index ? "bg-blue-800" : "bg-[#000025]"
              } `}
            >
              <input
                type="radio"
                name="my-accordion-3"
                checked={openIndex === index}
                onChange={() => handleToggle(index)}
              />
              <div className="collapse-title text-xl font-medium">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;
