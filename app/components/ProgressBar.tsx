export function ProgressBar({ percentage }: { percentage: number }) {
  const value = Math.min(100, Math.max(0, percentage));

  return (
    <div className="mb-8 h-2 overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-blue-600 transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
