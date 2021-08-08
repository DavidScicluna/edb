import React, { ReactElement } from 'react';

import {
  useTheme,
  useColorMode,
  AccordionItem as CUIAccordionItem,
  AccordionButton,
  AccordionPanel,
  VStack,
  VisuallyHidden,
  Icon,
  Text
} from '@chakra-ui/react';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import _ from 'lodash';

import { Theme } from '../../../../../../../../theme/types';
import Badge from './components/Badge';
import CastMovies from './components/CastMovies';
import CastTV from './components/CastTV';
import CrewMovies from './components/CrewMovies';
import CrewTV from './components/CrewTV';
import Panel from './components/Panel';
import useStyles from './styles';
import { AccordionItemProps } from './types';

const AccordionItem = (props: AccordionItemProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const style = useStyles(theme, props);

  const { label, credits } = props;

  return (
    <CUIAccordionItem sx={{ ..._.merge(style.common.accordion, style[colorMode].accordion) }}>
      <VisuallyHidden>
        <span id={`${label.toLowerCase()}-accordion`} />
      </VisuallyHidden>

      <AccordionButton sx={{ ..._.merge(style.common.button) }}>
        <Text
          textAlign='left'
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          fontSize='2xl'
          fontWeight='semibold'>
          {label}
          <Badge
            label={`${
              (credits.cast?.movie?.length || 0) +
              (credits.cast?.tv?.length || 0) +
              (credits.crew?.movie?.length || 0) +
              (credits.crew?.tv?.length || 0)
            }`}
            ml={2}
          />
        </Text>
        <Icon
          as={KeyboardArrowDownOutlinedIcon}
          color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
          sx={{ ..._.merge(style.common.icon) }}
        />
      </AccordionButton>

      <AccordionPanel pb={4} sx={{ ..._.merge(style.common.panel) }}>
        <VStack width='100%' spacing={3}>
          {label === 'Actor' ? (
            <>
              {credits.cast?.movie && credits.cast?.movie.length > 0 ? (
                <Panel title='Movies'>
                  <CastMovies movies={credits.cast.movie} />
                </Panel>
              ) : null}

              {credits.cast?.tv && credits.cast?.tv.length > 0 ? (
                <Panel title='TV Shows'>
                  <CastTV tv={credits.cast.tv} />
                </Panel>
              ) : null}
            </>
          ) : (
            <>
              {credits.crew?.movie && credits.crew?.movie.length > 0 ? (
                <Panel title='Movies'>
                  <CrewMovies movies={credits.crew.movie} />
                </Panel>
              ) : null}

              {credits.crew?.tv && credits.crew?.tv.length > 0 ? (
                <Panel title='TV Shows'>
                  <CrewTV tv={credits.crew.tv} />
                </Panel>
              ) : null}
            </>
          )}
        </VStack>
      </AccordionPanel>
    </CUIAccordionItem>
  );
};

export default AccordionItem;
