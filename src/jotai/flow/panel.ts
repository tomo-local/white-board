import { atom } from "jotai";

export type PanelButton = "add-normal-node" | "add-box-node" | null;
type SidePanelButton = {
  selected: PanelButton;
};

export const sidePanelAtom = atom<SidePanelButton>({ selected: null });
