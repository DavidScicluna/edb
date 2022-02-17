import { ReactElement } from 'react';

import { Box } from '@chakra-ui/react';

import { ToolkitProps } from './types';

const Toolkit = ({ renderActions, renderNavigation, onHover }: ToolkitProps): ReactElement => {
  return (
    <>
      {/* Actions */}
      <Box
        position='fixed'
        top={0}
        right={0}
        zIndex={5}
        backgroundColor='transparent'
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        {renderActions()}
      </Box>

      {/* Navigation */}
      <Box
        position='fixed'
        bottom={0}
        right={0}
        zIndex={5}
        backgroundColor='transparent'
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        {renderNavigation()}
      </Box>
    </>
  );
};

export default Toolkit;
