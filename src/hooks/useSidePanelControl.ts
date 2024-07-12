import type { MouseEvent } from "react";
import { useAtom } from "jotai";

import { sidePanelAtom, type CustomNodeTypes } from "@/jotai/flow/panel";

type AddNodeFunction = (
  type: CustomNodeTypes,
  e: MouseEvent<Element, globalThis.MouseEvent>
) => void;

export const useSidePanelControl = (addNode?: AddNodeFunction) => {
  const [panel, setPanel] = useAtom(sidePanelAtom);

  const select = (selected: CustomNodeTypes) => setPanel({ selected });
  const reset = () => setPanel({ selected: null });

  return {
    selected: panel.selected,
    select: select,
    reset: reset,
    onPanelClick: (e: MouseEvent<Element, globalThis.MouseEvent>) => {
      if (!panel.selected || !addNode) {
        return;
      }

      addNode(panel.selected, e);

      if (!e.ctrlKey && !e.metaKey) {
        setPanel({ selected: null });
      }
    },
  };
};
