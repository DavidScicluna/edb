import { ReactElement } from 'react';

import { useMediaQuery, useBreakpointValue, useBoolean, HStack, VStack, Center } from '@chakra-ui/react';
import _ from 'lodash';
import useInView from 'react-cool-inview';

import { MediaType } from '../../../common/types';
import { handleReturnMediaTypeLabel } from '../../../common/utils';
import { FontSizes } from '../../../theme/types';
import Card from '../..//Clickable/Card';
import Link from '../../Clickable/Link';
import Rating from '../../Rating';
import Bookmark from '../components/Bookmark';
import Like from '../components/Like';
import Description from './components/Description';
import Image from './components/Image';
import Subtitle from './components/Subtitle';
import Title from './components/Title';
import { HorizontalPosterProps } from './types';

const HorizontalPoster = <MT extends MediaType>(props: HorizontalPosterProps<MT>): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');
  const ratingFontSize = useBreakpointValue<keyof Omit<FontSizes, '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'>>({
    'base': 'sm',
    'sm': 'md',
    'md': 'lg',
    'lg': 'xl',
    'xl': '2xl',
    '2xl': '3xl'
  });

  const { observe: ref, inView } = useInView<HTMLDivElement>({
    threshold: [0.2, 0.4, 0.6, 0.8, 1],
    unobserveOnEnter: true
  });

  const { mediaItem, mediaType, image, rating, title, subtitle, description, isLoading = true } = props;

  const [isHovering, setIsHovering] = useBoolean();
  const [isDisabled, setIsDisabled] = useBoolean();

  const handleOnImageChange = (bool: boolean): void => {
    if (bool) {
      setIsDisabled.on();
    } else {
      setIsDisabled.off();
    }
  };

  return (
    <Link
      isFullWidth
      isDisabled={isLoading || isDisabled || mediaType === 'company'}
      to={
        mediaType !== 'company' ? { pathname: `/${handleReturnMediaTypeLabel(mediaType)}/${mediaItem?.id || ''}` } : {}
      }
      onMouseEnter={() => setIsHovering.on()}
      onMouseLeave={() => setIsHovering.off()}
    >
      <Card isFullWidth isDisabled={isLoading} isClickable={mediaType !== 'company'} isFixed={isDisabled} isLight>
        <HStack ref={ref} width='100%' position='relative' spacing={[1, 1, 2, 2, 2, 2]} p={[1, 1, 2, 2, 2, 2]}>
          {/* Image */}
          <Image
            mediaItem={mediaItem}
            mediaType={mediaType}
            image={image}
            title={title}
            isHovering={isHovering}
            isLoading={isLoading}
            inView={inView}
            onMouseChange={handleOnImageChange}
          />

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
            {(mediaType === 'movie' || mediaType === 'tv') && rating ? (
              <Rating count={rating?.count} inView={inView} size={ratingFontSize} isLoading={isLoading}>
                {rating?.rating}
              </Rating>
            ) : null}

            <VStack
              width='100%'
              alignItems='flex-start'
              spacing={[
                isLoading ? 0.5 : 0.25,
                isLoading ? 0.5 : 0.25,
                isLoading ? 1 : 0.5,
                isLoading ? 1 : 0.5,
                isLoading ? 1 : 0.5,
                isLoading ? 1 : 0.5
              ]}
            >
              <Title title={title} isLoading={isLoading} inView={inView} />
              {!_.isNil(subtitle) && !_.isEmpty(subtitle) ? (
                <Subtitle subtitle={subtitle} isLoading={isLoading} inView={inView} />
              ) : null}
            </VStack>

            {!_.isNil(description) && !_.isEmpty(description) ? (
              <Description description={description} isLoading={isLoading} inView={inView} />
            ) : null}
          </VStack>

          {/* Like / List Icon buttons */}
          {mediaItem ? (
            <Center
              sx={{
                position: 'absolute',
                top: 1,
                right: 1
              }}
            >
              {/* Like component */}
              <Center onMouseEnter={() => setIsDisabled.on()} onMouseLeave={() => setIsDisabled.off()}>
                <Like
                  title={title}
                  mediaType={mediaType}
                  mediaItem={mediaItem}
                  isLoading={isLoading}
                  size={isSm ? 'md' : 'lg'}
                />
              </Center>
              {/* List component */}
              {mediaType === 'movie' || mediaType === 'tv' ? (
                <Center onMouseEnter={() => setIsDisabled.on()} onMouseLeave={() => setIsDisabled.off()}>
                  <Bookmark
                    title={title}
                    mediaType={mediaType}
                    mediaItem={mediaItem}
                    isLoading={isLoading}
                    size={isSm ? 'md' : 'lg'}
                  />
                </Center>
              ) : null}
            </Center>
          ) : null}
        </HStack>
      </Card>
    </Link>
  );
};

export default HorizontalPoster;
