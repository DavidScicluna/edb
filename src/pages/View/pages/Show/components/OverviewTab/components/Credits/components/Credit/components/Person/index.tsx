import { ReactElement } from 'react';

import { useTheme, Skeleton } from '@davidscicluna/component-library';

import { useColorMode, useConst, Text } from '@chakra-ui/react';
import range from 'lodash/range';
import sample from 'lodash/sample';

import { useSelector } from '../../../../../../../../../../../../common/hooks';
import Link from '../../../../../../../../../../../../components/Clickable/Link';
import { defaultUser, getUser } from '../../../../../../../../../../../../store/slices/Users';

import { PersonProps } from './types';

const dummies = range(25, 200, 5);

const Person = ({ person, isLoading = true }: PersonProps): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const dummy = useConst<number>(sample(dummies) || 50);

	return (
		<Link to={{ pathname: `/people/${person?.id}` }} isDisabled={isLoading}>
			<Skeleton width={isLoading ? `${dummy}px` : 'auto'} isLoaded={!isLoading} type='text'>
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
					{person?.name || 'Person Name'}
				</Text>
			</Skeleton>
		</Link>
	);
};

export default Person;
