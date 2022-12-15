import { FC } from 'react';

import { Tag, TagLabel, TagDeleteIconButton } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../common/hooks';
import { useKeywordQuery } from '../../../../../../../common/queries';

import { KeywordProps } from './types';

const Keyword: FC<KeywordProps> = ({ id, onDelete }) => {
	const { color, colorMode } = useUserTheme();

	const { data: keyword } = useKeywordQuery({ props: { id } });

	return keyword && keyword.name ? (
		<Tag color={color} colorMode={colorMode} size='sm' variant='outlined'>
			<TagLabel>{keyword?.name || id}</TagLabel>
			<TagDeleteIconButton onDelete={() => onDelete()} />
		</Tag>
	) : null;
};

export default Keyword;
