import { ReactElement } from 'react';

import { Card, CardHeader, CardBody, Button } from '@davidscicluna/component-library';

import { useMediaQuery, Wrap, WrapItem, HStack, Text } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';
import sort from 'array-sort';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import range from 'lodash/range';
import { useElementSize } from 'usehooks-ts';

import { defaultValues } from '../..';
import { useSelector } from '../../../../../common/hooks';
import { Certification as CertificationType } from '../../../../../common/types';
import { defaultUser, getUser } from '../../../../../store/slices/Users';
import Divider from '../../../../Divider';
import Empty from '../../../../Empty';

import { CertificationsProps } from './types';
import Certification from './components/Certification';

const Certifications = ({ form, mediaType }: CertificationsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);
	const allCertifications = useSelector((state) =>
		mediaType === 'movie'
			? state.options.data.certifications.movie?.US || []
			: state.options.data.certifications.tv?.US || []
	);
	const certifications = form.watch().certifications || [];

	const [ref, { height }] = useElementSize();

	const handleCertificationClick = (certification: CertificationType): void => {
		if (certifications.some((activeCertification) => activeCertification === certification.certification)) {
			form.setValue(
				'certifications',
				certifications.filter((activeCertification) => activeCertification !== certification.certification),
				{ shouldDirty: true }
			);
		} else {
			form.setValue('certifications', [...certifications, certification.certification], { shouldDirty: true });
		}
	};

	const handleAllClick = (): void => {
		if (certifications.length === allCertifications.length) {
			form.setValue('certifications', [], { shouldDirty: true });
		} else {
			form.setValue(
				'certifications',
				[...allCertifications.map((certification) => certification.certification)],
				{
					shouldDirty: true
				}
			);
		}
	};

	const handleAllLabel = (): string => {
		return `${certifications.length === allCertifications.length ? 'Remove' : 'Select'} All`;
	};

	return (
		<Controller
			control={form.control}
			name='certifications'
			render={({ field: { value } }) => (
				<Card isFullWidth>
					<CardHeader
						renderTitle={(props) => <Text {...props}>Certifications</Text>}
						actions={
							<HStack ref={ref} divider={<Divider orientation='vertical' height={`${height}px`} />}>
								<Button
									color={color}
									isDisabled={
										isNil(allCertifications) ||
										isEmpty(allCertifications) ||
										value.length === 0 ||
										value.length === allCertifications.length
									}
									onClick={() =>
										form.setValue('certifications', defaultValues.certifications, {
											shouldDirty: true
										})
									}
									size='sm'
									variant='text'
								>
									Clear
								</Button>
								<Button
									color={color}
									isDisabled={isNil(allCertifications) || isEmpty(allCertifications)}
									onClick={() => handleAllClick()}
									size='sm'
									variant='text'
								>
									{handleAllLabel()}
								</Button>
							</HStack>
						}
					/>
					<CardBody>
						<Wrap width='100%' spacing={isSm ? 1 : 1.5}>
							{isNil(allCertifications) || isEmpty(allCertifications) ? (
								<WrapItem width='100%'>
									<Empty
										hasIllustration={false}
										label='Oh no!'
										description='Failed to find any certifications!'
										size='sm'
										variant='transparent'
									/>
								</WrapItem>
							) : !(isNil(allCertifications) || isEmpty(allCertifications)) ? (
								sort([...allCertifications], 'order').map((certification) => (
									<WrapItem key={certification.certification}>
										<Certification
											{...certification}
											isActive={value.some(
												(activeCertification) =>
													activeCertification === certification.certification
											)}
											isLoading={false}
											onClick={handleCertificationClick}
										/>
									</WrapItem>
								))
							) : (
								range(0, 5).map((_dummy, index) => (
									<WrapItem key={index}>
										<Certification isLoading />
									</WrapItem>
								))
							)}
						</Wrap>
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default Certifications;
