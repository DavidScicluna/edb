
import { ReactElement } from 'react';

import { useMediaQuery, SlideFade } from '@chakra-ui/react';

import moment from 'moment';

import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import { ReviewProps } from './types';

import Panel from '../../../../../../components/Panel';
import Rating from '../../../../../../components/Rating';

const Review = (props: ReviewProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { renderFooterActions, review, isLoading = true } = props;
  const { author, author_details, created_at, updated_at, content } = review || {};

  const hasUpdated = updated_at && !moment(updated_at).isSame(created_at);
  const hasDate = hasUpdated || isSm || false;
  const hasFooter = hasDate || renderFooterActions;

  return (
    <Panel isFullWidth>
      {{
        header: {
          title: (
            <Header
              avatar={author_details?.avatar_path || ''}
              name={author_details?.name || author || ''}
              username={author_details?.username || ''}
              date={!isSm ? created_at : ''}
              isLoading={isLoading}
            />
          ),
          actions: (
            <SlideFade in={isLoading || Boolean(author_details?.rating)} unmountOnExit>
              <Rating size='2xl' isLoading={isLoading}>
                {author_details?.rating}
              </Rating>
            </SlideFade>
          )
        },
        body: <Body content={content} isLoading={isLoading} />,
        footer: hasFooter ? (
          <Footer
            date={
              hasUpdated
                ? `* Updated on: ${moment(updated_at).format('LLL')}`
                : isSm
                ? moment(created_at).format('LLL')
                : ''
            }
            renderActions={renderFooterActions}
          />
        ) : undefined
      }}
    </Panel>
  );
};

export default Review;
