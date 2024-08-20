import {
  NodeToolbar,
  Position,
  type XYPosition,
  type NodeProps,
} from "@xyflow/react";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import type { CustomNodeTypes } from "@/jotai/flow/panel";

type Props = {
  type: CustomNodeTypes;
  displayPosition: Position;
  onClick: (
    type: CustomNodeTypes,
    position: Position,
    positionXY: XYPosition
  ) => void;
} & NodeProps;

const calNextPosition = (x: number, y: number, type: Position) => {
  const plusX = 300;
  const plusY = 200;
  switch (type) {
    case Position.Top:
      return { x: x, y: y - plusY };
    case Position.Right:
      return { x: x + plusX, y: y };
    case Position.Left:
      return { x: x - plusX, y: y };
    case Position.Bottom:
      return { x: x, y: y + plusY };
    default:
      return { x: x, y: y };
  }
};

export default function AddNodeToolbar({
  id,
  type,
  selected,
  displayPosition,
  onClick,
  positionAbsoluteX,
  positionAbsoluteY,
}: Props) {
  const onAddNode = () => {
    onClick(
      type,
      displayPosition,
      calNextPosition(positionAbsoluteX, positionAbsoluteY, displayPosition)
    );
  };

  return (
    <NodeToolbar isVisible={selected} position={displayPosition} offset={10}>
      <button
        type="button"
        onClick={onAddNode}
        className={clsx(
          "rounded-full p-1 m-1 border border-stone-400 text-stone-400",
          "hover:text-stone-500 hover:border-stone-500"
        )}
      >
        <div className="text-xs">
          <ArrowDownOnSquareIcon
            className={clsx(
              "w-4 h-4",
              displayPosition === Position.Top && "rotate-180",
              displayPosition === Position.Right && "-rotate-90",
              displayPosition === Position.Left && "rotate-90"
            )}
          />
        </div>
      </button>
    </NodeToolbar>
  );
}
