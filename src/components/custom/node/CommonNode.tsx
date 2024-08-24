"use client";
import { Position, type NodeProps } from "@xyflow/react";
import { clsx } from "clsx";

import CustomHandle from "@/components/custom/node/options/Handle";
import AddNodeButton from "@/components/custom/node/options/AddNodeButton";
import PointBadge from "@/components/common/badge/PointBadge";

import { useNodeControl } from "@/hooks/useNodeControl";
import type { CustomNodes, CustomNodeTypes } from "@/types/flow";

type CommonNodeProps = {
  type: CustomNodeTypes;
  editing?: boolean;
  className?: string;
  isConnectable?: boolean;
  children: React.ReactNode;
  onDoubleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
} & NodeProps<CustomNodes>;

export default function Node(props: CommonNodeProps) {
  const {
    id,
    type,
    dragging,
    children,
    isConnectable,
    className,
    editing,
    selected,
    onDoubleClick,
  } = props;
  const { addNodeWithEdge } = useNodeControl();

  return (
    <main
      id={`note-type-${type}-${id}`}
      className={clsx(
        "group",
        "custom-drag-handle",
        "bg-neutral-100 dark:bg-neutral-600",
        "border-2 border-neutral-500 dark:border-neutral-700 border-inherit",
        "hover:border-3 hover:border-neutral-500 dark:hover:border-neutral-500",
        dragging
          ? "animate-grip shadow-2xl shadow-neutral-500 dark:shadow-neutral-600 cursor-grabbing"
          : "cursor-grab",
        className
      )}
      onDoubleClick={onDoubleClick}
    >
      <div className="absolute -left-2 -top-2 z-10">
        {editing && <PointBadge active className="w-4 h-4" />}
      </div>

      <main className="h-full w-full">{children}</main>

      {isConnectable && (
        <div
          className={clsx(
            selected ? "opacity-100" : "opacity-0",
            "group-hover:opacity-100"
          )}
        >
          <CustomHandle type="source" position={Position.Top} id="top" />
          <CustomHandle type="source" position={Position.Right} id="right" />
          <CustomHandle type="target" position={Position.Left} id="left" />
          <CustomHandle type="target" position={Position.Bottom} id="bottom" />
        </div>
      )}

      {isConnectable && (
        <>
          <AddNodeButton
            {...props}
            type={type}
            displayPosition={Position.Top}
            onClick={addNodeWithEdge}
          />
          <AddNodeButton
            {...props}
            displayPosition={Position.Right}
            onClick={addNodeWithEdge}
          />
          <AddNodeButton
            {...props}
            displayPosition={Position.Left}
            onClick={addNodeWithEdge}
          />
          <AddNodeButton
            {...props}
            displayPosition={Position.Bottom}
            onClick={addNodeWithEdge}
          />
        </>
      )}
    </main>
  );
}
