import { truncateString } from "@/utils";
import { Anchor, Badge, Box, Group, Paper, Stack, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const courseImage =
  "https://www.figma.com/api/mcp/asset/415e4ed1-9bbd-474d-9c44-7e9297e5a453.png";
const dividerLine =
  "https://www.figma.com/api/mcp/asset/6cf4be0e-ea6d-4d28-bdfd-170c77220b94.svg";
const clockIcon =
  "https://www.figma.com/api/mcp/asset/38ae0e50-0e64-4a8f-8510-ddda2540c1db.svg";

export interface CourseCardItem {
  id?: string;
  title?: string;
  desc?: string;
  level?: string;
  progressPercent?: number;
  completedLessons?: number;
  totalLessons?: number;
  durationMinutes?: number;
  image?: string;
  Modules?: number;
}

interface CourseCardProps extends CourseCardItem {
  loading?: boolean;
  disabled?: boolean;
}

function CourseCard({
  title = "Professional Sewing Techniques",
  desc ,
  level = "Beginner",
  progressPercent,
  completedLessons,
  totalLessons,
  durationMinutes = 8,
  image = courseImage,
  loading = false,
  disabled = false,
  Modules,
}: CourseCardProps) {
  return (
    <Paper
      withBorder
      radius={12}
      bg="white"
      className=" relative w-[334px] overflow-hidden border border-[rgba(51,51,51,0.10)] shadow-none"
      aria-label={title}
      data-disabled={disabled || loading}
    >
      <Box className="relative h-[213px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover object-center"
        />
        <Box className="absolute inset-0 bg-gradient-to-b from-[rgba(5,33,40,0.15)] via-[rgba(5,33,40,0.05)] to-[rgba(5,33,40,0.4)]" />
      </Box>

      <Stack p={16} gap={20}>
        <Badge
          variant="light"
          color="green.6"
          radius="xl"
          size="sm"
          className="w-fit border-0 bg-[rgba(67,172,71,0.08)] px-[9.865px] py-[2.466px] text-[10px] font-medium text-[#43ac47]"
          styles={{
            root: { height: "auto", minHeight: 0 },
            label: {
              fontFamily: '"Inter", sans-serif',
              letterSpacing: "-0.1px",
              lineHeight: 1.2,
              fontSize: "5.755px",
            },
          }}
        >
          {level}
        </Badge>

        <Text
          c="#082a35"
          fz={16}
          fw={400}
          lh={1.5}
          style={{
            fontFamily: '"GFS Didot", "Times New Roman", serif',
            letterSpacing: "-0.32px",
          }}
        >
          {title}
        </Text>
        <div>
          {" "}
          {desc && (
            <Text
              c="#42616a"
              fz={12}
              lh={1.5}
              style={{ letterSpacing: "-0.28px" }}
            >
              {/* {desc} */}
              {truncateString(desc, 95)}
            </Text>
          )}
          <Box className="relative h-0 w-full">
            <Image
              src={dividerLine}
              alt=""
              width={260}
              height={1}
              className="block h-px w-full"
            />
          </Box>
        </div>

        <Group
          // justify="space-between"
          align="center"
          wrap="wrap"
          gap={16}
          className="w-full"
        >
          {Modules && (
            <Text
              c="#42616a"
              fz={12}
              lh={1.67}
              style={{ letterSpacing: "-0.24px" }}
            >
              {`${Modules} Modules`}
            </Text>
          )}

          {progressPercent  &&
            completedLessons  &&
            totalLessons  && (
              <Text
                c="#42616a"
                fz={12}
                fw={400}
                lh={1.67}
                style={{ letterSpacing: "-0.24px" }}
              >
                {`${progressPercent}% Complete (${completedLessons} of ${totalLessons} lessons)`}
              </Text>
            )}

          <Group gap={4} wrap="nowrap" align="center">
            <Box className="flex h-[11px] w-[11px] items-center justify-center">
              <Image src={clockIcon} alt="" width={11} height={11} />
            </Box>
            {durationMinutes && (
              <Text
                c="#42616a"
                fz={12}
                lh={1.67}
                style={{ letterSpacing: "-0.24px" }}
              >
                {`${durationMinutes} min`}
              </Text>
            )}
          </Group>
        </Group>
        {/* <Link className="flex gap-2 font-semibold text-[#43AC47]" href="https://mantine.dev/" target="_blank" underline="always">
          Underline always
          <Image
            src="/move-right-green.svg"
            alt="move righticon"
            width={24}
            height={24}
          />
        </Link> */}
      </Stack>
    </Paper>
  );
}

interface PickedForYouSectionProps {
  title?: string;
  subtitle?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  items?: CourseCardItem[];
}

export default function PickedForYouSection({
  title = "Picked For You",
  subtitle = "Foundational AI skills for every professional.",
  viewAllLabel = "View All",
  viewAllHref = "#",
  items = [
    {
      title: "Professional Sewing Techniques",
      level: "Beginner",
      progressPercent: 35,
      completedLessons: 3,
      totalLessons: 12,
      durationMinutes: 8,
    },
    {
      title: "Professional Sewing Techniques",
      level: "Beginner",
      progressPercent: 35,
      completedLessons: 3,
      totalLessons: 12,
      durationMinutes: 8,
    },
    {
      title: "Professional Sewing Techniques",
      level: "Beginner",
      progressPercent: 35,
      completedLessons: 3,
      totalLessons: 12,
      durationMinutes: 8,
    },
  ],
}: PickedForYouSectionProps) {
  return (
    <Box className="w-full max-w-[1100px]">
      <Stack gap={4} className="w-full">
        <Text
          c="#082a35"
          fz={32}
          fw={400}
          lh={1.4}
          style={{ fontFamily: '"GFS Didot", "Times New Roman", serif' }}
        >
          {title}
        </Text>

        <Group
          justify="space-between"
          align="center"
          className="w-full"
          wrap="nowrap"
        >
          <Text
            c="#52666d"
            fz={16}
            fw={400}
            lh={1.5}
            style={{ letterSpacing: "-0.32px" }}
          >
            {subtitle}
          </Text>

          <Anchor
            href={viewAllHref}
            c="#43ac47"
            fz={16}
            fw={600}
            lh={1.5}
            className="shrink-0 no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43ac47] focus-visible:ring-offset-2"
          >
            {viewAllLabel}
          </Anchor>
        </Group>
      </Stack>

      <Group
        gap={24}
        align="flex-start"
        className="mt-6 flex-wrap lg:flex-nowrap"
      >
        {items.map((item, index) => (
          <CourseCard key={`${item.title}-${index}`} {...item} />
        ))}
      </Group>
    </Box>
  );
}

export { CourseCard };
