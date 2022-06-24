import { ReactElement } from 'react';

import { Skeleton, Icon } from '@davidscicluna/component-library';

import { Box } from '@chakra-ui/react';
import YouTube, { Options } from 'react-youtube';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { handleReturnRatio } from '../../../../../../common/utils';
import ClickableImage from '../../../../../../components/Clickable/Image';

import { AssetVideoProps } from './types';

import './styles.css';

const opts: Options = {
	playerVars: {
		autoplay: 0,
		controls: 0,
		color: 'white',
		enablejsapi: 1,
		disablekb: 1,
		mute: 1,
		fs: 0,
		loop: 1,
		modestbranding: 1,
		showinfo: 0
	}
};

const AssetVideo = (props: AssetVideoProps): ReactElement => {
	const { alt, videoId, isLoading = true, onClickVideo } = props;

	return (
		<Box aria-label={alt} width='100%' borderRadius='lg'>
			<ClickableImage
				width='100%'
				ratio={handleReturnRatio('square')}
				borderRadius='lg'
				isDisabled={isLoading || isNil(videoId) || isEmpty(videoId)} // TODO: Check if is working!
				renderIcon={({ color, fontSize }) => (
					<Icon icon='play_arrow' category='outlined' color={color} fontSize={fontSize} />
				)}
				onClick={onClickVideo && videoId ? () => onClickVideo(videoId) : undefined}
			>
				<Skeleton borderRadius='lg' isLoaded={!isLoading}>
					<YouTube
						videoId={videoId}
						className='VideoGalleryFrame'
						containerClassName='VideoGalleryContainer'
						opts={opts}
					/>
				</Skeleton>
			</ClickableImage>
		</Box>
	);
};

export default AssetVideo;
