import React, { type HTMLAttributes } from "react";
import {
  Handle,
  type HandleProps,
  type IsValidConnection,
} from "@xyflow/react";
import { clsx } from "clsx";

type CustomHandleProps = HandleProps &
  Omit<HTMLAttributes<HTMLDivElement>, "id">;

export default function CustomHandle(props: CustomHandleProps) {
  const isValidConnection: IsValidConnection = (connection) => {
    return connection.source !== connection.target;
  };

  return (
    <Handle
      {...props}
      className={clsx(["!bg-neutral-700 p-1", props.className])}
      isValidConnection={isValidConnection}
      style={{ borderRadius: "50%", ...props.style }}
    />
  );
}
