import { ReactElement } from 'react';

import { Card, CardBody, CardFooter } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import { ReviewProps } from './types';

dayjs.extend(localizedFormat);

const Review = (props: ReviewProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { renderFooterActions, review, isLoading = true } = props;
	const { author, author_details, created_at, updated_at, content } = review || {};

	const hasUpdated = updated_at && !dayjs(updated_at).isSame(created_at);
	const hasDate = hasUpdated || isSm || false;
	const hasFooter = hasDate || renderFooterActions;

	return (
		<Card isFullWidth>
			<Header
				{...(author_details || {})}
				author={author}
				created_at={!isSm ? created_at : ''}
				isLoading={isLoading}
			/>
			<CardBody>
				<Body content={content} isLoading={isLoading} />
			</CardBody>
			{hasFooter && (
				<CardFooter>
					<Footer
						date={
							hasUpdated
								? `* Updated on: ${dayjs(updated_at).format('LLL')}`
								: isSm
								? `* Created on: ${dayjs(created_at).format('LLL')}`
								: ''
						}
						renderActions={renderFooterActions}
					/>
				</CardFooter>
			)}
		</Card>
	);
};

export default Review;
