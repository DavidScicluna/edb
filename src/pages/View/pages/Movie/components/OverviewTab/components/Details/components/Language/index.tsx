import { ReactElement } from 'react';

import { useColorMode, useConst, Text } from '@chakra-ui/react';

import _ from 'lodash';


import { LanguageProps } from './types';

import { useSelector } from '../../../../../../../../../../common/hooks';
import SkeletonText from '../../../../../../../../../../components/Skeleton/Text';

const dummies = _.range(25, 75, 15);

const Language = ({ language, isLoading = true }: LanguageProps): ReactElement => {
  const { colorMode } = useColorMode();

  const languages = useSelector((state) => state.options.data.languages);

  const dummy = useConst<number>(_.sample(dummies) || 50);

  return (
    <SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize='md' isLoaded={!isLoading}>
      <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='md' whiteSpace='nowrap'>
        {language
          ? languages.find((paramLanguage) => paramLanguage.iso_639_1 === language)?.english_name
          : 'Movie Language'}
      </Text>
    </SkeletonText>
  );
};

export default Language;
