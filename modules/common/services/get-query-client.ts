import {
  isServer,
  QueryClient,
  QueryKey,
  UseMutationOptions,
} from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
        refetchOnMount: "always",
        refetchOnReconnect: "always",
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
        networkMode: "offlineFirst",
        // gcTime: 60 * 1000,
      },
    },
  });
}

export const buildOptions = <
  TData,
  TError,
  TVariables,
  TContext,
  TKey extends QueryKey
>(
  queryClient: QueryClient,
  queryKey?: TKey,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationOptions<TData, TError, TVariables, TContext> => {
  return {
    ...options,
    onSuccess: async (...args) => {
      if (options?.onSuccess) {
        options.onSuccess(...args);
      }

      if (queryKey !== undefined) {
        await queryClient.invalidateQueries({
          queryKey: queryKey as QueryKey,
        });
        await queryClient.refetchQueries({
          queryKey: queryKey as QueryKey,
        });
      }
    },
  };
};

export type TQueryKey<TKey, TListQuery = unknown, TDetailQuery = string> = {
  all: [TKey];
  lists: () => [...TQueryKey<TKey>["all"], "list"];
  list: (
    query?: TListQuery
  ) => [...ReturnType<TQueryKey<TKey>["lists"]>, TListQuery | undefined];
  details: () => [...TQueryKey<TKey>["all"], "detail"];
  detail: (
    id: TDetailQuery
  ) => [...ReturnType<TQueryKey<TKey>["details"]>, TDetailQuery];
};

export const queryKeysFactory = <TKey extends string>(
  key: TKey
): TQueryKey<TKey> => ({
  all: [key],
  lists: () => [key, "list"],
  list: (query) => [key, "list", query],
  details: () => [key, "detail"],
  detail: (id) => [key, "detail", id],
});
