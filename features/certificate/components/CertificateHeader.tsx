import { Download, Loader2 } from "lucide-react";

interface CertificateHeaderProps {
  onDownload: () => void;
  isDownloading: boolean;
}

export function CertificateHeader({ onDownload, isDownloading }: CertificateHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-primary-700">Certificate</p>
        <h1 className="mt-1 text-2xl font-bold text-neutral-900">
          Your Achievement Certificate
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
          View or download your learning achievement certificate.
        </p>
      </div>

      <button
        type="button"
        onClick={onDownload}
        disabled={isDownloading}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-[10px] bg-primary-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 disabled:opacity-60 cursor-pointer"
      >
        {isDownloading ? (
          <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
        ) : (
          <Download aria-hidden="true" className="h-4 w-4" />
        )}
        {isDownloading ? "Downloading…" : "Download"}
      </button>
    </header>
  );
}
