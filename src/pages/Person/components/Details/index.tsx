import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, Text, ScaleFade } from '@chakra-ui/react';
import {
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  FavoriteOutlined as FavoriteOutlinedIcon
} from '@material-ui/icons';

import Card from '../../../../components/Card';
import Button from '../../../../components/Clickable/Button';
import Like from '../../../../components/Clickable/Like';
import SkeletonText from '../../../../components/Skeleton/Text';
import Background from './components/Background';
import Date from './components/Date';
import Departments from './components/Departments';
import Poster from './components/Poster';
import Socials from './components/Socials';
import { DetailsProps } from './types';

const width = [
  'calc(100% - 162.5px)',
  'calc(100% - 162.5px)',
  'calc(100% - 225px)',
  'calc(100% - 287.5px)',
  'calc(100% - 350px)',
  'calc(100% - 412.5px)'
];
const left = ['162.5px', '162.5px', '225px', '287.5px', '350px', '412.5px'];

const Details = (props: DetailsProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { person, departments, socials, isLoading = false, isError = false, onClickPoster } = props;

  return (
    <Card isFullWidth p={2}>
      {{
        body: (
          <VStack width='100%' alignItems='stretch' spacing={2}>
            {isSm ? (
              <Poster
                name={person?.name}
                path={person?.profile_path}
                isLoading={isLoading}
                isError={isError}
                onClickPoster={onClickPoster}
              />
            ) : (
              <Background alt={`${person?.name || ''} background`} size='780'>
                {{
                  poster: (
                    <Poster
                      name={person?.name}
                      path={person?.profile_path}
                      isLoading={isLoading}
                      isError={isError}
                      onClickPoster={onClickPoster}
                    />
                  ),

                  socials: <Socials socials={socials} name={person?.name} isLoading={isLoading} />
                }}
              </Background>
            )}

            <VStack
              width={isSm ? '100%' : width}
              maxWidth={isSm ? '100%' : width}
              position='relative'
              left={isSm ? 0 : left}
              alignItems='flex-start'
              spacing={2}>
              <VStack width='100%' maxWidth='100%' alignItems='flex-start' spacing={isLoading ? 0.5 : 0}>
                <SkeletonText offsetY={isSm ? 12 : 18} isLoaded={!isLoading}>
                  <Text
                    align='left'
                    color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
                    fontSize={isSm ? '2xl' : '4xl'}
                    fontWeight='bold'>
                    {person?.name || 'Unknown'}
                  </Text>
                </SkeletonText>

                <Departments departments={departments} isLoading={isLoading} />
              </VStack>

              <Date
                birthday={person?.birthday}
                place_of_birth={person?.place_of_birth}
                deathday={person?.deathday}
                isLoading={isLoading}
                isError={isError}
              />

              <ScaleFade in={!isError} unmountOnExit>
                <Like
                  renderButton={({ isLiked, onClick }) => (
                    <Button
                      color={isLiked ? 'red' : 'gray'}
                      isFullWidth={isSm}
                      isDisabled={isLoading || !person}
                      leftIcon={isLiked ? FavoriteOutlinedIcon : FavoriteBorderOutlinedIcon}
                      onClick={() => onClick()}
                      size='md'
                      variant='outlined'>
                      {isLiked ? 'Liked' : 'Like'}
                    </Button>
                  )}
                  mediaType='person'
                  mediaItem={person}
                />
              </ScaleFade>
            </VStack>
          </VStack>
        )
      }}
    </Card>
  );
};

export default Details;
