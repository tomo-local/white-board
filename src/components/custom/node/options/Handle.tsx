import React, { type HTMLAttributes } from "react";
import { Handle, type Connection, type HandleProps } from "reactflow";
import { clsx } from "clsx";

type CustomHandleProps = HandleProps &
  Omit<HTMLAttributes<HTMLDivElement>, "id">;

export default function CustomHandle(props: CustomHandleProps) {
  const isValidConnection = (connection: Connection) => {
    return connection.source !== connection.target;
  };

  return (
    <Handle
      {...props}
      className={clsx(["!bg-stone-800", props.className])}
      isValidConnection={isValidConnection}
      style={{ borderRadius: "50%", ...props.style }}
    />
  );
}
