import { FC } from 'react';

import { Tag, TagLabel, TagDeleteIconButton } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../common/hooks';

import { RuntimeRangeProps } from './types';

const RuntimeRange: FC<RuntimeRangeProps> = ({ runtimes, onClick, onDelete }) => {
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
				{`Runtime${runtimes.length === 1 ? '' : 's'}: ${runtimes
					.map((runtime) => `${runtime} minutes`)
					.join(' -> ')}`}
			</TagLabel>
			{!!onDelete && <TagDeleteIconButton onDelete={() => onDelete()} />}
		</Tag>
	);
};

export default RuntimeRange;
