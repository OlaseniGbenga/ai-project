import { Download, Share2 } from "lucide-react";

export function CertificateHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-primary-700">Certificate</p>
        <h1 className="mt-1 text-2xl font-bold text-neutral-900">
          Your Achievement Certificate
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
          View, download, or share your learning achievement with your network.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-[10px] border border-primary-700 px-4 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2"
        >
          <Share2 aria-hidden="true" className="h-4 w-4" />
          Share
        </button>
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-[10px] bg-primary-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2"
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          Download
        </button>
      </div>
    </header>
  );
}