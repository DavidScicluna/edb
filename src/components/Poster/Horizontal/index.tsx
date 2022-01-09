import { ReactElement } from 'react';

import {
  useTheme,
  useMediaQuery,
  useBreakpointValue,
  useBoolean,
  HStack,
  VStack,
  Box,
  AspectRatio,
  Fade,
  ScaleFade
} from '@chakra-ui/react';
import useInView from 'react-cool-inview';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../common/hooks';
import { MediaType } from '../../../common/types';
import { handleIsTouchDevice } from '../../../common/utils';
import Button from '../../../components/Clickable/Button';
import { toggleQuickView } from '../../../store/slices/Modals';
import { Theme } from '../../../theme/types';
import Card from '../..//Clickable/Card';
import Link from '../../Clickable/Link';
import Image from '../../Image';
import Rating from '../../Rating';
import Skeleton from '../../Skeleton';
import Bookmark from '../components/Bookmark';
import Like from '../components/Like';
import Description from './components/Description';
import Subtitle from './components/Subtitle';
import Title from './components/Title';
import { HorizontalPosterProps } from './types';

const width = ['100px', '116px', '152px', '188px', '188px', '224px'];

const HorizontalPoster = <MT extends MediaType>(props: HorizontalPosterProps<MT>): ReactElement => {
  const theme = useTheme<Theme>();
  const [isSm] = useMediaQuery('(max-width: 600px)');
  const ratingSize = useBreakpointValue({
    'base': 'sm',
    'sm': 'md',
    'md': 'lg',
    'lg': 'xl',
    'xl': 'xl',
    '2xl': 'xl'
  });

  const dispatch = useDispatch();
  const color = useSelector((state) => state.user.ui.theme.color);

  const { observe: ref, inView } = useInView<HTMLDivElement>({
    threshold: [0.2, 0.4, 0.6, 0.8, 1],
    unobserveOnEnter: true
  });

  const {
    mediaItem,
    mediaType,
    image,
    rating,
    title = 'Lorem ipsum',
    subtitle = 'Lorem ipsum',
    description = 'Lorem ipsum',
    isLoading = false
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
        <HStack width='100%' position='relative' spacing={[1, 1, 2, 2, 2, 2]} p={[1, 1, 2, 2, 2, 2]}>
          {/* Image */}
          <Box
            ref={ref}
            as={AspectRatio}
            width={width}
            minWidth={width}
            maxWidth={width}
            borderRadius='base'
            ratio={2 / 3}
          >
            <Fade in={isLoading || inView} unmountOnExit style={{ width: 'inherit', borderRadius: 'inherit' }}>
              <AspectRatio width={width} minWidth={width} maxWidth={width} borderRadius='base' ratio={2 / 3}>
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

          <VStack
            width={[
              'calc(100% - 108px)',
              'calc(100% - 124px)',
              'calc(100% - 168px)',
              'calc(100% - 204px)',
              'calc(100% - 204px)',
              'calc(100% - 240px)'
            ]}
            alignItems='flex-start'
            spacing={[
              isLoading ? 2 : 1,
              isLoading ? 2 : 1,
              isLoading ? 4 : 2,
              isLoading ? 4 : 2,
              isLoading ? 4 : 2,
              isLoading ? 4 : 2
            ]}
          >
            {/* Rating */}
            {mediaType !== 'person' ? (
              <Rating count={rating?.count} isLoading={isLoading} size={ratingSize}>
                {rating?.rating}
              </Rating>
            ) : null}

            <VStack
              width='100%'
              alignItems='flex-start'
              spacing={[
                isLoading ? 0.5 : 0,
                isLoading ? 0.5 : 0,
                isLoading ? 1 : 0,
                isLoading ? 1 : 0,
                isLoading ? 1 : 0,
                isLoading ? 1 : 0
              ]}
            >
              <Title title={title} isLoading={isLoading} inView={inView} />
              <Subtitle subtitle={subtitle} isLoading={isLoading} inView={inView} />
            </VStack>

            <Description description={description} isLoading={isLoading} inView={inView} />
          </VStack>

          {/* Like / List Icon buttons */}
          {mediaItem ? (
            <HStack
              spacing={0}
              sx={{
                position: 'absolute',
                top: 1,
                right: 1
              }}
            >
              {/* Like component */}
              <Box onMouseEnter={() => setIsDisabled.on()} onMouseLeave={() => setIsDisabled.off()}>
                <Like
                  title={title}
                  mediaType={mediaType}
                  mediaItem={mediaItem}
                  isLoading={isLoading}
                  size={isSm ? 'md' : 'lg'}
                />
              </Box>
              {/* List component */}
              {mediaType !== 'person' ? (
                <Box onMouseEnter={() => setIsDisabled.on()} onMouseLeave={() => setIsDisabled.off()}>
                  <Bookmark
                    title={title}
                    mediaType={mediaType}
                    mediaItem={mediaItem}
                    isLoading={isLoading}
                    size={isSm ? 'md' : 'lg'}
                  />
                </Box>
              ) : null}
            </HStack>
          ) : null}
        </HStack>
      </Card>
    </Link>
  );
};

export default HorizontalPoster;
