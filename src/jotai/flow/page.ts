import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import type { Node, Edge } from "reactflow";
import { pagesAtom, type Page } from "@/jotai/storage/local";

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

export const nodesAtom = atomFamily((id: string) =>
  atom(
    (get) => get(pageAtom(id))?.nodes || initialNodes,
    (get, set, update: Node[]) => {
      set(pageAtom(id), {
        ...get(pageAtom(id)),
        nodes: update,
      });
    }
  )
);

export const edgesAtom = atomFamily((id: string) =>
  atom(
    (get) => get(pageAtom(id))?.edges || initialEdges,
    (get, set, update: Edge[]) => {
      set(pageAtom(id), {
        ...get(pageAtom(id)),
        edges: update,
      });
    }
  )
);
