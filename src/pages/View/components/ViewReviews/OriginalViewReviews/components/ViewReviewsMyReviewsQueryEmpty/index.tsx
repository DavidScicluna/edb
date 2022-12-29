import { ReactElement } from 'react';

import { Button, Icon } from '@davidscicluna/component-library';

import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions
} from '../../../../../../../components';
import { useUserTheme } from '../../../../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import { ViewReviewsMediaType } from '../../types';
import CreateMyReview from '../ViewReviewsCreateEditMyReview';

import { ViewReviewsMyReviewsQueryEmptyProps } from './types';

const ViewReviewsMyReviewsQueryEmpty = <MT extends ViewReviewsMediaType>(
	props: ViewReviewsMyReviewsQueryEmptyProps<MT>
): ReactElement => {
	const { color, colorMode } = useUserTheme();

	const { mediaType, mediaItem, name, ...rest } = props;

	return (
		<QueryEmpty {...rest} color={color} colorMode={colorMode}>
			<QueryEmptyStack>
				<QueryEmptyBody>
					<QueryEmptyTitle>
						{name
							? `You currently have not written any reviews for "${name}"`
							: `You currently have not written any reviews for the ${formatMediaTypeLabel({
									type: 'single',
									mediaType
							  })}`}
					</QueryEmptyTitle>
					<QueryEmptySubtitle>
						{name
							? `Leave your taughts about "${name}" to help others make up their mind.`
							: `Leave your taughts about the ${formatMediaTypeLabel({
									type: 'single',
									mediaType
							  })} to help others make up their mind.`}
					</QueryEmptySubtitle>
				</QueryEmptyBody>

				<QueryEmptyActions
					renderActions={(renderActionsProps) => (
						<CreateMyReview<MT>
							mediaType={mediaType}
							mediaItem={mediaItem}
							renderButton={({ icon, category, ...rest }) => (
								<Button
									{...renderActionsProps}
									{...rest}
									renderLeft={({ color, colorMode, height }) => (
										<Icon
											width={`${height}px`}
											height={`${height}px`}
											fontSize={`${height}px`}
											colorMode={colorMode}
											icon={icon}
											category={category}
											skeletonColor={color}
										/>
									)}
								>
									Create a new Review
								</Button>
							)}
						/>
					)}
				/>
			</QueryEmptyStack>
		</QueryEmpty>
	);
};

export default ViewReviewsMyReviewsQueryEmpty;
