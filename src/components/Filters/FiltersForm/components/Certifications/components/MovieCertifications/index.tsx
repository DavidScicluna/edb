import { FC, useState } from 'react';

import {
	useTheme,
	Card,
	CardHeader,
	CardBody,
	Badge,
	BadgeLabel,
	Button,
	Icon
} from '@davidscicluna/component-library';

import { Wrap, WrapItem, HStack, Text } from '@chakra-ui/react';

import { useIsFetching } from '@tanstack/react-query';

import { Controller } from 'react-hook-form';
import { range } from 'lodash';
import { sort } from 'fast-sort';

import CertificationsHelpModal from '../CertificationsHelpModal';
import { Certification as CertificationType, QueryError as QueryErrorType } from '../../../../../../../common/types';
import { useSelector, useUserTheme } from '../../../../../../../common/hooks';
import { useCertificationsQuery } from '../../../../../../../common/queries';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions
} from '../../../../../..';
import Certification from '../Certification';
import DummyCertification from '../DummyCertification';
import CertificationsCardActions from '../CertificationsCardActions';
import { certificationsQueryKey } from '../../../../../../../common/queries/useCertificationsQuery';
import { getEmptySubtitle } from '../../../../../../QueryEmpty/common/utils';
import defaultValues from '../../../../../common/data/defaults';

import { MovieCertificationsProps } from './types';

const MovieCertifications: FC<MovieCertificationsProps> = ({ form }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { control, setValue } = form;

	const isFetchingMovieCertifications = useIsFetching(certificationsQueryKey({ mediaType: 'movie' }));

	const stateCertifications = useSelector(
		(state) => state.options.data.certifications.movie?.certifications?.US || []
	);

	const [allCertifications, setAllCertifications] = useState<CertificationType[]>([...stateCertifications]);

	const [error, setError] = useState<QueryErrorType>();

	const { isFetching, isLoading, isError, isSuccess, refetch } = useCertificationsQuery({
		props: { mediaType: 'movie' },
		options: {
			enabled: !isFetchingMovieCertifications && allCertifications.length === 0,
			onSuccess: ({ certifications }) => setAllCertifications([...(certifications?.US || [])]),
			onError: (error) => setError(error.response?.data)
		}
	});

	return (
		<Controller
			control={control}
			name='certifications'
			render={({ field: { onBlur, value: certifications = [], name } }) => (
				<Card colorMode={colorMode} isFullWidth onBlur={onBlur} p={2}>
					<CardHeader
						renderTitle={(props) => (
							<HStack spacing={0.5}>
								<Text {...props}>Certifications</Text>
								{allCertifications.length > 0 && <CertificationsHelpModal mediaType='movie' />}
							</HStack>
						)}
						actions={
							<CertificationsCardActions
								allCertifications={allCertifications.length}
								certifications={certifications.length}
								onClear={() => setValue(name, defaultValues.certifications, { shouldDirty: true })}
								onToggle={() =>
									setValue(
										name,
										certifications.length === allCertifications.length
											? []
											: [...allCertifications].map(({ certification }) => certification),
										{ shouldDirty: true }
									)
								}
							/>
						}
					/>
					<CardBody>
						{!(isFetching || isLoading) && isError ? (
							<QueryEmpty color={color} colorMode={colorMode}>
								<QueryEmptyStack>
									<QueryEmptyIcon
										renderIcon={(props) => (
											<Icon
												{...props}
												width={theme.fontSizes['6xl']}
												height={theme.fontSizes['6xl']}
												fontSize={theme.fontSizes['6xl']}
												icon='error_outline'
											/>
										)}
										p={2}
									/>
									<QueryEmptyBody>
										<QueryEmptyTitle />
										<QueryEmptySubtitle>
											{getEmptySubtitle({
												type: 'error',
												label: 'Certifications'
											})}
										</QueryEmptySubtitle>
									</QueryEmptyBody>

									{error && error.status_code && error.status_message && (
										<Badge color={color} colorMode={colorMode}>
											<BadgeLabel>{`(${error.status_code}) ${error.status_message}`}</BadgeLabel>
										</Badge>
									)}

									<QueryEmptyActions
										renderActions={(props) => (
											<Button {...props} onClick={() => refetch()}>
												Try Again
											</Button>
										)}
									/>
								</QueryEmptyStack>
							</QueryEmpty>
						) : !(isFetching || isLoading) &&
						  isSuccess &&
						  allCertifications &&
						  allCertifications.length === 0 ? (
							<QueryEmpty color={color} colorMode={colorMode}>
								<QueryEmptyStack>
									<QueryEmptyBody>
										<QueryEmptyTitle />
										<QueryEmptySubtitle>
											{getEmptySubtitle({
												type: 'empty',
												label: 'Certifications'
											})}
										</QueryEmptySubtitle>
									</QueryEmptyBody>

									{/* TODO: Remove all QueryEmptyActions for Empty, leave only Error */}
									<QueryEmptyActions
										renderActions={(props) => (
											<Button {...props} onClick={() => refetch()}>
												Try Again
											</Button>
										)}
									/>
								</QueryEmptyStack>
							</QueryEmpty>
						) : !(isFetching || isLoading) &&
						  isSuccess &&
						  allCertifications &&
						  allCertifications.length > 0 ? (
							<Wrap width='100%' spacing={1.5}>
								{sort(allCertifications)
									.desc(({ order }) => order)
									.map(({ certification, meaning, ...rest }) => (
										<WrapItem key={certification}>
											<Certification
												{...rest}
												certification={certification}
												meaning={meaning}
												isActive={certifications.some((c) => c === certification)}
												onClick={() =>
													setValue(
														name,
														certifications.some((c) => c === certification)
															? certifications.filter((c) => c !== certification)
															: [...certifications, certification],
														{ shouldDirty: true }
													)
												}
											/>
										</WrapItem>
									))}
							</Wrap>
						) : (
							<Wrap width='100%' spacing={1.5}>
								{range(0, 15).map((_dummy, index) => (
									<WrapItem key={index}>
										<DummyCertification />
									</WrapItem>
								))}
							</Wrap>
						)}
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default MovieCertifications;
