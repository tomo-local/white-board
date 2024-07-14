"use client";
import { Position, type NodeProps } from "reactflow";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import CustomHandle from "@/components/custom/CustomHandle";

type Props = {
  type: "markdown" | "normal";
  children: React.ReactNode;
} & Pick<NodeProps, "selected" | "dragging">;

export default function Node(props: Props) {
  return (
    <div
      className={clsx(
        props.selected && "border-[3px]",
        "hover:border-[3px]",
        "border-2 rounded-md border-stone-500 shadow-lg bg-white",
        props.dragging
          ? "animate-grip shadow-2xl shadow-stone-950 cursor-grabbing"
          : "cursor-pointer"
      )}
    >
      <div id="node-header" className={"flex bg-white rounded-t-md"}>
        <div
          className={clsx(
            "custom-drag-handle",
            "text-xs text-stone-400 flex-1",
            props.dragging ? "cursor-grabbing" : "cursor-grab"
          )}
        >
          <div className="p-2">TYPE: {props.type.toUpperCase()}</div>
        </div>
        <div className="text-stone-400 flex-none">
          <button
            type="button"
            className="hover:bg-slate-100 rounded-md p-1 m-1"
          >
            <PencilSquareIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="rounded-b-md bg-white px-4">{props.children}</div>

      <>
        <CustomHandle type="source" position={Position.Top} id="top" />
        <CustomHandle type="source" position={Position.Right} id="right" />
        <CustomHandle type="target" position={Position.Left} id="left" />
        <CustomHandle type="target" position={Position.Bottom} id="bottom" />
      </>
    </div>
  );
}
