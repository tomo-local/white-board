"use client";
import { ReactFlowProvider } from "reactflow";

import styles from "@/app/reactflow/page.module.css";
import "@/app/globals.css";
import Flow from "@/components/Flow";
import SidePeek from "@/components/editor/SidePeek";
import NodeListSideView from "@/components/NodeListSideView";
import clsx from "clsx";

export default function ReactFlowPage() {
  return (
    <main className={clsx(styles.main, "h-full")}>
      <ReactFlowProvider>
        <NodeListSideView />
        <Flow />
        <SidePeek />
      </ReactFlowProvider>
    </main>
  );
}
