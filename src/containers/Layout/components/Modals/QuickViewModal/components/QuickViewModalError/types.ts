import { QueryError } from '../../../../../../../common/types';

export type QuickViewModalErrorProps = QueryError & { label: string; refetch?: () => void };
