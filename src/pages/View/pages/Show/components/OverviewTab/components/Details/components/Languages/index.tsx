import { ReactElement } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import HorizontalScroll from '../../../../../../../../../../components/HorizontalScroll';
import Language from '../Language';
import { LanguagesProps } from './types';

const Languages = ({ languages = [], isLoading = true }: LanguagesProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <HorizontalScroll
      renderDivider={({ padding }) => (
        <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='md' pr={padding}>
          ,
        </Text>
      )}
      isDisabled={isLoading}
    >
      {languages.map((language, index) => (
        <Language key={index} language={language.iso_639_1} isLoading={isLoading} />
      ))}
    </HorizontalScroll>
  );
};

export default Languages;
