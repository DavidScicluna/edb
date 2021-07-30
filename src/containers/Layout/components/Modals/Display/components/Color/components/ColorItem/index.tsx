import React, { ReactElement } from 'react';

import { useTheme, VStack, Box, Icon, Text, ScaleFade } from '@chakra-ui/react';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import utils from '../../../../../../../../../common/utils/utils';
import Card from '../../../../../../../../../components/Clickable/Card';
import Tooltip from '../../../../../../../../../components/Tooltip';
import { Theme } from '../../../../../../../../../theme/types';
import { ColorItemProps } from './types';

const ColorItem = (props: ColorItemProps): ReactElement => {
  const theme = useTheme<Theme>();

  const { label, value, background, isActive, onClick } = props;

  return (
    <Tooltip
      aria-label={isActive ? `Current color: ${label}` : `Set color to ${label}`}
      closeOnClick={false}
      closeOnMouseDown={false}
      isDisabled={isActive}
      label={isActive ? `Current color: ${label}` : `Set color to ${label}`}
      placement='top'
      span>
      <Card
        color={isActive ? utils.handleReturnColor(value) : 'gray'}
        colorMode={background}
        onClick={!isActive && onClick ? () => onClick(value) : undefined}
        p={2}>
        <VStack width='100%' spacing={0.75}>
          <Box
            sx={{
              width: theme.fontSizes['6xl'],
              height: theme.fontSizes['6xl'],

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              backgroundColor: `${value}.400`,
              borderRadius: 'full'
            }}>
            <ScaleFade in={isActive} unmountOnExit>
              <Icon
                as={CheckOutlinedIcon}
                sx={{
                  fontSize: `${theme.fontSizes['4xl']} !important`,
                  color: background === 'light' ? 'gray.50' : 'gray.900'
                }}
              />
            </ScaleFade>
          </Box>
          <Text align='center' fontSize='sm' fontWeight='medium'>
            {label}
          </Text>
        </VStack>
      </Card>
    </Tooltip>
  );
};

export default ColorItem;
