import { FC } from 'react';

import { Tag, TagLabel, TagDeleteIconButton } from '@davidscicluna/component-library';

import { compact } from 'lodash';

import { useUserTheme } from '../../../../../common/hooks';
import { useKeywordsQueries } from '../../../../../common/queries';

import { KeywordsProps } from './types';

const Keywords: FC<KeywordsProps> = ({ keywords, onClick, onDelete }) => {
	const { color, colorMode } = useUserTheme();

	const queries = useKeywordsQueries({ props: { keywords } });

	return (
		<Tag
			color={color}
			colorMode={colorMode}
			isClickable={!!onClick}
			onClick={onClick ? () => onClick() : undefined}
			variant='outlined'
		>
			<TagLabel>
				{`Keyword${keywords.length === 1 ? '' : 's'}: ${compact(queries.map(({ data }) => data))
					.map(({ name }) => name)
					.join(', ')}`}
			</TagLabel>
			{!!onDelete && <TagDeleteIconButton onDelete={() => onDelete()} />}
		</Tag>
	);
};

export default Keywords;
