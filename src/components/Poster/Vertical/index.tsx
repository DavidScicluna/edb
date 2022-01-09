import { ReactElement } from 'react';

import { useTheme, useBoolean, VStack, HStack, Box, AspectRatio, ScaleFade, Fade } from '@chakra-ui/react';
import useInView from 'react-cool-inview';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../common/hooks';
import { MediaType } from '../../../common/types';
import { handleIsTouchDevice } from '../../../common/utils';
import Button from '../../../components/Clickable/Button';
import Card from '../../../components/Clickable/Card';
import Link from '../../../components/Clickable/Link';
import Skeleton from '../../../components/Skeleton';
import { toggleQuickView } from '../../../store/slices/Modals';
import { Theme } from '../../../theme/types';
import Image from '../../Image';
import Rating from '../../Rating';
import Bookmark from '../components/Bookmark';
import Like from '../components/Like';
import Subtitle from './components/Subtitle';
import Title from './components/Title';
import { VerticalPosterProps } from './types';

const VerticalPoster = <MT extends MediaType>(props: VerticalPosterProps<MT>): ReactElement => {
  const theme = useTheme<Theme>();

  const dispatch = useDispatch();
  const color = useSelector((state) => state.user.ui.theme.color);

  const { observe: ref, inView } = useInView<HTMLDivElement>({
    threshold: [0.2, 0.4, 0.6, 0.8, 1],
    unobserveOnEnter: true
  });

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

  const [isHovering, setIsHovering] = useBoolean();
  const [isDisabled, setIsDisabled] = useBoolean();

  return (
    <Link
      isFullWidth
      isDisabled={isLoading || isDisabled}
      to={{ pathname: `/${mediaType}/${mediaItem?.id || ''}` }}
      onMouseEnter={() => setIsHovering.on()}
      onMouseLeave={() => setIsHovering.off()}
    >
      <Card isFullWidth isDisabled={isLoading} isClickable isFixed={isDisabled} isLight>
        <VStack width={width} position='relative' spacing={1} p={1}>
          {/* Image */}
          <Box
            ref={ref}
            as={AspectRatio}
            width='100%'
            minWidth='100%'
            maxWidth='100%'
            borderRadius='base'
            ratio={2 / 3}
          >
            <Fade in={isLoading || inView} unmountOnExit style={{ width: 'inherit', borderRadius: 'inherit' }}>
              <AspectRatio width='100%' minWidth='100%' maxWidth='100%' borderRadius='base' ratio={2 / 3}>
                <>
                  <Skeleton isLoaded={!isLoading && Boolean(image)} borderRadius='base'>
                    <Image
                      alt={image?.alt || ''}
                      mediaType={mediaType}
                      maxWidth='none'
                      height='100%'
                      borderRadius='base'
                      thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${image?.size.thumbnail || ''}${
                        image?.src || ''
                      }`}
                      fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${image?.size.full || ''}${image?.src || ''}`}
                    />
                  </Skeleton>

                  {/* Quick View component */}
                  {mediaItem && !handleIsTouchDevice() ? (
                    <ScaleFade in={isHovering && !isLoading} unmountOnExit>
                      <Box
                        position='absolute'
                        bottom={theme.space[1]}
                        width='100%'
                        onMouseEnter={() => setIsDisabled.on()}
                        onMouseLeave={() => setIsDisabled.off()}
                        px={1}
                      >
                        <Button
                          color={color}
                          isFullWidth
                          onClick={() =>
                            dispatch(toggleQuickView({ open: true, mediaType, mediaItem: { id: mediaItem.id, title } }))
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
            </Fade>
          </Box>

          <VStack width='100%' spacing={isLoading ? 1 : 0.5}>
            {/* Header */}
            {mediaType !== 'person' ? (
              <HStack width='100%' justify='space-between' spacing={0}>
                {/* Rating component */}
                <Rating isLoading={isLoading}>{rating}</Rating>

                <HStack spacing={0}>
                  {/* Like component */}
                  <Box onMouseEnter={() => setIsDisabled.on()} onMouseLeave={() => setIsDisabled.off()}>
                    <Like title={title} mediaType={mediaType} mediaItem={mediaItem} size='sm' isLoading={isLoading} />
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
            <VStack width='100%' alignItems='flex-start' spacing={isLoading ? 0.5 : 0.25}>
              <Title title={title} isLoading={isLoading} inView={inView} />
              <Subtitle subtitle={subtitle} isLoading={isLoading} inView={inView} />
            </VStack>
          </VStack>

          {/* Like component */}
          {mediaType === 'person' ? (
            <HStack
              sx={{
                position: 'absolute',
                top: 1,
                right: 2
              }}
            >
              <Box onMouseEnter={() => setIsDisabled.on()} onMouseLeave={() => setIsDisabled.off()}>
                <Like title={title} mediaType={mediaType} mediaItem={mediaItem} isLoading={isLoading} size='sm' />
              </Box>
            </HStack>
          ) : null}
        </VStack>
      </Card>
    </Link>
  );
};

export default VerticalPoster;
