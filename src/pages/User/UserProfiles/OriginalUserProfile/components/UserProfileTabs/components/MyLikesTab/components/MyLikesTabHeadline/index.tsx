import { FC, useRef } from 'react';

import { Nullable, useTheme, Badge, BadgeLabel, utils } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useCountUp } from 'react-countup';
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { memoize } from 'lodash';
import numbro from 'numbro';

import { Headline } from '../../../../../../../../../../components';
import { useSelector, useUserTheme } from '../../../../../../../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../../../../common/utils';

import { MyLikesTabHeadlineProps } from './types';

const { convertStringToNumber } = utils;

const MyLikesTabHeadline: FC<MyLikesTabHeadlineProps> = ({ mediaType }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const countUpRef = useRef<Nullable<HTMLParagraphElement>>(null);

	const total = useSelector(
		(state) =>
			state.users.data.activeUser.data.liked.movie.length +
				state.users.data.activeUser.data.liked.tv.length +
				state.users.data.activeUser.data.liked.person.length +
				state.users.data.activeUser.data.liked.company.length +
				state.users.data.activeUser.data.liked.collection.length || 0
	);

	const { start, update } = useCountUp({
		ref: countUpRef,
		start: 0,
		end: total,
		delay: convertStringToNumber(theme.transition.duration.slower, 'ms') / 1000,
		duration: convertStringToNumber(theme.transition.duration.slower, 'ms') / 1000,
		formattingFn: memoize((end): string =>
			mediaType
				? `Total of ${numbro(end).format({ average: true })} ${formatMediaTypeLabel({
						type: total === 1 ? 'single' : 'multiple',
						mediaType
				  })} liked`
				: `Total of ${numbro(end).format({ average: true })} likes`
		),
		startOnMount: false
	});

	useEffectOnce(() => start());

	useUpdateEffect(() => update(total), [total]);

	return (
		<Headline
			width='100%'
			renderCaption={() => (
				<Badge color={color} colorMode={colorMode} size='xs'>
					<BadgeLabel>
						<p ref={countUpRef} />
					</BadgeLabel>
				</Badge>
			)}
			renderTitle={(props) => <Text {...props}>My Likes</Text>}
			renderSubtitle={(props) => (
				<Text {...props}>
					This Tab contains all likes that have been added to the likes list and all are separated into their
					respective tab depending on the media type.
				</Text>
			)}
		/>
	);
};

export default MyLikesTabHeadline;
