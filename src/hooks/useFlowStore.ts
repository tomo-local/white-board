import { useCallback } from "react";
import { useParams } from "next/navigation";

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  type XYPosition,
  type EdgeChange,
  type NodeChange,
  type Connection,
} from "@xyflow/react";
import { useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";

import { nodesAtom, edgesAtom } from "@/jotai/flow/page";
import { createNode } from "@/utils/flow";
import type { CustomNodes as Node, CustomNodeType } from "@/types/flow";
import { calNodeCenterPosition } from "@/utils/flow";

export const useFlowStore = () => {
  const { id }: { id: string } = useParams();
  const nodes = useAtomValue(nodesAtom(id));
  const edges = useAtomValue(edgesAtom(id));
  const { setCenter, getZoom } = useReactFlow();

  const moveNodeCenterPosition = (node: Node) => {
    const { measured, position } = node;
    const { x, y } = calNodeCenterPosition(
      position.x,
      position.y,
      measured?.width,
      measured?.height
    );

    setCenter(x, y, {
      duration: 100,
      zoom: getZoom(),
    });
  };

  return {
    id,
    nodes,
    edges,
    moveNodeCenterPosition,
    onNodesChange: useAtomCallback(
      useCallback(
        (get, set, change: NodeChange<Node>[]) => {
          const nodes = get(nodesAtom(id));
          set(nodesAtom(id), applyNodeChanges(change, nodes));
        },
        [id]
      )
    ),
    onEdgesChange: useAtomCallback(
      useCallback(
        (get, set, change: EdgeChange[]) => {
          const edges = get(edgesAtom(id));
          set(edgesAtom(id), applyEdgeChanges(change, edges));
        },
        [id]
      )
    ),
    addNode: useAtomCallback(
      useCallback(
        (get, set, type: CustomNodeType, position: XYPosition) => {
          const nodes = get(nodesAtom(id));

          const newNode = createNode({
            type,
            position,
            nodes,
          });

          const newNodes = [...nodes, newNode];

          set(nodesAtom(id), newNodes);

          return newNode;
        },
        [id]
      )
    ),
    addEdge: useAtomCallback(
      useCallback(
        (get, set, connection: Connection) => {
          const edges = get(edgesAtom(id));

          const newEdges = addEdge(connection, edges);

          set(edgesAtom(id), newEdges);

          return newEdges;
        },
        [id]
      )
    ),
  };
};
