import { ReactElement } from 'react';

import { useTheme, useColorMode, HStack, Icon } from '@chakra-ui/react';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import _ from 'lodash';

import { handleReturnDummyWidths } from '../../../../../../../../common/utils';
import Skeleton from '../../../../../../../../components/Skeleton';
import { Theme } from '../../../../../../../../theme/types';
import useStyles from './styles';

const dummyTextWidths = handleReturnDummyWidths(300, 5);

const DummyAccordion = (): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const style = useStyles(theme);

  return (
    <HStack width='100%' justifyContent='space-between' sx={{ ..._.merge(style.common.button) }}>
      <Skeleton width={`${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}px`} height='16px' />

      <Icon
        as={KeyboardArrowDownOutlinedIcon}
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        sx={{ ..._.merge(style.common.icon) }}
      />
    </HStack>
  );
};

export default DummyAccordion;
