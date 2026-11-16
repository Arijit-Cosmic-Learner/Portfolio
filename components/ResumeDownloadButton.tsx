"use client";

export function ResumeDownloadButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg shadow-sm transition hover:bg-accent print:hidden"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download PDF
    </button>
  );
}
