import { ReactElement } from 'react';

import { HStack, Center } from '@chakra-ui/react';

import MediaTypeItem from './components/MediaTypeItem';
import { MediaTypeItem as MediaTypeItemType } from './components/MediaTypeItem/types';
import { MediaTypesProps } from './types';

import { MediaType as MediaType } from '../../common/types';
import Icon from '../Icon';

export const mediaTypesList: MediaTypeItemType[] = [
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='theaters' type={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'Movies',
		value: 'movie'
	},
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='tv' type={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'TV Shows',
		value: 'tv'
	},
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='people_alt' type={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'People',
		value: 'person'
	},
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='business' type={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'Companies',
		value: 'company'
	},
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='library_books' type={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
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
