import { atom } from "jotai";

export type CustomNodeTypes = "markdown" | "normal" | null;

type SidePanelButton = {
  selected: CustomNodeTypes;
};

export const sidePanelAtom = atom<SidePanelButton>({ selected: null });
