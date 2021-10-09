import { ReactElement } from 'react';

import { useTheme, useMediaQuery, useBreakpointValue, SlideFade } from '@chakra-ui/react';
import moment from 'moment';

import Card from '../../../../../../components/Card';
import Rating from '../../../../../../components/Rating';
import { Theme } from '../../../../../../theme/types';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import { ReviewProps } from './types';

const Review = (props: ReviewProps): ReactElement => {
  const theme = useTheme<Theme>();
  const [isSm] = useMediaQuery('(max-width: 600px)');
  const iconFontsize = useBreakpointValue({
    'base': theme.fontSizes['2xl'],
    'sm': theme.fontSizes['2xl'],
    'md': theme.fontSizes['3xl'],
    'lg': theme.fontSizes['3xl'],
    'xl': theme.fontSizes['3xl'],
    '2xl': theme.fontSizes['3xl']
  });

  const { renderFooterActions, review, isLoading = true } = props;
  const { author, author_details, created_at, updated_at, content } = review || {};

  const hasUpdated = updated_at && !moment(updated_at).isSame(created_at);

  return (
    <Card box={{ header: { pb: 1.5 }, body: { py: 1.5 }, footer: { pt: 1 } }} isFullWidth px={2} pt={1.5} pb={1}>
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
              <Rating
                rating={{
                  rating: author_details?.rating || null,
                  count: null
                }}
                isLoading={isLoading}
                iconFontsize={iconFontsize}
                textFontsize={['lg', 'lg', 'xl', 'xl', 'xl', 'xl']}
              />
            </SlideFade>
          )
        },
        body: <Body content={content} isLoading={isLoading} />,
        footer: (
          <Footer
            date={
              hasUpdated
                ? `* Updated on: ${moment(updated_at).format('LLL')}`
                : isSm
                ? moment(created_at).format('LLL')
                : ''
            }
            renderDate={hasUpdated || isSm || false}
            renderActions={renderFooterActions}
          />
        )
      }}
    </Card>
  );
};

export default Review;
