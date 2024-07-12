import { Handle, type Connection, type HandleProps } from "reactflow";

type CustomHandleProps = Omit<HandleProps, "isValidConnection">;

export default function CustomHandle(props: CustomHandleProps) {

  const isValidConnection = (connection: Connection) => {
    return connection.source !== connection.target;
  };

  return <Handle {...props} isValidConnection={isValidConnection} />;
}
