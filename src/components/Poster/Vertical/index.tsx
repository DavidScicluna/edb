import { ReactElement } from 'react';

import { useBoolean, VStack, HStack, Box } from '@chakra-ui/react';
import useInView from 'react-cool-inview';

import { MediaType } from '../../../common/types';
import { handleReturnMediaTypeLabel } from '../../../common/utils';
import Card from '../../../components/Clickable/Card';
import Link from '../../../components/Clickable/Link';
import Rating from '../../Rating';
import Bookmark from '../components/Bookmark';
import Like from '../components/Like';
import Image from './components/Image';
import Subtitle from './components/Subtitle';
import Title from './components/Title';
import { VerticalPosterProps } from './types';

const VerticalPoster = <MT extends MediaType>(props: VerticalPosterProps<MT>): ReactElement => {
  const { observe: ref, inView } = useInView<HTMLDivElement>({
    threshold: [0.2, 0.4, 0.6, 0.8, 1],
    unobserveOnEnter: true
  });

  const { width = '100%', mediaItem, mediaType, image, rating, title, subtitle, isLoading = true } = props;

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
      isDisabled={isLoading || isDisabled}
      to={{ pathname: `/${handleReturnMediaTypeLabel(mediaType)}/${mediaItem?.id || ''}` }}
      onMouseEnter={() => setIsHovering.on()}
      onMouseLeave={() => setIsHovering.off()}
    >
      <Card isFullWidth isDisabled={isLoading} isClickable isFixed={isDisabled} isLight>
        <VStack ref={ref} width={width} position='relative' spacing={1} p={1}>
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

          <VStack width='100%' spacing={isLoading ? 1 : 0.5}>
            {/* Header */}
            {mediaType === 'movie' || mediaType === 'tv' ? (
              <HStack width='100%' justify='space-between' spacing={0}>
                {/* Rating component */}
                <Rating size='sm' inView={inView} isLoading={isLoading}>
                  {rating}
                </Rating>

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
          {mediaType === 'person' || mediaType === 'company' || mediaType === 'collection' ? (
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
