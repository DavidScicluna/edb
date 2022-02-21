import { ReactElement } from 'react';

import { HStack, Center, Fade } from '@chakra-ui/react';

import {
	PeopleAltOutlined as PeopleAltOutlinedIcon,
	PeopleAltTwoTone as PeopleAltTwoToneIcon,
	TheatersOutlined as TheatersOutlinedIcon,
	TheatersTwoTone as TheatersTwoToneIcon,
	TvOutlined as TvOutlinedIcon,
	TvTwoTone as TvTwoToneIcon
} from '@material-ui/icons';
import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import { HeaderProps } from './types';

import { useSelector } from '../../../../common/hooks';
import DisplayMode from '../../../../components/Clickable/DisplayMode';
import Divider from '../../../../components/Divider';
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
				<TabList color={color}>
					{[
						{
							label: 'Movies',
							renderLeft: ({ isSelected, width, height }) =>
								isSelected ? (
									<TheatersTwoToneIcon style={{ width, height }} />
								) : (
									<TheatersOutlinedIcon style={{ width, height }} />
								)
						},
						{
							label: 'TV Shows',
							renderLeft: ({ isSelected, width, height }) =>
								isSelected ? (
									<TvTwoToneIcon style={{ width, height }} />
								) : (
									<TvOutlinedIcon style={{ width, height }} />
								)
						},
						{
							label: 'People',
							renderLeft: ({ isSelected, width, height }) =>
								isSelected ? (
									<PeopleAltTwoToneIcon style={{ width, height }} />
								) : (
									<PeopleAltOutlinedIcon style={{ width, height }} />
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
