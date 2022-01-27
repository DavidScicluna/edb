import { ReactElement } from 'react';

import { useBoolean, HStack, Fade } from '@chakra-ui/react';
import { ClearOutlined as ClearOutlinedIcon, SendOutlined as SendOutlinedIcon } from '@material-ui/icons';
import { useElementSize } from 'usehooks-ts';

import IconButton from '../../../../../../../../components/Clickable/IconButton';
import Divider from '../../../../../../../../components/Divider';
import Tooltip from '../../../../../../../../components/Tooltip';
import { ActionsProps } from './types';

const Actions = (props: ActionsProps): ReactElement => {
  const [ref, { height }] = useElementSize();

  const { hasQuery = false, isDisabled = false, onClear, onSubmit } = props;

  const [isHoveringClear, setIsHoveringClear] = useBoolean();
  const [isHoveringSubmit, setIsHoveringSubmit] = useBoolean();

  return (
    <HStack
      ref={ref}
      divider={
        <Fade in={hasQuery} unmountOnExit>
          <Divider height={height} orientation='vertical' mx={1} />
        </Fade>
      }
    >
      <Fade in={hasQuery} unmountOnExit>
        <Tooltip
          aria-label='Clear search'
          label='Clear search'
          isOpen={!isDisabled && isHoveringClear}
          isDisabled={isDisabled}
          placement='top'
        >
          <IconButton
            aria-label='Clear search'
            isDisabled={isDisabled}
            onClick={() => onClear()}
            onMouseEnter={() => setIsHoveringClear.on()}
            onMouseLeave={() => setIsHoveringClear.off()}
            size='sm'
            variant='icon'
          >
            <ClearOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Fade>
      <Tooltip
        aria-label='Submit Search'
        label='Submit Search'
        isOpen={!(isDisabled || !hasQuery) && isHoveringSubmit}
        isDisabled={isDisabled}
        placement='top'
      >
        <IconButton
          aria-label='Submit Search'
          isDisabled={isDisabled || !hasQuery}
          onClick={() => onSubmit()}
          onMouseEnter={() => setIsHoveringSubmit.on()}
          onMouseLeave={() => setIsHoveringSubmit.off()}
          size='sm'
          variant='icon'
        >
          <SendOutlinedIcon />
        </IconButton>
      </Tooltip>
    </HStack>
  );
};

export default Actions;
