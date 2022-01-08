import React, { ReactElement } from 'react';

import departments from '../../../../../common/data/departments';
import HorizontalPoster from '../../../../../components/Poster/Horizontal';
import { HorizontalPersonPosterProps } from './types';

const HorizontalPersonPoster = (props: HorizontalPersonPosterProps): ReactElement => {
  const { person, isLoading = true } = props;
  const { name, profile_path, known_for_department } = person || {};

  return (
    <HorizontalPoster
      mediaItem={person ? { ...person } : undefined}
      mediaType='person'
      image={{
        alt: `${name || ''} person poster`,
        src: profile_path || '',
        size: {
          thumbnail: 'w45',
          full: 'original'
        }
      }}
      title={name || ''}
      subtitle={
        departments.find((department) => department.value === known_for_department)?.name ||
        known_for_department ||
        'N/A'
      }
      description='' // TODO: Implmenet proper that goes to
      // description={
      //   <HorizontalScroll isLoading={isLoading}>
      //     <HStack
      //       divider={
      //         <Text
      //           align='left'
      //           fontSize={['sm', 'md', 'lg', 'xl']}
      //           color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
      //           pr={0.75}
      //         >
      //           ,
      //         </Text>
      //       }
      //     >
      //       {sort(known_for || [], 'vote_average').map((mediaItem) => (
      //         <Link
      //           key={mediaItem.id}
      //           to={{ pathname: `/${mediaItem?.title ? 'movie' : mediaItem?.name ? 'tv' : ''}/${mediaItem.id}` }}
      //           isDisabled={isLoading}
      //         >
      //           <SkeletonText
      //             width={isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}%` : '100%'}
      //             offsetY={8.5}
      //             isLoaded={!isLoading}
      //           >
      //             <Text
      //               align='left'
      //               fontSize={['sm', 'md', 'lg', 'xl']}
      //               color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
      //               isTruncated
      //               overflow='hidden'
      //               whiteSpace='nowrap'
      //               sx={{
      //                 transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
      //               }}
      //               _focus={{ boxShadow: 'none' }}
      //               _hover={{ color: `${color}.${colorMode === 'light' ? 500 : 400}` }}
      //             >
      //               {mediaItem?.title || mediaItem?.name || ''}
      //             </Text>
      //           </SkeletonText>
      //         </Link>
      //       ))}
      //     </HStack>
      //   </HorizontalScroll>
      // }
      isLoading={isLoading}
    />
  );
};

export default HorizontalPersonPoster;
