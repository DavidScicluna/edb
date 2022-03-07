import { ReactElement } from 'react';

import { HStack, Center, Fade } from '@chakra-ui/react';

import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import { HeaderProps } from './types';

import { useSelector } from '../../../../common/hooks';
import DisplayMode from '../../../../components/Clickable/DisplayMode';
import Divider from '../../../../components/Divider';
import Icon from '../../../../components/Icon';
import TabList from '../../../../components/Tabs/components/TabList';

const Header = ({ activeTab }: HeaderProps): ReactElement => {
	const color = useSelector((state) => state.user.ui.theme.color);

	const [ref, { width, height }] = useElementSize();

	return (
		<HStack
			width='100%'
			minHeight='43px' // Size of DisplayMode since they might be un-rendered
			maxHeight='43px' // Size of DisplayMode since they might be un-rendered
			spacing={2}
			divider={!_.isNil(activeTab) ? <Divider orientation='vertical' height={`${height}px`} mx={2} /> : undefined}
		>
			<Center width={`calc(100% - ${!_.isNil(activeTab) ? width + 34 : 0}px)`}>
				<TabList color={color} size='lg'>
					{[
						{
							label: 'Movies',
							renderLeft: ({ isSelected, fontSize }) => (
								<Icon icon='theaters' type={isSelected ? 'filled' : 'outlined'} fontSize={fontSize} />
							)
						},
						{
							label: 'TV Shows',
							renderLeft: ({ isSelected, fontSize }) => (
								<Icon icon='tv' type={isSelected ? 'filled' : 'outlined'} fontSize={fontSize} />
							)
						},
						{
							label: 'People',
							renderLeft: ({ isSelected, fontSize }) => (
								<Icon icon='people_alt' type={isSelected ? 'filled' : 'outlined'} fontSize={fontSize} />
							)
						}
					]}
				</TabList>
			</Center>

			<Fade in={!_.isNil(activeTab)} unmountOnExit>
				<DisplayMode ref={ref} />
			</Fade>
		</HStack>
	);
};

export default Header;
