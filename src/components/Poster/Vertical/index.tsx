import React, { ReactElement } from 'react';

import { useTheme, useBoolean, VStack, HStack, Box, AspectRatio, ScaleFade } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { MediaType } from '../../../common/types/types';
import { handleIsTouchDevice } from '../../../common/utils';
import Button from '../../../components/Clickable/Button';
import Card from '../../../components/Clickable/Card';
import Link from '../../../components/Clickable/Link';
import Skeleton from '../../../components/Skeleton';
import { toggleQuickView } from '../../../store/slices/Modals';
import { Theme } from '../../../theme/types';
import Image from '../../Image';
import Like from '../../Like';
import Rating from '../../Rating';
import Bookmark from '../components/Bookmark';
import Subtitle from './components/Subtitle';
import Title from './components/Title';
import { VerticalPosterProps } from './types';

const VerticalPoster = <MT extends MediaType>(props: VerticalPosterProps<MT>): ReactElement => {
  const theme = useTheme<Theme>();

  const dispatch = useDispatch();

  const {
    width,
    mediaItem,
    mediaType,
    image,
    rating,
    title = 'Lorem ipsum',
    subtitle = 'Lorem ipsum',
    isLoading = true
  } = props;

  const [isHoveringPoster, setIsHoveringPoster] = useBoolean();

  const [isDisabled, setIsDisabled] = useBoolean();

  return (
    <Link
      isDisabled={isLoading || isDisabled}
      to={{ pathname: `/${mediaType}/${mediaItem?.id || ''}` }}
      onMouseEnter={() => setIsHoveringPoster.on()}
      onMouseLeave={() => setIsHoveringPoster.off()}>
      <Card isDisabled={isLoading} isClickable={!isDisabled} isLight>
        <VStack width={width} position='relative' spacing={1} p={1}>
          {/* Image */}
          <Box position='relative' width='100%' minWidth='100%' maxWidth='100%'>
            <AspectRatio width='100%' minWidth='100%' maxWidth='100%' ratio={2 / 3}>
              <>
                <Skeleton isLoaded={!isLoading && Boolean(image)} borderRadius='base'>
                  <Image
                    alt={image?.alt || ''}
                    mediaType={mediaType}
                    maxWidth='none'
                    height='100%'
                    borderRadius='base'
                    src={image?.src || ''}
                    size={{ thumbnail: image?.size.thumbnail || '', full: image?.size.full || '' }}
                  />
                </Skeleton>

                {/* Quick View component */}
                {mediaItem && !handleIsTouchDevice() ? (
                  <ScaleFade in={isHoveringPoster && !isLoading} unmountOnExit>
                    <Box
                      position='absolute'
                      bottom={theme.space[1]}
                      width='100%'
                      onMouseEnter={() => setIsDisabled.on()}
                      onMouseLeave={() => setIsDisabled.off()}
                      px={1}>
                      <Button
                        isFullWidth
                        onClick={() =>
                          dispatch(toggleQuickView({ open: true, mediaType, mediaItem: { id: mediaItem.id, title } }))
                        }
                        size='sm'>
                        Quick view
                      </Button>
                    </Box>
                  </ScaleFade>
                ) : null}
              </>
            </AspectRatio>
          </Box>

          <VStack width='100%' spacing={mediaType !== 'person' ? 0.5 : 1}>
            {/* Header */}
            {mediaType !== 'person' ? (
              <HStack width='100%' justify='space-between' spacing={0}>
                {/* Rating component */}
                <Rating rating={rating} isLoading={isLoading} iconFontsize={theme.fontSizes.xl} textFontsize='md' />

                <HStack spacing={0}>
                  {/* Like component */}
                  <Box onMouseEnter={() => setIsDisabled.on()} onMouseLeave={() => setIsDisabled.off()}>
                    <Like isDisabled={isLoading} title={title} mediaType={mediaType} mediaItem={mediaItem} size='sm' />
                  </Box>
                  {/* List component */}
                  <Box onMouseEnter={() => setIsDisabled.on()} onMouseLeave={() => setIsDisabled.off()}>
                    <Bookmark
                      title={title}
                      mediaType={mediaType}
                      mediaItem={mediaItem}
                      isLoading={isLoading}
                      size='sm'
                    />
                  </Box>
                </HStack>
              </HStack>
            ) : null}
            {/* Text */}
            <VStack width='100%' alignItems='flex-start' spacing={isLoading ? 0.5 : 0}>
              <Title title={title} isLoading={isLoading} />
              <Subtitle subtitle={subtitle} isLoading={isLoading} />
            </VStack>
          </VStack>

          {/* Like component */}
          {mediaType === 'person' ? (
            <HStack
              spacing={0}
              sx={{
                position: 'absolute',
                top: 1,
                right: 2
              }}>
              <Box onMouseEnter={() => setIsDisabled.on()} onMouseLeave={() => setIsDisabled.off()}>
                <Like isDisabled={isLoading} title={title} mediaType={mediaType} mediaItem={mediaItem} size='sm' />
              </Box>
            </HStack>
          ) : null}
        </VStack>
      </Card>
    </Link>
  );
};

export default VerticalPoster;
