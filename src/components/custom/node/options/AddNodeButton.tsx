import { Position, type XYPosition, type NodeProps } from "@xyflow/react";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import type { CustomNodeTypes } from "@/types/flow";
import { calNextNodePosition } from "@/utils/flow";

type AddNodeButtonProps = {
  type: CustomNodeTypes;
  displayPosition: Position;
  onClick: (
    type: CustomNodeTypes,
    id: string,
    position: Position,
    positionXY: XYPosition
  ) => void;
} & NodeProps;

export default function AddNodeButton(props: AddNodeButtonProps) {
  const {
    id,
    type,
    selected,
    displayPosition,
    onClick,
    positionAbsoluteX: x,
    positionAbsoluteY: y,
    width,
    height,
  } = props;

  const onAddNode = () => {
    onClick(
      type,
      id,
      displayPosition,
      calNextNodePosition(displayPosition, { x, y }, { width, height })
    );
  };

  return (
    <div
      className={clsx(
        "absolute z-10 transform",
        selected ? "opacity-100" : "opacity-0",
        "group-hover:opacity-100",
        displayPosition === Position.Top &&
          "-top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 ",
        displayPosition === Position.Right &&
          "top-1/2 -right-5 translate-x-1/2 -translate-y-1/2",
        displayPosition === Position.Left &&
          "top-1/2 -left-5 -translate-x-1/2 -translate-y-1/2 ",
        displayPosition === Position.Bottom &&
          "-bottom-5 left-1/2 -translate-x-1/2 translate-y-1/2"
      )}
    >
      <button
        type="button"
        onClick={onAddNode}
        className={clsx(
          "rounded-full p-1 ring-1",
          "bg-neutral-100 text-neutral-600 ring-neutral-600",
          "dark:bg-neutral-700 dark:text-neutral-200 dark:ring-neutral-200",
          "hover:bg-neutral-400 hover:text-neutral-100 hover:ring-neutral-100",
          "dark:hover:bg-neutral-200 dark:hover:text-neutral-500 dark:hover:ring-neutral-500"
        )}
      >
        <ArrowDownOnSquareIcon
          className={clsx(
            "size-3",
            displayPosition === Position.Top && "rotate-180",
            displayPosition === Position.Right && "-rotate-90",
            displayPosition === Position.Left && "rotate-90"
          )}
        />
      </button>
    </div>
  );
}
