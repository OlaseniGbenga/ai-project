"use client";

import Image from "next/image";
import { Box, Burger, Button, Drawer, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box className="bg-[#052128] px-2.5 md:px-15 py-5">
      <header className="h-15">
        <Group justify="space-between" h="100%">
          <Image
            src="/homepage/Cuniv.svg"
            alt="Cuniv logo"
            width={120}
            height={40}
            priority
          />
          <Group className="text-white" h="100%" gap={20} visibleFrom="sm">
            <a href="#how-it-works">How it works</a>
            <a href="#courses">Courses</a>
            <a href="#faqs">FAQs</a>
          </Group>
          <Group visibleFrom="sm">
            <Button bg="#43AC47" c="white" radius="11.3px" fw={400}>
              Waitlist
            </Button>
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
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <div className="flex flex-col gap-4 mt-4">
            <a href="#how-it-works" onClick={closeDrawer}>
              How it works
            </a>
            <a href="#courses" onClick={closeDrawer}>
              Courses
            </a>
            <a href="#faqs" onClick={closeDrawer}>
              FAQs
            </a>
            <Button bg="#43AC47" c="white" radius="11.3px" fw={600}>
              Wait list
            </Button>
          </div>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
