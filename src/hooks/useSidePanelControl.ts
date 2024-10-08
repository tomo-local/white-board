import type { MouseEvent } from "react";
import { useAtom } from "jotai";
import { useReactFlow } from "@xyflow/react";

import { sidePanelAtom } from "@/jotai/flow/panel";
import type { CustomNodeType } from "@/types/flow";

type Position = {
  x: number;
  y: number;
};

type AddNodeFunction = (type: CustomNodeType, position: Position) => void;

const callPosition = ({ x, y }: Position) => {
  const plusX = -100;
  const plusY = -50;
  return { x: x + plusX, y: y + plusY };
};

export const useSidePanelControl = (addNode?: AddNodeFunction) => {
  const [panel, setPanel] = useAtom(sidePanelAtom);
  const { screenToFlowPosition } = useReactFlow();

  const select = (selected: CustomNodeType) => setPanel({ selected });
  const reset = () => setPanel({ selected: null });

  return {
    selected: panel.selected,
    select: select,
    reset: reset,
    onPanelClick: (e: MouseEvent<Element, globalThis.MouseEvent>) => {
      if (!panel.selected || !addNode) {
        return;
      }

      addNode(
        panel.selected,
        callPosition(
          screenToFlowPosition({
            x: e.clientX,
            y: e.clientY,
          })
        )
      );

      if (!e.ctrlKey && !e.metaKey) {
        setPanel({ selected: null });
      }
    },
  };
};
