import { ReactElement } from 'react';

import { useBoolean, Center, ScaleFade } from '@chakra-ui/react';
import {
  ClearOutlined as ClearOutlinedIcon,
  LockOpenOutlined as LockOpenOutlinedIcon,
  LockOutlined as LockOutlinedIcon
} from '@material-ui/icons';

import IconButton from '../../../../../../components/Clickable/IconButton';
import Tooltip from '../../../../../../components/Tooltip';
import { ActionsProps } from './types';

const Actions = (props: ActionsProps): ReactElement => {
  const {
    hasQuery = false,
    isFormLocked = false,
    isHoveringLock = false,
    onToggleLock,
    onHoverLock,
    onClearQuery
  } = props;

  const [isHoveringClear, setIsHoveringClear] = useBoolean();

  return (
    <Center>
      <ScaleFade in={hasQuery} unmountOnExit>
        <Tooltip
          aria-label='Clear search'
          label='Clear search'
          isOpen={isHoveringClear}
          isDisabled={!hasQuery}
          placement='top'>
          <IconButton
            aria-label='Clear search'
            icon={ClearOutlinedIcon}
            isDisabled={!hasQuery}
            onClick={() => onClearQuery()}
            onMouseEnter={() => setIsHoveringClear.on()}
            onMouseLeave={() => setIsHoveringClear.off()}
            size='sm'
            variant='icon'
          />
        </Tooltip>
      </ScaleFade>
      <Tooltip
        aria-label={isFormLocked ? 'Unlock Search' : 'Lock Search'}
        label={isFormLocked ? 'Unlock Search' : 'Lock Search'}
        isOpen={isHoveringLock}
        placement='top'>
        <IconButton
          aria-label={isFormLocked ? 'Unlock Search' : 'Lock Search'}
          icon={isFormLocked ? LockOutlinedIcon : LockOpenOutlinedIcon}
          onClick={() => onToggleLock()}
          onMouseEnter={() => onHoverLock(true)}
          onMouseLeave={() => onHoverLock(false)}
          size='sm'
          variant='icon'
        />
      </Tooltip>
    </Center>
  );
};

export default Actions;
