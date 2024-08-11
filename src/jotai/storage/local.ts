import type { Edge, Node } from "reactflow";
import { atomWithStorage } from "jotai/utils";
import { v4 as uuid } from "uuid";

export type PageListItem = {
  id: string;
  title: string;
  created_at: string;
  update_at: string;
};

export type Page = {
  id: string;
  title: string;
  created_at: string;
  update_at: string;
  nodes: Node[];
  edges: Edge[];
};

export const defaultPage = ({ id, title }: Pick<Page, "title" | "id">) => {
  return {
    id: id,
    title: title,
    created_at: new Date().toISOString(),
    update_at: new Date().toISOString(),
    nodes: initialNodes,
    edges: initialEdges,
  } as Page;
};

export const initialNodes: Node[] = [
  {
    id: uuid(),
    type: "markdown",
    dragHandle: ".custom-drag-handle",
    data: {
      label: "Node 0",
      context: "Sample",
      created_at: new Date().toISOString(),
      update_at: new Date().toISOString(),
    },
    position: { x: 100, y: 100 },
  },
];

export const initialEdges: Edge[] = [];

export const pageLocalAtom = (id: string) =>
  atomWithStorage(
    `wb-page-${id}`,
    defaultPage({ id, title: "New Page" }),
    undefined,
    {
      getOnInit: true,
    }
  );

export const pageListLocalAtom = atomWithStorage<PageListItem[]>(
  "wb-page-list",
  [],
  undefined,
  {
    getOnInit: true,
  }
);
