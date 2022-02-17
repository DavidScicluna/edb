import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';

import { PartialCompany } from '../../../../../../common/types';
import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalGrid from '../../../../../../components/Grid/Vertical';
import HorizontalCompanyPoster from '../../../../../Search/components/All/components/Companies/components/Poster/Horizontal';
import VerticalCompanyPoster from '../../../../../Search/components/All/components/Companies/components/Poster/Vertical';
import { CompaniesProps } from './types';

const incrementBy = 20;

const Companies = ({ companies }: CompaniesProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

  return (
    <VStack width='100%' spacing={4}>
      {companies.length === 0 ? (
        <Error label='Oh no! Something went wrong' description='Failed to fetch companies list!' variant='outlined' />
      ) : companies && companies.length === 0 ? (
        <Empty label='Companies list is currently empty!' variant='outlined' />
      ) : companies && companies.length > 0 ? (
        <VerticalGrid>
          {({ displayMode }) =>
            companies
              .filter((_company, index) => index < totalVisible)
              .map((company: PartialCompany) =>
                displayMode === 'list' ? (
                  <HorizontalCompanyPoster key={company.id} company={company} isLoading={false} />
                ) : (
                  <VerticalCompanyPoster key={company.id} company={company} isLoading={false} />
                )
              )
          }
        </VerticalGrid>
      ) : (
        <VerticalGrid>
          {({ displayMode }) =>
            _.range(0, companies && companies.length > 0 ? companies.length : 20).map((_dummy, index: number) =>
              displayMode === 'list' ? (
                <HorizontalCompanyPoster key={index} isLoading />
              ) : (
                <VerticalCompanyPoster key={index} isLoading />
              )
            )
          }
        </VerticalGrid>
      )}

      <ScaleFade
        in={companies.length > 0 && companies.length > incrementBy}
        unmountOnExit
        style={{ width: isSm ? '100%' : 'auto' }}
      >
        <LoadMore
          amount={totalVisible}
          total={companies.length}
          label='Companies'
          onClick={() => setTotalVisible(totalVisible + incrementBy)}
        />
      </ScaleFade>
    </VStack>
  );
};

export default Companies;
