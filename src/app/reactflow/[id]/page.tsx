"use client";
import { ReactFlowProvider } from "reactflow";

import styles from "@/app/reactflow/page.module.css";
import Flow from "@/components/Flow";

export default function ReactFlowPage({ params }: { params: { id: string } }) {
  return (
    <main className={styles.main}>
      <div className="absolute">{params.id}</div>
      <ReactFlowProvider>
        <Flow id={params.id} />
      </ReactFlowProvider>
    </main>
  );
}
