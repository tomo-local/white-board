"use client";
import type { ChangeEvent } from "react";
import { Position, type NodeProps } from "reactflow";

import CustomHandle from "@/components/custom/CustomHandle";
import { useNodeControl } from "@/hooks/useNodeControl";

type NodeData = {
  label: string;
};

export default function MarkdownNode(props: NodeProps<NodeData>) {
  const { data, onChange, onSave } = useNodeControl(props);

  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, data: { label: e.target.value } });
  };

  return (
    <>
      <div
        className={`px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-500 text-black ${
          props.selected ? "border-4" : "border-2"
        } `}
      >
        <div className="flex flex-col w-40 h-20 max-h-20 max-w-40 justify-center">
          <div className="text-xs absolute top-2 left-3 flex justify-between text-stone-400">
            Type: Markdown
          </div>
          <div className="text-xs absolute top-2 right-3 flex justify-between text-stone-400">
            ⚫️
          </div>
          <input
            type="text"
            value={data.data.label}
            onChange={handleChangeLabel}
            onBlur={onSave}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                onSave();
                e.currentTarget.blur();
              }
            }}
          />
        </div>
      </div>

      <CustomHandle type="source" position={Position.Top} id="top" />
      <CustomHandle type="source" position={Position.Right} id="right" />
      <CustomHandle type="target" position={Position.Left} id="left" />
      <CustomHandle type="target" position={Position.Bottom} id="bottom" />
    </>
  );
}
