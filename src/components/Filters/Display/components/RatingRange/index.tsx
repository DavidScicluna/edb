import { FC } from 'react';

import { Tag, TagLabel, TagDeleteIconButton } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../common/hooks';

import { RatingRangeProps } from './types';

const RatingRange: FC<RatingRangeProps> = ({ ratings, onClick, onDelete }) => {
	const { color, colorMode } = useUserTheme();

	return (
		<Tag
			color={color}
			colorMode={colorMode}
			isClickable={!!onClick}
			onClick={onClick ? () => onClick() : undefined}
			variant='outlined'
		>
			<TagLabel>{`Rating${ratings.length === 1 ? '' : 's'}: ${ratings.join(' -> ')}`}</TagLabel>
			{!!onDelete && <TagDeleteIconButton onDelete={() => onDelete()} />}
		</Tag>
	);
};

export default RatingRange;
