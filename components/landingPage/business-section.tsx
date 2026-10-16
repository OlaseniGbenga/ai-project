"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const businessAssets = "/homepage/business";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BusinessSection() {
  return (
    <section className="min-h-screen bg-[#edf2f6] px-6 py-20 sm:px-10 lg:px-20 lg:py-40">
      <div className="mx-auto flex w-full max-w-[1090px] flex-col items-center gap-12 lg:gap-[62px]">
        <motion.div
          className="flex w-full max-w-[816px] flex-col items-center gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex h-[49px] w-[185px] items-center justify-center rounded-[34px] border-2 border-[#fcfcfc] bg-white p-1">
            <div className="flex h-full w-full items-center justify-center rounded-[30px] border border-[#d9e0e4]">
              <span className="font-serif text-base text-[#52666d]">
                AI for your business
              </span>
            </div>
          </div>
          <h1 className="max-w-[816px] font-serif text-[clamp(2.25rem,4vw,2.875rem)] leading-[1.2] font-normal text-[#082a35]">
            Use AI to turn your expertise into business growth.
          </h1>
        </motion.div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-[minmax(0,325px)_minmax(0,358px)_minmax(0,358px)]">
          <div className="grid gap-6 md:grid-rows-2">
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0, ease: EASE }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="relative flex h-[221px] flex-col justify-between overflow-hidden rounded-xl bg-[#43ac47] p-6 text-[#f2f2f2] cursor-default"
            >
              <Image
                src={`${businessAssets}/accent-shape.svg`}
                alt=""
                width={234}
                height={238}
                className="absolute -right-16 -top-16 rotate-[137deg] opacity-20"
              />
              <h2 className="relative font-serif text-2xl leading-8 font-normal">
                Solve Problems
              </h2>
              <div className="relative flex flex-col gap-2">
                <strong className="text-[32px] leading-8">24/7</strong>
                <span className="text-base leading-6">AI Guidance</span>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="flex h-[221px] flex-col justify-between rounded-xl bg-[#0c404e] p-6 text-[#f5f7f5] cursor-default"
            >
              <h2 className="font-serif text-2xl leading-8 font-normal text-[#c5d3d2]">
                Find Opportunities
              </h2>
              <div className="flex flex-col gap-2">
                <strong className="text-[32px] leading-8">10+</strong>
                <span className="text-base leading-6">Ways to Explore Growth</span>
              </div>
            </motion.article>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.24, ease: EASE }}
            whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
            className="relative h-[470px] overflow-hidden rounded-xl text-white cursor-default"
          >
            <Image
              src={`${businessAssets}/card-image-1.png`}
              alt="A craftsperson working in a workshop"
              fill
              sizes="(max-width: 768px) 100vw, 358px"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5, 33, 40, 0.1) 0%, rgba(5, 33, 40, 0.3) 48.56%, rgba(5, 33, 40, 0.9) 100%)" }} />
            <div className="absolute bottom-2 left-2 right-2 rounded-2xl border border-white/20 bg-white/15 backdrop-blur-md p-6">
              <p className="font-serif text-[1.125rem] leading-7 text-white">
                Use AI to plan better, communicate with customers, market your services, and handle everyday business tasks.
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.36, ease: EASE }}
            whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
            className="relative h-[470px] overflow-hidden rounded-xl bg-white cursor-default"
          >
            <p className="absolute left-8 top-36 z-10 max-w-[281px] text-base leading-6 text-[#52666d]">
              Use AI to examine what&apos;s happening in your business, identify
              challenges, and uncover areas where you can improve.
            </p>
            <div className="absolute bottom-1.5 left-1/2 h-[162px] w-[calc(100%-11px)] -translate-x-1/2 overflow-hidden rounded-xl">
              <Image
                src={`${businessAssets}/card-image-3.jpeg`}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 347px"
                className="object-cover"
              />
            </div>
            <div className="absolute left-8 top-8 flex items-start gap-3">
              <Image
                src={`${businessAssets}/accent-line-dark.svg`}
                alt=""
                width={2}
                height={64}
                className="h-16 w-0.5"
              />
              <h2 className="max-w-[208px] font-serif text-2xl leading-8 font-normal text-[#082a35]">
                Understand Your Business
              </h2>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
