import type { Edge, Node } from "reactflow";
import { atomWithStorage } from "jotai/utils";
import { v4 as uuid } from "uuid";

export type Page = {
  id: string;
  title: string;
  nodes: Node[];
  edges: Edge[];
};

export const initialNodes: Node[] = [
  {
    id: uuid(),
    type: "markdown",
    data: { label: "Node 0" },
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
      nodes: initialNodes,
      edges: initialEdges,
    } as Page,
    undefined,
    {
      getOnInit: true,
    }
  );
