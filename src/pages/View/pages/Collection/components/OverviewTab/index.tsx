import { ReactElement } from 'react';

import { VStack, Collapse } from '@chakra-ui/react';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';


import Paragraph from '../../../../../../components/Paragraph';
import Media from '../../../../components/Media';

import { OverviewTabProps } from './types';

const OverviewTab = ({ collectionQuery, imagesQuery, onClickImage, onChangeTab }: OverviewTabProps): ReactElement => {
	return (
		<VStack width='100%' spacing={4}>
			<Collapse
				in={
					!(isNil(collectionQuery.data?.overview) || isEmpty(collectionQuery.data?.overview)) ||
					collectionQuery.isFetching ||
					collectionQuery.isLoading
				}
				unmountOnExit
				style={{ width: '100%' }}
			>
				<Paragraph
					title='Overview'
					paragraphs={collectionQuery.data?.overview || ''}
					isLoading={collectionQuery.isFetching || collectionQuery.isLoading}
				/>
			</Collapse>

			<Media
				alt={collectionQuery.data?.name}
				assets={compact([
					{
						label: 'Posters',
						type: 'poster',
						isDisabled: (imagesQuery.data?.posters || []).length === 0,
						data: imagesQuery.data?.posters || []
					},
					{
						label: 'Backdrops',
						type: 'backdrop',
						isDisabled: (imagesQuery.data?.backdrops || []).length === 0,
						data: imagesQuery.data?.backdrops || []
					}
				])}
				mediaType='collection'
				isError={{
					images: imagesQuery.isError
				}}
				isSuccess={{
					images: imagesQuery.isSuccess
				}}
				isLoading={{
					images: imagesQuery.isFetching || imagesQuery.isLoading
				}}
				onAssetClick={(path: string) => onClickImage(path)}
				onFooterClick={() => onChangeTab(2)}
			/>
		</VStack>
	);
};

export default OverviewTab;
