import clsx from "clsx";
import DetailsHeder from "@/components/tools/details/DetailHeder";
import type { TableNode } from "@/types/flow";
import { useNodeControl } from "@/hooks/useNodeControl";
import { useEffect, useState } from "react";

type TableDetailsProps = {
  node: TableNode;
  remove: () => void;
};

export default function MarkdownDetails({ node, remove }: TableDetailsProps) {
  const { onSave, onDelete } = useNodeControl();
  const [targetNode, setTargetNode] = useState(node);

  useEffect(() => {
    setTargetNode(node);
  }, [node]);

  const handleChange = (type: string, value: string) => {
    setTargetNode({
      ...targetNode,
      data: {
        ...targetNode.data,
        [type]: value,
      },
    });
  };

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
        <div className="flex flex-col flex-none h-20">
          <div className="text-3xl">
            <input
              type="text"
              className={clsx(
                "w-full rounded-md bg-neutral-100 focus:outline-none focus:shadow-outline px-2 py-1 hover:bg-neutral-300",
                "dark:bg-neutral-700 dark:hover:bg-neutral-600"
              )}
              value={targetNode?.data?.label}
              onChange={(e) => handleChange("label", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.currentTarget.blur();
                  handleSave();
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
