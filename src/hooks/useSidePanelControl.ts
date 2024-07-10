import type { MouseEvent } from "react";
import { useAtom } from "jotai";

import { sidePanelAtom, type PanelButton } from "@/jotai/flow/panel";

export const useSidePanelControl = () => {
  const [panel, setPanel] = useAtom(sidePanelAtom);

  const select = (selected: PanelButton) => setPanel({ selected });
  const reset = () => setPanel({ selected: null });

  return {
    selected: panel.selected,
    select: select,
    reset: reset,
    onPanelClick: (
      e: MouseEvent<Element, globalThis.MouseEvent>,
      action: (e: MouseEvent<Element, globalThis.MouseEvent>) => void
    ) => {
      if (!panel.selected) {
        return;
      }

      action(e);

      if (!e.ctrlKey && !e.metaKey) {
        setPanel({ selected: null });
      }
    },
  };
};
