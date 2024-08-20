"use client";
import { ReactFlowProvider } from '@xyflow/react';

import styles from "@/app/reactflow/page.module.css";
import "@/app/globals.css";
import Flow from "@/components/Flow";
import SidePeek from "@/components/editor/SidePeek";
import NodeListSideView from "@/components/tools/side/SideView";
import clsx from "clsx";

export default function ReactFlowPage() {
  return (
    <main className={clsx(styles.main, "h-full overflow-hidden")}>
      <ReactFlowProvider>
        <NodeListSideView />
        <Flow />
        <SidePeek />
      </ReactFlowProvider>
    </main>
  );
}
