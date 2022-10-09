import { FC } from 'react';

import { Tag, TagLabel, TagDeleteButton as TagDeleteIconButton } from '@davidscicluna/component-library';

import { useColorMode } from '@chakra-ui/react';

import { includes } from 'lodash';

import allSearchTypes from '../../../../common/data/searchTypes';

import { SearchInputSearchTypesProps } from './types';

const SearchInputSearchTypes: FC<SearchInputSearchTypesProps> = ({ searchTypes, onClear }) => {
	const { colorMode } = useColorMode();

	return (
		<Tag colorMode={colorMode} size='sm'>
			<TagLabel>
				{searchTypes.length === allSearchTypes.length
					? 'All'
					: allSearchTypes
							.filter(({ value }) => includes(searchTypes, value))
							.map(({ label }) => label)
							.join(' • ')}
			</TagLabel>

			{onClear && <TagDeleteIconButton onDelete={() => onClear()} />}
		</Tag>
	);
};

export default SearchInputSearchTypes;
