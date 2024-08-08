"use client";
import RichEditor from "@/components/common/editor/RichEditor";

export default function LexicalPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Lexical</h1>
      <div className="text-lg">This is the Lexical page.</div>
      <div className="mt-5 min-w-[50%] p-2 rounded-md bg-stone-100 text-stone-950">
        <RichEditor isDev className="h-[70vh]" />
      </div>
    </div>
  );
}
