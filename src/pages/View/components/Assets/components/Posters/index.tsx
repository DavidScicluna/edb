import React, { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import CountUp from 'react-countup';

import Badge from '../../../../../../components/Badge';
import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalGrid from '../../../../../../components/Grid/Vertical';
import Panel from '../../../../../../components/Panel';
import Image from '../Image';
import { PostersProps } from './types';

const incrementBy = 20;

const Posters = (props: PostersProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const {
    alt,
    posters = [],
    isLoading = true,
    isError = false,
    isSuccess = false,
    isOnlyAsset = false,
    onClickImage
  } = props;

  const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

  return (
    <Panel isFullWidth variant={isOnlyAsset ? 'transparent' : 'outlined'}>
      {{
        header: !isOnlyAsset
          ? {
              title: 'Posters',
              actions: (
                <Badge size='lg'>
                  <CountUp duration={1} end={posters?.length || 0} />
                </Badge>
              )
            }
          : undefined,
        body: (
          <VStack width='100%' spacing={4}>
            {!isLoading && isError ? (
              <Error
                label='Oh no! Something went wrong'
                description={`Failed to fetch ${alt ? `"${alt}"` : ''} posters list!`}
                variant='outlined'
              />
            ) : !isLoading && isSuccess && posters && posters.length === 0 ? (
              <Empty label={`${alt ? `"${alt}" posters` : 'Posters'} list is currently empty!`} variant='outlined' />
            ) : !isLoading && isSuccess && posters && posters.length > 0 ? (
              <VerticalGrid displayMode='grid'>
                {() =>
                  posters
                    .filter((_poster, index) => index < totalVisible)
                    .map((poster, index: number) => (
                      <Image
                        key={index}
                        alt={alt}
                        aspect_ratio={poster.aspect_ratio}
                        file_path={poster.file_path}
                        srcSize={['w92', 'original']}
                        isLoading={false}
                        onClickImage={onClickImage}
                      />
                    ))
                }
              </VerticalGrid>
            ) : (
              <VerticalGrid displayMode='grid'>
                {() =>
                  _.range(0, isSuccess && posters && posters.length > 0 ? posters.length : 20).map(
                    (_dummy, index: number) => (
                      <Image key={index} alt={alt} aspect_ratio={0.667} srcSize={['w92', 'original']} isLoading />
                    )
                  )
                }
              </VerticalGrid>
            )}

            <ScaleFade
              in={posters.length > 0 && posters.length > incrementBy}
              unmountOnExit
              style={{ width: isSm ? '100%' : 'auto' }}
            >
              <LoadMore
                amount={totalVisible}
                total={posters.length}
                label={alt ? `"${alt}" posters` : 'Posters'}
                onClick={() => setTotalVisible(totalVisible + incrementBy)}
              />
            </ScaleFade>
          </VStack>
        )
      }}
    </Panel>
  );
};

export default Posters;
