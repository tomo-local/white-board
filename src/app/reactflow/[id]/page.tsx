"use client";
import { ReactFlowProvider } from "reactflow";

import styles from "@/app/reactflow/page.module.css";
import "@/app/globals.css";
import Flow from "@/components/Flow";
import SidePeek from "@/components/editor/SidePeek";
import NodeListSideView from "@/components/NodeListSideView";

export default function ReactFlowPage({ params }: { params: { id: string } }) {
  return (
    <main className={styles.main}>
      <ReactFlowProvider>
        <NodeListSideView />
        <Flow />
        <SidePeek />
      </ReactFlowProvider>
    </main>
  );
}
