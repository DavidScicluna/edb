import { ReactElement } from 'react';

import { Badge, BadgeLabel } from '@davidscicluna/component-library';

import { HStack, Center } from '@chakra-ui/react';

import CountUp from 'react-countup';
import { useElementSize } from 'usehooks-ts';

import { useSelector } from '../../../../../../../../../../common/hooks';
import DisplayMode from '../../../../../../../../../../components/Clickable/DisplayMode';
import Divider from '../../../../../../../../../../components/Divider';
import TabList from '../../../../../../../../../../components/Tabs/components/TabList';
import { defaultUser, getUser } from '../../../../../../../../../../store/slices/Users';

import { HeaderProps } from './types';

const Header = ({ movies = 0, shows = 0 }: HeaderProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const [ref, { width, height }] = useElementSize();

	return (
		<HStack width='100%' divider={<Divider orientation='vertical' height={`${height}px`} mx={2} />} spacing={2}>
			<Center width={`calc(100% - ${width + 34}px)`}>
				<TabList color={color}>
					{[
						{
							label: 'Movies',
							isDisabled: movies === 0,
							renderRight: ({ isSelected, size }) => (
								<Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
									<BadgeLabel>
										<CountUp duration={1} end={movies} />
									</BadgeLabel>
								</Badge>
							)
						},
						{
							label: 'TV Shows',
							isDisabled: shows === 0,
							renderRight: ({ isSelected, size }) => (
								<Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
									<BadgeLabel>
										<CountUp duration={1} end={shows} />
									</BadgeLabel>
								</Badge>
							)
						}
					]}
				</TabList>
			</Center>

			<DisplayMode ref={ref} />
		</HStack>
	);
};

export default Header;
