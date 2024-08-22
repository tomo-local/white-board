"use client";
import { ReactFlowProvider } from "@xyflow/react";
import clsx from "clsx";

import styles from "@/app/reactflow/page.module.css";
import "@/app/globals.css";

import Flow from "@/components/Flow";
import FlowSideView from "@/components/tools/FlowSideView";
import FlowSidePeek from "@/components/tools/FlowSidePeek";

export default function ReactFlowPage() {
  return (
    <main className={clsx(styles.main, "h-full overflow-hidden relative")}>
      <ReactFlowProvider>
        <FlowSideView />
        <Flow />
        <FlowSidePeek />
      </ReactFlowProvider>
    </main>
  );
}
