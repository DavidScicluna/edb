import { ReactElement } from 'react';

import { Box, HStack, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { useSelector } from '../../../../common/hooks';
import Button from '../../../../components/Clickable/Button';
import Empty from '../../../../components/Empty';
import { EmptyListProps } from './types';

const EmptyList = (props: EmptyListProps): ReactElement => {
  const history = useHistory();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { id, label, mediaTypeLabel } = props;

  return (
    <Box width='100%' px={2} pt={2}>
      <Empty
        button={
          <HStack spacing={1}>
            {mediaTypeLabel ? (
              <>
                <Button
                  color={color}
                  onClick={() => history.push({ pathname: `/lists/${id}` })}
                  size='sm'
                  variant='outlined'>
                  {`Back to "${label}" list`}
                </Button>
                <Text align='center' fontSize='xs' fontWeight='medium'>
                  OR
                </Text>
              </>
            ) : null}
            <Button color={color} onClick={() => history.push({ pathname: '/lists' })} size='sm' variant='outlined'>
              Back to lists
            </Button>
          </HStack>
        }
        label={
          mediaTypeLabel ? `No ${mediaTypeLabel} found in "${label}" list!` : `You have no items in "${label}" list!`
        }
        variant='outlined'
      />
    </Box>
  );
};

export default EmptyList;
