import { ReactElement } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { useColorMode, useConst, Text } from '@chakra-ui/react';
import range from 'lodash/range';
import sample from 'lodash/sample';
import qs from 'query-string';

import { useSelector } from '../../../../../../../../../../../../common/hooks';
import Link from '../../../../../../../../../../../../components/Clickable/Link';
import SkeletonText from '../../../../../../../../../../../../components/Skeleton/Text';
import { defaultUser, getUser } from '../../../../../../../../../../../../store/slices/Users';

import { GenreProps } from './types';

const dummies = range(25, 200, 5);

const Genre = (props: GenreProps): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { id, name, isLoading = true } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize='md' isLoaded={!isLoading}>
			<Link to={{ pathname: '/movies/', search: qs.stringify({ with_genres: id }) }} isDisabled={isLoading}>
				<Text
					align='left'
					color={`gray.${colorMode === 'light' ? 900 : 50}`}
					fontSize='md'
					whiteSpace='nowrap'
					textDecorationStyle='wavy'
					textDecorationLine='underline'
					textDecorationThickness='from-font'
					textDecorationColor={`${color}.${colorMode === 'light' ? 500 : 400}`}
					sx={{
						transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
					}}
					_focus={{ boxShadow: 'none', color: `${color}.${colorMode === 'light' ? 600 : 300}` }}
					_hover={{ color: `${color}.${colorMode === 'light' ? 500 : 400}` }}
				>
					{name || 'Genre'}
				</Text>
			</Link>
		</SkeletonText>
	);
};

export default Genre;
