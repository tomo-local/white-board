import type { Edge, Node } from "reactflow";
import { atomWithStorage } from "jotai/utils";
import { v4 as uuid } from "uuid";

export type Page = {
  id: string;
  title: string;
  created_at: string;
  update_at: string;
  nodes: Node[];
  edges: Edge[];
};

export const initialNodes: Node[] = [
  {
    id: uuid(),
    type: "markdown",
    dragHandle: ".custom-drag-handle",
    data: { label: "Node 0", description: "Sample" },
    position: { x: 100, y: 100 },
  },
];

export const initialEdges: Edge[] = [];

//MEMO： 廃止予定
export const pagesAtom = atomWithStorage("wb-pages", [] as Page[], undefined, {
  getOnInit: true,
});

export const pageLocalAtom = (id: string) =>
  atomWithStorage(
    `wb-page-${id}`,
    {
      id: id,
      title: "New Page",
      created_at: new Date().toISOString(),
      update_at: new Date().toISOString(),
      nodes: initialNodes,
      edges: initialEdges,
    } as Page,
    undefined,
    {
      getOnInit: true,
    }
  );
