import clsx from "clsx";
import type { CustomNodes } from "@/types/flow";
import { useNodeDetailsControl } from "@/hooks/useNodeDetailsControl";
import IconButton from "@/components/common/button/IconButton";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";

type NodeItemProps = {
  key: string;
  node: CustomNodes;
};

export default function NodeListItem({ key, node }: NodeItemProps) {
  const { select, selectId } = useNodeDetailsControl();

  return (
    <div
      key={key}
      className={clsx(
        "border-2 rounded-md dark:border-neutral-600 mx-3 dark:bg-neutral-700",
        "hover:border-2 dark:hover:border-neutral-400",
        "cursor-pointer",
        selectId === node.id && "border-2 dark:border-neutral-400"
      )}
      onDoubleClick={() => select(node.id)}
    >
      <div className="p-1 flex flex-col items-left w-full h-full">
        <div className="p-1">
          <div id="header" className="flex">
            <div className="text-xs flex-1">
              TYPE: {node.type?.toUpperCase()}
            </div>
            <IconButton
              className="hover:bg-neutral-400 dark:hover:bg-neutral-500"
              onClick={() => select(node.id)}
            >
              <SquaresPlusIcon className="w-4 h-4" />
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
