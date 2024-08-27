"use client";
import { type ChangeEvent, useEffect, useState } from "react";
import { Position, type NodeProps } from "@xyflow/react";
import { clsx } from "clsx";

import CommonNode from "@/components/custom/node/CommonNode";
import Handle from "@/components/custom/node/options/Handle";

import { useNodeControl } from "@/hooks/useNodeControl";
import { useNodeDetailsControl } from "@/hooks/useNodeDetailsControl";

import type { TableNode } from "@/types/flow";
import {
  ArrowTopRightOnSquareIcon,
  TableCellsIcon,
  PencilSquareIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import IconButton from "@/components/common/button/IconButton";
import { Button } from "@headlessui/react";

export default function MarkdownNode(props: NodeProps<TableNode>) {
  const { onSave } = useNodeControl();
  const { select, selectId } = useNodeDetailsControl();
  const [node, setNode] = useState(props);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!props.selected) {
      setEditable(false);
    }
  }, [props.selected]);

  const handelChangeValue = (type: string, value: string) => {
    setNode({
      ...node,
      data: {
        ...node.data,
        [type]: value,
      },
    });
  };

  const handelSave = () => {
    if (node.data.label === props.data.label) {
      return;
    }

    if (node.data.label === "") {
      setNode({
        ...node,
        data: {
          ...node.data,
          label: props.data.label,
        },
      });
      setEditable(false);
      return;
    }

    onSave(node);
    setEditable(false);
  };

  return (
    <CommonNode
      {...props}
      type="table"
      className="w-full h-full rounded-md"
      editing={selectId === node.id}
      isConnectable={false}
    >
      <>
        <div
          id={`${node.type}-title-${node.id}`}
          className="relative py-2 px-2 w-full h-8 flex space-x-2"
        >
          <TableCellsIcon className="size-4 dark:text-neutral-100 text-neutral-600 flex-none" />
          <div className="flex-grow w-[85%] flex items-center">
            {editable ? (
              <input
                className={clsx(
                  "bg-transparent focus:outline-none w-[85%] rounded-md bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5"
                )}
                value={node.data.label}
                placeholder="Table Name ..."
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handelChangeValue("label", e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    handelSave();
                    e.currentTarget.blur();
                  }
                }}
                onBlur={handelSave}
              />
            ) : (
              <div className="px-2">{node.data.label}</div>
            )}
          </div>
        </div>

        <div className="absolute right-1 top-1.5 group-hover:visible invisible divide-x divide-neutral-500 dark:divide-neutral-700">
          <IconButton
            type="button"
            className={clsx(
              "bg-neutral-200 dark:bg-neutral-700 rounded-l rounded-r-none hover:bg-neutral-300 dark:hover:bg-neutral-500",
              props.selected && "visible",
              editable && "bg-neutral-300 dark:bg-neutral-400"
            )}
            onClick={() => {
              setEditable(!editable);
            }}
          >
            <PencilSquareIcon className="w-3 h-3 dark:text-neutral-100 text-neutral-600" />
          </IconButton>
          <IconButton
            type="button"
            className={clsx(
              "bg-neutral-200 dark:bg-neutral-700 rounded-r rounded-l-none hover:bg-neutral-300 dark:hover:bg-neutral-500",
              props.selected && "visible",
              selectId === node.id && "bg-neutral-300 dark:bg-neutral-400"
            )}
            onClick={() => select(node.id)}
          >
            <ArrowTopRightOnSquareIcon className="w-3 h-3 dark:text-neutral-100 text-neutral-600" />
          </IconButton>
        </div>

        <div className="w-fit h-full">
          <table className="table-auto w-fit h-full rounded-b-md border-t border-neutral-500 dark:border-neutral-700 bg-neutral-600 divide-y divide-neutral-500 dark:divide-neutral-700">
            <thead>
              <tr className="divide-x divide-neutral-500 dark:divide-neutral-700">
                <th className="min-w-8 p-1 hover:bg-neutral-500" />
                <th className="p-1 min-w-20 hover:bg-neutral-500" />
                {node.data.rowColumns.map((header) => (
                  <th
                    key={header.id}
                    className="text-start p-1 w-20 min-x-10 hover:bg-neutral-500"
                  >
                    {header.name}
                  </th>
                ))}
                <th className="flex h-full w-20 p-0">
                  <IconButton
                    type="button"
                    className={clsx(
                      "hover:bg-neutral-300 dark:hover:bg-neutral-500 rounded-none",
                      "flex items-center justify-center w-8 p-1"
                    )}
                  >
                    <PlusIcon className="size-4 dark:text-neutral-100 text-neutral-600" />
                  </IconButton>
                  <IconButton
                    type="button"
                    className={clsx(
                      "hover:bg-neutral-300 dark:hover:bg-neutral-500 flex-none rounded-none flex-grow",
                      " flex items-center justify-start p-1"
                    )}
                  >
                    <EllipsisHorizontalIcon className="size-4 dark:text-neutral-100 text-neutral-600" />
                  </IconButton>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-500 dark:divide-neutral-700">
              {node.data.table.map((row, i) => (
                <tr
                  key={`row_${Math.random()}`}
                  className="relative divide-x divide-neutral-500 dark:divide-neutral-700"
                >
                  <td className="p-1 items-center">
                    <Handle
                      type="target"
                      className={clsx(
                        !props.selected && "opacity-0",
                        "ring-1 ring-neutral-500 dark:ring-neutral-200"
                      )}
                      id={`target_row_${i}`}
                      position={Position.Left}
                    />

                    <Handle
                      type="source"
                      className={clsx(
                        !props.selected && "opacity-0",
                        "ring-1 ring-neutral-500 dark:ring-neutral-200"
                      )}
                      id={`source_row_${i}`}
                      position={Position.Right}
                    />
                  </td>
                  <td className="p-1 items-center">
                    {node.data.lineColumns[i].name}
                  </td>
                  {Object.values(row).map((cell) => (
                    <td
                      key={`cell_${Math.random()}`}
                      className="p-1 items-center"
                    >
                      <input
                        type="text"
                        defaultValue={cell}
                        className={
                          "bg-transparent w-full h-full border-none focus:outline-none"
                        }
                      />
                    </td>
                  ))}
                  <td />
                </tr>
              ))}

              <tr>
                <td colSpan={node.data.rowColumns.length + 2} className="p-0 ">
                  <Button
                    disabled={!editable}
                    type="button"
                    className={clsx(
                      "w-full h-full bg-transparent text-neutral-600 dark:text-neutral-100 flex justify-start items-center px-2 py-1 space-x-1",
                      editable &&
                        "hover:bg-neutral-300 dark:hover:bg-neutral-500"
                    )}
                  >
                    <PlusIcon className="size-3 dark:text-neutral-100 text-neutral-600" />
                    <div className="text-xs">新規</div>
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    </CommonNode>
  );
}
