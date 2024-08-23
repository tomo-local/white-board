import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { COMMON_CLASS } from "@/components/common/button/IconButton";

export default function ThemeSelector() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, themes, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="rounded p-2">
        <div className="size-5" />
      </div>
    );
  }

  return (
    <Menu>
      <MenuButton
        aria-label="カラーテーマを選択する"
        type="button"
        className={clsx(
          COMMON_CLASS,
          "p-1.5 rounded-md",
          "dark:hover:bg-neutral-700 hover:bg-neutral-200"
        )}
      >
        {resolvedTheme === "light" ? (
          <SunIcon className="size-5" />
        ) : (
          <MoonIcon className="size-5" />
        )}
      </MenuButton>
      <MenuItems
        as="div"
        transition
        anchor="bottom end"
        className={clsx(
          "overflow-hidden rounded border bg-white shadow-sm",
          "bg-neutral-200 text-neutral-500 dark:text-neutral-100",
          "dark:border-neutral-500 dark:bg-neutral-700",
          "origin-top-right"
        )}
      >
        {themes.map((item) => (
          <MenuItem
            as={"div"}
            className={clsx(
              "group flex items-center gap-2 rounded  m-1 py-1.5 px-3 ",
              "data-[focus]:bg-neutral-200 dark:data-[focus]:bg-neutral-500",
              item === theme && "bg-neutral-200 dark:bg-neutral-500"
            )}
            key={item}
            onClick={() => setTheme(item)}
          >
            {item === "light" ? (
              <SunIcon className="size-5" />
            ) : item === "system" ? (
              <ComputerDesktopIcon className="size-5" />
            ) : (
              <MoonIcon className="size-5" />
            )}
            <span className="capitalize">{item}</span>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
