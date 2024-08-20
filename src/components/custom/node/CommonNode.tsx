"use client";
import { Position, type NodeProps } from "@xyflow/react";
import { clsx } from "clsx";

import CustomHandle from "@/components/custom/node/options/Handle";
import AddNodeToolbar from "@/components/custom/node/options/AddNodeButton";
import PointBadge from "@/components/common/badge/PointBadge";

import { useNodeControl } from "@/hooks/useNodeControl";
import type { CustomNodeTypes } from "@/jotai/flow/panel";

type CommonNodeProps = {
  type: CustomNodeTypes;
  editing?: boolean;
  className?: string;
  isConnectable?: boolean;
  children: React.ReactNode;
  onDoubleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
} & NodeProps;

export default function Node(props: CommonNodeProps) {
  const {
    id,
    type,
    selected,
    dragging,
    children,
    isConnectable,
    className,
    editing,
    onDoubleClick,
  } = props;
  const { addNodeWithEdge } = useNodeControl(props);

  return (
    <main
      id={`note-type-${type}-${id}`}
      className={clsx(
        "relative group",
        "custom-drag-handle",
        "bg-neutral-100 dark:bg-neutral-600",
        "border-2 border-neutral-500 dark:border-neutral-700 border-inherit",
        "hover:border-3 hover:border-neutral-500 dark:hover:border-neutral-500",
        dragging
          ? "animate-grip shadow-2xl shadow-neutral-500 dark:shadow-neutral-600 cursor-grabbing"
          : "cursor-pointer",
        className
      )}
      onDoubleClick={onDoubleClick}
    >
      <div className="absolute -left-2 -top-2 z-10">
        {editing && <PointBadge active className="w-4 h-4" />}
      </div>

      <main className="h-full w-full">{children}</main>

      {isConnectable && (
        <>
          <CustomHandle type="source" position={Position.Top} id="top" />
          <CustomHandle type="source" position={Position.Right} id="right" />
          <CustomHandle type="target" position={Position.Left} id="left" />
          <CustomHandle type="target" position={Position.Bottom} id="bottom" />
        </>
      )}

      {isConnectable && (
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
      )}
    </main>
  );
}
