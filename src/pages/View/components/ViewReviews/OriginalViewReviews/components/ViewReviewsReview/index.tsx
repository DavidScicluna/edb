import { FC } from 'react';

import { Colors, useTheme, Card, CardHeader, CardBody, CardFooter, utils } from '@davidscicluna/component-library';

import { useConst, AspectRatio, Text, HStack } from '@chakra-ui/react';

import { v4 as uuid } from 'uuid';
import { omit } from 'lodash';

import { Image, Paragraph, Rating } from '../../../../../../../components';
import { useUserTheme } from '../../../../../../../common/hooks';
import {
	formatDate,
	formatMediaTypeLabel,
	getBoringAvatarSrc,
	getBoringAvatarVariantByMediaType,
	getRatio
} from '../../../../../../../common/utils';

import { ViewReviewsReviewProps } from './types';
import ViewReviewsReviewUsername from './components/ViewReviewsReviewUsername';
import ViewReviewsReviewCreatedAt from './components/ViewReviewsReviewCreatedAt';

const { getColor, getHue } = utils;

const ViewReviewsReview: FC<ViewReviewsReviewProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { renderFooterActions, name, username, avatar_path, created_at, updated_at, rating, content } = props;

	const alt = useConst<string>(
		name
			? `${name} ${formatMediaTypeLabel({ type: 'single', mediaType: 'person' })} avatar`
			: `${formatMediaTypeLabel({ type: 'single', mediaType: 'person' })} avatar`
	);

	const randomID = useConst<string>(uuid());

	return (
		<Card colorMode={colorMode} isFullWidth p={2}>
			<CardHeader
				renderLeft={() => (
					<AspectRatio
						width={theme.fontSizes['5xl']}
						height={theme.fontSizes['5xl']}
						borderRadius='full'
						ratio={getRatio({ orientation: 'square' })}
					>
						<Image
							alt={alt}
							width='inherit'
							height='inherit'
							borderRadius='full'
							src={{
								boring: getBoringAvatarSrc({
									id: username ? username.trim() : randomID,
									colors: omit({ ...theme.colors }, ['transparent', 'black', 'white']) as Colors,
									hue: getHue({ colorMode, type: 'color' }),
									size: 500,
									variant: getBoringAvatarVariantByMediaType({ mediaType: 'person' })
								}),
								full: avatar_path
									? avatar_path.charAt(0) === '/'
										? avatar_path.substring(1)
										: avatar_path
									: undefined
							}}
						/>
					</AspectRatio>
				)}
				renderTitle={(props) => <Text {...props}>{name}</Text>}
				renderSubtitle={() => (
					<HStack>
						{!!username && <ViewReviewsReviewUsername username={username} />}
						{!!updated_at && !!created_at && <ViewReviewsReviewCreatedAt createdAt={created_at} />}
					</HStack>
				)}
				actions={rating ? <Rating rating={rating} size='xl' /> : undefined}
				spacing={1.5}
			/>
			<CardBody>
				<Paragraph variant='transparent'>{content}</Paragraph>
			</CardBody>
			{(created_at || updated_at || renderFooterActions) && (
				<CardFooter>
					<HStack width='100%' alignItems='center' justifyContent='space-between'>
						{(created_at || updated_at) && (
							<Text
								align='left'
								color={getColor({ theme, colorMode, type: 'text.secondary' })}
								fontSize='sm'
							>
								{updated_at
									? `* Updated on: ${formatDate({ date: updated_at })}`
									: created_at
									? `* Posted on: ${formatDate({ date: created_at })}`
									: ''}
							</Text>
						)}

						{renderFooterActions && renderFooterActions()}
					</HStack>
				</CardFooter>
			)}
		</Card>
	);
};

export default ViewReviewsReview;
