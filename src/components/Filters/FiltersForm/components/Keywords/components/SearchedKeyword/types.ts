import { CenterProps } from '@chakra-ui/react';

import { Keyword } from '../../../../../../../common/types';

export type SearchedKeywordProps = Pick<Keyword, 'name'> & {
	isActive?: boolean;
} & Pick<CenterProps, 'onClick'>;
