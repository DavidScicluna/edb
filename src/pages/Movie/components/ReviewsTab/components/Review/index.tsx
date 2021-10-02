import { ReactElement } from 'react';

import { useTheme, useBreakpointValue } from '@chakra-ui/react';

import { useSelector } from '../../../../../../common/hooks';
import Card from '../../../../../../components/Card';
import Rating from '../../../../../../components/Rating';
import { Theme } from '../../../../../../theme/types';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import { ReviewProps } from './types';

const Review = (props: ReviewProps): ReactElement => {
  const theme = useTheme<Theme>();
  const iconFontsize = useBreakpointValue({
    'base': theme.fontSizes['2xl'],
    'sm': theme.fontSizes['2xl'],
    'md': theme.fontSizes['3xl'],
    'lg': theme.fontSizes['3xl'],
    'xl': theme.fontSizes['3xl'],
    '2xl': theme.fontSizes['3xl']
  });

  const userReviews = useSelector((state) => state.user.data.reviews);

  const { review, isLoading = true } = props;
  const { id, author, author_details, created_at, content } = review || {};

  return (
    <Card box={{ header: { pb: 1.5 }, body: { py: 1.5 }, footer: { pt: 1 } }} isFullWidth px={2} pt={1.5} pb={1}>
      {{
        header: {
          title: (
            <Header
              avatar={author_details?.avatar_path || ''}
              name={author_details?.name || author || ''}
              username={author_details?.username || ''}
              date={created_at || ''}
            />
          ),
          actions: author_details?.rating ? (
            <Rating
              rating={{
                rating: author_details?.rating || null,
                count: null
              }}
              isLoading={isLoading}
              iconFontsize={iconFontsize}
              textFontsize={['lg', 'lg', 'xl', 'xl', 'xl', 'xl']}
            />
          ) : undefined
        },
        body: <Body content={content} isLoading={isLoading} />,
        footer: (
          <Footer
            review={
              review
                ? {
                    ...review,
                    state: userReviews.some((review) => review.id === id)
                      ? userReviews.find((review) => review.id === id)?.state
                      : undefined
                  }
                : undefined
            }
          />
        )
      }}
    </Card>
  );
};

export default Review;
