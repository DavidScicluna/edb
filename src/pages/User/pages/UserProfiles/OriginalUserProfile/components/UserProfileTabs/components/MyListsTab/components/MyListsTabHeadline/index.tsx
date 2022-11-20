import { FC, useRef } from 'react';

import { Nullable, useTheme, Badge, BadgeLabel, utils } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useCountUp } from 'react-countup';
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { memoize } from 'lodash';
import numbro from 'numbro';

import { Headline } from '../../../../../../../../../../../components';
import { useSelector, useUserTheme } from '../../../../../../../../../../../common/hooks';

const { convertStringToNumber } = utils;

const MyListsTabHeadline: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const countUpRef = useRef<Nullable<HTMLParagraphElement>>(null);

	const total = useSelector((state) => state.users.data.activeUser.data.lists.length);

	const { start, update } = useCountUp({
		ref: countUpRef,
		start: 0,
		end: total,
		delay: convertStringToNumber(theme.transition.duration.slower, 'ms') / 1000,
		duration: convertStringToNumber(theme.transition.duration.slower, 'ms') / 1000,
		formattingFn: memoize(
			(end): string => `Total of ${numbro(end).format({ average: true })} ${total === 1 ? 'list' : 'lists'}`
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
			renderTitle={(props) => <Text {...props}>My Lists</Text>}
			renderSubtitle={(props) => (
				<Text {...props}>
					This Tab contains all the lists that you have created and all the bookmarks that have been added to
					the list and all are separated into their respective tab depending on the media type.
				</Text>
			)}
		/>
	);
};

export default MyListsTabHeadline;
