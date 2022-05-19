import { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import Panel from '../../../../../../components/Panel';

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
		<Panel isFullWidth>
			{{
				header: (
					<Header
						{...(author_details || {})}
						author={author}
						created_at={!isSm ? created_at : ''}
						isLoading={isLoading}
					/>
				),
				body: <Body content={content} isLoading={isLoading} />,
				footer: hasFooter ? (
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
				) : undefined
			}}
		</Panel>
	);
};

export default Review;
