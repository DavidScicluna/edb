import { ReactElement, useState, Fragment } from 'react';
import CountUp from 'react-countup';

import { Collapse, Fade } from '@chakra-ui/react';

import { range } from 'lodash';

import Footer from './components/Footer';
import Image from './components/Image';
import Video from './components/Video';
import { MediaProps } from './types';

import { useSelector } from '../../../../common/hooks';
import { handleReturnBoringTypeByMediaType } from '../../../../common/utils';
import Badge from '../../../../components/Badge';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import HorizontalTabbedGrid from '../../../../components/Grid/Horizontal/Tabbed';

const Media = (props: MediaProps): ReactElement => {
	const color = useSelector((state) => state.user.ui.theme.color);

	const { alt = '', assets, mediaType, isError, isSuccess, isLoading, onAssetClick, onFooterClick } = props;

	const [activeTab, setActiveTab] = useState<number>(0);

	return (
		<HorizontalTabbedGrid
			activeTab={activeTab}
			onChange={(index: number) => setActiveTab(index)}
			footer={
				assets[activeTab] && !assets[activeTab].isDisabled ? (
					<Collapse in unmountOnExit style={{ width: '100%' }}>
						<Footer
							label={assets[activeTab] ? assets[activeTab].label : ''}
							total={assets[activeTab] ? assets[activeTab].data.length : 0}
							isDisabled={isLoading.images || isLoading.videos || isError.images || isError.videos}
							onClick={onFooterClick}
						/>
					</Collapse>
				) : undefined
			}
			isDisabled={
				isLoading.images ||
				isLoading.videos ||
				isError.images ||
				isError.videos ||
				(assets[activeTab] && assets[activeTab].isDisabled)
			}
			renderTabListProps={{
				color,
				children: assets.map((asset) => {
					return {
						label: asset.label,
						isDisabled: asset.isDisabled || false,
						renderRight:
							(asset.data?.length || 0) > 0
								? ({ isSelected, size }) => (
										<Fade in unmountOnExit>
											<Badge
												color={isSelected ? color : 'gray'}
												isLight={!isSelected}
												size={size}
											>
												<CountUp duration={1} end={asset.data?.length || 0} />
											</Badge>
										</Fade>
								  )
								: undefined
					};
				})
			}}
		>
			{assets.map((asset, index: number) => (
				<Fragment key={index}>
					{!isLoading[asset.type === 'video' ? 'videos' : 'images'] &&
					isError[asset.type === 'video' ? 'videos' : 'images'] ? (
						<Error
							label='Oh no! Something went wrong'
							description={`Failed to fetch ${alt ? `"${alt}"` : ''} ${asset.type}!`}
							variant='transparent'
						/>
					) : !isLoading[asset.type === 'video' ? 'videos' : 'images'] &&
					  isSuccess[asset.type === 'video' ? 'videos' : 'images'] &&
					  asset.data.length === 0 ? (
						<Empty
							label={alt ? `"${alt}" has no ${asset.type}` : `Couldn't find any ${asset.type}s`}
							variant='transparent'
						/>
					) : !isLoading[asset.type === 'video' ? 'videos' : 'images'] &&
					  isSuccess[asset.type === 'video' ? 'videos' : 'images'] &&
					  asset.data.length > 0 ? (
						asset.data
							.filter((_item, index) => index < 10)
							.map((item, index: number) =>
								asset.type === 'video' ? (
									<Video
										key={index}
										alt={alt}
										videoId={item.key}
										isLoading={false}
										onClick={() => onAssetClick(item.key || '', 'video')}
									/>
								) : (
									<Image
										key={index}
										alt={alt}
										path={item.file_path}
										ratio={item.aspect_ratio}
										type={asset.type}
										boringType={handleReturnBoringTypeByMediaType(
											mediaType === 'movie' ? 'movie' : mediaType === 'tv' ? 'tv' : 'person'
										)}
										isLoading={false}
										onClick={() => onAssetClick(item.file_path || '', 'image')}
									/>
								)
							)
					) : (
						range(0, 10).map((_dummy, index: number) =>
							asset.type === 'video' ? (
								<Video key={index} alt={alt} isLoading />
							) : (
								<Image
									key={index}
									alt={alt}
									type={asset.type}
									boringType={handleReturnBoringTypeByMediaType(
										mediaType === 'movie' ? 'movie' : mediaType === 'tv' ? 'tv' : 'person'
									)}
									isLoading
								/>
							)
						)
					)}
				</Fragment>
			))}
		</HorizontalTabbedGrid>
	);
};

export default Media;
