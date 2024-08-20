"use client";
import { useState } from "react";
import clsx from "clsx";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

import { useFlowStore } from "@/hooks/useFlowStore";
import NodeListItem from "./NodeListItem";

export default function NodeListSideView() {
  const [open, setOpen] = useState(false);

  const { nodes } = useFlowStore();

  return (
    <>
      {open && (
        <div
          className={clsx(
            "text-neutral-600 dark:text-neutral-200 flex flex-col border-l border-neutral-300",
            "bg-neutral-100 dark:bg-neutral-800",
            "dark:border-neutral-500 max-h-[calc(100vh-2.5rem)]"
          )}
        >
          <div className="relative w-56 flex flex-col h-full">
            <h3 className="text-lg font-semibold flex-1 border-b border-neutral-600 px-2">
              <div> Node Count : {nodes.length}</div>
            </h3>
            <div className="relative py-2 overflow-y-scroll scroll-smooth h-full">
              <div className="relative space-y-2 w-full full">
                {nodes?.map((node) => (
                  <NodeListItem
                    key={node.id}
                    type={node.type}
                    id={node.id}
                    label={node.data.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        type="button"
        className="dark:hover:bg-neutral-500 dark:bg-neutral-600 bg-neutral-400 hover:bg-neutral-300"
        onClick={() => setOpen(!open)}
      >
        <ChevronDoubleRightIcon
          className={clsx("w-3 h-3", open && "rotate-180")}
        />
      </button>
    </>
  );
}
