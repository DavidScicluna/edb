import React, { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import CountUp from 'react-countup';

import Badge from '../../../../../../../../components/Badge';
import LoadMore from '../../../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../../../components/Empty';
import Error from '../../../../../../../../components/Error';
import VerticalGrid from '../../../../../../../../components/Grid/Vertical';
import Panel from '../../../../../../../../components/Panel';
import Image from '../Image';
import { BackdropsProps } from './types';

const incrementBy = 20;

const Backdrops = (props: BackdropsProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { name, backdrops = [], isLoading = true, isError = false, isSuccess = false, onClickImage } = props;

  const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

  return (
    <Panel isFullWidth>
      {{
        header: {
          title: 'Backdrops',
          actions: (
            <Badge size='lg'>
              <CountUp duration={1} end={backdrops?.length || 0} />
            </Badge>
          )
        },
        body: (
          <VStack width='100%' spacing={4}>
            {!isLoading && isError ? (
              <Error
                label='Oh no! Something went wrong'
                description={`Failed to fetch ${name ? `"${name}"` : ''} backdrops list!`}
                variant='outlined'
              />
            ) : !isLoading && isSuccess && backdrops && backdrops.length === 0 ? (
              <Empty
                label={`${name ? `"${name}" backdrops` : 'Backdrops'} list is currently empty!`}
                variant='outlined'
              />
            ) : !isLoading && isSuccess && backdrops && backdrops.length > 0 ? (
              <VerticalGrid columns={[1, 2, 2, 3, 3, 4]} displayMode='grid'>
                {() =>
                  backdrops
                    .filter((_backdrop, index) => index < totalVisible)
                    .map((backdrop, index: number) => (
                      <Image
                        key={index}
                        name={name}
                        aspect_ratio={backdrop.aspect_ratio}
                        file_path={backdrop.file_path}
                        srcSize={['w300', 'original']}
                        isLoading={false}
                        onClickImage={onClickImage}
                      />
                    ))
                }
              </VerticalGrid>
            ) : (
              <VerticalGrid columns={[1, 2, 2, 3, 3, 4]} displayMode='grid'>
                {() =>
                  _.range(0, isSuccess && backdrops && backdrops.length > 0 ? backdrops.length : 20).map(
                    (_dummy, index: number) => (
                      <Image key={index} name={name} aspect_ratio={1.778} srcSize={['w300', 'original']} isLoading />
                    )
                  )
                }
              </VerticalGrid>
            )}

            <ScaleFade
              in={backdrops.length > 0 && backdrops.length > incrementBy}
              unmountOnExit
              style={{ width: isSm ? '100%' : 'auto' }}
            >
              <LoadMore
                amount={totalVisible}
                total={backdrops.length}
                label={name ? `"${name}" backdrops` : 'Backdrops'}
                onClick={() => setTotalVisible(totalVisible + incrementBy)}
              />
            </ScaleFade>
          </VStack>
        )
      }}
    </Panel>
  );
};

export default Backdrops;
