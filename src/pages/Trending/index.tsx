import { ReactElement } from 'react';

import { Box } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { MediaType } from '../../common/types';
import Empty from '../../components/Empty';
import MediaTypes from '../../components/MediaTypePicker/components/MediaTypes';
import Page from '../../containers/Page';

const Trending = (): ReactElement => {
  const history = useHistory();

  return (
    <Page title='Trending'>
      {{
        body: (
          <Box width='100%' px={2} pt={2}>
            <Empty
              button={
                <MediaTypes
                  onSetType={(mediaType: MediaType) => history.push({ pathname: `/trending/${mediaType}` })}
                />
              }
              hasIllustration={false}
              label='Select Media-Type'
              description='Select the Media-Type of Trending that you would prefer to view'
              size='xl'
              variant='outlined'
            />
          </Box>
        )
      }}
    </Page>
  );
};

export default Trending;
