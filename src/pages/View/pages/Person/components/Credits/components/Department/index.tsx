import { ReactElement } from 'react';

import { useTheme, useColorMode, VStack, VisuallyHidden, Collapse } from '@chakra-ui/react';
import _ from 'lodash';

import { Theme } from '../../../../../../../../theme/types';
import Grid from './components/Grid';
import Header from './components/Header';
import useStyles from './styles';
import { DepartmentProps } from './types';

const Panel = (props: DepartmentProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { children, id, title, total, isOpen: isOpenProps = false, isLoading = true, onToggle } = props;

  const isOpen = isLoading ? false : isOpenProps;

  const style = useStyles(theme, isOpen);

  return (
    <VStack spacing={0} sx={{ ..._.merge(style.panel, style[colorMode]) }}>
      {id ? (
        <VisuallyHidden>
          <span id={id.toLowerCase()} />
        </VisuallyHidden>
      ) : null}

      <Header title={title} total={total} isOpen={isOpen} isLoading={isLoading} onToggle={onToggle} />

      {children ? (
        <Collapse in={isOpen} unmountOnExit style={{ width: '100%' }}>
          <Grid>{children}</Grid>
        </Collapse>
      ) : null}
    </VStack>
  );
};

export default Panel;
