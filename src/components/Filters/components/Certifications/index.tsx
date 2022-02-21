import { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { useMediaQuery, Wrap, WrapItem, HStack } from '@chakra-ui/react';

import sort from 'array-sort';
import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import Certification from './components/Certification';
import { CertificationsProps } from './types';

import { useSelector } from '../../../../common/hooks';
import { Certification as CertificationType } from '../../../../common/types';
import Button from '../../../../components/Clickable/Button';
import Divider from '../../../../components/Divider';
import Empty from '../../../../components/Empty';
import Panel from '../../../Panel';

const Certifications = ({ form, mediaType }: CertificationsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector((state) => state.user.ui.theme.color);
	const certifications = useSelector((state) =>
		mediaType === 'movie'
			? state.options.data.certifications.movie?.US || []
			: state.options.data.certifications.tv?.US || []
	);

	const [ref, { height }] = useElementSize();

	const handleCertificationClick = (certification: CertificationType): void => {
		const certifications = form.getValues().certifications;

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
		if (form.getValues().certifications.length === (certifications || []).length) {
			form.setValue('certifications', [], { shouldDirty: true });
		} else {
			form.setValue(
				'certifications',
				[...(certifications || []).map((certification) => certification.certification)],
				{
					shouldDirty: true
				}
			);
		}
	};

	const handleAllLabel = (): string => {
		return `${form.getValues().certifications.length === (certifications || []).length ? 'Remove' : 'Select'} All`;
	};

	return (
		<Controller
			control={form.control}
			name='certifications'
			render={({ field: { value } }) => (
				<Panel isFullWidth>
					{{
						header: {
							title: 'Certifications',
							actions: (
								<HStack ref={ref} divider={<Divider orientation='vertical' height={`${height}px`} />}>
									<Button
										color={color}
										isDisabled={
											_.isNil(certifications) ||
											_.isEmpty(certifications) ||
											value.length === 0 ||
											value.length === ((certifications || [])?.length || 0)
										}
										onClick={() => form.setValue('certifications', [], { shouldDirty: true })}
										size='sm'
										variant='text'
									>
										Clear
									</Button>
									<Button
										color={color}
										isDisabled={_.isNil(certifications) || _.isEmpty(certifications)}
										onClick={() => handleAllClick()}
										size='sm'
										variant='text'
									>
										{handleAllLabel()}
									</Button>
								</HStack>
							)
						},
						body: (
							<Wrap width='100%' spacing={isSm ? 1 : 1.5}>
								{_.isNil(certifications) || _.isEmpty(certifications) ? (
									<WrapItem width='100%'>
										<Empty
											hasIllustration={false}
											label='Oh no!'
											description='Failed to find any certifications!'
											size='sm'
											variant='transparent'
										/>
									</WrapItem>
								) : !_.isNil(certifications) || !_.isEmpty(certifications) ? (
									sort([...(certifications || [])], 'order').map((certification) => (
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
									_.range(0, 5).map((_dummy, index) => (
										<WrapItem key={index}>
											<Certification isLoading />
										</WrapItem>
									))
								)}
							</Wrap>
						)
					}}
				</Panel>
			)}
		/>
	);
};

export default Certifications;