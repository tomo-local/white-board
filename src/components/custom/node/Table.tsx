"use client";
import { type ChangeEvent, useEffect, useState } from "react";
import type { NodeProps } from "@xyflow/react";
import { clsx } from "clsx";

import CommonNode from "@/components/custom/node/CommonNode";

// import { useNodeControl } from "@/hooks/useNodeControl";
import type { TableNode } from "@/types/flow";
import { TableCellsIcon } from "@heroicons/react/24/outline";

export default function MarkdownNode(props: NodeProps<TableNode>) {
  // const { onSave } = useNodeControl();
  const [node, setNode] = useState(props);
  const [resizable, setResizable] = useState(false);
  // const [editable, setEditable] = useState(false);

  // useEffect(() => {
  //   if (!props.selected) {
  //     setEditable(false);
  //   }
  // }, [props.selected]);

  return (
    <CommonNode
      {...props}
      type="memo"
      className="w-full h-full rounded-md"
      isConnectable={false}
      onDoubleClick={() => {
        setResizable(!resizable);
      }}
    >
      <>
        <div className="absolute top-2 left-2">
          <TableCellsIcon className="size-4 dark:text-neutral-100 text-neutral-600" />
        </div>

        <div className="w-full h-full px-2 py-2">
          <table className="table-auto w-full h-full border-collapse min-w-96">
            <thead>
              <tr>
                {node.data.rowColumns.map((header) => (
                  <th key={header} className="border-b p-2 pl-8 pt-0 py-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {node.data.table.map((row) => (
                <tr key={`row_${Math.random()}`}>
                  {Object.values(row).map((cell) => (
                    <td
                      key={`cell_${Math.random()}`}
                      className="border-b p-2 pl-8"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </CommonNode>
  );
}
