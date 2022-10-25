import { FC } from 'react';

import { Tag, TagLabel, TagDeleteIconButton } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../common/hooks';

import { CountRangeProps } from './types';

const CountRange: FC<CountRangeProps> = ({ counts, onClick, onDelete }) => {
	const { color, colorMode } = useUserTheme();

	return (
		<Tag
			color={color}
			colorMode={colorMode}
			isClickable={!!onClick}
			onClick={onClick ? () => onClick() : undefined}
			variant='outlined'
		>
			<TagLabel>
				{`Count${counts.length === 1 ? '' : 's'}: ${counts.map((count) => `${count} ratings`).join(' -> ')}`}
			</TagLabel>
			{!!onDelete && <TagDeleteIconButton onDelete={() => onDelete()} />}
		</Tag>
	);
};

export default CountRange;
