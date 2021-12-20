import { ReactElement } from 'react';

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import { useTheme, useBoolean, VStack, Box, Icon, Text, ScaleFade } from '@chakra-ui/react';

import Card from '../../../../../../../../../components/Clickable/Card';
import Tooltip from '../../../../../../../../../components/Tooltip';
import { Theme } from '../../../../../../../../../theme/types';
import { ColorItemProps } from './types';

const ColorItem = (props: ColorItemProps): ReactElement => {
  const theme = useTheme<Theme>();

  const { label, value, background, isActive, onClick } = props;

  const [isHovering, setIsHovering] = useBoolean();

  return (
    <Tooltip
      aria-label={isActive ? `Current color: ${label}` : `Set color to ${label}`}
      colorMode={background}
      isOpen={isHovering}
      isDisabled={isActive}
      label={isActive ? `Current color: ${label}` : `Set color to ${label}`}
      placement='top'
      shouldWrapChildren
      gutter={8}
    >
      <Card
        color={isActive ? value : 'gray'}
        colorMode={background}
        onClick={!isActive && onClick ? () => onClick(value) : undefined}
        onMouseEnter={() => setIsHovering.on()}
        onMouseLeave={() => setIsHovering.off()}
        p={2}
      >
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
            }}
          >
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
