import type { CertificateStatCardProps } from "../../auth/types/certificate.types";

export function CertificateStatCard({
  icon: Icon,
  label,
  value,
}: CertificateStatCardProps) {
  return (
    <div className="rounded-[12px] bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-neutral-500">{label}</p>
          <p className="mt-1 text-lg font-bold text-neutral-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
