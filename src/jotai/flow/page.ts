import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import type { Node, Edge } from "reactflow";
import { pagesAtom, type Page } from "@/jotai/storage/local";
import { v4 as uuid } from "uuid";

const initialNodes: Node[] = [
  {
    id: uuid(),
    type: "markdown",
    data: { label: "Node 0" },
    position: { x: 100, y: 100 },
  },
];

const initialEdges: Edge[] = [];
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
