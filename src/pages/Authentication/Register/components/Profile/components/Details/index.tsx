import { ReactElement } from 'react';

import { Skeleton, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, Stack, VStack, Center, Text } from '@chakra-ui/react';
import { compact, isEmpty, isNil } from 'lodash';
import { useElementSize } from 'usehooks-ts';

import { DetailsProps } from './types';

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
				<Skeleton colorMode={colorMode} isLoaded={hasFirstName || hasLastName} speed={0} type='text'>
					<Text
						align='left'
						color={`gray.${colorMode === 'light' ? 900 : 50}`}
						fontSize='4xl'
						fontWeight='semibold'
						noOfLines={1}
					>
						{!hasFirstName && !hasLastName
							? 'First Last Name '
							: compact([hasFirstName ? user.firstName : null, hasLastName ? user.lastName : null]).join(
									' '
							  )}
					</Text>
				</Skeleton>
				<Skeleton colorMode={colorMode} isLoaded={hasUsername} speed={0} type='text'>
					<Text
						align='left'
						color={`gray.${colorMode === 'light' ? 400 : 500}`}
						fontSize='md'
						fontWeight='medium'
						noOfLines={1}
					>
						{hasUsername ? `@${user.username}` : 'User @Username'}
					</Text>
				</Skeleton>
			</VStack>

			<Center ref={buttonRef}>
				<Skeleton colorMode={colorMode} isLoaded={false} speed={0}>
					<Button
						renderLeft={(props) => <Icon {...props} icon='edit' category='outlined' />}
						isDisabled
						variant='outlined'
					>
						Edit
					</Button>
				</Skeleton>
			</Center>
		</Stack>
	);
};

export default Details;
