"use client";
import { HomeIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderProps = {
  className?: string | undefined;
};

export default function Header({ className }: HeaderProps) {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        "flex h-10 items-center px-5 space-x-2 border-b",
        "border-neutral-300 dark:border-neutral-500",
        "bg-neutral-100 text-neutral-600 ",
        "dark:bg-neutral-800 dark:text-neutral-100",
        className
      )}
    >
      <div className="flex-none">
        <Link href="/">
          <div
            className={clsx(
              "p-1.5 rounded-md",
              "dark:hover:bg-neutral-700 hover:bg-neutral-200",
              pathname === "/" ? "dark:bg-neutral-700 bg-neutral-200" : ""
            )}
          >
            <HomeIcon className="w-5 h-5" />
          </div>
        </Link>
      </div>
      <div>
        <Link href="/reactflow">
          <div
            className={clsx(
              "py-1 px-2 rounded-md",
              "dark:hover:bg-neutral-700 hover:bg-neutral-200",
              pathname === "/reactflow"
                ? "dark:bg-neutral-700 bg-neutral-200"
                : ""
            )}
          >
            White Board
          </div>
        </Link>
      </div>
    </div>
  );
}
