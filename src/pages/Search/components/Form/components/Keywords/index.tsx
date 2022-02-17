import React, { ReactElement } from 'react';

import { useMediaQuery, useConst, VStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';

import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import List from '../List';
import ListItem from '../List/components/ListItem';
import { KeywordsProps } from './types';

const dummy = _.sample(_.range(4, 8));

const Keywords = (props: KeywordsProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const {
    keywords,
    isLoading = true,
    isError = false,
    isSuccess = false,
    hasNextPage = true,
    onKeywordClick,
    onFetchNextPage
  } = props;

  const dummies = useConst<number[]>(_.range(0, dummy));

  return (
    <VStack width='100%' spacing={4}>
      <List title='Keywords'>
        {!isLoading && isError ? (
          <Error
            hasIllustration={false}
            label='Oh no! Something went wrong'
            description='Failed to fetch keywords!'
            size='xs'
          />
        ) : !isLoading && isSuccess && keywords?.results && keywords.results.length === 0 ? (
          <Empty hasIllustration={false} label='Oh no!' description='No keywords found!' size='xs' />
        ) : !isLoading && isSuccess && keywords?.results && keywords.results.length > 0 ? (
          <>
            {keywords.results.map((keyword) => (
              <ListItem
                key={keyword.id}
                title={keyword.name}
                isLoading={false}
                onClick={() => onKeywordClick(keyword.name)}
                variant='transparent'
              />
            ))}
          </>
        ) : (
          <>
            {dummies.map((_dummy, index) => (
              <ListItem key={index} id={String(index)} title='Lorem Ipsum' isLoading variant='transparent' />
            ))}
          </>
        )}
      </List>

      {!isLoading ? (
        <ScaleFade in={hasNextPage && !isError} unmountOnExit style={{ width: isSm ? '100%' : 'auto' }}>
          <LoadMore
            amount={keywords?.results?.length || 0}
            total={keywords?.total_results || 0}
            label='Keywords'
            isLoading={isLoading}
            isButtonVisible={hasNextPage && !isError}
            onClick={onFetchNextPage}
          />
        </ScaleFade>
      ) : null}
    </VStack>
  );
};

export default Keywords;
