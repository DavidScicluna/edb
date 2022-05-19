import { ReactElement } from 'react';

import { useTheme, useColorMode, useConst, Text } from '@chakra-ui/react';

import range from 'lodash/range';
import sample from 'lodash/sample';


import { useSelector } from '../../../../../../../../../../../../common/hooks';
import Link from '../../../../../../../../../../../../components/Clickable/Link';
import SkeletonText from '../../../../../../../../../../../../components/Skeleton/Text';
import { defaultUser, getUser } from '../../../../../../../../../../../../store/slices/Users';
import { Theme } from '../../../../../../../../../../../../theme/types';

import { PersonProps } from './types';

const dummies = range(25, 200, 5);

const Person = ({ person, isLoading = true }: PersonProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const dummy = useConst<number>(sample(dummies) || 50);

	return (
		<Link to={{ pathname: `/people/${person?.id}` }} isDisabled={isLoading}>
			<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize='md' isLoaded={!isLoading}>
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
			</SkeletonText>
		</Link>
	);
};

export default Person;
