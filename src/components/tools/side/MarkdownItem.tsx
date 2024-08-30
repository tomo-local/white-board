import clsx from "clsx";
import type { MarkdownNode } from "@/types/flow";
import { useFlowStore } from "@/hooks/useFlowStore";
import { useNodeDetailsControl } from "@/hooks/useNodeDetailsControl";
import IconButton from "@/components/common/button/IconButton";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import MarkdownIcon from "@/components/common/icons/MarkdownIcon";

type NodeItemProps = {
  node: MarkdownNode;
};

export default function MarkdownItem({ node }: NodeItemProps) {
  const { moveNodeCenterPosition } = useFlowStore();
  const { select, selectId } = useNodeDetailsControl();

  return (
    <div
      key={node.id}
      className={clsx(
        "border-2 rounded-md dark:border-neutral-600 mx-3 dark:bg-neutral-700",
        "hover:border-2 dark:hover:border-neutral-400",
        "cursor-pointer",
        selectId === node.id && "border-2 dark:border-neutral-400"
      )}
      onDoubleClick={() => {
        moveNodeCenterPosition(node);
        select(node.id);
      }}
    >
      <div className="p-1 flex flex-col items-left w-full h-full">
        <div className="p-1">
          <div id="header" className="flex">
            <div className="text-xs flex-1 relative">
              <div className="absolute -top-1">
                <MarkdownIcon className="size-5 dark:fill-neutral-100 fill-neutral-500" />
              </div>
            </div>

            <IconButton
              className="hover:bg-neutral-400 dark:hover:bg-neutral-500"
              onClick={() => select(node.id)}
            >
              <SquaresPlusIcon className="size-4" />
            </IconButton>
          </div>
          <div id="content">
            {node.type === "markdown" ? node.data.label : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
