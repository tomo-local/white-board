import clsx from "clsx";

type PointBadgeProps = {
  active?: boolean;
  className?: string;
};

export default function PointBadge({ active, className }: PointBadgeProps) {
  return (
    <div className={clsx("flex", className)}>
      {active && (
        <span className="absolute animate-ping h-full w-full rounded-full opacity-75 bg-neutral-600 dark:bg-neutral-100"/>
      )}
      <span className="relative inline-flex rounded-full w-full h-full bg-neutral-600 dark:bg-neutral-100"/>
    </div>
  );
}
