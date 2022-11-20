import { FC } from 'react';

import { Tag, TagLabel, TagDeleteIconButton } from '@davidscicluna/component-library';

import dayjs from 'dayjs';
import { compact } from 'lodash';

import { useUserTheme } from '../../../../../common/hooks';
import { visible as visibleFormat } from '../../../common/data/formats';

import { DatesProps } from './types';

const Dates: FC<DatesProps> = ({ dates, mediaType, onClick, onDelete }) => {
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
				{[
					mediaType === 'movie' ? 'Release Date' : 'First Air Date',
					dayjs(dates.gte).isSame(dayjs(dates.lte), 'date')
						? dayjs(dates.gte).format(visibleFormat)
						: compact([
								dates.gte ? `From: ${dayjs(dates.gte).format(visibleFormat)}` : null,
								dates.lte ? `To: ${dayjs(dates.lte).format(visibleFormat)}` : null
						  ]).join(' -> ')
				].join(': ')}
			</TagLabel>
			{!!onDelete && <TagDeleteIconButton onDelete={() => onDelete()} />}
		</Tag>
	);
};

export default Dates;
