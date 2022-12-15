import { Keyword } from '../../../../../../../common/types';

export type KeywordProps = Pick<Keyword, 'id'> & { onDelete: () => void };
