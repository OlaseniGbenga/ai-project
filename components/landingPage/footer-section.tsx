"use client";

import Image from "next/image";
import { Button } from "@mantine/core";
import { FormEvent, useState } from "react";

const assetPath = "/homepage/footer";

const footerLinks = [
  {
    title: "Product",
    links: ["Courses", "AI Assistant", "Dashboard", "How It Works"],
  },
  { title: "Company", links: ["About Us", "Contact Us", "FAQs"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
];

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <footer className="relative min-h-[900px] overflow-hidden bg-[#052128] px-6 pb-10 pt-24 sm:px-10 lg:min-h-[1100px] lg:px-20 lg:pt-[235px]">
      <Image
        src={`${assetPath}/rule-pattern.svg`}
        alt=""
        width={1200}
        height={46}
        className="absolute left-1/2 top-24 h-[46px] w-[min(1200px,calc(100%-48px))] -translate-x-1/2 opacity-70 lg:top-[235px]"
      />
      <Image
        src={`${assetPath}/background-flourish.svg`}
        alt=""
        width={1450}
        height={360}
        className="pointer-events-none absolute left-1/2 top-[310px] w-[1200px] max-w-none -translate-x-1/2 rotate-[31deg] opacity-70 lg:top-[390px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[764px] flex-col items-center gap-10 text-center lg:gap-[42px]">
        <div className="flex w-full flex-col items-center gap-6">
          <h2 className="font-serif text-[clamp(2.25rem,5vw,3rem)] leading-[1.17] text-[#f5f7f5]">
            Discover how AI can help you work smarter, make better decisions,
            and <em className="text-[#43ac47]">grow</em>.
          </h2>
          <p className="max-w-[584px] text-base leading-normal text-[#c5d3d2]">
            Bring AI into your everyday work and discover practical ways to
            solve challenges, make better decisions, and uncover new
            opportunities for your business.
          </p>
        </div>
        <Button
          component="a"
          href="#top"
          radius="md"
          className="h-[70px] w-[229px] bg-white! text-xl font-medium tracking-[-0.025em] text-[#333]! hover:bg-[#f5f7f5]"
        >
          Get Started
        </Button>
      </div>

      <div className="relative z-10 mx-auto mt-20 flex w-full max-w-[1074px] flex-col rounded-2xl bg-white px-7 py-10 sm:px-10 lg:mt-[300px] lg:px-[55px] lg:py-[70px]">
        <div className="flex flex-col gap-10 lg:gap-[47px]">
          <Image
            src={`${assetPath}/brand-dot.svg`}
            alt="Cuniv"
            width={31}
            height={31}
            className="h-[31px] w-[31px]"
          />

          <div className="flex flex-col gap-10 lg:gap-[42px]">
            <div className="flex flex-col gap-10 lg:flex-row lg:gap-[118px]">
              <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-[390px] flex-col gap-8"
              >
                <p className="text-xs font-medium leading-5 tracking-[-0.03em] text-[#42616a]">
                  Practical AI guidance to help you work smarter, solve business
                  challenges, and discover new opportunities.
                </p>
                <label className="sr-only" htmlFor="footer-email">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setSubmitted(false);
                  }}
                  placeholder="aniebiet@mail.com"
                  className="h-[52px] rounded-[5px] bg-[#edf2f6] px-6 text-base tracking-[-0.05em] text-[#082a35] outline-none placeholder:text-[#082a35] focus:ring-2 focus:ring-[#43ac47]"
                  required
                />
                <Button
                  type="submit"
                  radius="sm"
                  className="h-12 w-40 bg-[#829093]! text-base font-medium text-[#f5f5f5]! hover:bg-[#6f7c7f]!"
                >
                  {submitted ? "Subscribed" : "Subscribe"}
                </Button>
              </form>

              <nav
                className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-[51px]"
                aria-label="Footer navigation"
              >
                {footerLinks.map((group) => (
                  <div key={group.title} className="flex flex-col gap-1">
                    <h3 className="font-serif text-base leading-6 text-[#082a35]">
                      {group.title}
                    </h3>
                    <div className="flex flex-col gap-1 text-[11px] leading-[19px] text-[#52666d]">
                      {group.links.map((link) => (
                        <a key={link} href="#" className="hover:underline">
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            <Image
              src={`${assetPath}/divider.svg`}
              alt=""
              width={960}
              height={1}
              className="h-px w-full"
            />

            <div className="flex flex-col items-start justify-between gap-4 text-xs text-[#595959] sm:flex-row sm:items-center">
              <p>© 2026 Cuniv. All rights reserved.</p>

              <div className="flex gap-4 ">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/cuniv.ai?igsh=aDFiOHNkbDZqdnU0&utm_source=qr"
                  className=""
                >
                  <Image
                    src={`${assetPath}/instagram.svg`}
                    alt="Social media links"
                    width={4}
                    height={4}
                    className="h-4 w-4"
                  />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://web.facebook.com/profile.php?id=61591711206126"
                  className=""
                >
                  <Image
                    src={`${assetPath}/twitter.svg`}
                    alt="Social media links"
                    width={4}
                    height={4}
                    className="h-4 w-4"
                  />
                </a>

                 
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
