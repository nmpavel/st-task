import type { FallbackProps } from "react-error-boundary";

const AppErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const errorMessage = error instanceof Error ? error.message : "Unknown error";

  return (
    <main className="grid min-h-screen place-items-center p-8">
      <section className="w-full max-w-[560px] rounded-2xl border border-red-200 bg-[linear-gradient(120deg,rgba(254,226,226,0.6),rgba(255,255,255,0.86))] p-5 shadow-[0_10px_30px_-20px_rgba(239,68,68,0.7)]">
        <h1 className="mb-2 text-xl font-semibold">
          Something went wrong
        </h1>
        <p className="mb-3 text-[var(--text-muted)]">
          An unexpected UI error occurred. You can retry rendering the page.
        </p>
        <pre className="mb-4 whitespace-pre-wrap text-[0.8rem] text-[var(--error)]">
          {errorMessage}
        </pre>
        <button
          className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-[0.95rem] font-medium text-white transition hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
          onClick={resetErrorBoundary}
        >
          Reload view
        </button>
      </section>
    </main>
  );
};

export default AppErrorFallback;
