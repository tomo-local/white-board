import type { ChangeEvent } from "react";
import { Handle, Position, type NodeProps } from "reactflow";

import { useNodeControl } from "@/hooks/useNodeControl";
import type { NodeData } from "@/jotai/flow/node";

export default function NormalNode(props: NodeProps<NodeData>) {
  const { data, onChange, onSave } = useNodeControl(props);

  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("handleChangeLabel", e.target.value);
    onChange({ ...data, label: e.target.value });
  };

  return (
    <>
      <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 text-black">
        <div className="flex flex-col w-40 h-20 max-h-20 max-w-40  justify-center">
          <input
            type="text"
            value={data.label}
            onChange={handleChangeLabel}
            onBlur={() => onSave()}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              (e.ctrlKey || e.metaKey) &&
              onSave()
            }
          />
        </div>
      </div>

      <Handle type="source" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Right} id="right" />

      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="target" position={Position.Bottom} id="bottom" />
    </>
  );
}
