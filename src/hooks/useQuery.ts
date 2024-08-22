"use client";
import {
  useSearchParams,
  usePathname,
  useParams,
  useRouter,
} from "next/navigation";

type QueryPathParams = {
  n: string;
};

type QueryKeys = keyof QueryPathParams;

type QueryParams = {
  nodeId?: string;
};

type UseQuery = {
  id: string;
  query: QueryParams;
  set: (key: QueryKeys, value: string) => void;
  remove: (key: QueryKeys) => void;
};

const useQuery = (): UseQuery => {
  const { id }: { id: string } = useParams();
  const nextParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const get = (key: QueryKeys) => {
    return nextParams.get(key) as QueryPathParams[QueryKeys];
  };

  const set = (key: QueryKeys, value: QueryPathParams[QueryKeys]) => {
    const params = new URLSearchParams(nextParams);
    params.set(key, value);
    replace(`${pathname}?${params.toString()}`);
  };

  const remove = (key: QueryKeys) => {
    const params = new URLSearchParams(nextParams);
    params.delete(key);
    replace(`${pathname}?${params.toString()}`);
  };

  return {
    id: id,
    query: {
      nodeId: get("n"),
    },
    set: set,
    remove: remove,
  };
};

export default useQuery;
