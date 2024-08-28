import { atom } from "jotai";
import type { CustomNodeType } from "@/types/flow";

type SidePanelButton = {
  selected: CustomNodeType | null;
};

export const sidePanelAtom = atom<SidePanelButton>({ selected: null });
