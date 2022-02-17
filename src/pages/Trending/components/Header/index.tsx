import { ReactElement } from 'react';

import { useTheme, HStack, Fade } from '@chakra-ui/react';

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
import { Theme } from '../../../../theme/types';

const Header = ({ activeTab }: HeaderProps): ReactElement => {
	const theme = useTheme<Theme>();

	const color = useSelector((state) => state.user.ui.theme.color);

	const [ref, { height }] = useElementSize();

	return (
		<HStack
			ref={ref}
			width='100%'
			minHeight='43px' // Size of DisplayMode since they might be un-rendered
			maxHeight='43px' // Size of DisplayMode since they might be un-rendered
			spacing={2}
			divider={
				<Fade
					in={!_.isNil(activeTab)}
					unmountOnExit
					style={{ marginLeft: theme.space[2], marginRight: theme.space[2] }}
				>
					<Divider orientation='vertical' height={`${height}px`} />
				</Fade>
			}
		>
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

			<Fade in={!_.isNil(activeTab)} unmountOnExit>
				<DisplayMode />
			</Fade>
		</HStack>
	);
};

export default Header;
