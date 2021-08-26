import React, { Fragment, ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';
import _ from 'lodash';
import { Link } from 'react-scroll';

import { useSelector } from '../../../../../../common/hooks';
import utils from '../../../../../../common/utils/utils';
import Button from '../../../../../../components/Clickable/Button';
import HorizontalScroll from '../../../../../../components/HorizontalScroll';
import SkeletonText from '../../../../../../components/Skeleton/Text';
import { QuickTogglesProps } from './types';

const dummyTextWidths = utils.handleReturnDummyWidths(200, 4);

const QuickToggles = (props: QuickTogglesProps): ReactElement => {
  const { colorMode } = useColorMode();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { departments, isLoading = false, onToggleAccordion } = props;

  return (
    <HStack justifyContent='stretch' spacing={isLoading ? 1 : 0}>
      <Text
        align='left'
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        fontSize='sm'
        whiteSpace='nowrap'
        py={0.75}>
        Jump to:
      </Text>

      {!isLoading ? (
        <HorizontalScroll width='calc(100% - 61.47px)' spacing='0'>
          <>
            {departments.map((department, index) => (
              <Fragment key={index}>
                <Link to={`${department.toLowerCase()}-accordion`} spy={true} smooth={true} offset={-81}>
                  <Button
                    color={utils.handleReturnColor(color)}
                    onClick={() => onToggleAccordion(department)}
                    size='sm'
                    variant='text'>
                    {department}
                  </Button>
                </Link>

                {index < departments.length - 1 ? (
                  <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
                    •
                  </Text>
                ) : null}
              </Fragment>
            ))}
          </>
        </HorizontalScroll>
      ) : (
        _.range(0, 4).map((_dummy, index) => (
          <Fragment key={index}>
            <SkeletonText
              width={`${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}px`}
              height='28px'
              offsetY={28}
            />

            {index < 3 ? (
              <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
                •
              </Text>
            ) : null}
          </Fragment>
        ))
      )}
    </HStack>
  );
};

export default QuickToggles;
