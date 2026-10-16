"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const avatar = "/homepage/reviews/avatar.png";

const reviews = [
  {
    quote:
      "I used to think AI was only useful for writing. The course showed me how I could use it for marketing, customer communication, and planning my fashion business. I now approach some of my business decisions very differently.",
    name: "Amaka E.",
    role: "Fashion Designer",
    placement: "lg:col-start-1 lg:row-start-1",
  },
  {
    quote:
      "The examples were relevant to the kind of work I actually do. I learned how to use AI to communicate better with customers.",
    name: "David O.",
    role: "Plumbing Contractor",
    placement: "lg:col-start-2 lg:row-start-1",
  },
  {
    quote:
      "What I liked most was that I didn't have to become an AI expert. The platform showed me practical ways to use AI.",
    name: "Emmanuel A.",
    role: "Automotive Technician",
    placement: "lg:col-start-3 lg:row-start-1",
  },
  // {
  //   quote:
  //     "The course helped me see possibilities I hadn't considered before. I can now use AI to develop ideas, improve my marketing, and make better decisions.",
  //   name: "Ana Costa",
  //   role: "COO, GFS",
  //   placement: "lg:col-start-2 lg:row-start-2",
  // },
];

export default function ReviewsSection() {
  return (
    <section className="bg-[#edf2f6] px-6 py-10 sm:px-10 sm:py-16 lg:px-[8.2vw] lg:py-40">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center gap-6 lg:gap-[62px]">
        <motion.div
          className="flex flex-col items-center gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex h-[34px] w-[103px] items-center justify-center rounded-[34px] border-2 border-[#fcfcfc] bg-white p-1">
            <div className="flex h-full w-full items-center justify-center rounded-[30px] border border-[#d9e0e4]">
              <span className="font-serif text-base text-[#52666d]">Reviews</span>
            </div>
          </div>
          <div className="flex max-w-[518px] flex-col gap-[18px]">
            <h2 className="font-serif text-[clamp(2.3rem,5vw,2.875rem)] leading-[1.2] tracking-[-0.14rem] text-[#082a35]">
              Why Businesses Choose Cuniv
            </h2>
            <p className="text-base leading-[1.2] text-[#52666d] sm:text-[22px]">
              Hear from business owners discovering practical ways to use AI in
              their everyday work.
            </p>
          </div>
        </motion.div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto] lg:gap-x-5 lg:gap-y-8">
          {reviews.map((review, i) => (
            <motion.article
              key={review.name}
              className={`relative flex min-h-[220px] flex-col overflow-hidden rounded-[14px] bg-[#f1f7fb]/40 px-6 pb-6 pt-16 sm:px-8 sm:pb-8 sm:pt-[80px] ${review.placement} ${review.name === "Amaka E." ? "lg:min-h-[423px] lg:pt-[106px]" : review.name === "Emmanuel A." ? "lg:min-h-[319px] lg:pt-[106px]" : review.name === "Ana Costa" ? "lg:min-h-[303px] lg:pt-[106px]" : "lg:min-h-[285px] lg:pt-[106px]"}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
            >
              <span
                aria-hidden="true"
                className="absolute left-7 top-[-18px] font-sans text-[190px] leading-none text-[#d8eaf3]/60"
              >

              </span>
              <p className="relative text-base leading-6 text-[#52666d]">
                {review.quote}
              </p>
              <div className="mt-auto flex items-center gap-3 pt-8">
                <Image
                  src={avatar}
                  alt={`${review.name} avatar`}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <p className="font-serif text-sm text-[#453232]">{review.name}</p>
                  <p className="text-xs text-[#797979]">{review.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
{/* 
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="/login"
            className="inline-flex items-center gap-2 text-base font-semibold text-[#43ac47] hover:underline"
          >
            See what others are saying
            <span aria-hidden="true">→</span>
          </a>
        </motion.div> */}
      </div>
    </section>
  );
}
