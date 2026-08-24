import Image from "next/image";
import type { CertificateData, CertificateMetaProps } from "../../auth/types/certificate.types";

export function CertificatePreview({
  certificateId,
  holderName,
  trade,
  completionDate,
  issuedAt,
}: Pick<CertificateData, "certificateId" | "holderName" | "trade" | "completionDate" | "issuedAt">) {
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <article className="rounded-[16px] bg-white p-4 shadow-sm sm:p-6">
      <div className="relative overflow-hidden rounded-[14px] border-[8px] border-primary-700 bg-[#fffdf7] px-5 py-10 text-center sm:border-[10px] sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute inset-4 rounded-[10px] border border-primary-700/25" />
        <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-primary-50" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-52 w-52 rounded-full bg-primary-50" />

        <div className="relative mx-auto flex max-w-2xl flex-col items-center">
          <Image
            src="/logo.svg"
            alt="Segsalerty logo"
            width={118}
            height={40}
            className="h-auto w-[118px]"
          />

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.35em] text-primary-700">
            Certificate of Completion
          </p>
          <h2 className="mt-5 text-3xl font-bold text-neutral-900 sm:text-5xl">
            {holderName}
          </h2>
          <p className="mt-5 text-sm md:text-base leading-6 text-neutral-700">
            {/* has successfully completed the learning path in */}
            has successfully completed the
          </p>
          <p className="mt-3 max-w-xl text-xl font-bold text-primary-700 sm:text-2xl">
            {/* {trade} */}
            AI-Powered Learning Path
          </p>

          <div className="mt-10 grid w-full gap-5 border-t border-neutral-200 pt-6 text-left sm:grid-cols-3">
            <CertificateMeta label="Completion Date" value={formatDate(completionDate)} />
            <CertificateMeta label="Issued Date" value={formatDate(issuedAt)} />
            <CertificateMeta label="Certificate ID" value={certificateId} />
          </div>
        </div>
      </div>
    </article>
  );
}

function CertificateMeta({ label, value }: CertificateMetaProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-neutral-900">{value}</p>
    </div>
  );
}
