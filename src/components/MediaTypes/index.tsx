import { ReactElement } from 'react';

import { HStack, Center } from '@chakra-ui/react';

import {
	LibraryBooksOutlined as LibraryBooksOutlinedIcon,
	LibraryBooksTwoTone as LibraryBooksTwoToneIcon,
	PeopleAltOutlined as PeopleAltOutlinedIcon,
	PeopleAltTwoTone as PeopleAltTwoToneIcon,
	TheatersOutlined as TheatersOutlinedIcon,
	TheatersTwoTone as TheatersTwoToneIcon,
	TvOutlined as TvOutlinedIcon,
	TvTwoTone as TvTwoToneIcon,
	BusinessOutlined as BusinessOutlinedIcon,
	BusinessTwoTone as BusinessTwoToneIcon
} from '@material-ui/icons';

import MediaTypeItem from './components/MediaTypeItem';
import { MediaTypeItem as MediaTypeItemType } from './components/MediaTypeItem/types';
import { MediaTypesProps } from './types';

import { MediaType as MediaType } from '../../common/types';

export const mediaTypesList: MediaTypeItemType[] = [
	{
		renderIcon: ({ isActive, fontSize }) =>
			isActive ? <TheatersTwoToneIcon style={{ fontSize }} /> : <TheatersOutlinedIcon style={{ fontSize }} />,
		label: 'Movies',
		value: 'movie'
	},
	{
		renderIcon: ({ isActive, fontSize }) =>
			isActive ? <TvTwoToneIcon style={{ fontSize }} /> : <TvOutlinedIcon style={{ fontSize }} />,
		label: 'TV Shows',
		value: 'tv'
	},
	{
		renderIcon: ({ isActive, fontSize }) =>
			isActive ? <PeopleAltTwoToneIcon style={{ fontSize }} /> : <PeopleAltOutlinedIcon style={{ fontSize }} />,
		label: 'People',
		value: 'person'
	},
	{
		renderIcon: ({ isActive, fontSize }) =>
			isActive ? <BusinessTwoToneIcon style={{ fontSize }} /> : <BusinessOutlinedIcon style={{ fontSize }} />,
		label: 'Companies',
		value: 'company'
	},
	{
		renderIcon: ({ isActive, fontSize }) =>
			isActive ? (
				<LibraryBooksTwoToneIcon style={{ fontSize }} />
			) : (
				<LibraryBooksOutlinedIcon style={{ fontSize }} />
			),
		label: 'Collections',
		value: 'collection'
	}
];

const MediaTypes = <MT extends MediaType>(props: MediaTypesProps<MT>): ReactElement => {
	const { mediaTypes, mediaType, onSetType } = props;

	const handleClick = (mediaType: MediaType): void => {
		onSetType(mediaType);
	};

	return (
		<HStack width='100%' wrap='wrap' spacing={0} gap={2}>
			{mediaTypesList.map((mediaTypeItem) =>
				(mediaTypes && mediaTypes.includes(mediaTypeItem.value)) || !mediaTypes ? (
					<Center flex={1}>
						<MediaTypeItem
							{...mediaTypeItem}
							key={mediaTypeItem.value}
							isActive={mediaTypeItem.value === mediaType}
							onClick={handleClick}
						/>
					</Center>
				) : null
			)}
		</HStack>
	);
};

export default MediaTypes;
