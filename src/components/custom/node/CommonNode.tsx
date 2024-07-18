"use client";
import { Position, type NodeProps } from "reactflow";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import CustomHandle from "@/components/custom/node/options/Handle";
import AddNodeToolbar from "@/components/custom/node/options/AddNodeToolbar";
import { useNodeControl } from "@/hooks/useNodeControl";
import type { CustomNodeTypes } from "@/jotai/flow/panel";
import { useNodeEditorControl } from "@/hooks/useNodeEditorControl";

type CommonNodeProps = {
  type: CustomNodeTypes;
  className?: string;
  children: React.ReactNode;
} & NodeProps;

export default function Node(props: CommonNodeProps) {
  const { id, type, selected, dragging, children } = props;
  const { addNodeWithEdge } = useNodeControl(props);
  const { selectNodeId } = useNodeEditorControl();

  return (
    <div
      id={`node-type-${id}`}
      className={clsx(
        selected && "border-[3px]",
        "hover:border-[3px]",
        "border-2 rounded-md border-stone-500 shadow-lg bg-white",
        dragging
          ? "animate-grip shadow-2xl shadow-stone-950 cursor-grabbing"
          : "cursor-pointer",
        props.className
      )}
    >
      <div
        id={`node-type-${id}-header`}
        className={"flex bg-white rounded-t-md"}
      >
        <div
          className={clsx(
            "custom-drag-handle",
            "text-xs text-stone-400 flex-1",
            dragging ? "cursor-grabbing" : "cursor-grab"
          )}
        >
          <div className="p-2">TYPE: {type.toUpperCase()}</div>
        </div>
        <div className="text-stone-400 flex-none">
          <button
            type="button"
            className="hover:bg-slate-100 rounded-md p-1 m-1"
            onClick={() => {
              selectNodeId(id);
            }}
          >
            <PencilSquareIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        id={`node-type-${id}-content`}
        className="rounded-b-md bg-white px-4"
      >
        {children}
      </div>

      <>
        <CustomHandle type="source" position={Position.Top} id="top" />
        <CustomHandle type="source" position={Position.Right} id="right" />
        <CustomHandle type="target" position={Position.Left} id="left" />
        <CustomHandle type="target" position={Position.Bottom} id="bottom" />
      </>

      <>
        <AddNodeToolbar
          {...props}
          type={type}
          displayPosition={Position.Top}
          onClick={addNodeWithEdge}
        />
        <AddNodeToolbar
          {...props}
          displayPosition={Position.Right}
          onClick={addNodeWithEdge}
        />
        <AddNodeToolbar
          {...props}
          displayPosition={Position.Left}
          onClick={addNodeWithEdge}
        />
        <AddNodeToolbar
          {...props}
          displayPosition={Position.Bottom}
          onClick={addNodeWithEdge}
        />
      </>
    </div>
  );
}
