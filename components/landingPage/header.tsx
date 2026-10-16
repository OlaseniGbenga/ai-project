"use client";

import Image from "next/image";
import { Box, Burger, Button, Drawer, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "How it works", href: "#how-it-works", id: "how-it-works" },
  { label: "Courses", href: "#courses", id: "courses" },
  { label: "FAQs", href: "#faqs", id: "faqs" },
];

const WAITLIST_URL =
  "https://efd0f7f8.sibforms.com/serve/MUIFAEMA76qjmVSSo2dpDtmBZN4Auwy8tCVTpcxjyZ7djhWfPWS1-ZXmPpYbeOsmz6M4ohJiR-QhS-j3UfLcFzTDEEvqaeztuVabh6NE6JdRN98a3vK0G-SEBoLSnU6YxKei07YcnJZVaAGkdS-RIhi2ZrC0lkw6Jipe128hE4JoC-zTudbPGwgEaFfQNLM9YX9FuKRVHxFLFdghUQ==";

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll-aware header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via intersection observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <Box
      className="px-4 md:px-15 py-5 sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(5, 33, 40, 0.92)"
          : "rgba(5, 33, 40, 1)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <header className="h-15">
        <Group justify="space-between" h="100%">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src="/homepage/Cuniv.svg"
              alt="Cuniv logo"
              width={120}
              height={40}
              priority
            />
          </motion.div>

          <Group className="text-white" h="100%" gap={20} visibleFrom="sm">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.id;
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium transition-colors"
                  style={{ color: isActive ? "#43ac47" : "rgba(255,255,255,0.8)" }}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: "easeOut" }}
                  whileHover={{ color: "#ffffff" } as never}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#43ac47]"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </Group>

          <Group visibleFrom="sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                component="a"
                href={WAITLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                bg="#43AC47"
                c="white"
                radius="11.3px"
                fw={500}
              >
                Waitlist
              </Button>
            </motion.div>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
            aria-label="Toggle navigation"
            color="#ffffff"
          />
        </Group>
      </header>

      <Drawer
        title={
          <Image
            src="/homepage/Cuniv.svg"
            alt="Cuniv logo"
            width={120}
            height={40}
            priority
          />
        }
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000000}
        styles={{
          content: { backgroundColor: "#082a35" },
          header: { backgroundColor: "#082a35" },
          close: { color: "#ffffff" },
        }}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <div className="flex flex-col gap-6 mt-6 px-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeDrawer}
                className="text-base font-medium text-white/80 hover:text-[#43ac47] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button
              component="a"
              href={WAITLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              bg="#43AC47"
              c="white"
              radius="11.3px"
              fw={500}
              className="w-full"
            >
              Waitlist
            </Button>
          </div>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
