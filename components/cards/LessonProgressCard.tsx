import { Box, Button, Group, Stack, Text } from "@mantine/core";
import lessonImageTailor from "@/public/tailor-cutting-dress.webp";
//import moveRightIcon from "@/public/assets/icons/move-right.svg";
// import clockIcon from "@/public/assets/icons/clock.svg";
import Image from "next/image";
// const awardIcon =
//   "./assets/icons/award.svg";

interface LessonProgressCardProps {
  loading?: boolean;
  disabled?: boolean;
  onResumeLesson?: () => void;
  title?: string;
  summary?: string;
  completedPercent?: number;
  durationMinutes?: number;
  totalLessons?: number;
  completedLessons?: number;
  lessonImage?: string;
}

function LessonProgressCard({
  loading = false,
  disabled = false,
  onResumeLesson,
  title = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.",
  completedPercent = 0,
  durationMinutes = 0,
  totalLessons = 0,
  completedLessons = 0,
  lessonImage = lessonImageTailor.src,
}: LessonProgressCardProps) {
  const fillPercent = Math.max(0, Math.min(100, completedPercent));
  return (
    // className="mx-auto flex max-w-[1060px] flex-col gap-6 lg:flex-row lg:items-start
    <Box
      className="w-full overflow-hidden rounded-[12px] border border-[#e7ece8] bg-white shadow-[0_4px_16px_0_rgba(15,23,42,0.06)] lg:max-w-[627px] "
      aria-label="Current lesson card"
    >
      <div className="relative h-[305px] overflow-hidden bg-[#d9d9d9]">
        <Image
          src={lessonImage}
          alt="Fashion design lesson"
          fill={true}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,33,40,0.18)] via-[rgba(5,33,40,0.06)] to-[rgba(5,33,40,0.40)]" />
      </div>

      <Box
        className="px-6 pb-6 pt-7"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        <Text
          c="#52666d"
          fz={16}
          lh={1.5}
          maw={474}
          style={{ letterSpacing: "-0.32px" }}
        >
          {title}
        </Text>

        <Stack gap={4} mt={28}>
          <Group justify="space-between" align="center" wrap="nowrap" gap={12}>
            <Text
              c="#42616a"
              fz={12}
              fw={400}
              lh={1.67}
              style={{ letterSpacing: "-0.24px" }}
            >
              {`${completedPercent}% Complete (${completedLessons} of ${totalLessons} lessons)`}
            </Text>

            <Group gap={4} wrap="nowrap" align="center">
              <Box className="flex h-[11px] w-[11px] items-center justify-center">
                <Image
                  src="/clock.svg"
                  alt="Clock icon"
                  width={11}
                  height={11}
                />
              </Box>
              <Text
                c="#42616a"
                fz={12}
                lh={1.67}
                style={{ letterSpacing: "-0.24px" }}
              >
                {`${durationMinutes} min`}
              </Text>
            </Group>
          </Group>

          <Box className="relative h-[26px] w-full overflow-hidden rounded-[4px] border border-white bg-[#dfece8]">
            <div
              className="absolute inset-y-0 left-0 rounded-r-[4px] bg-[#00663b]"
              style={{ width: `${fillPercent}%` }}
            />
            <Text
              c="white"
              fw={500}
              size="xs"
              className="absolute left-2 top-1/2 -translate-y-1/2"
              style={{
                fontFamily: '"Bricolage Grotesque", "Inter", sans-serif',
                letterSpacing: "-0.36px",
                lineHeight: 1.25,
              }}
            >
              {`${completedPercent}%`}
            </Text>

            <div className="absolute inset-0 flex items-center justify-between px-[6px] opacity-100">
              {Array.from({ length: 32 }).map((_, index) => (
                <span
                  key={index}
                  className="block h-[18px] w-[3px] rounded-[12px] bg-[#43ac47] opacity-10"
                />
              ))}
            </div>
          </Box>
        </Stack>

        <Button
          aria-label="Resume lesson"
          onClick={onResumeLesson}
          disabled={loading || disabled}
          loading={loading}
          variant="filled"
          size="lg"
          radius={11.38}
          mt={24}
          w={"100%"}
          justify="center"
          className="h-[56px] border-0 bg-[#43ac47] text-base font-semibold text-white transition-all duration-200 hover:bg-[#3a9a40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43ac47] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#7dbf82]"
          rightSection={
            <Image
              src="/moveright.svg"
              alt="Clock icon"
              width={24}
              height={24}
            />
          }
          styles={{
            root: {
              boxShadow: "none",
              borderRadius: "11.38px",
              paddingLeft: "24px",
              paddingRight: "24px",
            },
            inner: { justifyContent: "center" },
            label: {
              fontFamily: '"Inter", sans-serif',
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "-0.32px",
            },
          }}
        >
          Resume Lesson
        </Button>
      </Box>
    </Box>
  );
}

export default LessonProgressCard;
