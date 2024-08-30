import { useCallback, useState } from "react";
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
import { getHelperLines } from "@/utils/helperLins";

const CONSTANT_WIDTH = 300;

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

    setCenter(x + CONSTANT_WIDTH, y, {
      duration: 100,
      zoom: getZoom(),
    });
  };

  const [helperLineHorizontal, setHelperLineHorizontal] = useState<
    number | undefined
  >(undefined);
  const [helperLineVertical, setHelperLineVertical] = useState<
    number | undefined
  >(undefined);

  const customApplyNodeChanges = useCallback(
    (changes: NodeChange[], nodes: Node[]): Node[] => {
      // reset the helper lines (clear existing lines, if any)
      setHelperLineHorizontal(undefined);
      setHelperLineVertical(undefined);

      // this will be true if it's a single node being dragged
      // inside we calculate the helper lines and snap position for the position where the node is being moved to
      if (
        changes.length === 1 &&
        changes[0].type === "position" &&
        changes[0].dragging &&
        changes[0].position
      ) {
        const helperLines = getHelperLines(changes[0], nodes);

        // if we have a helper line, we snap the node to the helper line position
        // this is being done by manipulating the node position inside the change object
        changes[0].position.x =
          helperLines.snapPosition.x ?? changes[0].position.x;
        changes[0].position.y =
          helperLines.snapPosition.y ?? changes[0].position.y;

        // if helper lines are returned, we set them so that they can be displayed
        setHelperLineHorizontal(helperLines.horizontal);
        setHelperLineVertical(helperLines.vertical);
      }

      return applyNodeChanges(changes, nodes) as Node[];
    },
    []
  );

  return {
    id,
    nodes,
    edges,
    moveNodeCenterPosition,
    helper: {
      horizontal: helperLineHorizontal,
      vertical: helperLineVertical,
    },
    onNodesChange: useAtomCallback(
      useCallback(
        (get, set, change: NodeChange<Node>[]) => {
          const nodes = get(nodesAtom(id));
          set(nodesAtom(id), customApplyNodeChanges(change, nodes));
        },
        [id, customApplyNodeChanges]
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
