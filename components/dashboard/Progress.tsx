import { Box, Button, Group, SimpleGrid, Stack, Text } from "@mantine/core";

interface StatTileProps {
  label: string;
  value: string;
  className?: string;
}

function StatTile({ label, value, className }: StatTileProps) {
  return (
    <Box
      className={
        "relative h-[115px] w-[149px] overflow-hidden rounded-[12px] bg-white shadow-[0_1px_25px_0_rgba(0,0,0,0.03)]"
      }
    >
      <Stack
        gap={8}
        className="absolute left-1/2 top-[calc(50%-0.5px)] w-[85px] -translate-x-1/2 -translate-y-1/2"
      >
        <Text
          c="#52666d"
          fz={16}
          lh={1.5}
          style={{ fontFamily: '"GFS Didot", "Times New Roman", serif' }}
        >
          {label}
        </Text>
        <Text
          c="#082a35"
          fz={32}
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

function Progress() {
  const stats = [
    { label: "Overall", value: "51%" },
    { label: "In Progress", value: "51%" },
    { label: "Completed", value: "51%" },
    { label: "Certificates", value: "51%" },
  ];
  return (
    <Box className="w-full lg:max-w-[399px] flex flex-col gap-[20px]">
      <Box className="rounded-[12px] border border-[rgba(51,51,51,0.10)] bg-white px-[28px] py-[34px] shadow-[0_1px_25px_0_rgba(0,0,0,0.03)]">
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

        <SimpleGrid cols={2} spacing={8}>
          {stats.map((stat) => (
            <StatTile key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </SimpleGrid>
      </Box>

      <Box
        style={{
          backgroundImage: "url('/latestCertBg.jpg')",
          backgroundSize: "cover",
          backgroundPosition:"right"
        }}
        className=" overflow-hidden rounded-[12px] bg-[#0c404e] px-[30px] py-[30px] shadow-[0_4px_16px_0_rgba(15,23,42,0.06)]"
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
              Fashion Design Fundamentals Completed August 2026
            </Text>

            <Button
              variant="subtle"
              size="compact-md"
              className="h-auto w-fit p-0 text-[#43ac47] transition-colors hover:text-[#5ed36a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43ac47] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c404e]"
              rightSection={
                <img src={"/moveright.svg"} alt="" className="h-6 w-6" />
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
              View Certificate
            </Button>
          </Stack>
        </div>
      </Box>
    </Box>
  );
}

export default Progress;
