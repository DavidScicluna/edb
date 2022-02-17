import { ReactElement } from 'react';
import CountUp from 'react-countup';

import { HStack } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { HeaderProps } from './types';

import { useSelector } from '../../../../../../../../../../common/hooks';
import Badge from '../../../../../../../../../../components/Badge';
import DisplayMode from '../../../../../../../../../../components/Clickable/DisplayMode';
import Divider from '../../../../../../../../../../components/Divider';
import TabList from '../../../../../../../../../../components/Tabs/components/TabList';

const Header = ({ movies = 0, shows = 0 }: HeaderProps): ReactElement => {
	const color = useSelector((state) => state.user.ui.theme.color);

	const [ref, { height }] = useElementSize();

	return (
		<HStack width='100%' divider={<Divider orientation='vertical' height={`${height}px`} mx={2} />} spacing={2}>
			<TabList color={color}>
				{[
					{
						label: 'Movies',
						isDisabled: movies === 0,
						renderRight: ({ isSelected, size }) => (
							<Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
								<CountUp duration={1} end={movies} />
							</Badge>
						)
					},
					{
						label: 'TV Shows',
						isDisabled: shows === 0,
						renderRight: ({ isSelected, size }) => (
							<Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
								<CountUp duration={1} end={shows} />
							</Badge>
						)
					}
				]}
			</TabList>

			<DisplayMode ref={ref} />
		</HStack>
	);
};

export default Header;
