import { useQueries, UseQueryOptions, UseQueryResult } from 'react-query';

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

type Return<T> = {
  [ArrayElement in keyof T]: UseQueryResult<
    T[ArrayElement] extends { select: infer TSelect }
      ? TSelect extends (data: unknown) => unknown
        ? ReturnType<TSelect>
        : never
      : Awaited<ReturnType<NonNullable<Extract<T[ArrayElement], UseQueryOptions>['queryFn']>>>
  >;
};

/**
 * https://blog.johnnyreilly.com/2021/01/03/strongly-typing-react-query-s-usequeries/
 */
const useQueriesTyped = <T extends readonly UseQueryOptions[]>(queries: [...T]): Return<T> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQueries(queries as UseQueryOptions<unknown, unknown, unknown>[]) as any;
};

export default useQueriesTyped;
