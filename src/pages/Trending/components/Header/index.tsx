import { ReactElement } from 'react';

import { Icon } from '@davidscicluna/component-library';
import { HStack, Center, Fade } from '@chakra-ui/react';

import isNil from 'lodash/isNil';
import { useElementSize } from 'usehooks-ts';

import { useSelector } from '../../../../common/hooks';
import DisplayMode from '../../../../components/Clickable/DisplayMode';
import Divider from '../../../../components/Divider';
import TabList from '../../../../components/Tabs/components/TabList';
import { defaultUser, getUser } from '../../../../store/slices/Users';

import { HeaderProps } from './types';

const Header = ({ activeTab }: HeaderProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const [ref, { width, height }] = useElementSize();

	return (
		<HStack
			width='100%'
			minHeight='43px' // Size of DisplayMode since they might be un-rendered
			maxHeight='43px' // Size of DisplayMode since they might be un-rendered
			spacing={2}
			divider={!isNil(activeTab) ? <Divider orientation='vertical' height={`${height}px`} mx={2} /> : undefined}
		>
			<Center width={`calc(100% - ${!isNil(activeTab) ? width + 34 : 0}px)`}>
				<TabList color={color}>
					{[
						{
							label: 'Movies',
							renderLeft: ({ isSelected, fontSize }) => (
								<Icon
									icon='theaters'
									category={isSelected ? 'filled' : 'outlined'}
									fontSize={fontSize}
								/>
							)
						},
						{
							label: 'TV Shows',
							renderLeft: ({ isSelected, fontSize }) => (
								<Icon icon='tv' category={isSelected ? 'filled' : 'outlined'} fontSize={fontSize} />
							)
						},
						{
							label: 'People',
							renderLeft: ({ isSelected, fontSize }) => (
								<Icon
									icon='people_alt'
									category={isSelected ? 'filled' : 'outlined'}
									fontSize={fontSize}
								/>
							)
						}
					]}
				</TabList>
			</Center>

			<Fade in={!isNil(activeTab)} unmountOnExit>
				<DisplayMode ref={ref} />
			</Fade>
		</HStack>
	);
};

export default Header;
