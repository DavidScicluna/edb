import { ReactElement } from 'react';

import { Icon } from '@davidscicluna/component-library';

import { HStack, Center } from '@chakra-ui/react';

import { MediaType as MediaType } from '../../common/types';

import MediaTypeItem from './components/MediaTypeItem';
import { MediaTypeItem as MediaTypeItemType } from './components/MediaTypeItem/types';
import { MediaTypesProps } from './types';

export const mediaTypesList: MediaTypeItemType[] = [
	{
		renderLeft: ({ isActive, fontSize }) => (
			<Icon icon='theaters' category={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'Movies',
		value: 'movie'
	},
	{
		renderLeft: ({ isActive, fontSize }) => (
			<Icon icon='tv' category={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'TV Shows',
		value: 'tv'
	},
	{
		renderLeft: ({ isActive, fontSize }) => (
			<Icon icon='people_alt' category={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'People',
		value: 'person'
	},
	{
		renderLeft: ({ isActive, fontSize }) => (
			<Icon icon='business' category={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'Companies',
		value: 'company'
	},
	{
		renderLeft: ({ isActive, fontSize }) => (
			<Icon icon='library_books' category={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
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
