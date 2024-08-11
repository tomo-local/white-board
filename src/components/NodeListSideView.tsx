"use client";
import { useState } from "react";
import clsx from "clsx";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

import { useFlowStore } from "@/hooks/useFlowStore";
import NodeListItem from "./custom/node/NodeListItem";

export default function NodeListSideView() {
  const [open, setOpen] = useState(false);

  const { nodes } = useFlowStore();

  return (
    <>
      {open && (
        <div
          className={clsx(
            "bg-stone-200 text-stone-600 flex flex-col border-l border-stone-300 h-full"
          )}
        >
          <div className="w-52 flex flex-col">
            <h3 className="text-lg font-semibold flex-1 border-b border-slate-600">
              <div> Node Count : {nodes.length}</div>
            </h3>
            <div className="relative py-2 w-full h-full overflow-y-scroll scroll-smooth">
              <div className="relative space-y-2 w-full">
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
        className="hover:bg-slate-400 bg-slate-500 "
        onClick={() => setOpen(!open)}
      >
        <ChevronDoubleRightIcon
          className={clsx("w-3 h-3", open && "rotate-180")}
        />
      </button>
    </>
  );
}
