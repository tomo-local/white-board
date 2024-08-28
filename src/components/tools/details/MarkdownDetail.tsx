import clsx from "clsx";
import DetailsHeder from "@/components/tools/details/DetailHeder";
import type { MarkdownNode } from "@/types/flow";
import { useNodeControl } from "@/hooks/useNodeControl";
import { useEffect, useState } from "react";

type MarkdownDetailsProps = {
  node: MarkdownNode;
  remove: () => void;
};

export default function MarkdownDetails({
  node,
  remove,
}: MarkdownDetailsProps) {
  const { onSave, onDelete } = useNodeControl();
  const [targetNode, setTargetNode] = useState(node);

  useEffect(() => {
    setTargetNode(node);
  }, [node]);

  const handleDelete = () => {
    remove();
    onDelete(targetNode);
  };

  const handleSave = () => {
    onSave(targetNode);
  };

  return (
    <>
      <DetailsHeder onDelete={handleDelete} />
      <div className="flex flex-col px-4 py-1 text-neutral-500 dark:text-neutral-200">
        <div className="flex flex-col flex-none h-44">
          <div className="text-3xl">
            <input
              type="text"
              className={clsx(
                "w-full rounded-md bg-neutral-100 focus:outline-none focus:shadow-outline px-2 py-1 hover:bg-neutral-300",
                "dark:bg-neutral-700 dark:hover:bg-neutral-600"
              )}
              value={targetNode?.data?.label}
              onChange={(e) => {
                setTargetNode({
                  ...targetNode,
                  data: {
                    ...targetNode.data,
                    label: e.target.value,
                  },
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.currentTarget.blur();
                  handleSave();
                }
              }}
            />
          </div>
          <div className="px-2 py-1 flex flex-col text-sm space-y-1">
            <div
              className={clsx(
                "flex space-x-3 hover:bg-stone-300 px-2 py-1 rounded-md",
                "dark:bg-neutral-700 dark:hover:bg-neutral-600"
              )}
            >
              <div className="flex-none w-20">作成日</div>
              <div className="flex-2">{targetNode?.data?.created_at}</div>
            </div>
            <div
              className={clsx(
                "flex space-x-3 hover:bg-stone-300 px-2 py-1 rounded-md",
                "dark:bg-neutral-700 dark:hover:bg-neutral-600"
              )}
            >
              <div className="flex-none w-20">更新日</div>
              <div className="flex-2">{targetNode?.data?.update_at}</div>
            </div>
          </div>
        </div>
        <div className="grow h-full">
          <textarea
            className={clsx(
              "w-full rounded-md bg-neutral-100 focus:outline-none focus:shadow-outline p-2 hover:bg-stone-300",
              "dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
            )}
            value={targetNode?.data?.context || ""}
            onChange={(e) => {
              setTargetNode({
                ...targetNode,
                data: {
                  ...targetNode.data,
                  context: e.target.value,
                },
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                e.currentTarget.blur();
                handleSave();
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
