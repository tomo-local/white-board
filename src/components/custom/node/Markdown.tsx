"use client";
import type { ChangeEvent } from "react";
import type { NodeProps } from "reactflow";
import clsx from "clsx";

import CommonNode from "@/components/custom/node/CommonNode";
import { useNodeControl } from "@/hooks/useNodeControl";

type NodeData = {
  label: string;
};

export default function MarkdownNode(props: NodeProps<NodeData>) {
  const { node, onChange, onSave } = useNodeControl(props);

  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...node, data: { ...node.data, label: e.target.value } });
  };

  return (
    <CommonNode {...props} type="markdown" isConnectable>
      <div className="text-black">
        <div className="flex flex-col w-40 h-16 py-1 max-w-40 max-h-16">
          <input
            type="text"
            className={clsx(
              "w-full rounded-md px-2 py-1 text-stone-600",
              "focus:outline-none focus:shadow-outline focus:bg-stone-200 focus:text-stone-700 hover:bg-stone-200"
            )}
            value={node.data.label}
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
    </CommonNode>
  );
}
