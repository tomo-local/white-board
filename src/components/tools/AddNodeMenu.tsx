import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import {
  ChevronDownIcon,
  DocumentIcon,
  PlusIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

import MarkdownIcon from "@/components/common/icons/MarkdownIcon";
import { useFlowStore } from "@/hooks/useFlowStore";
import type { CustomNodeType } from "@/types/flow";

export default function AddNodeMenu() {
  const { addNode } = useFlowStore();

  const handleAddNode = (type: CustomNodeType) => {
    const randomX = Math.floor(Math.random() * 100);
    const randomY = Math.floor(Math.random() * 100);

    addNode(type, { x: randomX, y: randomY });
  };

  return (
    <Menu>
      <MenuButton
        type="button"
        className={clsx(
          "flex items-center justify-center",
          "p-2 space-x-1 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-500",
          "focus:outline-none active:outline-none",
          "data-[active]:bg-neutral-300 dark:data-[active]:bg-neutral-500 group"
        )}
      >
        <PlusIcon className="size-5" />
        <ChevronDownIcon className="size-4 group-data-[active]:rotate-180" />
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="flex bg-neutral-100 dark:bg-neutral-700 p-1 my-2 rounded-md hover:ring-2 ring-neutral-400 dark:ring-neutral-500"
      >
        <MenuItem>
          <button
            type="button"
            className={clsx(
              "flex items-center justify-center",
              "p-2 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-500"
            )}
            onClick={() => handleAddNode("markdown")}
          >
            <MarkdownIcon className="w-5 h-5 -mt-1 dark:fill-neutral-100 fill-neutral-500" />
          </button>
        </MenuItem>
        <MenuItem>
          <button
            type="button"
            className={clsx(
              "flex items-center justify-center",
              "text-neutral-500 dark:text-neutral-200",
              "p-2 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-500"
            )}
            onClick={() => handleAddNode("memo")}
          >
            <DocumentIcon className="size-5" />
          </button>
        </MenuItem>
        <MenuItem>
          <button
            type="button"
            className={clsx(
              "flex items-center justify-center",
              "text-neutral-500 dark:text-neutral-200",
              "p-2 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-500"
            )}
            onClick={() => handleAddNode("table")}
          >
            <TableCellsIcon className="size-5" />
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
