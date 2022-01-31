import { ReactElement } from 'react';

import { useTheme, Box, AspectRatio, ScaleFade, Fade } from '@chakra-ui/react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../common/hooks';
import { MediaType } from '../../../../../common/types';
import { handleIsTouchDevice, handleReturnBoringTypeByMediaType } from '../../../../../common/utils';
import Button from '../../../../../components/Clickable/Button';
import Skeleton from '../../../../../components/Skeleton';
import { toggleQuickView } from '../../../../../store/slices/Modals';
import { Theme } from '../../../../../theme/types';
import Image from '../../../../Image';
import { PosterImageProps } from './types';

const width = ['100px', '116px', '152px', '188px', '188px', '224px'];

const PosterImage = <MT extends MediaType>(props: PosterImageProps<MT>): ReactElement => {
  const theme = useTheme<Theme>();

  const dispatch = useDispatch();
  const color = useSelector((state) => state.user.ui.theme.color);

  const {
    mediaItem,
    mediaType,
    title,
    image,
    isLoading = true,
    isHovering = false,
    inView = false,
    onMouseChange
  } = props;

  return (
    <AspectRatio as={Fade} in={inView} width={width} borderRadius='base' ratio={2 / 3}>
      <>
        <Skeleton borderRadius='base' isLoaded={!isLoading && inView}>
          <Image
            alt={image?.alt || ''}
            borderRadius='base'
            boringType={handleReturnBoringTypeByMediaType(mediaType)}
            thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${image?.size.thumbnail || ''}${image?.src || ''}`}
            fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${image?.size.full || ''}${image?.src || ''}`}
          />
        </Skeleton>

        {/* Quick View component */}
        {!(_.isNil(mediaItem) || _.isEmpty(mediaItem)) && !handleIsTouchDevice() ? (
          <ScaleFade in={isHovering && !isLoading} unmountOnExit>
            <Box
              position='absolute'
              bottom={theme.space[1]}
              width='100%'
              onMouseEnter={() => onMouseChange(true)}
              onMouseLeave={() => onMouseChange(false)}
              px={1}
            >
              <Button
                color={color}
                isFullWidth
                onClick={() =>
                  dispatch(toggleQuickView({ open: true, mediaType, mediaItem: { id: mediaItem?.id || -1, title } }))
                }
                size='sm'
              >
                Quick view
              </Button>
            </Box>
          </ScaleFade>
        ) : null}
      </>
    </AspectRatio>
  );
};

export default PosterImage;
