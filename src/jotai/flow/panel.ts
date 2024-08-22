import { atom } from "jotai";
import type { CustomNodeTypes } from "@/types/flow";

type SidePanelButton = {
  selected: CustomNodeTypes | null;
};

export const sidePanelAtom = atom<SidePanelButton>({ selected: null });
