import React, { ReactElement } from 'react';

import { useMediaQuery, Stack, VStack, Center, Text } from '@chakra-ui/react';

import { compact, isEmpty, isNil } from 'lodash';
import { useElementSize } from 'usehooks-ts';

import { DetailsProps } from './types';

import Button from '../../../../../../components/Clickable/Button';
import Icon from '../../../../../../components/Icon';
import Skeleton from '../../../../../../components/Skeleton';
import SkeletonText from '../../../../../../components/Skeleton/Text';

const Details = ({ colorMode, user }: DetailsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');
	const [isMd] = useMediaQuery('(max-width: 860px)');
	const [isLg] = useMediaQuery('(min-width: 1280px)');

	const [buttonRef, { width: buttonWidth }] = useElementSize();

	const hasUsername = !(isNil(user.username) || isEmpty(user.username));
	const hasFirstName = !(isNil(user.firstName) || isEmpty(user.firstName));
	const hasLastName = !(isNil(user.lastName) || isEmpty(user.lastName));

	return (
		<Stack
			width={`calc(99% - ${isSm ? 0 : isMd ? 150 + 4 : isLg ? 250 + 6 : 200 + 5}px)`}
			alignItems={isSm ? 'flex-start' : 'center'}
			justifyContent='space-between'
			direction={isSm ? 'column' : 'row'}
			spacing={isSm ? 4 : 2}
			p={!isSm ? 4 : 0}
		>
			<VStack
				width={`calc(100% - ${!isSm ? buttonWidth + 16 : 0}px)`}
				alignItems='flex-start'
				spacing={!(hasFirstName || hasLastName || hasUsername) ? 1 : 0}
			>
				<SkeletonText colorMode={colorMode} fontSize='4xl' isLoaded={hasFirstName || hasLastName} speed={0}>
					<Text
						align='left'
						fontSize='4xl'
						fontWeight='semibold'
						isTruncated
						overflow='hidden'
						whiteSpace='nowrap'
					>
						{!hasFirstName && !hasLastName
							? 'First Last Name '
							: compact([hasFirstName ? user.firstName : null, hasLastName ? user.lastName : null]).join(
									' '
							  )}
					</Text>
				</SkeletonText>
				<SkeletonText colorMode={colorMode} fontSize='md' isLoaded={hasUsername} speed={0}>
					<Text
						align='left'
						fontSize='md'
						fontWeight='medium'
						isTruncated
						overflow='hidden'
						whiteSpace='nowrap'
					>
						{hasUsername ? `@${user.username}` : 'User @Username'}
					</Text>
				</SkeletonText>
			</VStack>

			<Center ref={buttonRef}>
				<Skeleton colorMode={colorMode} isLoaded={false} speed={0}>
					<Button renderLeft={() => <Icon icon='edit' type='outlined' />} isDisabled variant='outlined'>
						Edit
					</Button>
				</Skeleton>
			</Center>
		</Stack>
	);
};

export default Details;