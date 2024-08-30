import React, { type HTMLAttributes } from "react";
import {
  Handle,
  type HandleProps,
  type IsValidConnection,
} from "@xyflow/react";
import { clsx } from "clsx";

type CustomHandleProps = HandleProps &
  Omit<HTMLAttributes<HTMLDivElement>, "id"> & {
    visible: boolean;
  };

export default function CustomHandle(props: CustomHandleProps) {
  const handleProps = { ...props, visible: undefined };
  const { visible } = props;

  const isValidConnection: IsValidConnection = (connection) => {
    return connection.source !== connection.target;
  };

  return (
    <Handle
      {...handleProps}
      className={clsx([
        "!bg-neutral-700 p-1 opacity-0",
        visible && "opacity-100",
        props.className,
      ])}
      isValidConnection={isValidConnection}
      style={{ borderRadius: "50%", ...props.style }}
    />
  );
}
