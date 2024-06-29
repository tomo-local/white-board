import type { Edge, Node } from "reactflow";
import { atom } from "jotai";
import { atomWithStorage, atomFamily } from "jotai/utils";

export type Page = {
  id: string;
  title: string;
  nodes: Node[];
  edges: Edge[];
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    data: { label: "Node 2" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: { label: "Node 3" },
    position: { x: 400, y: 100 },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
];

export const pagesAtom = atomWithStorage("wb-pages", [] as Page[], undefined, {
  getOnInit: true,
});

export const pageAtom = atomFamily((id: string) =>
  atom(
    (get) => {
      const pages = get(pagesAtom);
      const page = pages.find((page) => page.id === id);
      if (page) {
        return page;
      }
      const newPage = {
        id,
        title: "New Page",
        nodes: initialNodes,
        edges: initialEdges,
      };
      pages.push(newPage);
      return newPage;
    },
    (get, set, update: Page) => {
      set(
        pagesAtom,
        get(pagesAtom).map((page) => (page.id === update.id ? update : page))
      );
    }
  )
);
