import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';

import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalGrid from '../../../../../../components/Grid/Vertical';
import Image from '../Image';
import { ProfilesProps } from './types';

const incrementBy = 10;

const Profiles = (props: ProfilesProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { alt, profiles = [], isLoading = true, isError = false, isSuccess = false, onClickImage } = props;

  const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

  return (
    <VStack width='100%' spacing={4}>
      {!isLoading && isError ? (
        <Error
          label='Oh no! Something went wrong'
          description={`Failed to fetch ${alt ? `"${alt}"` : ''} profiles list!`}
          variant='transparent'
        />
      ) : !isLoading && isSuccess && profiles && profiles.length === 0 ? (
        <Empty label={`${alt ? `"${alt}" profiles` : 'Profiles'} list is currently empty!`} variant='transparent' />
      ) : !isLoading && isSuccess && profiles && profiles.length > 0 ? (
        <VerticalGrid displayMode='grid'>
          {() =>
            profiles
              .filter((_profile, index) => index < totalVisible)
              .map((profile, index: number) => (
                <Image
                  key={index}
                  alt={alt}
                  aspect_ratio={profile.aspect_ratio}
                  file_path={profile.file_path}
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
            _.range(0, isSuccess && profiles && profiles.length > 0 ? profiles.length : 20).map(
              (_dummy, index: number) => (
                <Image key={index} alt={alt} aspect_ratio={0.667} srcSize={['w92', 'original']} isLoading />
              )
            )
          }
        </VerticalGrid>
      )}

      <ScaleFade
        in={profiles.length > 0 && profiles.length > incrementBy}
        unmountOnExit
        style={{ width: isSm ? '100%' : 'auto' }}
      >
        <LoadMore
          amount={totalVisible}
          total={profiles.length}
          label={alt ? `"${alt}" profiles` : 'Profiles'}
          onClick={() => setTotalVisible(totalVisible + incrementBy)}
        />
      </ScaleFade>
    </VStack>
  );
};

export default Profiles;
