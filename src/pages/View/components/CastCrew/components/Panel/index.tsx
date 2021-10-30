import { ReactElement } from 'react';

import { useTheme, useColorMode, VStack, VisuallyHidden, Collapse } from '@chakra-ui/react';
import _ from 'lodash';

import { Theme } from '../../../../../../theme/types';
import Footer from './components/Footer';
import Grid from './components/Grid';
import Header from './components/Header';
import useStyles from './styles';
import { PanelProps } from './types';

const Panel = ({ children, footer, id, title, total, isOpen = true, onToggle }: PanelProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const style = useStyles(theme);

  return (
    <VStack spacing={0} sx={{ ..._.merge(style.panel, style[colorMode]) }}>
      <VisuallyHidden>
        <span id={id} />
      </VisuallyHidden>

      <Header title={title} total={total} isOpen={isOpen} onToggle={onToggle} />

      <Collapse in={isOpen} unmountOnExit style={{ width: '100%' }}>
        <Grid>{children}</Grid>

        {footer ? <Footer>{footer}</Footer> : null}
      </Collapse>
    </VStack>
  );
};

export default Panel;
