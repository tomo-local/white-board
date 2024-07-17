import { atom } from "jotai";

export type CustomNodeTypes = "markdown" | "normal";

type SidePanelButton = {
  selected: CustomNodeTypes | null;
};

export const sidePanelAtom = atom<SidePanelButton>({ selected: null });
