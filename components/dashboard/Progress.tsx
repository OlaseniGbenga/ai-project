import { Box, Button, SimpleGrid, Stack, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

interface StatTileProps {
  label: string;
  value: string;
}

export interface ProgressStats {
  overallPercent: number;
  inProgressCount: number;
  completedCount: number;
  certificateCount: number;
}

interface ProgressProps {
  stats?: ProgressStats;
  latestCertificate?: {
    title: string;
    completedAt: string;
  } | null;
}

function StatTile({ label, value }: StatTileProps) {
  return (
    <Box
      className="relative min-h-[104px] overflow-hidden rounded-[12px] bg-white p-5 shadow-[0_1px_25px_0_rgba(0,0,0,0.03)]"
      aria-label={`${label}: ${value}`}
    >
      <Stack gap={8}>
        <Text
          c="#52666d"
          fz={14}
          lh={1.5}
          style={{ fontFamily: '"GFS Didot", "Times New Roman", serif' }}
        >
          {label}
        </Text>
        <Text
          c="#082a35"
          fz={28}
          fw={400}
          lh={1.4}
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          {value}
        </Text>
      </Stack>
    </Box>
  );
}

function Progress({
  stats: progressStats = {
    overallPercent: 0,
    inProgressCount: 0,
    completedCount: 0,
    certificateCount: 0,
  },
  latestCertificate = null,
}: ProgressProps) {
  const statItems = [
    { label: "Overall", value: `${progressStats.overallPercent}%` },
    { label: "In Progress", value: String(progressStats.inProgressCount) },
    { label: "Completed", value: String(progressStats.completedCount) },
    { label: "Certificates", value: String(progressStats.certificateCount) },
  ];

  return (
    <Box className="flex w-full flex-col gap-5 lg:max-w-[399px]">
      <Box className="rounded-[12px] border border-[rgba(51,51,51,0.10)] bg-white px-5 py-6 shadow-[0_1px_25px_0_rgba(0,0,0,0.03)] sm:px-7 sm:py-8">
        <Text
          c="#082a35"
          fz={20}
          fw={400}
          lh={1.4}
          mb={24}
          style={{ fontFamily: '"GFS Didot", "Times New Roman", serif' }}
        >
          Your Progress
        </Text>

        <SimpleGrid cols={{ base: 2 }} spacing={10}>
          {statItems.map((statItem) => (
            <StatTile
              key={statItem.label}
              label={statItem.label}
              value={statItem.value}
            />
          ))}
        </SimpleGrid>
      </Box>

      <Box
        style={{
          backgroundImage: "url('/latestCertBg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}
        className="overflow-hidden rounded-[12px] bg-[#0c404e] px-[30px] py-[30px] shadow-[0_4px_16px_0_rgba(15,23,42,0.06)]"
      >
        <div className="relative min-h-[130px] rounded">
          <Stack gap={24} className="relative z-10 max-w-[290px] pt-[6px]">
            <Text
              c="#f5f7f5"
              fz={24}
              fw={400}
              lh={1}
              style={{
                fontFamily: '"GFS Didot", "Times New Roman", serif',
                letterSpacing: "-0.48px",
              }}
            >
              Your Certificates
            </Text>

            <Text
              c="#c5d3d2"
              fz={16}
              lh={1.5}
              style={{
                letterSpacing: "-0.32px",
                fontFamily: '"Inter", sans-serif',
              }}
            >
              {latestCertificate
                ? `${latestCertificate.title} Completed ${latestCertificate.completedAt}`
                : "Complete your first course to unlock a certificate."}
            </Text>

            <Button
              component={Link}
              href="/certificate"
              variant="subtle"
              size="compact-md"
              disabled={!latestCertificate}
              className="h-auto w-fit p-0 text-[#43ac47] transition-colors hover:text-[#5ed36a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43ac47] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c404e]"
              rightSection={
                <Image src="/moveright.svg" alt="" width={24} height={24} />
              }
              styles={{
                root: {
                  background: "transparent",
                  padding: 0,
                  height: "auto",
                },
                label: {
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "24px",
                },
              }}
            >
              {latestCertificate ? "View Certificate" : "No Certificate Yet"}
            </Button>
          </Stack>
        </div>
      </Box>
    </Box>
  );
}

export default Progress;
