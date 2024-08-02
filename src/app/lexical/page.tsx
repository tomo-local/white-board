"use client";

import RichEditor from "@/components/common/editor/RichEditor";

export default function LexicalPage() {
  return (
    <main className="">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Lexical</h1>
        <p className="text-lg">This is the Lexical page.</p>
        <div className="mt-5 min-w-[50%] p-2 rounded-md bg-stone-100 text-stone-950">
          <RichEditor />
        </div>
      </div>
    </main>
  );
}
