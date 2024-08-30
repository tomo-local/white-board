import clsx from "clsx";
import type { TableNode } from "@/types/flow";
import { useFlowStore } from "@/hooks/useFlowStore";
import { useNodeDetailsControl } from "@/hooks/useNodeDetailsControl";
import { TableCellsIcon } from "@heroicons/react/24/solid";

type NodeItemProps = {
  node: TableNode;
};

export default function TableItem({ node }: NodeItemProps) {
  const { moveNodeCenterPosition } = useFlowStore();
  const { select, selectId } = useNodeDetailsControl();

  return (
    <div
      key={node.id}
      className={clsx(
        "border-2 rounded-md dark:border-neutral-600 mx-3 dark:bg-neutral-700",
        "hover:border-2 dark:hover:border-neutral-400",
        "cursor-pointer"
      )}
      onDoubleClick={() => {
        moveNodeCenterPosition(node);
        select(node.id);
      }}
    >
      <div className="p-1 flex flex-col items-left w-full h-full">
        <div id="header" className="flex">
          <div className="text-xs flex-1 relative p-1">
            <TableCellsIcon className="size-5 dark:fill-neutral-100 fill-neutral-500" />
          </div>
        </div>
        <div className="p-1">{node.data.label}</div>
      </div>
    </div>
  );
}
