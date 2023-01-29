import { FC } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import SearchInfoSm from './components/SearchInfoSm';
import SearchInfoXl from './components/SearchInfoXl';
import { SearchInfosCommonProps as SearchInfoProps } from './common/types';

const SearchInfo: FC<SearchInfoProps> = ({ total }) => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	return isSm ? <SearchInfoSm total={{ ...total }} /> : <SearchInfoXl total={{ ...total }} />;
};

export default SearchInfo;
